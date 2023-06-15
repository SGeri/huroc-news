import { Text, View } from "react-native";
import clsx from "clsx";

export type InfoboxProps = {
  width?: number;
  height?: number;
  text: string;
  className?: string;
};

export default function Infobox({
  width,
  height,
  text,
  className,
}: InfoboxProps) {
  return (
    <View
      className={clsx("m-2 rounded-md border border-[#ffa500] p-1", className)}
      style={{ width, height }}
    >
      <Text className="text-center text-xs text-white">{text}</Text>
    </View>
  );
}
