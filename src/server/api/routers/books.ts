import { z } from "zod";
import axios from "axios";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import type { Book } from "@prisma/client";

const bookSchema = z.object({
  dimensions: z.string(),
  title: z.string(),
  title_long: z.string(),
  isbn: z.string(),
  isbn10: z.string(),
  isbn13: z.string(),
  image: z.string(),
  authors: z.string(),
  date_published: z.string(),
  edition: z.string(),
  language: z.string(),
  msrp: z.number(),
  pages: z.number(),
  publisher: z.string(),
  binding: z.string(),
  subjects: z.string(),
  synopsis: z.string(),
});

export const booksRouter = createTRPCRouter({
  search: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.book.findMany({ orderBy: { createdAt: "desc" } });
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
