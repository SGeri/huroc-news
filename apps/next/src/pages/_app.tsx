import "../styles/globals.css";
import type { AppType } from "next/app";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { api } from "~/utils/api";
import "dayjs/locale/hu";
import days from "dayjs";

days.locale("hu");

const MyApp: AppType = ({ Component, pageProps }) => (
  <>
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
        <Notifications limit={5} />

        <main>
          <Component {...pageProps} />
        </main>
      </MantineProvider>
    </ClerkProvider>
  </>
);

export default api.withTRPC(MyApp);
