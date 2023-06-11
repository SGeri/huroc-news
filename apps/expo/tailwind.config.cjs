/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@packages/tailwind-config")],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      "bebas-neue": ["BebasNeueRegular"],
      "chairdrobe-rounded-bold": ["ChairdrobeRoundedBold"],
      "noto-sans-italic": ["NotoSansItalic"],
      "noto-sans-bolditalic": ["NotoSansBoldItalic"],
      "noto-sans-bold": ["NotoSansBold"],
      "noto-sans-regular": ["NotoSansRegular"],
    },
  },
};
