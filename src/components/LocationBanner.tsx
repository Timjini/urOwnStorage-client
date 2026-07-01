import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Theme } from "@/constants/theme";
import { useLocationStore } from "@/entities/localisation/model/store";

export const LocationBanner = () => {
  const savedAddress = useLocationStore((state) => state.savedAddress);
  const hasHydrated = useLocationStore((state) => state.hasHydrated);
  const setLocation = useLocationStore((state) => state.setLocation);
  const clearLocation = useLocationStore((state) => state.clearLocation);

  useEffect(() => {
    if (!hasHydrated) return;

    let isMounted = true;

    const fetchDeviceLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          if (isMounted) {
            useLocationStore.setState({
              savedAddress: "Location permission denied",
            });
          }
          return;
        }

        const isLocationEnabled = await Location.hasServicesEnabledAsync();
        if (!isLocationEnabled) {
          if (isMounted) {
            useLocationStore.setState({
              savedAddress: "Location services disabled",
            });
          }
          return;
        }

        let locationResult: Location.LocationObject | null = null;

        try {
          locationResult = await Location.getLastKnownPositionAsync({});

          if (!locationResult) {
            locationResult = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.Balanced,
            });
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (innerError) {
          console.warn(
            "Fresh location timed out. Attempting last known lookup...",
          );
          locationResult = await Location.getLastKnownPositionAsync({});
        }

        if (!locationResult) {
          if (isMounted) {
            useLocationStore.setState({ savedAddress: "Location unavailable" });
          }
          return;
        }

        const { latitude, longitude } = locationResult.coords;

        const reverse = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        let readableAddress = "Unknown location";
        if (reverse && reverse.length > 0) {
          const addr = reverse[0];
          const rawStreet =
            `${addr.streetNumber || ""} ${addr.street || ""}`.trim();
          const locationLabel =
            rawStreet || addr.district || "Current Location";
          readableAddress = `${locationLabel}, ${addr.city || addr.subregion || ""}`;
        }

        if (isMounted) {
          setLocation(latitude, longitude, readableAddress);
        }
      } catch (error) {
        console.error("Location Engine Failure:", error);
        if (isMounted) clearLocation();
      }
    };

    fetchDeviceLocation();

    return () => {
      isMounted = false;
    };
  }, [setLocation, clearLocation, hasHydrated]);

  if (!hasHydrated) {
    return null;
  }

  return (
    <View style={styles.banner}>
      <Ionicons name="location-sharp" size={14} color="white" />
      <Text style={styles.text} numberOfLines={1}>
        Current Location: <Text style={styles.bold}>{savedAddress}</Text>
      </Text>
      <Ionicons
        name="chevron-down"
        size={12}
        color="white"
        style={{ marginLeft: 4 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 12,
    marginLeft: 5,
    flex: 1,
  },
  bold: {
    fontWeight: "700",
  },
});
