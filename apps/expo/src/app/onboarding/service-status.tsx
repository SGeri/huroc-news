import { Image, Text, View } from "react-native";
import Button from "~/components/Button";
import ProgressBar from "~/components/ProgressBar";
import Welcome5Image from "~/images/welcome5.png";
import useOnboarding from "~/lib/useOnboarding";

export default function ServiceStatus() {
  const { progress, next } = useOnboarding(4);

  return (
    <>
      <ProgressBar progress={progress} />

      <View className="h-full w-full flex-1 bg-[#121212]">
        <View className="w-full items-center justify-between p-8">
          <Text className="font-chalet-comprime mb-3 text-center text-3xl text-white">
            Service Status
          </Text>
          <Text className="font-noto-sans-regular mb-12 text-center text-base text-white">
            Ha szeretnéd tudni a GTA Online, Red Dead Online, Rockstar Games
            Launcher vagy Social Club szervereinek állapotát, csak keresd a
            Wi-Fi ikont az alkalmazásban.
          </Text>

          <Button width={100} height={40} onPress={next}>
            Tovább
          </Button>
        </View>

        <Image
          className="absolute bottom-0 h-[60%] w-full"
          source={Welcome5Image}
        />
      </View>
    </>
  );
}
