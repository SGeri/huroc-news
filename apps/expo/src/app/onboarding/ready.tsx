import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getPushNotificationToken } from "~/lib/notifications";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import Welcome7Image from "../../images/welcome7.png";
import { keepParams } from "../../lib/params";
import { setItem } from "../../lib/storage";
import { api } from "../../utils/api";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "space-between",
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
    marginBottom: 50,
  },
  image: {
    width: "100%",
    height: "50%",
  },
});

type Params = {
  notifications: string;
};

export default keepParams<Params>(function Ready({ params }) {
  const router = useRouter();
  const { mutateAsync: registerDevice, isLoading: loading } =
    api.devices.registerDevice.useMutation();

  const finishOnboarding = async () => {
    try {
      const token = await getPushNotificationToken();

      if (!token || !params.notifications)
        throw new Error("Nem sikerült lekérni a push token-t!");

      // fix type "piping"
      await registerDevice({
        token,
        selectedNotifications: params.notifications.split(",") as any,
      });

      await setItem("onboarding-done", true);
    } catch (e) {
      alert("Az onboarding nem sikerült! " + String(e));
    }

    router.replace("/");
  };

  return (
    <>
      <ProgressBar progress={100} />

      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Készen is vagyunk!</Text>
          <Text style={styles.description}>
            Elkészültél! Mostantól te is használhatod a HRC News alkalmazást.
          </Text>

          <Button width={100} height={40} onPress={finishOnboarding}>
            Indítás
          </Button>
        </View>

        <Image style={styles.image} source={Welcome7Image} />
      </SafeAreaView>
    </>
  );
});
