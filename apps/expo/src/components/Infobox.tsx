import { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#ffa500",
    borderRadius: 5,
    backgroundColor: "#000000",

    justifyContent: "center",
    alignItems: "center",

    padding: 5,
  },
  text: {
    color: "white",
    fontFamily: "NotoSansBold",
    textAlign: "center",
    fontSize: 12,
  },
});

type Style = ComponentProps<typeof View>["style"];

export type InfoboxProps = {
  width?: number;
  height?: number;
  style?: Style;
  text: string;
};

export default function Infobox({ width, height, style, text }: InfoboxProps) {
  return (
    <View style={[styles.button, { width: width, height: height }, style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
