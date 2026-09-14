import { useTheme } from "@/providers/ThemeProvider";
import { FontAwesome6 as Fa } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

const TabsLayout = () => {
  const { colors } = useTheme();

  if (Platform.OS === "ios") {
    return (
      <NativeTabs tintColor={colors.primary}>
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{ default: "house", selected: "house.fill" }}
            md="home"
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="quran">
          <NativeTabs.Trigger.Label>Quran</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{ default: "book.closed", selected: "book.closed.fill" }}
            md="menu_book"
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="qibla">
          <NativeTabs.Trigger.Label>Qibla</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{ default: "location.north", selected: "location.north.fill" }}
            md="explore"
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="mosques">
          <NativeTabs.Trigger.Label>Mosques</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{ default: "mappin", selected: "mappin.and.ellipse" }}
            md="location_on"
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
          <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{ default: "gearshape", selected: "gearshape.fill" }}
            md="settings"
          />
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  } else {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.mutedForeground,

          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
          },

          tabBarLabelStyle: {
            fontFamily: "sans-medium",
            fontSize: 11,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Fa name="mosque" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="quran"
          options={{
            title: "Quran",
            tabBarIcon: ({ color, size }) => (
              <Fa name="book-quran" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="qibla"
          options={{
            title: "Qibla",
            tabBarIcon: ({ color, size }) => (
              <Fa name="compass" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="mosques"
          options={{
            title: "Mosques",
            tabBarIcon: ({ color, size }) => (
              <Fa name="location-dot" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Fa name="gear" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    );
  }
};

export default TabsLayout;
