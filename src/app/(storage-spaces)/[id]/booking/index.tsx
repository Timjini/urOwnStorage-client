import { Theme } from "@/constants/theme";
import {
  CheckoutForm,
  CheckoutFormRef,
} from "@/features/checkout/components/checkout-form";
import { BookingStorageInfoCard } from "@/features/checkout/components/checkout-storage-info-card";
import { useStorageSpaceDetails } from "@/features/storage-space/hooks/useStorageSpace";
import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function BookingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useStorageSpaceDetails(id);

  const formRef = useRef<CheckoutFormRef>(null);

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={Theme.colors.secondary} />
      </View>
    );
  }

  if (!data) return <Text>Space not found</Text>;

  return (
    <SafeAreaProvider>
      <BookingStorageInfoCard space={data} />
      <CheckoutForm ref={formRef} space={data} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { padding: 20, paddingBottom: 130 },
  authTermsContainer: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  checkboxRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#A0AEC0",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: Theme.colors.secondary,
    borderColor: Theme.colors.secondary,
  },
  termsText: { flex: 1, fontSize: 14, color: "#334155", lineHeight: 20 },
  linkText: { color: Theme.colors.secondary, textDecorationLine: "underline" },
  loginOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  loginPrompt: { fontSize: 14, color: Theme.colors.textMuted },
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
    borderTopColor: Theme.colors.border,
    paddingBottom: Platform.OS === "ios" ? 30 : 15,
  },
  confirmButton: {
    backgroundColor: Theme.colors.secondary,
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 12,
    minWidth: 150,
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#A0D1E1" },
  confirmButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 24,
    fontWeight: "800",
    color: Theme.colors.primary,
  },
  perMonth: {
    fontSize: 14,
    color: Theme.colors.textMuted,
    marginLeft: 2,
  },
  availability: {
    fontSize: 12,
    color: "#2E7D32",
    fontWeight: "600",
  },
  bookBtn: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
  },
  bookBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
