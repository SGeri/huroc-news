import { type ComponentProps } from "react";
import { Linking, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFontisto from "react-native-vector-icons/Fontisto";

type Color = ComponentProps<typeof Icon>["color"];

type HeaderRightProps = {
  color: Color;
  contactLink: string;
  statusLink: string;
};

export default function HeaderRight({
  color,
  contactLink = "https://m.me/hungarianrockstarclub",
  statusLink = "https://huroc.com/status",
}: HeaderRightProps) {
  return (
    <View className="mr-4 flex flex-row">
      <IconFontisto
        name="messenger"
        size={25}
        color="white"
        style={{ marginRight: 4 }}
        onPress={() => {
          Linking.openURL(contactLink);
        }}
      />

      <Icon
        name="wifi"
        size={25}
        color={color}
        onPress={() => {
          Linking.openURL(statusLink);
        }}
      />
    </View>
  );
}
