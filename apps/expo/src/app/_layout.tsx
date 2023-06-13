import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Tabs, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import days from "dayjs";
import HeaderRight from "../components/Header/HeaderRight";
import HeaderTitle from "../components/Header/HeaderTitle";
import { getItem } from "../lib/storage";
import { TRPCProvider } from "../utils/api";
import fonts from "../utils/fonts";

// Localization
days.locale("hu");

// todo rework
const hiddenRoutes = [
  "onboarding/basics",
  "onboarding/documents",
  "onboarding/notifications-picker",
  "onboarding/notifications",
  "onboarding/ready",
  "onboarding/service-status",
  "onboarding/welcome",
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
                color="#00FF00" // zöld #00FF00, sárga #ffa500, piros #FF0000
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
              key={route}
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
  );
};

export default RootLayout;
