import { Text, View } from "react-native";
import { CheckBox, CheckBoxProps } from "react-native-elements";

export type CheckboxProps = {
  text: string;
} & CheckBoxProps;

export default function Checkbox({ text, ...checkBoxProps }: CheckboxProps) {
  return (
    <View className="flex w-full flex-row items-center">
      <CheckBox checkedColor="#ffa500" {...checkBoxProps} />
      <Text className="text-base text-white">{text}</Text>
    </View>
  );
}
