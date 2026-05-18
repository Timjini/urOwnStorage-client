import UniversalDatePicker from "@/components/booking/UniversalDatePicker";
import { StorageSpace } from "@/features/storage-space/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCreateBooking } from "../hooks/useBooking";
import { Booking } from "../types";
import { BookingFormData, bookingSchema } from "../validations";

const brandOrange = "#C83803";
const brandBlue = "#0a7ea4";
const lightBorder = "#ECEDEE";

interface StorageSpaceProps {
  space: StorageSpace
}

export default function BookingForm({space}: StorageSpaceProps) {
  const { mutate, isPending, isError, error } = useCreateBooking();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      storageSpaceId: space.id,
      status: "Pending",
      currency: space.currency,
      amount: space.amount,
      serviceFee: 5,
      fullName: "",
      email: "",
      phone: "",
      itemType: "Boxes",
      instructions: "",
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const onSubmit = (data: BookingFormData) => {

    const bookingPayload: Booking = {
      storageSpaceId: Number(data.storageSpaceId), 
      status: data.status,
      currency: data.currency,
      amount: data.amount,
      serviceFee: data.serviceFee,
      itemType: data.itemType,
      instructions: data.instructions || "",
      startDate: data.startDate,
      endDate: data.endDate,
      
      userData: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
      },
    };
    mutate(bookingPayload);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Select Dates</Text>
      <View style={styles.row}>
        <UniversalDatePicker />
        <UniversalDatePicker />
      </View>

      <Text style={styles.sectionTitle}>Your Details</Text>

      {/* Full Name Field */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.fullName && styles.inputError]}
              placeholder="John Doe"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}
      </View>

      {/* Email Field */}
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
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
      </View>

      {/* Phone Field */}
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
        {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Items to be stored</Text>
        <Controller
          control={control}
          name="itemType"
          render={({ field: { onChange, value } }) => (
            <View style={styles.selectRow}>
              {(["Furniture", "Boxes", "Vehicle", "Other"] as const).map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[styles.chip, item === value && styles.activeChip]}
                  onPress={() => onChange(item)}
                >
                  <Text style={[styles.chipText, item === value && styles.activeChipText]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Special Instructions (Optional)</Text>
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

      {isError && (
        <Text style={[styles.errorText, { marginBottom: 15, textAlign: 'center' }]}>
          {error instanceof Error ? error.message : "Something went wrong!"}
        </Text>
      )}

      {/* Submit Button */}
      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Confirm Booking</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: { width: "100%", paddingHorizontal: 4 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#151718",
    marginBottom: 15,
    marginTop: 10,
  },
  row: { flexDirection: "row", gap: 12, marginBottom: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#151718", marginBottom: 8 },
  input: {
    backgroundColor: "#F5F7F9",
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: lightBorder,
  },
  inputError: {
    borderColor: "#E53E3E",
    backgroundColor: "#FFF5F5",
  },
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
    borderColor: lightBorder,
    backgroundColor: "#fff",
  },
  activeChip: { backgroundColor: brandBlue, borderColor: brandBlue },
  chipText: { fontSize: 13, color: "#687076", fontWeight: "500" },
  activeChipText: { color: "#fff" },
  submitButton: {
    backgroundColor: brandOrange,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});