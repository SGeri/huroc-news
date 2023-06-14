import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "HRC News",
  slug: "hrc-news",
  scheme: "hrcnews",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/logo.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "white",
  },
  owner: "hurocdev",
  updates: {
    fallbackToCacheTimeout: 0,
  },
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
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
