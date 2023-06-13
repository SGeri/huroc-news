import { Image, Text, View } from "react-native";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import Welcome7Image from "../../images/welcome7.png";
import useOnboarding from "../../lib/useOnboarding";

export default function Ready() {
  const { progress, next } = useOnboarding(6);

  return (
    <>
      <ProgressBar progress={progress} />

      <View className="h-full w-full flex-1 bg-[#121212]">
        <View className="w-full items-center justify-center p-8">
          <Text className="font-chairdrobe-rounded-bold mb-3 text-center text-3xl text-white">
            Készen is vagyunk!
          </Text>
          <Text className="font-noto-sans-regular mb-12 text-center text-base text-white">
            Elkészültél! Mostantól te is használhatod a HRC News alkalmazást.
          </Text>

          <Button width={100} height={40} onPress={next}>
            Indítás
          </Button>
        </View>

        <Image
          className="absolute bottom-0 left-0 aspect-square h-[50%] min-h-[200] w-full"
          source={Welcome7Image}
        />
      </View>
    </>
  );
}
