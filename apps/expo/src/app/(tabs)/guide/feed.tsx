import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import Button from "~/components/Button";

export default function Feed() {
  const router = useRouter();

  return (
    <View className="h-full w-full flex-1 bg-[#121212] p-8">
      <Text className="font-chalet-comprime mb-3 text-3xl text-white">
        Tudnivalók a hírfolyamról
      </Text>
      <Text className="font-noto-sans-regular mb-5 text-white">
        A hírfolyam az a hely, ahol egy helyen láthatod az összes hírt. A
        legfelső kártyán az éppen kiemelt, legfontosabb hírt tekintheted meg,
        lejjebb görgetve pedig böngészhetsz a további hírek között.
      </Text>

      <Text className="font-noto-sans-regular mb-5 text-white">
        A kártyákra kattintva weboldalunkra navigálhatsz, közvetlenül a keresett
        hírre.
      </Text>

      <Text className="font-noto-sans-regular mb-5 text-white">
        Érdemes gyakran figyelned a hírfolyamot, hiszen az katuális Heti
        Frissítések mellett itt jelennek meg a hivatalos bejelentések is, de
        egyéb érdekességeket és cikkeket is találhatsz.
      </Text>

      <Button width="100%" height={60} onPress={() => router.push("/")}>
        Hírfolyam megtekintése
      </Button>
    </View>
  );
}
