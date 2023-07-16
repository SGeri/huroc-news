import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { api } from "~/utils/api";
import { getPushNotificationToken } from "./notifications";
import { getItem, setItem } from "./storage";

const pages = [
  "/onboarding/welcome",
  "/onboarding/basics",
  "/onboarding/notifications",
  "/onboarding/notifications-picker",
  "/onboarding/service-status",
  "/onboarding/documents",
  "/onboarding/ready",
];

const notificationOptions = [
  {
    display: "Service Status értesítések",
    value: "SERVICE_STATUS",
  },
  {
    display: "GTA Online értesítések",
    value: "GTA_ONLINE",
  },
  {
    display: "Grand Theft Auto VI értesítések",
    value: "GTA_VI",
  },
  {
    display: "GTA: The Trilogy értesítések",
    value: "GTA_TRIOLOGY",
  },
  {
    display: "Red Dead Online értesítések",
    value: "RED_DEAD_ONLINE",
  },
  {
    display: "Rockstar Games értesítések",
    value: "ROCKSTAR_GAMES",
  },
  {
    display: "Take-Two Interactive értesítések",
    value: "TAKE_TWO",
  },
  {
    display: "Hungarian Rockstar Club értesítések",
    value: "HUROC",
  },
] as const;

const documents = [
  {
    display: "Használati Feltételek",
    value: "TOU",
    link: "https://huroc.com/legal/terms-of-use",
  },
  {
    display: "Szolgáltatási Feltételek",
    value: "TOS",
    link: "https://huroc.com/legal",
  },
  {
    display: "Adatkezelési Tájékoztató",
    value: "TOP",
    link: "https://huroc.com/privacy",
  },
] as const;

export type Notification = (typeof notificationOptions)[number]["value"];

export type Document = (typeof documents)[number]["value"];

export default function useOnboarding(pageIndex: number) {
  const router = useRouter();
  const registerDevice = api.devices.registerDevice.useMutation();

  const progress = (100 / pages.length) * (pageIndex + 1);

  const saveNotifications = (notifications: Notification[]) => {
    setItem("onboarding-notifications", notifications.join(","));
  };

  const readNotifications = async () => {
    const notifications = await getItem("onboarding-notifications");

    if (!notifications)
      throw new Error("Nem sikerült elérni az értesítéseket!");

    return notifications?.split(",") as Notification[];
  };

  const next = () => {
    if (pageIndex < pages.length - 1) {
      const nextPage = pages[pageIndex + 1];

      router.push({ pathname: nextPage });
    } else {
      finish();
    }
  };

  const finish = async () => {
    try {
      const token = await getPushNotificationToken();
      const selectedNotifications = await readNotifications();

      if (!token || !selectedNotifications)
        throw new Error("Nem sikerült lekérni a push token-t!");

      await registerDevice.mutateAsync({
        token,
        selectedNotifications,
      });

      await setItem("onboarding-done", true);

      Toast.show({
        type: "success",
        text1: "Szinkronizálás",
        text2: "A szinkronizálás sikeresen befejeződött!",
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Onboarding",
        text2: "Az onboarding nem sikerült! " + String(e),
      });
      Alert.alert("Hiba", "Az onboarding nem sikerült! " + String(e));
      console.log("error", String(e));
    }

    router.replace("/");
  };

  return { progress, next, saveNotifications, notificationOptions, documents };
}
