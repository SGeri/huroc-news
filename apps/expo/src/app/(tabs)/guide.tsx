import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import Infobox from "../../components/Infobox";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    width: "100%",
    height: "100%",
    flex: 1,
    padding: 30,
  },
  title: {
    textAlign: "left",
    fontFamily: "ChairdrobeRoundedBold",
    fontSize: 32,
    color: "white",
    marginBottom: 10,
  },
  description: {
    textAlign: "left",
    fontFamily: "NotoSansRegular",
    fontSize: 16,
    color: "white",
    marginBottom: 50,
  },
  image: {
    width: "100%",
    height: "50%",
  },

  categoryWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    margin: 5,
  },
  categoryIconWrapper: {
    width: "18%",
    height: "100%",
    alignItems: "center",
  },
  categoryIcon: {
    margin: 10,
  },
  categoryText: {
    fontFamily: "NotoSansBold",
    fontSize: 16,
    color: "white",
  },
  categoryArrow: {
    position: "absolute",
    right: "5%",
  },
});

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Útmutató</Text>
      <Text style={styles.description}>
        Ha szeretnél többet megtudni az alkalmazásról és a HRC News
        szolgáltatásairól, akkor jó helyen jársz. Böngéssz az alábbi menüpontok
        között!
      </Text>

      <Category
        icon="globe"
        text="Hírfolyam"
        onPress={() => router.push("/guide/feed")}
      />

      <Separator />

      <Category
        icon="wifi"
        text="Service Status"
        info="Új funkció"
        onPress={() => router.push("/guide/service-status")}
      />

      <Separator />

      <Category
        icon="file-text-o"
        text="Útmutató"
        onPress={() => router.push("/guide/guide")}
      />

      <Separator />

      <Category
        icon="sliders"
        text="Beállítások"
        onPress={() => router.push("/guide/settings")}
      />

      <Separator />
    </View>
  );
}

type CategoryProps = {
  icon: string;
  text: string;
  info?: string;
  onPress: () => void;
};

function Category({ icon, text, info, onPress }: CategoryProps) {
  return (
    <>
      <TouchableOpacity style={styles.categoryWrapper} onPress={onPress}>
        <View style={styles.categoryIconWrapper}>
          <Icon
            style={styles.categoryIcon}
            name={icon}
            size={30}
            color="white"
          />
        </View>

        <Text style={styles.categoryText}>{text}</Text>

        {info && <Infobox className="ml-4" text={info} />}

        <Icon
          style={styles.categoryArrow}
          name="chevron-right"
          size={15}
          color="white"
        />
      </TouchableOpacity>
    </>
  );
}

function Separator() {
  return (
    <View
      style={{
        width: "100%",
        height: 1,
        backgroundColor: "white",
      }}
    />
  );
}
