import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import Welcome7Image from "../../images/welcome7.png";
import { setItem } from "../../utils/storage";

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

export default function Ready() {
  const router = useRouter();

  const exitWelcome = async () => {
    try {
      await setItem("onboarding-done", true);
    } catch (e) {
      alert("Nem sikerült elmenteni az adatokat a háttértárba!");
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

          <Button width={100} height={40} onPress={exitWelcome}>
            Indítás
          </Button>
        </View>

        <Image style={styles.image} source={Welcome7Image} />
      </SafeAreaView>
    </>
  );
}
