import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
import StripeProvider from "./app-stripe-provider";
import QueryProvider from "./queryProvider";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <StripeProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <QueryProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="(tabs)"
                options={{ title: "Home", headerShown: false }}
              />
              <Stack.Screen
                name="(storage-spaces)"
                options={{ title: "Storage Space" }}
              />
              <Stack.Screen name="(booking)" options={{ title: "Booking" }} />
              <Stack.Screen name="(checkout)" options={{ title: "Checkout" }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
            </Stack>
          </QueryProvider>
        </SafeAreaProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </StripeProvider>
  );
}
