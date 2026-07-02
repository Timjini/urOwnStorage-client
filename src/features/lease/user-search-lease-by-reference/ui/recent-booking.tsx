import { Theme } from "@/constants/theme";
import { Lease } from "@/entities/lease/model";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RecentBooking(lease: Lease) {
  return (
    <>
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Bookings</Text>

        <TouchableOpacity style={styles.miniCard}>
          <View style={styles.miniCardIcon}>
            <Ionicons name="cube" size={24} color={Theme.colors.primary} />
          </View>
          <View style={styles.miniCardContent}>
            <Text style={styles.miniCardTitle}>Loading...</Text>
            <Text style={styles.miniCardSubtitle}>Loading...</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Pending</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
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
    borderColor: Theme.colors.border,
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
