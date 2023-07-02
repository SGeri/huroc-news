import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import Infobox from "~/components/Infobox";

const documents = [
  {
    icon: "lock",
    text: "Használati Feltételek",
    link: "https://huroc.com/legal/terms-of-use",
  },
  {
    icon: "lock",
    text: "Szolgáltatási Feltételek",
    link: "https://huroc.com/legal",
  },
  {
    icon: "lock",
    text: "Adatkezelési Feltételek",
    link: "https://huroc.com/privacy",
  },
];

export default function About() {
  const router = useRouter();

  return (
    <ScrollView className="bg-[#121212]">
      <View className="h-full w-full flex-1 bg-[#121212] p-8">
        <Text className="font-chalet-comprime mb-3 text-3xl text-white">
          Az alkalmazásról
        </Text>

        <Text className="font-noto-sans-regular mb-5 text-white">
          A HRC News alkalmazást a Hungarian Rockstar Club üzemelteti.
        </Text>

        <Text className="font-noto-sans-regular mb-5 text-white">
          A HRC News alkalmazás nem hivatalos csatorna, és semmilyen
          kapcsolatban nem áll a Rockstar Games és/vagy Take-Two Interactive
          vállalatokkal. További információkért kérjük, tekintsd meg az ezzel
          kapcsolatos tájékoztatónkat.
        </Text>

        <View className="mb-10">
          <Category
            icon="info"
            text="Tájékoztató"
            onPress={() => router.push("https://huroc.com/notice")}
          />
        </View>

        <Text className="font-noto-sans-regular mb-5 text-white">
          A HRC news Használati Feltételeit, Szolgáltatási Feltételeinket és
          Adatakezelési Tájékoztatónkat megtekintheted az alábbi oldalakon
          keresztül.
        </Text>

        {documents.map((option, index) => (
          <Category
            key={index}
            icon={option.icon}
            text={option.text}
            onPress={() => router.push(option.link)}
          />
        ))}
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
