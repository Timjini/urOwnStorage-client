import UniversalDatePicker from "@/components/booking/UniversalDatePicker";
import { Theme } from "@/constants/theme";
import { StorageSpace } from "@/entities/storage-space/model";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCreateCheckout } from "../hooks/useCheckout";
import { checkoutService } from "../services";
import { Checkout } from "../types";
import { CheckoutFormData, checkoutSchema } from "../validations";
import { PriceBreakDown } from "./price-break-down";

interface StorageSpaceProps {
  space: StorageSpace;
}

export interface CheckoutFormRef {
  requestSubmit: () => void;
  isFormPending: boolean;
}

export const CheckoutForm = forwardRef<CheckoutFormRef, StorageSpaceProps>(
  function CheckoutFormProps({ space }, ref) {
    const { mutate, isPending, isError, error } = useCreateCheckout();

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<CheckoutFormData>({
      resolver: zodResolver(checkoutSchema),
      defaultValues: {
        storageSpaceId: space.id,
        status: "NOT_STARTED",
        currency: space.currency,
        totalAmount: space.amount,
        serviceFee: 5,
        fullName: "",
        email: "",
        phone: "",
        itemType: "Boxes",
        instructions: "",
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        agreedToTerms: false,
      },
    });

    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [isAuthenticated] = useState(false);

    const totalPrice = checkoutService.getPriceWithFee(
      space.amount,
      space.leaseFee,
    );

    const onSubmit = (data: CheckoutFormData) => {
      const payload: Checkout = {
        storageSpaceId: Number(data.storageSpaceId),
        status: data.status,
        currency: data.currency,
        totalAmount: data.totalAmount,
        serviceFee: data.serviceFee,
        itemType: data.itemType,
        instructions: data.instructions || "",
        startDate: data.startDate,
        endDate: data.endDate,
        agreedToTerms: data.agreedToTerms,
        userData: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
        },
      };
      mutate(payload);
    };

    useImperativeHandle(ref, () => ({
      requestSubmit: () => handleSubmit(onSubmit)(),
      isFormPending: isPending,
    }));

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Select Dates</Text>
              <View style={styles.row}>
                <View>
                  <View style={styles.datePickerWrapper}>
                    <Controller
                      control={control}
                      name="startDate"
                      render={({ field: { onChange, value } }) => (
                        <UniversalDatePicker
                          label="START DATE"
                          date={value}
                          onChangeDate={onChange}
                        />
                      )}
                    />
                  </View>
                </View>
                <View>
                  <View style={styles.datePickerWrapper}>
                    <Controller
                      control={control}
                      name="endDate"
                      render={({ field: { onChange, value } }) => (
                        <UniversalDatePicker
                          label="END DATE"
                          date={value}
                          onChangeDate={onChange}
                        />
                      )}
                    />
                  </View>
                </View>
              </View>
              <View>
                <View>
                  {errors.startDate && (
                    <Text style={styles.errorText}>
                      {errors.startDate.message}
                    </Text>
                  )}
                </View>
                <View>
                  {errors.endDate && (
                    <Text style={styles.errorText}>
                      {errors.endDate.message}
                    </Text>
                  )}
                </View>
              </View>

              <Text style={styles.sectionTitle}>Your Details</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <Controller
                  control={control}
                  name="fullName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[
                        styles.input,
                        errors.fullName && styles.inputError,
                      ]}
                      placeholder="John Doe"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.fullName && (
                  <Text style={styles.errorText}>
                    {errors.fullName.message}
                  </Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.email && styles.inputError]}
                      placeholder="example@email.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone</Text>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.phone && styles.inputError]}
                      placeholder="+1 234 567 890"
                      keyboardType="phone-pad"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.phone && (
                  <Text style={styles.errorText}>{errors.phone.message}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Items to be stored</Text>
                <Controller
                  control={control}
                  name="itemType"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.selectRow}>
                      {(
                        ["Furniture", "Boxes", "Vehicle", "Other"] as const
                      ).map((item) => (
                        <TouchableOpacity
                          key={item}
                          style={[
                            styles.chip,
                            item === value && styles.activeChip,
                          ]}
                          onPress={() => onChange(item)}
                        >
                          <Text
                            style={[
                              styles.chipText,
                              item === value && styles.activeChipText,
                            ]}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Special Instructions (Optional)
                </Text>
                <Controller
                  control={control}
                  name="instructions"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      placeholder="e.g. Will need access on weekends..."
                      multiline
                      numberOfLines={4}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
              <PriceBreakDown space={space} />

              <View style={styles.authTermsContainer}>
                <Controller
                  control={control}
                  name="agreedToTerms"
                  render={({ field: { onChange, value } }) => (
                    <TouchableOpacity
                      style={styles.checkboxRow}
                      onPress={() => onChange(!value)}
                      activeOpacity={0.7}
                      disabled={isPending}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          value && styles.checkboxChecked,
                        ]}
                      >
                        {value && (
                          <Ionicons name="checkmark" size={16} color="#fff" />
                        )}
                      </View>
                      <Text style={styles.termsText}>
                        I agree to the{" "}
                        <Text style={styles.linkText}>Terms & Conditions</Text>{" "}
                        and accept creating a secure account on Ur Own Storage
                        using my booking details.
                      </Text>
                    </TouchableOpacity>
                  )}
                />

                {errors.agreedToTerms && (
                  <Text style={styles.errorText}>
                    {errors.agreedToTerms.message}
                  </Text>
                )}

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

              {isError && (
                <Text
                  style={[
                    styles.errorText,
                    { marginBottom: 15, textAlign: "center" },
                  ]}
                >
                  {error instanceof Error
                    ? error.message
                    : "Something went wrong!"}
                </Text>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View
          style={[
            styles.bottomBar,
            { paddingBottom: Math.max(insets.bottom, 16) },
          ]}
        >
          <View>
            <View style={styles.priceRow}>
              <Text style={styles.price}>
                {space.currencySymbol} {totalPrice}
              </Text>
              <Text style={styles.perMonth}>/ {space.billingInterval}</Text>
            </View>
            <Text style={styles.availability}>Available now</Text>
          </View>

          <TouchableOpacity
            style={styles.bookBtn}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.bookBtnText}>
              {isPending ? "Loading..." : "Reserve Space"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { padding: 20, paddingBottom: 130 },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
  error: {
    color: "red",
  },
  formContainer: { width: "100%", paddingHorizontal: 4 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#151718",
    marginBottom: 15,
    marginTop: 10,
  },
  row: { flexDirection: "row", gap: "20", marginBottom: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#151718", marginBottom: 8 },
  input: {
    backgroundColor: "#F5F7F9",
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  inputError: { borderColor: "#E53E3E", backgroundColor: "#FFF5F5" },
  errorText: {
    color: "#E53E3E",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  selectRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    backgroundColor: "#fff",
  },
  activeChip: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.secondary,
  },
  chipText: { fontSize: 13, color: "#687076", fontWeight: "500" },
  activeChipText: { color: "#fff" },
  datePickerWrapper: { flex: 1 },
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
});
