import { Stack } from 'expo-router';

export default function StorageSpaceLayout() {
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
        name="index" 
        options={{ 
          title: 'Storage Spaces',
          headerShown: false,
        }} 
      />

      <Stack.Screen 
        name="[id]/index" 
        options={{ 
          title: 'Storage Space Details',
          headerShown: false
        }} 
      />

      <Stack.Screen 
        name="[id]/booking/index" 
        options={{ 
          title: 'Book Space',
          headerShown: false
        }}
      />
    </Stack>
  );
}