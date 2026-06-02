import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const brandOrange = '#C83803';
const brandBlue = '#0a7ea4';
const lightBorder = '#ECEDEE';
export default function RecentBooking() {
  return (
    <>
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Bookings</Text>

        <TouchableOpacity style={styles.miniCard}>
          <View style={styles.miniCardIcon}>
            <Ionicons name="cube" size={24} color={brandOrange} />
          </View>
          <View style={styles.miniCardContent}>
            <Text style={styles.miniCardTitle}>Franklin Pike Storage</Text>
            <Text style={styles.miniCardSubtitle}>Ref: BK-8821 • Unit 4B</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Active</Text>
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
