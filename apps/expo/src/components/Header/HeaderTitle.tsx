import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

const HurocLogo = require("~/images/huroc_logo.png");

type HeaderTitleProps = {
  newsLink: string;
};

export default function HeaderTitle({
  newsLink = "https://huroc.com/hrc-news",
}: HeaderTitleProps) {
  return (
    <TouchableOpacity
      className="flex flex-row"
      activeOpacity={0.8}
      onPress={() => Linking.openURL(newsLink)}
    >
      <Image source={HurocLogo} className="mr-2 h-8 w-8" />
      <View className="flex justify-center">
        <Text className="font-chalet-comprime text-xl">HRC News</Text>
      </View>
    </TouchableOpacity>
  );
}
