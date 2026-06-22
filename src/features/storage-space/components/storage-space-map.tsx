import { Text, View, StyleSheet } from "react-native";
import { MapView, PROVIDER_GOOGLE } from "react-native-maps";
// import MapView, { Marker } from "react-native-maps";

const StorageSpaceMap = ({ lng, lat }: { lng: number; lat: number }) => {
  console.log("lng", lng, "lat", lat);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#151718",
    marginBottom: 15,
  },
  mapContainer: {
    height: 180,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
  },
  mapPlaceholder: {
    width: "100%",
    height: "100%",
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato",
  },
  map: {
    flex: 1,
  },
});

export default StorageSpaceMap;
