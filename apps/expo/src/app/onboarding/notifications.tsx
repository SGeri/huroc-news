import { Image, Text, View } from "react-native";
import Button from "~/components/Button";
import ProgressBar from "~/components/ProgressBar";
import Welcome3Image from "~/images/welcome3.png";
import useOnboarding from "~/lib/useOnboarding";

export default function Notifications() {
  const { progress, next } = useOnboarding(2);

  return (
    <>
      <ProgressBar progress={progress} />

      <View className="h-full w-full flex-1 bg-[#121212]">
        <View className="w-full items-center justify-center p-8">
          <Text className="font-chairdrobe-rounded-bold mb-3 text-center text-3xl text-white">
            Értesítések
          </Text>
          <Text className="font-noto-sans-regular mb-12 text-center text-base text-white">
            Bármikor beállíthatsz értesítéseket azokhoz a hírekhez, amikre
            kíváncsi vagy. Emellett a Service Status változásokról is kérhetsz
            értesítéseket.
          </Text>

          <Button width={100} height={40} onPress={next}>
            Tovább
          </Button>
        </View>

        <Image
          className="absolute bottom-0 left-0 aspect-square h-[50%] min-h-[200] w-full"
          source={Welcome3Image}
        />
      </View>
    </>
  );
}
