import { Lease } from "@/entities/lease/model";
import { JsonApiSingleResponse } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const brandOrange = "#C83803";
const lightBorder = "#ECEDEE";

interface RecentBookingProps {
  lease?: JsonApiSingleResponse<Lease>;
}

export default function RecentBooking({ lease }: RecentBookingProps) {
  if (!lease || !lease.data) {
    return null;
  }

  const { id, attributes } = lease.data;

  return (
    <View style={styles.recentSection}>
      <Text style={styles.sectionTitle}>Recent Bookings</Text>

      <TouchableOpacity style={styles.miniCard}>
        <View style={styles.miniCardIcon}>
          <Ionicons name="cube" size={24} color={brandOrange} />
        </View>
        <View style={styles.miniCardContent}>
          {/* Mapped to your model properties */}
          <Text style={styles.miniCardTitle} numberOfLines={1}>
            {attributes?.fullAddress ||
              `Storage Space #${attributes?.storageSpaceId}`}
          </Text>
          <Text style={styles.miniCardSubtitle}>
            Ref: {attributes?.reference || id} • Duration:{" "}
            {attributes?.bookingDuration} months
          </Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {attributes?.status || "Unknown"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  recentSection: {
    marginTop: 40,
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
  miniCardIcon: {
    width: 45,
    height: 45,
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
  },
  statusBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: "#2E7D32",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
