import { AppleMaps, GoogleMaps } from "expo-maps";
import { Platform, Text, View } from "react-native";

export default function StorageSpaceMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  if (Platform.OS === "ios") {
    return <AppleMaps.View style={{ flex: 1 }} />;
  } else if (Platform.OS === "android") {
    return (
      <View style={{ flex: 1, height: 400 }}>
        <Text>Map is not available on Android!!!</Text>
        <GoogleMaps.View
          cameraPosition={{
            coordinates: { latitude, longitude },
            zoom: 12,
          }}
        />
      </View>
    );
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}
