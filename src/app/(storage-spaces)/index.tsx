import { StorageSpaceFilters } from "@/features/localisation/filter-location/types";
import { ErrorScreen } from "@/features/storage-space/components/error-screen";
import { NotFoundScreen } from "@/features/storage-space/components/not-found-screen";
import { StorageSpaceCard } from "@/features/storage-space/components/storage-card";
import { StorageSpaceSkeleton } from "@/features/storage-space/components/storage-space-skeleton";
import { useStorageSpaces } from "@/features/storage-space/hooks/useStorageSpace";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const coordinates = params.coordinates
    ? JSON.parse(params.coordinates as string)
    : null;
  const displayAddress =
    (params.address as string) || "Current Location / Nearby";
  const filters: StorageSpaceFilters = {
    // status: "active",
    billing_interval: params.billing_interval as string,
    space_type: params.space_type as string,
    // address: params.selectedAddress as string,
    // coordinates: coordinates,
    features: params.features as string[],
    lat: coordinates?.[1],
    lng: coordinates?.[0],
    distance: params.distance ? parseFloat(params.distance as string) : 10,
  };

  const {
    data: spaces,
    isPending,
    isError,
    refetch,
  } = useStorageSpaces(filters);

  console.log("spaces", spaces);

  if (spaces?.length === 0) {
    return <NotFoundScreen />;
  }
  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#C83803" />
      <View style={styles.locationHeader}>
        <View style={styles.locationInfo}>
          <Ionicons
            name="location-sharp"
            size={18}
            color="#C83803"
            style={styles.locationIcon}
          />
          <View style={styles.textColumn}>
            <Text style={styles.headerLabel}>Browsing spaces near</Text>
            <Text style={styles.headerAddress} numberOfLines={1}>
              {displayAddress}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.headerFilterButton}
          onPress={() => router.push("/filter")}
        >
          <Ionicons name="options-outline" size={20} color="#484E54" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <ScrollView style={{ padding: 16 }}>
          {isPending && (
            <>
              <StorageSpaceSkeleton />
              <StorageSpaceSkeleton />
              <StorageSpaceSkeleton />
            </>
          )}

          {isError && <ErrorScreen refetch={refetch} />}

          {!isPending &&
            !isError &&
            spaces?.map((space) => (
              <StorageSpaceCard key={space.id} space={space} />
            ))}

          {!isPending && !isError && spaces?.length === 0 && <NotFoundScreen />}
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
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#EEF0F2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  locationIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  textColumn: {
    flex: 1,
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#888E94",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  headerAddress: {
    fontSize: 15,
    fontWeight: "700",
    color: "#151718",
    marginTop: 1,
  },
  headerFilterButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F5F7F9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAECEE",
  },
});
