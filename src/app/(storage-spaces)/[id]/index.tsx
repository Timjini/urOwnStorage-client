import StorageSpaceView from "@/features/storage-space/components/storage-space-view";
import { useStorageSpaceDetails } from "@/features/storage-space/hooks/useStorageSpace";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function StorageSpaceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useStorageSpaceDetails(id);

  if (isLoading) return <ActivityIndicator />;
  if (!data) return <Text>Space not found</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StorageSpaceView space={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
