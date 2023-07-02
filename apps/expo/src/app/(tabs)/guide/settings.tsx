import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Settings() {
  return (
    <View className="h-full w-full flex-1 gap-2 bg-[#121212] p-8">
      <View className="flex flex-row items-center gap-2">
        <Icon name="gears" size={25} color="white" />
        <Text className="font-chalet-comprime mb-3 text-3xl text-white">
          Tudnivalók a beállításokról
        </Text>
      </View>

      <Text className="font-noto-sans-regular mb-2 text-white">
        A beállítások oldalon olyan hasznos szolgáltatásokat találhatsz, mint az
        értesési preferenciák módosítása, az alkalmazás témájának kiválasztása
        és sok más.
      </Text>

      <View className="flex flex-row items-center gap-2">
        <Icon name="bell-o" size={25} color="white" />
        <Text className="font-chalet-comprime mb-3 text-xl text-white">
          Értesítések
        </Text>
      </View>

      <Text className="font-noto-sans-regular mb-2 text-white">
        Bármikor módosíthatod, milyen értesítéseket szeretnél kapni. A
        legteljesebb élmény érdekében ajánljuk, hogy minden értesítés kategórát
        hagyj bekapcsolt állapotban.
      </Text>

      <View className="flex flex-row items-center gap-2">
        <Icon name="eye" size={25} color="white" />
        <Text className="font-chalet-comprime mb-3 text-xl text-white">
          Megjelenés
        </Text>
      </View>

      <Text className="font-noto-sans-regular mb-2 text-white">
        Beállíthatod, hogy sötét vagy világos témában jelenjen meg az
        alkalmazás.
      </Text>

      <View className="flex flex-row items-center gap-2">
        <Icon name="lock" size={25} color="white" />
        <Text className="font-chalet-comprime mb-3 text-xl text-white">
          Adatvédelem és biztonság
        </Text>
      </View>

      <Text className="font-noto-sans-regular mb-2 text-white">
        Lehetőséged van megtekinteni az Adatkezelési Tájékoztatónkat.
      </Text>
    </View>
  );
}
