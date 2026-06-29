import { AuthSessionForm } from "@/features/auth/login-as-storage-user/ui/form";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const brandBlue = "#0a7ea4";
const lightBorder = "#ECEDEE";
const mutedText = "#687076";

export default function LoginScreen() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1, padding: 24 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginBottom: 30 }}
          >
            <Ionicons name="arrow-back" size={24} color="#151718" />
          </TouchableOpacity>

          <View style={{ marginBottom: 40 }}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "800",
                color: "#151718",
                marginBottom: 8,
              }}
            >
              Welcome Back
            </Text>
            <Text style={{ fontSize: 16, color: "#687076" }}>
              Sign in to your account.
            </Text>
          </View>

          <AuthSessionForm />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#687076" }}>Already have an account? </Text>
            {/* <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={{ color: '#C83803', fontWeight: '700' }}>Log In</Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
