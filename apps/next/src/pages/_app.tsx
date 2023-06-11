import "../styles/globals.css";
import type { AppType } from "next/app";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { api } from "~/utils/api";
import "dayjs/locale/hu";
import localFont from "next/font/local";
import { ModalsProvider } from "@mantine/modals";
import days from "dayjs";

// Localization
days.locale("hu");

// Fonts
const BebasNeue = localFont({
  src: [
    {
      path: "../fonts/BebasNeueRegular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--bebas-neue-font",
});

const ChairdrobeRounded = localFont({
  src: [
    {
      path: "../fonts/ChairdrobeRoundedBold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--chairdrobe-rounded-font",
});

const NotoSans = localFont({
  src: [
    {
      path: "../fonts/NotoSansRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/NotoSansItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/NotoSansBoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/NotoSansBold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--noto-sans-font",
});

const MyApp: AppType = ({ Component, pageProps }) => (
  <div
    className={`${BebasNeue.variable} ${ChairdrobeRounded.variable} ${NotoSans.variable}`}
  >
    <Head>
      <title>Authentication Playground</title>
      <meta name="description" content="Authentication Playground" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <ClerkProvider {...pageProps} appearance={{ baseTheme: dark }}>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{ colorScheme: "dark" }}
      >
        <ModalsProvider>
          <Notifications limit={5} />

          <main>
            <Component {...pageProps} />
          </main>
        </ModalsProvider>
      </MantineProvider>
    </ClerkProvider>
  </div>
);

export default api.withTRPC(MyApp);
