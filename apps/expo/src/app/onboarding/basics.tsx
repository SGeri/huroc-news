import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import Welcome2Image from "../../images/welcome2.png";

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

export default function Basics() {
  const router = useRouter();

  return (
    <>
      <ProgressBar progress={(100 / 7) * 2} />

      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Alapok</Text>
          <Text style={styles.description}>
            A HRC News segítségével elsőként értesülhetsz minden GTA, RDR és
            Rockstar Games hírről, és gyorsan ellenőrizheted a szerverek
            állapotát is.
          </Text>

          <Button
            width={100}
            height={40}
            onPress={() => router.push("/onboarding/notifications")}
          >
            Tovább
          </Button>
        </View>

        <Image style={styles.image} source={Welcome2Image} />
      </SafeAreaView>
    </>
  );
}
