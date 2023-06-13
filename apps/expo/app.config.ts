import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "expo",
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
      projectId: "your-project-id",
    },

    // Environment variables for the app
    // Usage: Constants.expoConfig.extra.<ENVIRONMENT_VARIABLE>
    clerkPublishableKey: process.env
      .NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string,

    SERVER_URL: process.env.SERVER_URL as string,

    production: {},
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
