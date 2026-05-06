import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BookingScreen = ({ route, navigation }: any) => {

    if (!route?.params?.space) {
        return (
          <SafeAreaView style={styles.container}>
            <View style={styles.content}>
              <Text>No space data found.</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: '#C83803', marginTop: 20 }}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        );
      }
  const { space } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Image source={{ uri: space.image_urls?.[0] }} style={styles.heroImage} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{space.title}</Text>
        <Text style={styles.description}>{space.description}</Text>
        
        <View style={styles.summaryBox}>
          <Text style={styles.price}>€{space.price_per_month}/month</Text>
          <Text style={styles.detailText}>Dimensions: {space.width} x {space.length} {space.size_unit}</Text>
        </View>

        <TouchableOpacity style={styles.finalBtn}>
          <Text style={styles.finalBtnText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backBtn: { padding: 20 },
  backText: { fontWeight: 'bold', color: '#C83803' },
  heroImage: { width: '100%', height: 300 },
  content: { padding: 25 },
  title: { fontSize: 28, fontWeight: '900', color: '#0F172A' },
  description: { color: '#64748B', marginTop: 10, fontSize: 16, lineHeight: 22 },
  summaryBox: { backgroundColor: '#F8FAFC', padding: 20, borderRadius: 25, marginTop: 25 },
  price: { fontSize: 24, fontWeight: '900', color: '#C83803' },
  detailText: { marginTop: 5, color: '#475569', fontWeight: '600' },
  finalBtn: { backgroundColor: '#C83803', marginTop: 30, padding: 20, borderRadius: 20, alignItems: 'center' },
  finalBtnText: { color: '#fff', fontWeight: '900', fontSize: 18 }
});

export default BookingScreen;