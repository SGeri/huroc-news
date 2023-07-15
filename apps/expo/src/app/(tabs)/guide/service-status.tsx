import { ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import Button from "~/components/Button";

// // zöld #00FF00, sárga #FFA500, piros #FF0000
const icons = [
  {
    text: "Elérhető / UP",
    color: "#00FF00",
  },
  {
    text: "Korlátozott / Limited",
    color: "#FFA500",
  },
  {
    text: "Nem elérhető / Down",
    color: "#FF0000",
  },
];

export default function ServiceStatus() {
  const router = useRouter();

  return (
    <ScrollView className="h-full w-full flex-1 bg-[#121212] p-8">
      <Text className="font-chalet-comprime mb-3 text-3xl text-white">
        Tudnivalók a Service Status-ról
      </Text>
      <Text className="font-noto-sans-regular mb-5 text-white">
        A Service Status az a hely, ahol mindig láthatod a Rockstar Games
        szervereinek állapotát.
      </Text>

      <Text className="font-noto-sans-regular mb-5 text-white">
        Az ikon színe jelzi a Rockstar Games szervereinek aktuális állapotát.
      </Text>

      <View className="m-2">
        {icons.map((icon) => (
          <View key={icon.text} className="mb-2 flex flex-row gap-2">
            <Icon name="wifi" size={25} color={icon.color} />
            <Text className="font-noto-sans-bold text-white">{icon.text}</Text>
          </View>
        ))}
      </View>

      <Text className="font-noto-sans-regular mb-4 text-sm text-white">
        Ha nem tudsz csatlakozni a valamelyik játékhoz, vagy nem éred el
        valamelyik szolgáltatást, először érdemes megtekintened a Service Status
        oldalt, mert elképzelhető, hogy tervezett karbantartás vagy váratlan
        leállás történik.
      </Text>

      <View className="flex items-baseline">
        <Text className="font-chalet-comprime mb-5 text-3xl text-white">
          Mit jelent?
        </Text>
        <View className="mb-5">
          <View className="flex flex-row">
            <Icon
              style={{ margin: 5 }}
              name="circle"
              size={15}
              color="#00FF00"
            />
            <Text className="font-noto-sans-bold ml-1 text-lg text-[#00FF00]">
              Elérhető / UP
            </Text>
          </View>
          <Text className="font-noto-sans-regular ml-7 text-sm text-white">
            Ebben az esetben a játékok, szolgáltatások probléma nélkül működnek.
          </Text>
        </View>
        <View className="mb-5">
          <View className="flex flex-row">
            <Icon
              style={{ margin: 5 }}
              name="circle"
              size={15}
              color="#FFA500"
            />
            <Text className="font-noto-sans-bold ml-1 text-lg text-[#FFA500]">
              Korlátozott / Limited
            </Text>
          </View>
          <Text className="font-noto-sans-regular ml-7 text-sm text-white">
            Ebben az esetben az adott játék / szolgáltatás korlátozottan
            elérhető. Elképzelhető, hogy lehet csatlakozni az adott játékhoz, de
            súlyos hibák léphetnek fel. Az is előfordulhat, hogy nem kerül
            mentésre az előrehaladás vagy elvesznek a korábbi javak, tárgyak és
            egyéb tartalmak (szintek, pénz, járművek, ingatlanok). Az eltűnt
            tartalmak visszaállítása nem minden esetben lehetséges, ezért nem
            ajánlott ilyen esetben elindítani a játékokat, szolgáltatásokat.
          </Text>
        </View>
        <View className="mb-6">
          <View className="flex flex-row">
            <Icon
              style={{ margin: 5 }}
              name="circle"
              size={15}
              color="#FF0000"
            />
            <Text className="font-noto-sans-bold ml-1 text-lg text-[#FF0000]">
              Nem elérhető / Down
            </Text>
          </View>
          <Text className="font-noto-sans-regular ml-7 text-sm text-white">
            Ebben az esetben az adott játék / szolgáltatás egyáltalán nem
            elérhető, csatlakozásra és/vagy vásárlásra nincs lehetőség.
          </Text>
        </View>
      </View>

      <Button width="100%" height={60} onPress={() => router.push("status")}>
        Service Status megtekintése
      </Button>

      <View className="h-12" />
    </ScrollView>
  );
}
