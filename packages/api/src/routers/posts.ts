import { z } from "zod";
import { notificationsService } from "../services/notifications.service";
import { createRouter, protectedProcedure, publicProcedure } from "../trpc";

// use typescipt magic to get the categories from Category enum
const categories = [
  "SERVICE_STATUS",
  "GTA_ONLINE",
  "GTA_VI",
  "GTA_TRIOLOGY",
  "RED_DEAD_ONLINE",
  "ROCKSTAR_GAMES",
  "TAKE_TWO",
  "HUROC",
] as const;

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

  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        category: z.array(z.enum(categories)).min(1),
        image: z.string().min(1),
        link: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          category: input.category,
          image: input.image,
          link: input.link,
        },
      });

      await notificationsService.sendPushNotificationToCategory({
        categories: input.category,
        notification: {
          title: "Új bejegyzés!",
          body: input.title,
        },
      });

      return post;
    }),
});
