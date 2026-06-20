import { StorageSpaceCard } from "@/features/storage-space/components/storage-card";
import { StorageSpaceSkeleton } from "@/features/storage-space/components/storage-space-skeleton";

import { useStorageSpaces } from "@/features/storage-space/hooks/useStorageSpace";
import { useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    billing_interval: (params.selectedInterval as string) || "month",
    space_type: (params.selectedSpaceType as string) || "Garage",
    // address: params.selectedAddress as string,
    features: selectedFeatures,
    lat: coordinates?.[1],
    lng: coordinates?.[0],
    distance: 10,
  };

  const {
    data: spaces,
    isPending,
    isError,
    refetch,
  } = useStorageSpaces(filters);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#C83803" />

      <View style={styles.container}>
        <ScrollView style={{ padding: 16 }}>
          {isPending && (
            <>
              <StorageSpaceSkeleton />
              <StorageSpaceSkeleton />
              <StorageSpaceSkeleton />
            </>
          )}

          {isError && (
            <View style={styles.centerContainer}>
              <Text style={styles.errorText}>
                Failed to load storage spaces.
              </Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => refetch()}
              >
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}

          {!isPending &&
            !isError &&
            spaces?.map((space) => (
              <StorageSpaceCard key={space.id} space={space} />
            ))}

          {!isPending && !isError && spaces?.length === 0 && (
            <View style={styles.centerContainer}>
              <Text style={styles.emptyText}>
                No storage spaces available right now.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
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
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  errorText: {
    fontSize: 16,
    color: "#D32F2F",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#C83803",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
