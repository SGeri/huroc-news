import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Button from "~/components/Button";
import Checkbox from "~/components/Checkbox";
import ProgressBar from "~/components/ProgressBar";
import useOnboarding, { type Notification } from "~/lib/useOnboarding";

export default function NotificationsPicker() {
  const { progress, next, saveNotifications, notificationOptions } =
    useOnboarding(3);

  const [selectedNotifications, setSelectedNotifications] = useState(
    notificationOptions.map((o) => o.value),
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

  const handleNext = () => {
    saveNotifications(selectedNotifications);
    next();
  };

  return (
    <>
      <ProgressBar progress={progress} />

      <ScrollView>
        <View className="h-full w-full flex-1 items-center bg-[#121212] p-8">
          <Text className="font-chalet-comprime mb-3 text-center text-3xl text-white">
            Értesítések
          </Text>
          <Text className="font-noto-sans-regular mb-12 text-center text-base text-white">
            Lássuk, hogy milyen típusú értesítéseket szeretnél kapni! Később
            bármikor módosíthatod ezeket a beállításokat!
          </Text>

          {notificationOptions.map((option) => (
            <Service
              key={option.value}
              text={option.display}
              checked={isNotificationChecked(option.value)}
              onPress={() => toggleNotification(option.value)}
            />
          ))}

          <View className="mb-12" />

          <Button width={100} height={40} onPress={handleNext}>
            Tovább
          </Button>
        </View>
      </ScrollView>
    </>
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
