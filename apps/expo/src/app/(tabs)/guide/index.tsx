import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import Infobox from "~/components/Infobox";

const guideOptions = [
  {
    icon: "globe",
    text: "Hírfolyam",
    route: "guide/feed",
  },
  {
    icon: "wifi",
    text: "Service Status",
    route: "guide/service-status",
  },
  {
    icon: "sliders",
    text: "Beállítások",
    route: "guide/settings",
  },
];

export default function Guide() {
  const router = useRouter();

  return (
    <View className="h-full w-full flex-1 bg-[#121212] p-8">
      <Text className="font-chalet-comprime mb-3 text-3xl text-white">
        Útmutató
      </Text>
      <Text className="font-noto-sans-regular mb-12 text-white">
        Ha szeretnél többet megtudni az alkalmazásról és a HRC News
        szolgáltatásairól, akkor jó helyen jársz. Böngéssz az alábbi menüpontok
        között!
      </Text>

      {guideOptions.map((option, index) => (
        <Category
          key={index}
          icon={option.icon}
          text={option.text}
          onPress={() => router.push(option.route)}
        />
      ))}
    </View>
  );
}

type CategoryProps = {
  icon: string;
  text: string;
  onPress: () => void;
};

function Category({ icon, text, onPress }: CategoryProps) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        className="m-1 flex w-full flex-row items-center"
        onPress={onPress}
      >
        <View className="h-full w-[20%] items-center">
          <Icon style={{ margin: 10 }} name={icon} size={30} color="white" />
        </View>

        <Text className="font-noto-sans-bold text-white">{text}</Text>

        <Icon
          style={{ position: "absolute", right: "5%" }}
          name="chevron-right"
          size={15}
          color="white"
        />
      </TouchableOpacity>

      <Separator />
    </>
  );
}

const Separator = () => <View className="h-[2] w-full bg-white" />;
