import { Category } from "@packages/db";

export type SendPushNotificationToCategoryInput = {
  categories: Category[];
  notification: {
    title: string;
    body: string;
  };
};
