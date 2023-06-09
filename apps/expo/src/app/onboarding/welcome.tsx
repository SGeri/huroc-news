import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import Welcome1Image from "../../images/welcome1.png";

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

export default function Welcome() {
  const router = useRouter();

  return (
    <>
      <ProgressBar progress={100 / 7} />

      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Üdv a HRC News-ban!</Text>
          <Text style={styles.description}>
            Köszönjük, hogy letöltötted a HRC News alkalmazást!
          </Text>

          <Button
            width={100}
            height={40}
            onPress={() => router.push("/onboarding/basics")}
          >
            Tovább
          </Button>
        </View>

        <Image style={styles.image} source={Welcome1Image} />
      </SafeAreaView>
    </>
  );
}
