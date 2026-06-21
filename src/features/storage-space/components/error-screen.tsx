import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function ErrorScreen({ refetch }: { refetch: () => void }) {
  const router = useRouter();

  return (
    <View style={styles.errorCardContainer}>
      <View style={styles.iconCircle}>
        <Ionicons name="search-outline" size={28} color="#C83803" />
      </View>
      <Text style={styles.errorTitle}>No spaces found nearby</Text>
      <Text style={styles.errorSubtitle}>
        We couldn&apos;t load storage spaces with your current location or
        network setup. Try reloading, or expand your search area.
      </Text>
      <View style={styles.errorActionRow}>
        <TouchableOpacity
          style={styles.filterRedirectButton}
          onPress={() => router.push("/filter")}
        >
          <Ionicons
            name="options-outline"
            size={16}
            color="#FFF"
            style={styles.buttonIcon}
          />
          <Text style={styles.filterButtonText}>Adjust Filters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.friendlyRetryButton}
          onPress={() => refetch()}
        >
          <Ionicons
            name="refresh-outline"
            size={16}
            color="#484E54"
            style={styles.buttonIcon}
          />
          <Text style={styles.friendlyRetryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  errorCardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF5F2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#151718",
    marginBottom: 8,
    textAlign: "center",
  },
  errorSubtitle: {
    fontSize: 14,
    color: "#687076",
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  errorActionRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  filterRedirectButton: {
    flex: 1,
    backgroundColor: "#C83803",
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  friendlyRetryButton: {
    flex: 1,
    backgroundColor: "#F5F7F9",
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E1E4E6",
  },
  friendlyRetryButtonText: {
    color: "#484E54",
    fontSize: 14,
    fontWeight: "600",
  },
  buttonIcon: {
    marginRight: 6,
  },
});
