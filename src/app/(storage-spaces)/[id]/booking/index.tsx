import {
    CheckoutForm,
    CheckoutFormRef,
} from "@/features/checkout/components/checkout-form.native";
import { BookingStorageInfoCard } from "@/features/checkout/components/checkout-storage-info-card";
import { PriceBreakDown } from "@/features/checkout/components/price-break-down";
import { TotalToPay } from "@/features/checkout/components/total-to-pay";
import { useStorageSpaceDetails } from "@/features/storage-space/hooks/useStorageSpace";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const brandBlue = "#0a7ea4";
const lightBorder = "#ECEDEE";
const mutedText = "#687076";

export default function BookingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading } = useStorageSpaceDetails(id);

  const formRef = useRef<CheckoutFormRef>(null);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={brandBlue} />
      </View>
    );
  }

  if (!data) return <Text>Space not found</Text>;

  const handleBottomBarConfirm = () => {
    if (!agreedToTerms || isSubmitting) return;

    if (formRef.current) {
      setIsSubmitting(true);
      formRef.current.requestSubmit();
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <BookingStorageInfoCard space={data} />

          <CheckoutForm ref={formRef} space={data} />

          <PriceBreakDown space={data} />

          <View style={styles.authTermsContainer}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
              activeOpacity={0.7}
              disabled={isSubmitting}
            >
              <View
                style={[
                  styles.checkbox,
                  agreedToTerms && styles.checkboxChecked,
                ]}
              >
                {agreedToTerms && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
              <Text style={styles.termsText}>
                I agree to the{" "}
                <Text style={styles.linkText}>Terms & Conditions</Text> and
                accept creating a secure account on Ur Own Storage using my
                booking details.
              </Text>
            </TouchableOpacity>

            {!isAuthenticated && (
              <View style={styles.loginOptionContainer}>
                <Text style={styles.loginPrompt}>
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text style={[styles.linkText, { fontWeight: "700" }]}>
                    Log In here
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomBar}>
        <TotalToPay
          price={data.amount}
          period={data.billingInterval}
          currencySymbol={data.currencySymbol}
        />

        <TouchableOpacity
          style={[
            styles.confirmButton,
            (!agreedToTerms || isSubmitting) && styles.disabledButton,
          ]}
          onPress={handleBottomBarConfirm}
          disabled={!agreedToTerms || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
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
    borderColor: lightBorder,
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
  checkboxChecked: { backgroundColor: brandBlue, borderColor: brandBlue },
  termsText: { flex: 1, fontSize: 14, color: "#334155", lineHeight: 20 },
  linkText: { color: brandBlue, textDecorationLine: "underline" },
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
