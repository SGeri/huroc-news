import { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import ProgressBar from "../../components/ProgressBar";
import Welcome6Image from "../../images/welcome6.png";
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
    height: "65%",
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
    height: "35%",
  },
});

export default keepParams(function Documents() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [TOU, setTOU] = useState(false);
  const [TOS, setTOS] = useState(false);
  const [TOP, setTOP] = useState(false);

  const next = () => {
    if (TOU && TOS && TOP) {
      router.push({
        pathname: "/onboarding/ready",
        params,
      });
    } else {
      Alert.alert(
        "Fontos dokumentumok",
        "Kérjük, fogadd el az összes dokumentumot!",
      );
    }
  };

  return (
    <>
      <ProgressBar progress={(100 / 7) * 6} />

      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Fontos dokumentumok</Text>
          <Text style={styles.description}>
            Az alkalmazás használatához el kell fogadnod a HRC News Használati
            Feltételeit, Szolgáltatási Feltételeinket és az Adatkezelési
            Tájékoztatónkban foglaltakat.
          </Text>

          <Checkbox
            text="Használati Feltételeink"
            checked={TOU}
            onPress={() => setTOU(!TOU)}
          />

          <Separator />

          <Checkbox
            text="Szolgáltatási Feltételeink"
            checked={TOS}
            onPress={() => setTOS(!TOS)}
          />

          <Separator />

          <Checkbox
            text="Adatkezelési Tájékoztatónk"
            checked={TOP}
            onPress={() => setTOP(!TOP)}
          />

          <Separator />

          <View style={{ marginBottom: 50 }} />

          <Button width={100} height={40} onPress={next}>
            Tovább
          </Button>
        </View>

        <Image style={styles.image} source={Welcome6Image} />
      </SafeAreaView>
    </>
  );
});

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
