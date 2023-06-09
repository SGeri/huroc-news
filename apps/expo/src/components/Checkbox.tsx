import { StyleSheet, Text, View } from "react-native";
import { CheckBox, CheckBoxProps } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontFamily: "NotoSansBold",
    fontSize: 14,
    color: "white",
  },
});

export type CheckboxProps = {
  text: string;
} & CheckBoxProps;

export default function Checkbox({ text, ...props }: CheckboxProps) {
  return (
    <View style={[styles.container, props.style]}>
      <CheckBox checkedColor="#ffa500" {...props} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
