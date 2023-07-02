import { ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import Button from "~/components/Button";

export default function Settings() {
  const router = useRouter();

  return (
    <View className="h-full flex-1 gap-2 bg-[#121212] p-8">
      <ScrollView>
        <View className="flex flex-row items-center gap-2">
          <Icon name="gears" size={25} color="white" />
          <Text className="font-chairdrobe-rounded-bold mb-3 text-3xl text-white">
            Tudnivalók a beállításokról
          </Text>
        </View>

        <Text className="font-noto-sans-regular mb-3 text-white">
          A beállítások oldalon olyan hasznos szolgáltatásokat találhatsz, mint
          az értesési preferenciák módosítása, az alkalmazás témájának
          kiválasztása és sok más.
        </Text>

        <View className="flex flex-row items-center gap-2">
          <Icon name="bell-o" size={25} color="white" />
          <Text className="font-chairdrobe-rounded-bold mb-3 text-xl text-white">
            Értesítések
          </Text>
        </View>

        <Text className="font-noto-sans-regular mb-3 text-white">
          Bármikor módosíthatod, milyen értesítéseket szeretnél kapni. A
          legteljesebb élmény érdekében ajánljuk, hogy minden értesítés
          kategórát hagyj bekapcsolt állapotban.
        </Text>

        <View className="flex flex-row items-center gap-2">
          <Icon name="eye" size={25} color="white" />
          <Text className="font-chairdrobe-rounded-bold mb-3 text-xl text-white">
            Megjelenés
          </Text>
        </View>

        <Text className="font-noto-sans-regular mb-3 text-white">
          Beállíthatod, hogy sötét vagy világos témában jelenjen meg az
          alkalmazás.
        </Text>

        <View className="flex flex-row items-center gap-2">
          <Icon name="lock" size={25} color="white" />
          <Text className="font-chairdrobe-rounded-bold mb-3 text-xl text-white">
            Adatvédelem és biztonság
          </Text>
        </View>

        <Text className="font-noto-sans-regular mb-3 text-white">
          Lehetőséged van megtekinteni az Adatkezelési Tájékoztatónkat.
        </Text>

        <View className="flex flex-row items-center gap-2">
          <Icon name="headphones" size={25} color="white" />
          <Text className="font-chairdrobe-rounded-bold mb-3 text-xl text-white">
            Támogatás
          </Text>
        </View>

        <Text className="font-noto-sans-regular mb-3 text-white">
          Ha segítségre van szükséged az alkalmazás használatával vagy a
          Rockstar Games játékaival és szolgáltatásaival kapcsolatban, ezen az
          oldalon kaphatsz támogatást csapatunktól.
        </Text>

        <Text className="font-noto-sans-regular mb-1 text-white">
          Jelenleg a Live Chat és Email lehetőségek közül választhatsz. A
          Messenger Live Chat kizárólag napközben érhető el, és gyorsabb
          válaszadást biztosít, míg az Email lehetőség a nap 24 órájában
          rendelkezésedre áll. Live Chat esetében a várható válaszadási idő 1
          óra, Email esetében 24 óra.
        </Text>

        <View className="flex flex-row items-center gap-2">
          <Icon name="info" size={25} color="white" />
          <Text className="font-chairdrobe-rounded-bold mb-3 text-xl text-white">
            Az alkalmazásról
          </Text>
        </View>

        <Text className="font-noto-sans-regular mb-3 text-white">
          Ezen az oldalon van lehetőséged többet megtudni a HRC News
          alkalmazásról és a Hungarian Rockstar Club működéséről.
        </Text>

        <Text className="font-noto-sans-regular mb-3 text-white">
          Szintén itt tekintheted meg a HRC News Szolgáltatási és Használati
          Feltételeit, valamint követheted közösségi média csatornáinkat is.
        </Text>

        <Button
          width="100%"
          height={60}
          onPress={() => router.push("/settings")}
        >
          Beállítások megtekintése
        </Button>
      </ScrollView>
    </View>
  );
}
