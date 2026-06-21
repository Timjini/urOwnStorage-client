import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.emptyCardContainer}>
      <View style={styles.iconCircleEmpty}>
        <Ionicons name="map-outline" size={28} color="#0a7ea4" />
      </View>

      <Text style={styles.emptyTitle}>No matching spaces found</Text>

      <Text style={styles.emptySubtitle}>
        We couldn&apos;t find any storage spaces matching your current filters.
        Try increasing your search radius or changing the space type.
      </Text>

      <TouchableOpacity
        style={styles.filterRedirectButtonEmpty}
        onPress={() => router.push("/filter")}
      >
        <Ionicons
          name="options-outline"
          size={16}
          color="#FFF"
          style={styles.buttonIcon}
        />
        <Text style={styles.filterButtonText}>Change Filters</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyCardContainer: {
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
  iconCircleEmpty: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F0F9FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#151718",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#687076",
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  filterRedirectButtonEmpty: {
    backgroundColor: "#0a7ea4",
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  filterButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  buttonIcon: {
    marginRight: 6,
  },
});
