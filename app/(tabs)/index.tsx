import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RenterView = () => {
  const [spaces, setSpaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:3001/api/v1/storage_space.json')
      .then(res => res.json())
      .then(data => {
        setSpaces(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('booking', { space: item })}
    >
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: item.image_urls?.[0] || 'https://images.unsplash.com/photo-1513512147375-5357c3d39655?w=500' }} 
          style={styles.image} 
        />
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>€{item.price_per_month}<Text style={styles.monthText}>/mo</Text></Text>
        </View>
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>📍 {item.address?.city || 'Berlin'}</Text>
        
        <View style={styles.specRow}>
          <View style={styles.specBadge}>
            <Text style={styles.specText}>{item.width}x{item.length} {item.size_unit}</Text>
          </View>
          {item.instant_booking && (
            <View style={[styles.specBadge, { backgroundColor: '#ECFDF5' }]}>
              <Text style={[styles.specText, { color: '#059669' }]}>⚡ Instant</Text>
            </View>
          )}
        </View>

        <View style={styles.bookButton}>
          <Text style={styles.bookButtonText}>View Availability</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerSub}>BERLIN, GERMANY</Text>
        <Text style={styles.headerTitle}>Find your{"\n"}Safe Space</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#C83803" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={spaces}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 25, paddingTop: 40 },
  headerSub: { color: '#94A3B8', fontWeight: '800', fontSize: 12, letterSpacing: 2, marginBottom: 5 },
  headerTitle: { fontSize: 36, fontWeight: '900', color: '#0F172A', lineHeight: 38 },
  listContent: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 35, marginBottom: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5, borderWeight: 1, borderColor: '#F1F5F9' },
  imageWrapper: { width: '100%', height: 220, borderTopLeftRadius: 35, borderTopRightRadius: 35, overflow: 'hidden', position: 'relative' },
  image: { width: '100%', height: '100%' },
  priceTag: { position: 'absolute', bottom: 15, right: 15, backgroundColor: '#C83803', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 15 },
  priceText: { color: '#fff', fontWeight: '900', fontSize: 18 },
  monthText: { fontSize: 12, fontWeight: '400' },
  infoSection: { padding: 20 },
  title: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
  location: { color: '#64748B', marginTop: 5, fontWeight: '600' },
  specRow: { flexDirection: 'row', marginTop: 15, gap: 10 },
  specBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  specText: { fontSize: 12, fontWeight: '700', color: '#475569' },
  bookButton: { backgroundColor: '#C83803', marginTop: 20, padding: 18, borderRadius: 20, alignItems: 'center' },
  bookButtonText: { color: '#fff', fontWeight: '900', fontSize: 16, textTransform: 'uppercase', letterSpacing: 1 },
  empty: { textAlign: 'center', marginTop: 100, color: '#94A3B8', fontStyle: 'italic' }
});

export default RenterView;