import { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";
import clsx from "clsx";

export type ButtonProps = {
  width: number | string;
  height: number | string;
  className?: string;
  onPress: () => void;
  children: ReactNode;
};

export default function Button({
  width,
  height,
  className,
  onPress,
  children,
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={clsx(
        className,
        "flex items-center justify-center rounded-md border border-white bg-black p-1",
      )}
      style={{ width, height }}
      onPress={onPress}
    >
      <Text className="font-bebas-neue text-center text-xl text-white">
        {children}
      </Text>
    </TouchableOpacity>
  );
}
