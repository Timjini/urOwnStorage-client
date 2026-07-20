import { AppleMaps, GoogleMaps } from "expo-maps";
import { Platform, Text } from "react-native";

interface MapMarkerData {
  id: string;
  latitude: number;
  longitude: number;
  title?: string;
  billingInterval: string;
}

interface StorageSpaceMapProps {
  markers: MapMarkerData[];
  defaultLatitude?: number;
  defaultLongitude?: number;
}

export default function StorageSpaceMap({
  markers,
  defaultLatitude,
  defaultLongitude,
}: StorageSpaceMapProps) {
  const formattedMarkers = markers.map((m) => ({
    coordinates: {
      latitude: m.latitude,
      longitude: m.longitude,
    },
    title: m.title || "Storage Location",
  }));

  const centerLat = markers.length > 0 ? markers[0].latitude : defaultLatitude;
  const centerLng =
    markers.length > 0 ? markers[0].longitude : defaultLongitude;

  if (Platform.OS === "ios") {
    return (
      <AppleMaps.View style={{ flex: 1 }} annotations={formattedMarkers} />
    );
  } else if (Platform.OS === "android") {
    return (
      <GoogleMaps.View
        style={{ flex: 1 }}
        markers={formattedMarkers}
        cameraPosition={{
          coordinates: { latitude: centerLat, longitude: centerLng },
          zoom: markers.length > 1 ? 6 : 13,
        }}
      />
    );
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}
