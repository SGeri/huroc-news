import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";

const settingsOptions = [
  {
    icon: "bell-o",
    text: "Értesítések",
    route: "settings/notifications",
  },
  {
    icon: "lock",
    text: "Adatvédelem és biztonság",
    route: "settings/privacy",
  },
  {
    icon: "headphones",
    text: "Támogatás",
    route: "settings/support",
  },
  {
    icon: "info",
    text: "Az alkalmazásról",
    route: "settings/about",
  },
];

const socials = [
  {
    icon: "facebook",
    text: "Facebook",
    link: "https://facebook.com/hungarianrockstarclub",
  },
  {
    icon: "instagram",
    text: "Instagram",
    link: "https://instagram.com/rockstarhungary",
  },
  {
    icon: "twitter",
    text: "Twitter",
    link: "https://twitter.com/rockstarhungary",
  },
  {
    icon: "youtube",
    text: "YouTube",
    link: "https://youtube.com/rockstarhungary",
  },
  {
    icon: "globe",
    text: "Weboldal",
    link: "https://huroc.com",
  },
];

export default function Settings() {
  const router = useRouter();

  return (
    <ScrollView className="bg-[#121212]">
      <View className="h-full w-full flex-1 gap-4 bg-[#121212] p-8">
        <Text className="font-chairdrobe-rounded-bold text-3xl text-white">
          Beállítások
        </Text>

        <View>
          {settingsOptions.map((option, index) => (
            <Category
              key={index}
              icon={option.icon}
              text={option.text}
              onPress={() => router.push(option.route)}
            />
          ))}
        </View>

        <View className="m-5 gap-[0.5]">
          {socials.map((social) => (
            <TouchableOpacity
              key={social.text}
              className="flex flex-row items-center gap-2"
            >
              <View className="h-8 w-8 items-center justify-center rounded-md border border-white bg-black">
                <Icon name={social.icon} size={18} color="white" />
              </View>

              <Text className="font-noto-sans-bold text-white">
                {social.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-6 flex items-center justify-center">
          <View className="h-20 w-72 items-center justify-center rounded-md border border-white bg-black text-center">
            <Text className="font-noto-sans-regular text-xs text-white">
              Copyright 2023 | Hungarian Rockstar Club
            </Text>
            <Text className="font-noto-sans-regular text-xs text-white">
              Minden jog fenntartva.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
