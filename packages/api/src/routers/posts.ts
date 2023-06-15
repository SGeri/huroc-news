import { z } from "zod";
import { categoryKeys } from "@packages/lib";
import { notificationsService } from "../services/notifications.service";
import { createRouter, protectedProcedure, publicProcedure } from "../trpc";

// use typescipt magic to get the categories from Category enum

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
          orderBy: {
            createdAt: "desc",
          },
        }),
      ]);

      return { total, posts, pinned };
    }),

  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        category: z.array(z.enum(categoryKeys)).min(1),
        image: z.string().min(1),
        link: z.string().min(1),
        pinned: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          category: input.category,
          image: input.image,
          link: input.link,
          pinned: input.pinned,
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

  updatePost: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        resend: z.boolean().optional(),
        post: z.object({
          title: z.string().min(1),
          category: z.array(z.enum(categoryKeys)).min(1),
          image: z.string().min(1),
          link: z.string().min(1),
          pinned: z.boolean().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { post } = input;

      const editedPost = await ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          title: post.title,
          category: post.category,
          image: post.image,
          link: post.link,
          pinned: post.pinned,
        },
      });

      if (input.resend) {
        await notificationsService.sendPushNotificationToCategory({
          categories: post.category,
          notification: {
            title: "Bejegyzés frissítve!",
            body: post.title,
          },
        });
      }

      return editedPost;
    }),

  removePost: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.delete({
        where: {
          id: input.id,
        },
      });

      return post;
    }),
});
