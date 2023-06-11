import { z } from "zod";
import { createRouter, publicProcedure } from "../trpc";

export const postsRouter = createRouter({
  getPosts: publicProcedure
    .input(
      z.object({
        skip: z.number(),
        take: z.number(),
        orderBy: z.enum(["desc", "asc"]).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const [total, posts, pinned] = await ctx.prisma.$transaction([
        ctx.prisma.post.count(),
        ctx.prisma.post.findMany({
          skip: input.skip,
          take: input.take,
          orderBy: {
            createdAt: input.orderBy || "desc",
          },
        }),
        ctx.prisma.post.findFirst({
          where: {
            pinned: true,
          },
        }),
      ]);

      return { total, posts, pinned };
    }),
});
