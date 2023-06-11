import { View } from "react-native";

export type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <View className="h-1 w-full bg-black">
      <View className="h-full bg-[#ffa500]" style={{ width: `${progress}%` }} />
    </View>
  );
}
