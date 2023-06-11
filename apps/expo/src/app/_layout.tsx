import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { Tabs, useRouter } from "expo-router";
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

// todo rework
const hiddenRoutes = [
  "onboarding/basics",
  "onboarding/documents",
  "onboarding/notifications-picker",
  "onboarding/notifications",
  "onboarding/ready",
  "onboarding/service-status",
  "onboarding/welcome",
  "post/[id]",
  "prot",
  "sign-in",
  "_index",
];

const NEWS_LINK = "https://huroc.com/hrc-news";
const CONTACT_LINK = "https://m.me/hungarianrockstarclub";
const STATUS_LINK = "https://huroc.com/status";

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

          <Tabs
            screenOptions={{
              headerShown: true,
              headerTitleAlign: "left",
              headerTitle: () => <HeaderTitle newsLink={NEWS_LINK} />,
              headerRight: () => (
                <HeaderRight
                  color="green"
                  contactLink={CONTACT_LINK}
                  statusLink={STATUS_LINK}
                />
              ),

              tabBarShowLabel: false,
              tabBarActiveTintColor: "#ffa500",
              tabBarInactiveTintColor: "#000",
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                tabBarIcon: ({ focused }) => (
                  <Icon
                    name="globe"
                    size={25}
                    color={focused ? "#ffa500" : "#000"}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="status"
              options={{
                tabBarIcon: ({ focused }) => (
                  <Icon
                    name="wifi"
                    size={25}
                    color={focused ? "#ffa500" : "#000"}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="guide"
              options={{
                tabBarIcon: ({ focused }) => (
                  <Icon
                    name="file-text-o"
                    size={25}
                    color={focused ? "#ffa500" : "#000"}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                tabBarIcon: ({ focused }) => (
                  <Icon
                    name="sliders"
                    size={25}
                    color={focused ? "#ffa500" : "#000"}
                  />
                ),
              }}
            />

            {/* Hidden Routes */}
            {hiddenRoutes.map((route) => (
              <Tabs.Screen
                name={route}
                options={{
                  href: null,
                }}
              />
            ))}
          </Tabs>

          <StatusBar />
        </SafeAreaProvider>
      </TRPCProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
