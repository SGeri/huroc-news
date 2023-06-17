import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "HRC News",
  slug: "huroc-news",
  scheme: "hrcnews",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/logo_filled.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
  },
  owner: "hurocdev",
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "news.huroc.com",
  },
  android: {
    package: "news.huroc.com",
    adaptiveIcon: {
      foregroundImage: "./assets/logo.png",
      backgroundColor: "#1F104A",
    },
  },
  extra: {
    eas: {
      projectId: "de3da78e-ba2d-49c4-98fc-4223b40005dc",
    },
  },
  //updates: {
  //  fallbackToCacheTimeout: 0,
  //  url: "https://u.expo.dev/de3da78e-ba2d-49c4-98fc-4223b40005dc",
  //},
  runtimeVersion: {
    policy: "sdkVersion",
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
