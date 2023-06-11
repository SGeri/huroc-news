import { Text, View } from "react-native";

export type InfoboxProps = {
  width?: number;
  height?: number;
  text: string;
};

export default function Infobox({ width, height, text }: InfoboxProps) {
  return (
    <View
      className="rounded-md border border-[#ffa500] p-1"
      style={{ width, height }}
    >
      <Text className="text-center text-xs text-white">{text}</Text>
    </View>
  );
}
