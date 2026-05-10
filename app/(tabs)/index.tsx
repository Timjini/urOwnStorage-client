import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { StorageCard } from "@/components/storageSpace/StorageCard";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#C83803" />

      <View style={styles.container}>
        <ScrollView style={{ backgroundColor: "#F5F7F9" }}>
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
