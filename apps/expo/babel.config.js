module.exports = function (api) {
  api.cache(true);

  // Make Expo Router run from `src/app` instead of `app`
  process.env.EXPO_ROUTER_APP_ROOT = "../../apps/expo/src/app";

  // fix module resolver for ts paths
  return {
    plugins: [
      "nativewind/babel",
      require.resolve("expo-router/babel"),
      [
        "module-resolver",
        {
          alias: {
            "~": "./src",
          },
        },
      ],
    ],
    presets: ["babel-preset-expo"],
  };
};
