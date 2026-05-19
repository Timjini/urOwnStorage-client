import { Stack } from "expo-router";

export default function BookingLayout() {
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
        name="booking-confirmation"
        options={{
          title: "Booking Confirmation",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="booking-payment"
        options={{
          title: "Booking Payment",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
