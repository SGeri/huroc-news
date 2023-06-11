import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import ProgressBar from "../../components/ProgressBar";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  textContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    textAlign: "center",
    fontFamily: "ChairdrobeRoundedBold",
    fontSize: 32,
    color: "white",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    fontFamily: "NotoSansRegular",
    fontSize: 16,
    color: "white",
    marginBottom: 40,
  },
  image: {
    width: "100%",
    height: "50%",
  },
});

// todo rework this page

export default function Page() {
  const router = useRouter();

  const [notifications, setNotifications] = useState([
    "SERVICE_STATUS",
    "GTA_ONLINE",
    "GTA_VI",
    "GTA_TRIOLOGY",
    "RED_DEAD_ONLINE",
    "ROCKSTAR_GAMES",
    "TAKE_TWO",
    "HUROC",
  ]);

  const toggleNotification = (notification: string) => {
    if (notifications.includes(notification)) {
      setNotifications(notifications.filter((n) => n !== notification));
    } else {
      setNotifications([...notifications, notification]);
    }
  };

  const isNotificationChecked = (notification: string) => {
    return notifications.includes(notification);
  };

  return (
    <>
      <ProgressBar progress={(100 / 7) * 4} />

      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Értesítések</Text>
        <Text style={styles.description}>
          Lássuk, hogy milyen típusú értesítéseket szeretnél kapni! Később
          bármikor módosíthatod ezeket a beállításokat!
        </Text>

        <Checkbox
          text="Service Status értesítések"
          checked={isNotificationChecked("SERVICE_STATUS")}
          onPress={() => toggleNotification("SERVICE_STATUS")}
        />

        <Separator />

        <Checkbox
          text="GTA Online értesítések"
          checked={isNotificationChecked("GTA_ONLINE")}
          onPress={() => toggleNotification("GTA_ONLINE")}
        />

        <Separator />

        <Checkbox
          text="Red Dead Online értesítések"
          checked={isNotificationChecked("RED_DEAD_ONLINE")}
          onPress={() => toggleNotification("RED_DEAD_ONLINE")}
        />

        <Separator />

        <Checkbox
          text="Grand Theft Auto VI értesítések"
          checked={isNotificationChecked("GTA_VI")}
          onPress={() => toggleNotification("GTA_VI")}
        />

        <Separator />

        <Checkbox
          text="GTA: The Triology értesítések"
          checked={isNotificationChecked("GTA_TRIOLOGY")}
          onPress={() => toggleNotification("GTA_TRIOLOGY")}
        />

        <Separator />

        <Checkbox
          text="Rockstar Games értesítések"
          checked={isNotificationChecked("ROCKSTAR_GAMES")}
          onPress={() => toggleNotification("ROCKSTAR_GAMES")}
        />

        <Separator />

        <Checkbox
          text="Take-Two Interactive értesítések"
          checked={isNotificationChecked("TAKE_TWO")}
          onPress={() => toggleNotification("TAKE_TWO")}
        />

        <Separator />

        <Checkbox
          text="Hungarian Rockstar Club értesítések"
          checked={isNotificationChecked("HUROC")}
          onPress={() => toggleNotification("HUROC")}
        />

        <Separator />

        <View style={{ marginBottom: 50 }} />

        <Button
          width={100}
          height={40}
          onPress={() =>
            router.push({
              pathname: "/onboarding/service-status",
              params: { notifications },
            })
          }
        >
          Tovább
        </Button>
      </SafeAreaView>
    </>
  );
}

function Separator() {
  return (
    <View
      style={{
        width: "100%",
        height: 1,
        backgroundColor: "white",
      }}
    />
  );
}
