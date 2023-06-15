import { Text, TouchableOpacity, View } from "react-native";
import IconFA from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Fontisto";
import { useRouter } from "expo-router";
import Infobox from "~/components/Infobox";

const supportOptions = [
  {
    icon: "messenger",
    text: "Live Chat",
    link: "https://suport.com",
    info: "Általában 1 óra",
  },
  {
    icon: "email",
    text: "Email cím",
    link: "https://suport.com",
    info: "Általában 24 óra",
  },
];

export default function Support() {
  const router = useRouter();

  return (
    <View className="h-full w-full flex-1 bg-[#121212] p-8">
      <Text className="font-chairdrobe-rounded-bold mb-3 text-3xl text-white">
        Támogatás
      </Text>
      <Text className="font-noto-sans-regular mb-5 text-white">
        Ha valamilyen problémát tapasztalsz az alkalmazás használata közben,
        vedd fel velünk a kapcsolatot.
      </Text>

      <View className="mb-10">
        {supportOptions.map((option, index) => (
          <Category
            key={index}
            icon={option.icon}
            text={option.text}
            info={option.info}
            onPress={() => router.push(option.link)}
          />
        ))}
      </View>

      <Text className="font-noto-sans-regular mb-12 text-white">
        Kérjük, vedd figyelembe, hogy Live Chat szolgáltatásunk hétfőtől
        vasárnapig 8:00 - 18:00 között érhető el.
      </Text>
    </View>
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
        className="m-1 flex w-full flex-row items-center gap-1"
        onPress={onPress}
      >
        <View className="h-full w-[20%] items-center">
          <Icon style={{ margin: 10 }} name={icon} size={30} color="white" />
        </View>

        <Text className="font-noto-sans-bold text-white">{text}</Text>

        <IconFA name="external-link" size={15} color="white" />

        {info && <Infobox className="m-2" text={info} />}

        <IconFA
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
