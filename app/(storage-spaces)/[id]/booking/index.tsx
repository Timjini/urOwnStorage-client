import BookingForm from '@/features/booking/components/booking-form';
import { BookingStorageInfoCard } from '@/features/booking/components/booking-storage-info-card';
import { PriceBreakDown } from '@/features/booking/components/price-break-down';
import { TotalToPay } from '@/features/booking/components/total-to-pay';
import { useStorageSpaceDetails } from '@/features/storage-space/hooks/useStorageSpace';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


const brandOrange = '#C83803';
const brandBlue = '#0a7ea4';
const lightBorder = '#ECEDEE';

export default function BookingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useStorageSpaceDetails(id);
  const router = useRouter();

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={brandBlue} />
      </View>
    );
  }

  if (!data) return <Text>Space not found</Text>;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <BookingStorageInfoCard space={data} />
          <BookingForm />
          <PriceBreakDown space={data} />
        </ScrollView>
      </KeyboardAvoidingView>
  
      <View style={styles.bottomBar}>
        <TotalToPay price={data.amount} period={data.billingInterval} currencySymbol={data.currencySymbol} />
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => router.push('/(booking)/booking-confirmation')}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: lightBorder,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
  },
  bottomPrice: { fontSize: 20, fontWeight: '800', color: '#151718' },
  bottomSub: { fontSize: 12, color: '#687076' },
  confirmButton: {
    backgroundColor: brandBlue,
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 12,
  },
  confirmButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});