import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider } from "@clerk/clerk-expo";
import HeaderRight from "../components/Header/HeaderRight";
import HeaderTitle from "../components/Header/HeaderTitle";
import { TRPCProvider } from "../utils/api";
import fonts from "../utils/fonts";
import { getItem } from "../utils/storage";
import tokenCache from "../utils/tokenCache";

const clerkPublishableKey = Constants.expoConfig?.extra
  ?.clerkPublishableKey as string;

const RootLayout = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts(fonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  const checkOnboarding = async () => {
    const isBoarded = Boolean(await getItem("onboarding-done"));

    if (!isBoarded) router.replace("/onboarding/welcome");
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <TRPCProvider>
        <SafeAreaProvider>
          <View className="hidden" onLayout={onLayoutRootView} />

          <Stack
            screenOptions={{
              headerShown: true,
              headerTitleAlign: "left",
              headerTitle: () => <HeaderTitle />,
              headerRight: () => <HeaderRight />,
            }}
          />
          <StatusBar />
        </SafeAreaProvider>
      </TRPCProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
