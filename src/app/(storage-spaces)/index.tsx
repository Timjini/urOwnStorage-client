import { StorageCard } from "@/components/storageSpace/StorageCard";
import { StorageSpaceCard } from "@/features/storage-space/components/storage-card";
import { useStorageSpaces } from "@/features/storage-space/hooks/useStorageSpace";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

export default function Index() {
  const params = useLocalSearchParams();

  const coordinates = params.coordinates
    ? JSON.parse(params.coordinates as string)
    : null;

  const selectedFeatures = params.selectedFeatures
    ? JSON.parse(params.selectedFeatures as string)
    : [];

  const filters = {
    // status: "active",
    billing_interval: params.selectedInterval as string,
    space_type: params.selectedSpaceType as string,
    // address: params.selectedAddress as string,
    features: selectedFeatures,
    lat: coordinates?.[1],
    lng: coordinates?.[0],
    distance: 10,
  };

  const { data: spaces } = useStorageSpaces(filters);

  console.log("spaces", spaces);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#C83803" />

      <View style={styles.container}>
        <ScrollView style={{ backgroundColor: "#F5F7F9" }}>
          {spaces?.map((space) => (
            <StorageSpaceCard key={space.id} space={space} />
          ))}
          <StorageCard />
          <StorageCard />
          <StorageCard />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#C83803",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
