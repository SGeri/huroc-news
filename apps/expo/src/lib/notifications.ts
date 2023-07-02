import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function getPushNotificationToken() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return Toast.show({
        type: "error",
        text1: "Push értesítések",
        text2: "Engedélyezd az értesítéseket a beállításokban!",
      });
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    Toast.show({
      type: "error",
      text1: "Push értesítések",
      text2: "Fizikai eszközt kell használnod!",
    });
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
