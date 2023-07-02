import React, { useCallback, useLayoutEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import dayjs from "dayjs";
import { TRPCProvider } from "~/utils/api";
import fonts from "~/utils/fonts";
import { getItem } from "~/lib/storage";
import "dayjs/locale/hu";
import * as Notifications from "expo-notifications";

// Localization
dayjs.locale("hu");

// Initialize notifications
Notifications.setNotificationHandler({
  // eslint-disable-next-line
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const router = useRouter();
  const [fontsLoaded] = useFonts(fonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  const checkOnboarding: () => Promise<void> = useCallback(async () => {
    // implement navigation initialiazed check

    try {
      const isBoarded = await getItem("onboarding-done");

      if (!isBoarded) return router.replace("onboarding/welcome");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Hiba történt",
        text2: String(error),
      });
    }
  }, [router]);

  useLayoutEffect(() => {
    checkOnboarding().catch((err) => console.error(err));
  }, [router, checkOnboarding]);

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
}
