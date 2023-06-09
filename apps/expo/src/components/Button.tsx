import { ComponentProps, ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    backgroundColor: "#000000",

    justifyContent: "center",
    alignItems: "center",

    padding: 5,
  },
  text: {
    color: "white",
    fontFamily: "ChairdrobeRoundedBold",
    textAlign: "center",
    fontSize: 22,
  },
});

type Style = ComponentProps<typeof TouchableOpacity>["style"];

export type ButtonProps = {
  width: number;
  height: number;
  style?: Style;
  className?: string;
  onPress: () => void;
  children: ReactNode;
};

export default function Button({
  width,
  height,
  style,
  className,
  onPress,
  children,
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={className}
      style={[styles.button, { width: width, height: height }, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}
