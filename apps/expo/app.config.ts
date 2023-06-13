import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "HRC News",
  slug: "expo",
  scheme: "expo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#1F104A",
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
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#1F104A",
    },
  },
  extra: {
    eas: {
      projectId: "de3da78e-ba2d-49c4-98fc-4223b40005dc",
    },

    // Environment variables for the app
    // Usage: Constants.expoConfig.extra.<ENVIRONMENT_VARIABLE>
    clerkPublishableKey: process.env
      .NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string,

    production: {},
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
