/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.tsx"],
  // @ts-ignore
  presets: [require("@packages/tailwind-config")],
  theme: {
    fontFamily: {
      "bebas-neue": ["var(--bebas-neue-font)"],
      "chairdrobe-rounded": ["var(--chairdrobe-rounded-font)"],
      "noto-sans": ["var(--noto-sans-font)"],
    },
  },
};

module.exports = config;
