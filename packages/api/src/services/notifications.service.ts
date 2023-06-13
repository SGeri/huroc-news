import { Expo } from "expo-server-sdk";
import { Category, prisma } from "@packages/db";
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

    // let messages = [];
    // for (let pushToken of somePushTokens) {
    //   // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    //   // Check that all your push tokens appear to be valid Expo push tokens
    //   if (!Expo.isExpoPushToken(pushToken)) {
    //     console.error(`Push token ${pushToken} is not a valid Expo push token`);
    //     continue;
    //   }

    //   // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    //   messages.push({
    //     to: pushToken,
    //     sound: "default",
    //     body: "This is a test notification",
    //     data: { withSome: "data" },
    //   });
    // }

    const messages = devices
      .filter((device) => Expo.isExpoPushToken(device.device_token))
      .map((device) => ({
        to: device.device_token,
        title: notification.title,
        body: notification.body,
        channelId: "default",
      }));

    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];

    for (const chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
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
