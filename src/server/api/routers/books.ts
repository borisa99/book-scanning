import { z } from "zod";
import axios from "axios";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import type { Book } from "@prisma/client";
import { convertToCsvString } from "@/utils/helpers";

const bookSchema = z.object({
  dimensions: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  title_long: z.string().optional().nullable(),
  isbn: z.string(),
  isbn10: z.string(),
  isbn13: z.string(),
  image: z.string().optional().nullable(),
  authors: z.string().optional().nullable(),
  date_published: z.string().optional().nullable(),
  edition: z.string().optional().nullable(),
  language: z.string().optional().nullable(),
  msrp: z.number().optional().nullable(),
  pages: z.number().optional().nullable(),
  publisher: z.string().optional().nullable(),
  binding: z.string().optional().nullable(),
  subjects: z.string().optional(),
  synopsis: z.string().optional().nullable(),
  shelf: z.string().optional().nullable(),
});

export const booksRouter = createTRPCRouter({
  search: privateProcedure
    .input(
      z.object({
        query: z.string(),
        dateFrom: z.date().nullable(),
        dateTo: z.date().nullable(),
        page: z.number().optional().default(1),
        pageSize: z.number().optional().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { query, page, pageSize, dateFrom, dateTo } = input;
      const skip = (page - 1) * pageSize;

      const where = {
        OR: [
          { title: { contains: query } },
          { title_long: { contains: query } },
          { isbn: { contains: query } },
          { isbn10: { contains: query } },
          { isbn13: { contains: query } },
        ],
        ...((dateFrom || dateTo) && {
          createdAt: {
            ...(dateFrom && { gte: dateFrom }),
            ...(dateTo && { lte: dateTo }),
          },
        }),
      };
      const count = await ctx.prisma.book.count({ where });
      const books = await ctx.prisma.book.findMany({
        take: pageSize,
        skip,
        orderBy: { createdAt: "desc" },
        where,
      });

      return {
        count,
        books,
      };
    }),
  getByISBN: privateProcedure
    .input(
      z.object({
        isbn: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { isbn } = input;

        const ISBN_DB_URL = process.env.ISBN_DB_URL ?? "";
        const ISBN_DB_KEY = process.env.ISBN_DB_KEY ?? "";

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { data } = await axios.get<{ book: Book }>(
          `${ISBN_DB_URL}/book/${isbn}`,
          {
            headers: {
              Authorization: ISBN_DB_KEY,
              Accept: "*",
            },
          }
        );

        return data.book;
      } catch (error) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
    }),
  create: privateProcedure
    .input(
      z.object({
        book: bookSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const book = await ctx.prisma.book.create({
        data: {
          ...input.book,
          authorId: ctx.userId,
        },
      });

      return book;
    }),
  exportAsCsv: privateProcedure
    .input(
      z.object({
        ids: z.string().array(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { ids } = input;

        const book = await ctx.prisma.book.findMany({
          where: {
            id: { in: ids },
          },
        });

        const csv = convertToCsvString(book);

        return csv;
      } catch (error) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
    }),
});
