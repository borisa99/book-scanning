import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

export const booksRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.book.findMany({ orderBy: { createdAt: "desc" } });
  }),
  create: privateProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const book = await ctx.prisma.book.create({
        data: {
          authorId: ctx.userId,
          title: input.title,
        },
      });

      return book;
    }),
});
