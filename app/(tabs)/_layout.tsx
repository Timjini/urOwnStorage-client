import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DashboardHeader } from "@/components/DashboardHeader";
import { HapticTab } from "@/components/haptic-tab";
import { LocationBanner } from "@/components/LocationBanner";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Theme } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Feather from '@expo/vector-icons/Feather';


export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.topSection, { paddingTop: insets.top }]}>
        <LocationBanner />
        <DashboardHeader />
      </View>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Theme.colors.primary,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            backgroundColor: Theme.colors.background,
            borderTopColor: Theme.colors.border,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search-booking"
          options={{
            title: "Booking",
            tabBarIcon: ({ color }) => (
              <Feather size={28} name="search" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: "Messages",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="message.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            href: null, 
          }}
        />

        <Tabs.Screen
          name="storage-space"
          options={{
            href: null, 
          }}
        />

      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topSection: {
    backgroundColor: "#C83803",
  },
});
