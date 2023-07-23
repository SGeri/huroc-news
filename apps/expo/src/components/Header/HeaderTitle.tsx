import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

const HurocLogo = require("~/images/logo_trans_white.png");

type HeaderTitleProps = {
  newsLink: string;
};

export default function HeaderTitle({
  newsLink = "https://huroc.com/hrc-news",
}: HeaderTitleProps) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <TouchableOpacity
      className="flex flex-row"
      activeOpacity={0.8}
      onPress={() => Linking.openURL(newsLink)}
    >
      <Icon
        name="arrow-back"
        size={25}
        color="white"
        onPress={goBack}
        style={{ marginRight: 10 }}
      />

      <Image source={HurocLogo} className="mr-2 h-8 w-8" />
      <View className="flex justify-center">
        <Text className="font-chalet-comprime text-xl text-white">
          HRC News
        </Text>
      </View>
    </TouchableOpacity>
  );
}
