import Toast from "react-native-toast-message";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

// Must be exported or Fast Refresh won't update the context
export default function App() {
  const ctx = require.context("./src/app");

  return (
    <>
      <ExpoRoot context={ctx} />
      <Toast />
    </>
  );
}

registerRootComponent(App);
