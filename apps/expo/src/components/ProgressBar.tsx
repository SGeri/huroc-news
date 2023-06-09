import { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 5,
    backgroundColor: "black",
  },
  progress: {
    height: "100%",
    backgroundColor: "#ffa500",
  },
});

type Style = ComponentProps<typeof View>["style"];

export type ProgressBarProps = {
  style?: Style;
  className?: string;
  progress: number;
};

export default function ProgressBar({
  style,
  className,
  progress,
}: ProgressBarProps) {
  return (
    <View style={[styles.container, style]} className={className}>
      <View style={[styles.progress, { width: `${progress}%` }]} />
    </View>
  );
}
