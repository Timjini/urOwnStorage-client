import { Stack } from "expo-router";

export default function LeaseLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#151718",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
