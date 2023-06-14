import Icon from "react-native-vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import HeaderRight from "../../components/Header/HeaderRight";
import HeaderTitle from "../../components/Header/HeaderTitle";

const NEWS_LINK = "https://huroc.com/hrc-news";
const CONTACT_LINK = "https://m.me/hungarianrockstarclub";
const STATUS_LINK = "https://huroc.com/status";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "left",
        headerTitle: () => <HeaderTitle newsLink={NEWS_LINK} />,
        headerRight: () => (
          <HeaderRight
            color="#00FF00" // zöld #00FF00, sárga #ffa500, piros #FF0000
            contactLink={CONTACT_LINK}
            statusLink={STATUS_LINK}
          />
        ),

        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ffa500",
        tabBarInactiveTintColor: "#000",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="globe" size={25} color={focused ? "#ffa500" : "#000"} />
          ),
        }}
      />
      <Tabs.Screen
        name="status"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="wifi" size={25} color={focused ? "#ffa500" : "#000"} />
          ),
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="file-text-o"
              size={25}
              color={focused ? "#ffa500" : "#000"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="sliders"
              size={25}
              color={focused ? "#ffa500" : "#000"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
