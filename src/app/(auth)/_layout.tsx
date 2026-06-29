import { useAppStore } from "@/entities/auth/store/authStore";
import { Stack } from "expo-router";
// import { useAuth } from '@/context/AuthContext';

export default function AuthLayout() {
  const { auth } = useAppStore();

  console.log(auth);

  // let isLoading = false;
  // let user = {"name": "james hook"};

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
  //       <ActivityIndicator size="large" color="#0a7ea4" />
  //     </View>
  //   );
  // }

  // if (user) {
  //   return <Redirect href="/" />;
  // }

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
        name="login"
        options={{
          title: "Welcome Back",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Create Account",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
