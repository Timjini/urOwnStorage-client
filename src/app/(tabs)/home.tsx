import { useAppStore } from "@/entities/auth/store/store";
import { useLocationStore } from "@/entities/localisation/model/store";
import { StorageSpaceFilters } from "@/features/localisation/filter-location/types";
import { ErrorScreen } from "@/features/storage-space/components/error-screen";
import { NotFoundScreen } from "@/features/storage-space/components/not-found-screen";
import { StorageSpaceCard } from "@/features/storage-space/components/storage-card";
import StorageSpaceMap from "@/features/storage-space/components/storage-space-map";
import { StorageSpaceSkeleton } from "@/features/storage-space/components/storage-space-skeleton";
import { useStorageSpaces } from "@/features/storage-space/hooks/useStorageSpace";
import { getDefaultLocation } from "@/utils/location-helper";
import { useLocalSearchParams } from "expo-router";
import { FlatList, StatusBar, StyleSheet, View } from "react-native";

export default function Index() {
  const params = useLocalSearchParams();
  const latitude = useLocationStore((state) => state.latitude);
  const longitude = useLocationStore((state) => state.longitude);

  const auth = useAppStore((state) => state.auth);
  console.log("authToken =====>", auth);
  // const logout = useAppStore((state) => state.logout);

  // console.log("latitude =====>", latitude);
  // console.log("longitude =====>", longitude);

  const coordinates = params.coordinates
    ? JSON.parse(params.coordinates as string)
    : null;

  const selectedFeatures = params.selectedFeatures
    ? JSON.parse(params.selectedFeatures as string)
    : [];

  const filters: StorageSpaceFilters = {
    billing_interval: (params.selectedInterval as string) || "month",
    space_type: (params.selectedSpaceType as string) || "Garage",
    features: selectedFeatures,
    lat: coordinates?.[1],
    lng: coordinates?.[0],
    distance: 10,
    page: 5,
  };

  const {
    data: spaces,
    isPending,
    isError,
    refetch,
  } = useStorageSpaces(filters);

  const spacesMarkers = spaces
    ? spaces.map((space) => ({
        id: space.id,
        latitude: space.address.lat,
        longitude: space.address.lng,
        title: space.title,
        billingInterval: space.billingInterval,
      }))
    : [];

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#C83803" />

      <View style={styles.container}>
        <View style={styles.topMapContainer}>
          <StorageSpaceMap
            markers={spacesMarkers}
            defaultLatitude={latitude ?? getDefaultLocation()[0]}
            defaultLongitude={longitude ?? getDefaultLocation()[1]}
          />
        </View>

        <View style={styles.listScroll}>
          {isPending && (
            <>
              <StorageSpaceSkeleton />
              <StorageSpaceSkeleton />
              <StorageSpaceSkeleton />
            </>
          )}

          {isError && <ErrorScreen refetch={refetch} />}

          <FlatList
            data={spaces}
            renderItem={({ item }) => (
              <StorageSpaceCard key={item.id} space={item} />
            )}
            keyExtractor={(item) => item.id}
          />

          {!isPending && !isError && spaces?.length === 0 && <NotFoundScreen />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topMapContainer: {
    height: 250,
    width: "100%",
    backgroundColor: "#F5F7F9",
  },
  listScroll: {
    flex: 1,
    padding: 16,
  },
});
