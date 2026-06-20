import AddressAutocomplete from "@/features/localisation/search-location/ui/address-autocomplete";
import { useStorageSpaces } from "@/features/storage-space/hooks/useStorageSpace";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ALLOWED_INTERVALS = ["day", "week", "month", "year"];
const SPACE_TYPES = [
  "Garage",
  "Room",
  "Driveway",
  "Workshop",
  "Warehouse",
  "Office",
  "Building",
  "Basement",
  "Empty Lot",
  "Backyard",
  "Other Space",
];
const FEATURE_OPTIONS = [
  "Climate Control",
  "24/7 Access",
  "CCTV",
  "Alarm System",
  "Private Entrance",
  "Smoke Alarm",
];

const brandBlue = "#0a7ea4";

export default function FilterScreen() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [selectedInterval, setSelectedInterval] = useState("");
  const [selectedSpaceType, setSelectedSpaceType] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handleLocationSelect = (data: {
    address: string;
    coordinates: [number, number];
  }) => {
    setSelectedAddress(data.address);
    setCoordinates(data.coordinates);

    console.log("Selected Full Address:", data.address);
    console.log("Selected Coordinates (Lon, Lat):", data.coordinates);
  };

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleApply = () => {
    router.push({
      pathname: "/home",
      params: {
        selectedInterval,
        selectedSpaceType,
        selectedFeatures: JSON.stringify(selectedFeatures),
        selectedAddress,
        coordinates: JSON.stringify(coordinates),
      },
    });
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Location Address</Text>

        <AddressAutocomplete onLocationSelect={handleLocationSelect} />

        <Text style={styles.sectionTitle}>Space Type</Text>
        <View style={styles.chipContainer}>
          {SPACE_TYPES.map((type) => {
            const isSelected = selectedSpaceType === type;
            return (
              <TouchableOpacity
                key={type}
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() => setSelectedSpaceType(isSelected ? "" : type)}
              >
                <Text
                  style={[
                    styles.chipText,
                    isSelected && styles.chipTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Key Features</Text>
        <View style={styles.chipContainer}>
          {FEATURE_OPTIONS.map((feature) => {
            const isSelected = selectedFeatures.includes(feature);
            return (
              <TouchableOpacity
                key={feature}
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() => toggleFeature(feature)}
              >
                <Text
                  style={[
                    styles.chipText,
                    isSelected && styles.chipTextSelected,
                  ]}
                >
                  {feature}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Rental Frequency / Interval</Text>
        <View style={styles.chipContainer}>
          {ALLOWED_INTERVALS.map((interval) => {
            const isSelected = selectedInterval === interval;
            return (
              <TouchableOpacity
                key={interval}
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() => setSelectedInterval(isSelected ? "" : interval)}
              >
                <Text
                  style={[
                    styles.chipText,
                    isSelected && styles.chipTextSelected,
                    { textTransform: "capitalize" },
                  ]}
                >
                  per {interval}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    paddingHorizontal: 10,
    // backgroundColor: "#F8F9FA",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  resultContainer: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#EBF3FF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D0E2FF",
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0043CE",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  resultText: {
    fontSize: 15,
    color: "#001D6C",
    fontWeight: "500",
  },
  coordinatesText: {
    fontSize: 13,
    color: "#525252",
    marginTop: 6,
    fontFamily: "Platform-specific-mono or regular",
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ECEDEE",
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#151718",
  },
  resetText: {
    color: "#687076",
    fontSize: 14,
    fontWeight: "500",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#151718",
    marginTop: 20,
    marginBottom: 12,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7F9",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#151718",
    fontSize: 15,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: "#F5F7F9",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
  },
  chipSelected: {
    backgroundColor: "#E6F4EA",
    borderColor: brandBlue,
  },
  chipText: {
    fontSize: 13,
    color: "#484E54",
  },
  chipTextSelected: {
    color: brandBlue,
    fontWeight: "600",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ECEDEE",
  },
  applyButton: {
    backgroundColor: brandBlue,
    borderRadius: 10,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

// {coordinates && (
//   <View style={styles.resultContainer}>
//     <Text style={styles.resultLabel}>Selected Target:</Text>
//     <Text style={styles.resultText}>{selectedAddress}</Text>
//     <Text style={styles.coordinatesText}>
//       Longitude: {coordinates[0]} | Latitude: {coordinates[1]}
//     </Text>
//   </View>
// )}
