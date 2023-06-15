import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { api } from "~/utils/api";
import Button from "~/components/Button";
import Checkbox from "~/components/Checkbox";
import { getPushNotificationToken } from "~/lib/notifications";
import useOnboarding, { Notification } from "~/lib/useOnboarding";

export default function Notifications() {
  const [token, setToken] = useState<string | null>(null);
  const { notificationOptions } = useOnboarding(0);
  const { data: notifications, isLoading: loading } =
    api.devices.getNotifications.useQuery(
      {
        token: "token",
      },
      {
        enabled: !!token,
      },
    );

  const [selectedNotifications, setSelectedNotifications] = useState(
    notifications?.length
      ? notifications
      : notificationOptions.map((o) => o.value),
  );

  const toggleNotification = (value: Notification) => {
    if (selectedNotifications.includes(value)) {
      setSelectedNotifications(
        selectedNotifications.filter((v) => v !== value),
      );
    } else {
      setSelectedNotifications([...selectedNotifications, value]);
    }
  };

  const isNotificationChecked = (notification: Notification) => {
    return selectedNotifications.includes(notification);
  };

  const getToken = async () => {
    const token = (await getPushNotificationToken()) ?? null;

    if (!token)
      Toast.show({
        type: "error",
        text1: "Hiba",
        text2: "A token betöltése sikertelen volt.",
      });

    setToken(token);
  };

  const handleSubmit = () => {
    console.log("");
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <ScrollView className="bg-[#121212]">
      <View className="h-full w-full flex-1 bg-[#121212] p-8">
        <Text className="font-chairdrobe-rounded-bold mb-3 text-3xl text-white">
          Értesítések
        </Text>
        <Text className="font-noto-sans-regular mb-2 text-white">
          Módosítsd értesítési beállításaidat az igényeidnek megfelelően.
        </Text>

        <View className="mb-2">
          {notificationOptions.map((option) => (
            <Service
              key={option.value}
              text={option.display}
              checked={isNotificationChecked(option.value)}
              onPress={() => toggleNotification(option.value)}
            />
          ))}
        </View>

        <Button width="100%" height={60} onPress={handleSubmit}>
          Mentés
        </Button>
      </View>
    </ScrollView>
  );
}

type ServiceProps = {
  text: string;
  checked: boolean;
  onPress: () => void;
};

const Service = ({ text, checked, onPress }: ServiceProps) => (
  <>
    <Checkbox text={text} checked={checked} onPress={onPress} />

    <Separator />
  </>
);

const Separator = () => <View className="my-2 h-[2] w-full bg-white" />;
