import { z } from "zod";
import { adminProcedure, createRouter } from "../trpc";

export const postsRouter = createRouter({
  getPosts: adminProcedure
    .input(
      z.object({
        skip: z.number(),
        take: z.number(),
        orderBy: z.enum(["desc", "asc"]).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const [total, posts] = await ctx.prisma.$transaction([
        ctx.prisma.post.count(),
        ctx.prisma.post.findMany({
          skip: input.skip,
          take: input.take,
          orderBy: {
            createdAt: input.orderBy || "desc",
          },
        }),
      ]);

      // await new Promise((r) => setTimeout(r, 300)); // artificial delay for simulating loading

      return { total, posts };
    }),
});
