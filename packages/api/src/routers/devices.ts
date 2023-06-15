import { z } from "zod";
import { categoryKeys } from "@packages/lib";
import { createRouter, publicProcedure } from "../trpc";

export const devicesRouter = createRouter({
  getNotifications: publicProcedure
    .input(
      z.object({
        token: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { token } = input;

      const device = await ctx.prisma.device.findUnique({
        where: {
          device_token: token,
        },
      });

      if (!device) return [];

      return device.enabled_notifications;
    }),

  registerDevice: publicProcedure
    .input(
      z.object({
        token: z.string().min(1),
        selectedNotifications: z.array(z.enum(categoryKeys)).min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { token, selectedNotifications } = input;

      const device = await ctx.prisma.device.upsert({
        where: {
          device_token: token,
        },

        create: {
          device_token: token,
          enabled_notifications: selectedNotifications,
        },
        update: {
          enabled_notifications: selectedNotifications,
        },
      });

      return device;
    }),
});
