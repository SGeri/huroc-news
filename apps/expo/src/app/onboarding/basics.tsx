import { Image, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import Welcome2Image from "../../images/welcome2.png";

export default function Basics() {
  const router = useRouter();

  return (
    <>
      <ProgressBar progress={(100 / 7) * 2} />

      <View className="h-full w-full flex-1 justify-between bg-[#121212]">
        <View className="h-[50%] w-full items-center justify-center p-8">
          <Text className="font-chairdrobe-rounded-bold mb-3 text-center text-3xl text-white">
            Alapok
          </Text>
          <Text className="font-noto-sans-regular mb-12 text-center text-base text-white">
            A HRC News segítségével elsőként értesülhetsz minden GTA, RDR és
            Rockstar Games hírről, és gyorsan ellenőrizheted a szerverek
            állapotát is.
          </Text>

          <Button
            width={100}
            height={40}
            onPress={() => router.push("/onboarding/notifications")}
          >
            Tovább
          </Button>
        </View>

        <Image className="h-[50%] w-full" source={Welcome2Image} />
      </View>
    </>
  );
}
