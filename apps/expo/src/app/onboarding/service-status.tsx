import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import Welcome5Image from "../../images/welcome5.png";
import { keepParams } from "../../lib/params";

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

export default keepParams(function ServiceStatus({ navigate }) {
  return (
    <>
      <ProgressBar progress={(100 / 7) * 5} />

      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Service Status</Text>
          <Text style={styles.description}>
            Ha szeretnéd tudni a GTA Online, Red Dead Online, Rockstar Games
            Launcher vagy Social Club szervereinek állapotát, csak keresd a Wifi
            ikont az alkalmazásban.
          </Text>

          <Button
            width={100}
            height={40}
            onPress={() => navigate("/onboarding/documents")}
          >
            Tovább
          </Button>
        </View>

        <Image style={styles.image} source={Welcome5Image} />
      </SafeAreaView>
    </>
  );
});
