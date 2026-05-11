import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { StorageCard } from "@/components/storageSpace/StorageCard";
import { useStorageSpaces } from "@/features/storage-space/hooks/useStorageSpace";
import { StorageSpaceCard } from "@/features/storage-space/components/storage-card";

export default function Index() {

  const { data: spaces, isPending } = useStorageSpaces('active');

  if (isPending) {
    <View>Loading...</View>
  }

  if (!spaces)
  {
    <View>Oppps!</View>
  }

  console.log("spaces", spaces);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#C83803" />

      <View style={styles.container}>
        <ScrollView style={{ backgroundColor: "#F5F7F9" }}>
          {spaces?.map((space) => 
            <StorageSpaceCard space={space} />
          )}
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
