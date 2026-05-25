import { Stack } from 'expo-router';

export default function CheckoutLayout() {

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
        name="checkout" 
        options={{ 
          title: 'Checkout',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="success" 
        options={{ 
          title: 'Payment Successful',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="failure" 
        options={{ 
          title: 'Payment failed',
          headerShown: false,
        }} 
      />
    </Stack>
  );
}