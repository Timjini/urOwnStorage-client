import { useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryRoutingButton } from '../ui/primary-button';


const brandBlue = '#0a7ea4';
const brandOrange = '#C83803';
const mutedText = '#687076';

export const StorageCard = () => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push('/storage-space');
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      style={styles.card} 
      onPress={handleViewDetails}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=500' }} 
          style={styles.image} 
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Shared Space</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>Climate Controlled Basement</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>4.9</Text>
          </View>
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={mutedText} />
          <Text style={styles.locationText}>3500 Franklin Pike • 2.4 miles away</Text>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Ionicons name="cube-outline" size={16} color={brandBlue} />
            <Text style={styles.detailText}>10x10 ft</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="shield-checkmark-outline" size={16} color={brandBlue} />
            <Text style={styles.detailText}>Insured</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.priceLabel}>Monthly</Text>
            <Text style={styles.priceValue}>$85<Text style={styles.priceUnit}>/mo</Text></Text>
          </View>

          <View style={styles.actionGroup}>
            <TouchableOpacity 
              style={styles.viewButton} 
              onPress={handleViewDetails}
            >
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>

            <PrimaryRoutingButton route="/booking-details" label="Book" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  imageContainer: { height: 180, position: 'relative' },
  image: { width: '100%', height: '100%' },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  content: { padding: 15 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  title: { fontSize: 17, fontWeight: '700', color: '#151718', flex: 1 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, fontWeight: '600', color: '#151718' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 12 },
  locationText: { fontSize: 13, color: mutedText },
  detailsRow: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailText: { fontSize: 13, color: '#151718', fontWeight: '500' },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F7F9'
  },
  priceLabel: { fontSize: 11, color: mutedText, textTransform: 'uppercase', fontWeight: '600' },
  priceValue: { fontSize: 20, fontWeight: '800', color: brandOrange },
  priceUnit: { fontSize: 12, fontWeight: '500', color: mutedText },

  actionGroup: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  viewButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F5F7F9',
    borderWidth: 1,
    borderColor: '#ECEDEE',
  },
  viewButtonText: {
    color: brandBlue,
    fontWeight: '700',
    fontSize: 14,
  }
});