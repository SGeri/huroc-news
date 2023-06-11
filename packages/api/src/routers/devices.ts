import { z } from "zod";
import { Category } from "@packages/db";
import { createRouter, publicProcedure } from "../trpc";

// make a common place for this
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

export const devicesRouter = createRouter({
  registerDevice: publicProcedure
    .input(
      z.object({
        token: z.string().min(1),
        selectedNotifications: z.array(z.enum(categories)).min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("input", input);

      const { token, selectedNotifications } = input;
      const { prisma } = ctx;

      const device = await prisma.device.create({
        data: {
          device_token: token,
          enabled_notifications: selectedNotifications,
        },
      });

      return device;
    }),
});
