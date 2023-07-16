import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import dayjs from "dayjs";
import { type Category } from "@packages/db";
import { formatCategories } from "@packages/lib";
import { api } from "~/utils/api";
import Button from "~/components/Button";

export default function Home() {
  const scrollRef = useRef<ScrollView>();

  const [take, setTake] = useState(5);
  const {
    data,
    isLoading: loading,
    isFetching: fetching,
    refetch,
  } = api.posts.getPosts.useQuery(
    {
      take: take,
      skip: 0,
    },
    { keepPreviousData: true },
  );
  const { total, posts, pinned } = data || {};

  const handleLoadMoreClick = () => {
    if (loading) return;

    setTake((prev) => prev + 5);
  };

  const handleGoToTopClick = () => {
    if (!scrollRef.current) return;

    // @ts-ignore
    scrollRef.current.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleMoreNewsClick = () => {
    Linking.openURL("https://huroc.com/hrc-news/").catch((err) =>
      console.error(err),
    );
  };

  return (
    <>
      <TouchableOpacity
        className="absolute bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-md bg-black opacity-70"
        activeOpacity={0.8}
        onPress={handleGoToTopClick}
      >
        <Icon name="arrowup" size={28} color="#fff" />
      </TouchableOpacity>

      <ScrollView
        // @ts-ignore
        ref={scrollRef}
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
            {pinned && (
              <TouchableOpacity
                className="mb-4 h-96 w-full border-b border-[#ffffff80] bg-black"
                activeOpacity={0.8}
                onPress={() =>
                  Linking.openURL(pinned.link).catch((err) =>
                    console.error(err),
                  )
                }
              >
                <Image
                  className="h-[60%] w-full"
                  source={{ uri: pinned.image }}
                  alt={pinned.title}
                />
                <View className="flex h-[40%] flex-col justify-center p-8">
                  <View className="flex flex-row">
                    <Text className="font-noto-sans-regular text-sm text-white">
                      {formatCategories(pinned.category).join(", ")}
                      {" | "}
                    </Text>
                    <Text className="font-noto-sans-regular text-sm text-[#808080]">
                      {dayjs(pinned.createdAt).format("YYYY. MMMM DD.")}
                    </Text>
                  </View>
                  <Text className="font-noto-sans-bold text-xl text-white">
                    {pinned.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            <View className="p-8">
              {posts &&
                posts.length > 0 &&
                posts.map((post, index) => {
                  if (post.pinned) return null;

                  return (
                    <Card
                      key={index}
                      title={post.title}
                      image={post.image}
                      category={post.category}
                      timestamp={post.createdAt}
                      link={post.link}
                    />
                  );
                })}

              {total != (posts || []).length && (
                <>
                  {!loading && fetching && (
                    <ActivityIndicator
                      size="large"
                      color="#ffa500"
                      style={{ marginBottom: 20 }}
                    />
                  )}

                  <Button
                    width="100%"
                    height={60}
                    onPress={handleLoadMoreClick}
                  >
                    Több betöltése
                  </Button>
                </>
              )}

              {posts && total === posts.length && (
                <>
                  <Text className="font-noto-sans-bold mb-8 mt-4 text-center text-lg text-white">
                    Még több hírt szeretnél látni? Látogass el weboldalunkra
                    további tartalmakért!
                  </Text>
                  <Button
                    width="100%"
                    height={60}
                    onPress={handleMoreNewsClick}
                  >
                    További hírek
                  </Button>
                </>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
}

type CardProps = {
  title: string;
  image: string;
  category: Category[];
  timestamp: Date;
  link: string;
};

function Card({ title, image, category, timestamp, link }: CardProps) {
  return (
    <TouchableOpacity
      className="mb-5 h-80 w-full rounded-md border border-[#ffffff80] bg-black"
      activeOpacity={0.8}
      onPress={() => Linking.openURL(link).catch((err) => console.error(err))}
    >
      <Image
        source={{ uri: image }}
        className="h-[60%] w-full rounded-md"
        alt={title}
      />
      <View className="flex h-[40%] flex-col justify-center p-5">
        <View className="flex flex-row">
          <Text className="font-noto-sans-regular text-sm text-white">
            {formatCategories(category).join(", ")}
            {" | "}
          </Text>
          <Text className="font-noto-sans-regular text-sm text-[#808080]">
            {dayjs(timestamp).format("YYYY. MMMM DD.")}
          </Text>
        </View>
        <Text className="font-noto-sans-bold text-lg text-white">{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
