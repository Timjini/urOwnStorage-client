import {
  AuthForm
} from "@/features/auth/register-as-storage-user/ui/form";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const brandBlue = "#0a7ea4";
const lightBorder = "#ECEDEE";
const mutedText = "#687076";

export default function RegisterScreen() {
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
              Create Account
            </Text>
            <Text style={{ fontSize: 16, color: "#687076" }}>
              Join the community to find storage space
            </Text>
          </View>

          <AuthForm />

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

const styles = StyleSheet.create({
  loginOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: lightBorder,
  },
  loginPrompt: { fontSize: 14, color: mutedText },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: lightBorder,
    paddingBottom: Platform.OS === "ios" ? 30 : 15,
  },
  confirmButton: {
    backgroundColor: brandBlue,
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 12,
    minWidth: 150,
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#A0D1E1" },
  confirmButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
