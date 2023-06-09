import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const HurocLogo = require("../../images/huroc_logo.png");

// fix chairdroberoundedbold font

export default function HeaderTitle() {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{ display: "flex", flexDirection: "row" }}
      activeOpacity={0.8}
      onPress={() => {
        //Linking.openURL("https://huroc.com/hrc-news");
        router.push("/onboarding/welcome");
      }}
    >
      <Image
        source={HurocLogo}
        style={{ width: 30, height: 30, marginRight: 10 }}
      />
      <View style={{ display: "flex", justifyContent: "center" }}>
        <Text style={{ fontFamily: "ChairdrobeRoundedBold", fontSize: 20 }}>
          HRC News
        </Text>
      </View>
    </TouchableOpacity>
  );
}
