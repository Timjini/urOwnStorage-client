import { Lease } from "@/entities/lease/model";
import { useLease } from "@/features/lease/shared/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const brandOrange = "#C83803";
const brandBlue = "#0a7ea4";
const lightBorder = "#ECEDEE";

export default function SearchBox() {
  const [refNumber, setRefNumber] = useState("");
  const [booking, setBooking] = useState<Lease | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { searchLeaseByReference } = useLease();

  const handleSearch = async () => {
    if (!refNumber.trim()) return;

    setIsLoading(true);
    setError(null);
    setBooking(null);

    try {
      const data = await searchLeaseByReference(refNumber);

      let bookingData = data.attributes;

      if (bookingData) {
        setBooking(bookingData);
      } else {
        setError("No booking found with this reference number.");
      }
    } catch (err: any) {
      setError("Failed to fetch booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.searchCard}>
        <Text style={styles.inputLabel}>Reference Number</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name="receipt-outline"
            size={20}
            color={brandBlue}
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

        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.searchButtonText}>Find My Booking</Text>
              <Ionicons name="search" size={18} color="#fff" />
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="information-circle-outline" size={18} color="#687076" />
        <Text style={styles.infoText}>
          Reference numbers can be found in your confirmation email.
        </Text>
      </View>

      {/* Error Message Section */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Actual Booking Result Display Section */}
      {booking && (
        <View style={styles.bookingResultSection}>
          <Text style={styles.sectionTitle}>Your Booking</Text>
          <View style={styles.miniCard}>
            {booking.imageUrls?.length > 0 ? (
              <Image
                source={{ uri: booking.imageUrls[0] }}
                style={styles.miniCardImage}
              />
            ) : (
              <View style={styles.miniCardIcon}>
                <Ionicons name="cube-outline" size={22} color={brandOrange} />
              </View>
            )}

            <View style={styles.miniCardContent}>
              <Text style={styles.miniCardTitle} numberOfLines={1}>
                {booking.storageSpaceTitle}
              </Text>
              <Text style={styles.miniCardSubtitle} numberOfLines={2}>
                {booking.fullAddress}
              </Text>
              <Text style={styles.refBadge}>ID:</Text>
            </View>

            {booking.status && (
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{booking.status}</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  searchCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: lightBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#C83803",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7F9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: lightBorder,
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
    color: "#151718",
  },
  searchButton: {
    backgroundColor: brandOrange,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    borderRadius: 12,
    gap: 10,
  },
  searchButtonText: {
    color: "#fff",
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
    color: "#687076",
    flex: 1,
  },
  bookingResultSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#151718",
    marginBottom: 15,
  },
  miniCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: lightBorder,
  },
  miniCardImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: "#F5F7F9",
  },
  miniCardIcon: {
    width: 55,
    height: 55,
    borderRadius: 10,
    backgroundColor: "#FFF1ED",
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
    color: "#151718",
  },
  miniCardSubtitle: {
    fontSize: 12,
    color: "#687076",
    marginTop: 2,
    lineHeight: 16,
  },
  refBadge: {
    fontSize: 11,
    color: brandBlue,
    fontWeight: "600",
    marginTop: 4,
  },
  statusBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 10,
  },
  statusText: {
    color: "#2E7D32",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  errorContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#FFEBEE",
    borderRadius: 8,
  },
  errorText: {
    color: "#C62828",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
