import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Theme } from "@/constants/theme";
import { useLease } from "../../shared/hooks";

export default function SearchBox() {
  const [refNumber, setRefNumber] = useState("");
  const { searchLeaseByReference } = useLease();

  const handleSearch = () => {
    console.log("Searching for reference number:", refNumber);
    searchLeaseByReference(refNumber).then((result) => {
      console.log("Search result:", result);
      if (result) {
        alert("Lease found!");
      } else {
        alert("No lease found.");
      }
    });
  };

  return (
    <>
      <View style={styles.searchCard}>
        <Text style={styles.inputLabel}>Reference Number</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name="receipt-outline"
            size={20}
            color={Theme.colors.secondary}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="e.g. BK-99421"
            placeholderTextColor="#9BA1A6"
            value={refNumber}
            onChangeText={setRefNumber}
            autoCapitalize="characters"
          />
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Find My Booking</Text>
          <Ionicons name="search" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="information-circle-outline" size={18} color="#687076" />
        <Text style={styles.infoText}>
          Reference numbers can be found in your confirmation email.
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchCard: {
    backgroundColor: Theme.colors.background,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: Theme.colors.primary,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontWeight: "600",
    color: Theme.colors.text,
  },
  searchButton: {
    backgroundColor: Theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    borderRadius: 12,
    gap: 10,
  },
  searchButtonText: {
    color: Theme.colors.background,
    fontSize: 16,
    fontWeight: "700",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 5,
    gap: 8,
  },
  infoText: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    flex: 1,
  },
  recentSection: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Theme.colors.text,
    marginBottom: 15,
  },
  miniCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.background,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  miniCardIcon: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: Theme.colors.secondaryBackground,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  miniCardContent: {
    flex: 1,
  },
  miniCardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Theme.colors.text,
  },
  miniCardSubtitle: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: Theme.colors.lightGreen,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: Theme.colors.success,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
