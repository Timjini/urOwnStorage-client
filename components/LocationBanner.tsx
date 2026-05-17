import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const brandOrange = '#C83803';

export const LocationBanner = () => {
  const [displayAddress, setDisplayAddress] = useState("Detecting location...");

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setDisplayAddress("Location permission denied");
          return;
        }

        let isLocationEnabled = await Location.hasServicesEnabledAsync();
        if (!isLocationEnabled) {
          setDisplayAddress("Location services disabled");
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        let reverse = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (reverse.length > 0) {
          const addr = reverse[0];
          setDisplayAddress(`${addr.streetNumber || ''} ${addr.street || 'Current Location'}, ${addr.city}`);
        } else {
          setDisplayAddress("Unknown location");
        }
      } catch (error) {
        console.warn("Location error caught successfully:", error);
        setDisplayAddress("Location unavailable");
      }
    })();
  }, []);

  return (
    <View style={styles.banner}>
      <Ionicons name="location-sharp" size={14} color="white" />
      <Text style={styles.text} numberOfLines={1}>
        Current Location: <Text style={styles.bold}>{displayAddress}</Text>
      </Text>
      <Ionicons name="chevron-down" size={12} color="white" style={{ marginLeft: 4 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: brandOrange,
    paddingVertical: 6,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
  },
  bold: {
    fontWeight: '700',
  },
});