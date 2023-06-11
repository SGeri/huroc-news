import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const HurocLogo = require("../../images/huroc_logo.png");

type HeaderTitleProps = {
  newsLink: string;
};

export default function HeaderTitle({
  newsLink = "https://huroc.com/hrc-news",
}: HeaderTitleProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="flex flex-row"
      activeOpacity={0.8}
      onPress={() =>
        /*Linking.openURL(newsLink)*/ router.push("/onboarding/welcome")
      }
    >
      <Image source={HurocLogo} className="mr-2 h-8 w-8" />
      <View className="flex justify-center">
        <Text className="font-chairdrobe-rounded-bold text-xl">HRC News</Text>
      </View>
    </TouchableOpacity>
  );
}
