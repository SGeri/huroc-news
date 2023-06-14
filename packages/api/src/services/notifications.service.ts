import { Expo } from "expo-server-sdk";
import { prisma } from "@packages/db";
import { SendPushNotificationToCategoryInput } from "./notifications.types";

const expo = new Expo();

class NotificationsService {
  private readonly prisma = prisma;
  private readonly expo = expo;

  async sendPushNotificationToCategory({
    categories,
    notification,
  }: SendPushNotificationToCategoryInput) {
    const devices = await this.prisma.device.findMany({
      select: {
        device_token: true,
      },
      where: {
        enabled_notifications: {
          hasSome: categories,
        },
      },
    });

    const messages = devices
      .filter((device) => Expo.isExpoPushToken(device.device_token))
      .map((device) => ({
        to: device.device_token,
        title: notification.title,
        body: notification.body,
        channelId: "default",
      }));

    const chunks = this.expo.chunkPushNotifications(messages);
    const tickets = [];

    for (const chunk of chunks) {
      try {
        let ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }

    console.log(" > Finished sending notifications");
    console.log(tickets);
  }
}

export const notificationsService = new NotificationsService();
