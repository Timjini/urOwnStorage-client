import { useLocationStore } from "@/entities/localisation/model/store";
import { StorageSpaceFilters } from "@/features/localisation/filter-location/types";
import { NotFoundScreen } from "@/features/storage-space/components/not-found-screen";
import { StorageSpaceCard } from "@/features/storage-space/components/storage-card";
import StorageSpaceMap from "@/features/storage-space/components/storage-space-map";
import { StorageSpaceSkeleton } from "@/features/storage-space/components/storage-space-skeleton";
import { useStorageSpaces } from "@/features/storage-space/hooks/useStorageSpace";
import { getDefaultLocation } from "@/utils/location-helper";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

export default function Index() {
  const params = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const latitude = useLocationStore((state) => state.latitude);
  const longitude = useLocationStore((state) => state.longitude);

  const isWebDesktop = Platform.OS === "web" && width > 768;
  const [spacePerPage, setSpacePerPage] = useState(10);

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
    per_page: spacePerPage,
  };

  const {
    data: spaces,
    isPending,
    isError,
    // refetch,
  } = useStorageSpaces(filters);

  const spacesMarkers = spaces
    ? spaces.map((space) => ({
        id: space.id,
        latitude: space.address.lat,
        longitude: space.address.lng,
        title: space.title,
        price: space.formattedPrice,
        billingInterval: space.billingInterval,
        info: space.spaceType || "Storage Unit",
      }))
    : [];

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#C83803" />

      <View style={[styles.container, isWebDesktop && styles.containerWeb]}>
        <View
          style={[styles.mapContainer, isWebDesktop && styles.mapContainerWeb]}
        >
          <StorageSpaceMap
            markers={spacesMarkers}
            defaultLatitude={latitude ?? getDefaultLocation()[0]}
            defaultLongitude={longitude ?? getDefaultLocation()[1]}
          />
        </View>

        <ScrollView
          style={[styles.listScroll, isWebDesktop && styles.listScrollWeb]}
          contentContainerStyle={
            isWebDesktop ? styles.scrollContentWeb : undefined
          }
        >
          <View style={isWebDesktop ? styles.gridContainerWeb : undefined}>
            {isPending && (
              <>
                <View style={isWebDesktop && styles.cardWrapperWeb}>
                  <StorageSpaceSkeleton />
                </View>
                <View style={isWebDesktop && styles.cardWrapperWeb}>
                  <StorageSpaceSkeleton />
                </View>
                <View style={isWebDesktop && styles.cardWrapperWeb}>
                  <StorageSpaceSkeleton />
                </View>
              </>
            )}

            {
              !isPending && !isError && (
                <FlatList
                  data={spaces}
                  renderItem={({ item }) => <StorageSpaceCard space={item} />}
                  keyExtractor={(item) => item.id}
                  onEndReached={() => setSpacePerPage(spacePerPage + 10)}
                />
              )
              // spaces?.map((space) => (
              //   <View
              //     key={space.id}
              //     style={isWebDesktop ? styles.cardWrapperWeb : undefined}
              //   >
              //     <StorageSpaceCard space={space} />
              //   </View>
              // ))}
            }
            {!isPending && !isError && spaces?.length === 0 && (
              <NotFoundScreen />
            )}
          </View>
        </ScrollView>
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
    flexDirection: "column",
  },
  containerWeb: {
    flexDirection: "row",
  },
  mapContainer: {
    height: 250,
    width: "100%",
    backgroundColor: "#F5F7F9",
  },
  mapContainerWeb: {
    flex: 1,
    height: "100%",
  },
  listScroll: {
    flex: 1,
    padding: 16,
  },
  listScrollWeb: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    borderLeftWidth: 1,
    borderLeftColor: "#E5E7EB",
  },
  scrollContentWeb: {
    paddingBottom: 32,
  },
  gridContainerWeb: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: -8,
  },
  cardWrapperWeb: {
    width: "50%",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});
