import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import Button from "~/components/Button";
import Infobox from "~/components/Infobox";

const documents = [
  {
    icon: "lock",
    text: "Használati Feltételek",
    link: "https://suport.com",
  },
  {
    icon: "lock",
    text: "Szolgáltatási Feltételek",
    link: "https://suport.com",
  },
  {
    icon: "lock",
    text: "Adatkezelési Feltételek",
    link: "https://suport.com",
  },
];

export default function Privacy() {
  const router = useRouter();

  return (
    <ScrollView className="bg-[#121212]">
      <View className="h-full w-full flex-1 bg-[#121212] p-8">
        <Text className="font-chalet-comprime mb-3 text-3xl text-white">
          Adatvédelem és biztonság
        </Text>

        <Text className="font-noto-sans-regular mb-5 text-white">
          Ismerd meg adatkezelésünk módját. Adataid védelme kiemelt számunkra,
          ezért semmilyen személyes adatokat nem osztunk meg harmadik féllel a
          hozzájárulásod nélkül.
        </Text>

        <View className="mb-10">
          <Category
            icon="lock"
            text="Adatkezelési Tájékoztató"
            onPress={() => router.push("https://huroc.com/privacy")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

type CategoryProps = {
  icon: string;
  text: string;
  info?: string;
  onPress: () => void;
};

function Category({ icon, text, info, onPress }: CategoryProps) {
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
          name="external-link"
          size={15}
          color="white"
          style={{ marginLeft: 5 }}
        />

        {info && <Infobox className="m-2" text={info} />}

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
