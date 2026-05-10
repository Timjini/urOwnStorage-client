import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { StorageCard } from '@/components/storageSpace/StorageCard';

export default function Index() {
  return (
    // SafeAreaView ensures the content starts below the notch/status bar
    <SafeAreaView style={styles.safeArea}>
      {/* Set the status bar color to match your brandOrange (#C83803) */}
      <StatusBar barStyle="light-content" backgroundColor="#C83803" />
      
      <View style={styles.container}>
        <ScrollView style={{ backgroundColor: '#F5F7F9' }}>
            <StorageCard />
            <StorageCard />
            <StorageCard />
        </ScrollView>
        {/* Your other dashboard content goes here */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#C83803',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});