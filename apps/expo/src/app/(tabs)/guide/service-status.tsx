import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import Button from "../../../components/Button";

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
    <View className="h-full w-full flex-1 bg-[#121212] p-8">
      <Text className="font-chairdrobe-rounded-bold mb-3 text-3xl text-white">
        Tudnivalók a Service Status-ról
      </Text>
      <Text className="font-noto-sans-regular mb-2 text-white">
        A Service Status az a hely, ahol mindig láthatod a Rockstar Games
        szervereinek állapotát.
      </Text>

      <Text className="font-noto-sans-regular mb-2 text-white">
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

      <Text className="font-noto-sans-regular mb-5 text-white">
        A Service Status oldal tetején jelennek meg az aktuális közlemények is,
        ha éppen vannak. Ilyen lehet például egy tervezett karbantartás.
      </Text>

      <Text className="font-noto-sans-regular mb-5 text-white">
        A Service Status oldal tetején jelennek meg az aktuális közlemények is,
        ha éppen vannak. Ilyen lehet például egy tervezett karbantartás.
      </Text>

      <Button width="100%" height={60} onPress={() => router.push("status")}>
        Service Status megtekintése
      </Button>
    </View>
  );
}
