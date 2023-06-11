import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import dayjs from "dayjs";
import { RouterOutputs, api } from "~/utils/api";

const statusColors = {
  UP: "#00FF00",
  LIMITED: "#FFA500",
  DOWN: "#FF0000",
} as const;

const statusTexts = {
  UP: "Elérhető / UP",
  LIMITED: "Korlátozott / Limited",
  DOWN: "Nem elérhető / Down",
};

type Status = keyof typeof statusColors;

function getHeader(status: RouterOutputs["status"]["getStatus"] | undefined) {
  if (!status) return { text: "", color: "" };

  let text = "Jelenleg minden szolgáltatás állapota: Elérhető / UP";
  let color = "#00ff00";

  Object.values(status).every((platform) =>
    Object.values(platform).forEach((status) => {
      if (status === "UP") return;

      if (status === "LIMITED") {
        text = "Néhány szolgáltatás állapota jelenleg: Korlátozott / Limited";
        color = "#ffa500";
        return;
      }

      if (status === "DOWN") {
        text = "Néhány szolgáltatás állapota jelenleg: Nem elérhető / Down";
        color = "#ff0000";
        return;
      }
    }),
  );

  return {
    text,
    color,
  };
}

export default function Page() {
  const {
    data: status,
    isLoading: loading,
    refetch,
  } = api.status.getStatus.useQuery();
  const header = getHeader(status);

  const messages: any[] = [];

  // todo implement messages
  const messageBoxes = messages.map((message, index) => {
    return (
      <View
        key={index}
        className="mb-5 w-full items-center justify-center rounded-md border border-white bg-black p-8"
      >
        <Text className="font-chairdrobe-rounded-bold mb-5 text-3xl text-white">
          Közlemény
        </Text>
        <Text className="font-noto-sans-regular text-center text-sm text-white">
          {message}
        </Text>
      </View>
    );
  });

  const now = dayjs(new Date()).format("YYYY. MM. DD. HH:mm");

  return (
    <ScrollView
      className="bg-[#121212]"
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
      }
    >
      {loading ? (
        <View className="h-full w-full p-10">
          <ActivityIndicator size="large" color="#ffa500" />
        </View>
      ) : (
        <>
          <View className="flex items-center px-10">
            <View className="my-10 flex items-center">
              <Text className="font-chairdrobe-rounded-bold whi text-5xl text-white">
                Rockstar Games
              </Text>
              <Text className="font-chairdrobe-rounded-bold whi text-5xl text-white">
                Service Status
              </Text>
            </View>

            <Icon name="wifi" size={40} color={header.color} />

            <Text
              className="font-noto-sans-bold mt-5 text-center text-lg text-white"
              style={{ color: header.color }}
            >
              {header.text}
            </Text>
            <Text className="font-noto-sans-regular mb-14 mt-2 text-center text-sm text-white">
              Utoljára frissítve: {now}
            </Text>

            {messages.length > 0 && (
              <View className="mb-16 w-full">{messageBoxes}</View>
            )}
          </View>
          <View className="flex items-center px-10">
            {status &&
              Object.keys(status).map((serviceName) => {
                const service = status[serviceName];

                if (!service) return;

                return (
                  <View className="mb-10 w-full rounded-md border border-white bg-black p-5">
                    <Text className="font-chairdrobe-rounded-bold mb-5 text-3xl text-white">
                      {serviceName}
                    </Text>

                    {Object.keys(service).map((platform) => {
                      const status = service[platform];

                      if (!status) return;

                      return (
                        <PlatformInfoBox
                          platform={platform}
                          status={status as unknown as Status}
                        />
                      );
                    })}
                  </View>
                );
              })}
          </View>

          <View className="flex items-baseline px-10">
            <Text className="font-chairdrobe-rounded-bold mb-5 text-3xl text-white">
              Mit jelent?
            </Text>
            <View className="mb-5">
              <View className="flex flex-row">
                <Icon
                  style={{ margin: 5 }}
                  name="circle"
                  size={15}
                  color="#00FF00"
                />
                <Text className="font-noto-sans-bold ml-1 text-lg text-[#00FF00]">
                  Elérhető / UP
                </Text>
              </View>
              <Text className="font-noto-sans-regular ml-7 text-sm text-white">
                Ebben az esetben a játékok, szolgáltatások probléma nélkül
                működnek.
              </Text>
            </View>
            <View className="mb-5">
              <View className="flex flex-row">
                <Icon
                  style={{ margin: 5 }}
                  name="circle"
                  size={15}
                  color="#FFA500"
                />
                <Text className="font-noto-sans-bold ml-1 text-lg text-[#FFA500]">
                  Korlátozott / Limited
                </Text>
              </View>
              <Text className="font-noto-sans-regular ml-7 text-sm text-white">
                Ebben az esetben az adott játék / szolgáltatás korlátozottan
                elérhető. Elképzelhető, hogy lehet csatlakozni az adott
                játékhoz, de súlyos hibák léphetnek fel. Az is előfordulhat,
                hogy nem kerül mentésre az előrehaladás vagy elvesznek a korábbi
                javak, tárgyak és egyéb tartalmak (szintek, pénz, járművek,
                ingatlanok). Az eltűnt tartalmak visszaállítása nem minden
                esetben lehetséges, ezért nem ajánlott ilyen esetben elindítani
                a játékokat, szolgáltatásokat.
              </Text>
            </View>
            <View className="mb-10">
              <View className="flex flex-row">
                <Icon
                  style={{ margin: 5 }}
                  name="circle"
                  size={15}
                  color="#FF0000"
                />
                <Text className="font-noto-sans-bold ml-1 text-lg text-[#FF0000]">
                  Nem elérhető / Down
                </Text>
              </View>
              <Text className="font-noto-sans-regular ml-7 text-sm text-white">
                Ebben az esetben az adott játék / szolgáltatás egyáltalán nem
                elérhető, csatlakozásra és/vagy vásárlásra nincs lehetőség.
              </Text>
            </View>
            <View className="mb-5 border-t-2 border-white pt-5">
              <Text className="font-noto-sans-bold ml-1 text-center text-sm text-gray-500">
                Az oldalon automatikusan frissülnek az adatok a Rockstar Games
                szervereinek állapota alapján, továbbá ugyanazt tartalmazzák,
                mint a Rockstar Games Service Status oldal. Az oldalt
                automatikus robot üzemelteti.
              </Text>
            </View>
            <View className="mb-5">
              <Text className="font-noto-sans-bold ml-1 text-center text-sm text-gray-500">
                Ezt az oldalt nem a Rockstar Games vagy a Take-Two Interactive
                üzemelteti. A huroc.com oldal nem hivatalos csatorna, a
                Hungarian Rockstar Fan Club pedig nem áll kapcsolatban sem a
                Rockstar Games, sem a Take-Two Interactive vállalatokkal.
              </Text>
            </View>
            <View className="mb-10">
              <Text className="font-noto-sans-bold ml-1 text-center text-sm text-gray-500">
                This page in unofficial and is not produced or maintained by
                Rockstar Games, Inc. or Take-Two Interactive Software, Inc.
                Please note that we are not affiliated with Rockstar Games and
                our company is fan-created.
              </Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

type PlatformInfoBoxProps = {
  status: Status;
  platform: string;
};

function PlatformInfoBox({ status, platform }: PlatformInfoBoxProps) {
  const color = statusColors[status];
  const text = statusTexts[status];

  return (
    <View className="mb-4">
      <View className="flex flex-row">
        <Icon style={{ margin: 5 }} name="circle" size={15} color={color} />
        <Text
          className="font-noto-sans-bold ml-1 text-lg text-white"
          style={{ color }}
        >
          {platform}
        </Text>
      </View>
      <Text className="font-noto-sans-bold ml-7 text-lg text-white">
        {text}
      </Text>
    </View>
  );
}
