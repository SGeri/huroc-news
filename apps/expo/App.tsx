import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#00FF00" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),

  warn: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#FFA500",
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#FF0000",
      }}
    />
  ),
};

// Must be exported or Fast Refresh won't update the context
export default function App() {
  const ctx = require.context("./src/app");

  return (
    <>
      {/* @ts-ignore*/}
      <ExpoRoot context={ctx} />
      <Toast config={toastConfig} />
    </>
  );
}

registerRootComponent(App);
