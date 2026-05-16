import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import UniversalDatePicker from "@/components/booking/UniversalDatePicker";

const brandOrange = "#C83803";
const brandBlue = "#0a7ea4";
const lightBorder = "#ECEDEE";

export default function BookingForm() {
  // Internalized state variables
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedItem, setSelectedItem] = useState("Boxes");
  const [notes, setNotes] = useState("");

  return (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Select Dates</Text>
      <View style={styles.row}>
        <UniversalDatePicker />
        <UniversalDatePicker />
      </View>

      <Text style={styles.sectionTitle}>Your Details</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="+1 234 567 890"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Items to be stored</Text>
        <View style={styles.selectRow}>
          {["Furniture", "Boxes", "Vehicle", "Other"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.chip, item === selectedItem && styles.activeChip]}
              onPress={() => setSelectedItem(item)}
            >
              <Text
                style={[
                  styles.chipText,
                  item === selectedItem && styles.activeChipText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Special Instructions (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="e.g. Will need access on weekends..."
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: { width: "100%" },
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
  summaryBox: {
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: lightBorder,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryText: { color: "#687076", fontSize: 14 },
  totalRow: { marginTop: 8, paddingTop: 8 },
  totalText: { fontSize: 16, fontWeight: "700", color: "#151718" },
  totalPrice: { fontSize: 18, fontWeight: "800", color: brandOrange },
});
