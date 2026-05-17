import { Stack } from 'expo-router';

export default function AuthLayout() {

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#151718',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        animation: 'slide_from_right', 
      }}
    >
      <Stack.Screen 
        name="booking-confirmation" 
        options={{ 
          title: 'Booking Confirmation',
          headerShown: false,
        }} 
      />
    </Stack>
  );
}