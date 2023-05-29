import { z } from "zod";
import axios from "axios";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import type { Book } from "@prisma/client";

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
});

export const booksRouter = createTRPCRouter({
  search: privateProcedure
    .input(
      z.object({
        query: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const query = input.query;

      return ctx.prisma.book.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        where: {
          OR: [
            { title: { contains: query } },
            { title_long: { contains: query } },
            { isbn: { contains: query } },
            { isbn10: { contains: query } },
            { isbn13: { contains: query } },
          ],
        },
      });
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
      const byISBN = await ctx.prisma.book.findFirst({
        where: {
          isbn: input.book.isbn,
        },
      });

      if (byISBN !== null) {
        throw new TRPCError({ message: "Already exists", code: "BAD_REQUEST" });
      }

      const book = await ctx.prisma.book.create({
        data: {
          ...input.book,
          authorId: ctx.userId,
        },
      });

      return book;
    }),
});
