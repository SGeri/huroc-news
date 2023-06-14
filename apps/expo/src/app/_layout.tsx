import React, { useCallback, useLayoutEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useNavigationContainerRef } from "@react-navigation/native";
import days from "dayjs";
import { getItem } from "../lib/storage";
import { TRPCProvider } from "../utils/api";
import fonts from "../utils/fonts";

// Localization
days.locale("hu");

const RootLayout = () => {
  const router = useRouter();
  const navigationRef = useNavigationContainerRef();
  const [fontsLoaded] = useFonts(fonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  const checkOnboarding = async () => {
    if (!navigationRef.isReady()) return;

    try {
      const isBoarded = await getItem("onboarding-done");

      console.log("isBoarded", isBoarded);

      if (!isBoarded) return router.replace("onboarding/welcome");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Hiba történt",
        text2: String(error),
      });
    }
  };

  useLayoutEffect(() => {
    checkOnboarding();
  }, [router]);

  if (!fontsLoaded) return null;

  return (
    <TRPCProvider>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="onboarding" />
        </Stack>

        <StatusBar />
      </SafeAreaProvider>
    </TRPCProvider>
  );
};

export default RootLayout;
