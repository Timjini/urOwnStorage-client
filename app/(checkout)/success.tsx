import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const brandBlue = '#0a7ea4';
const mutedText = '#687076';

export default function SuccessScreen() {
  const router = useRouter();
  const { referenceNumber } = useLocalSearchParams<{ referenceNumber?: string }>();

  const navigateToBooking = () =>{
    router.push('/(booking)/search')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon Badge */}
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={90} color="#2e7d32" />
        </View>

        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your payment was processed successfully. Your storage unit is now secured.
        </Text>

        {/* Reference Number Block */}
        {referenceNumber && (
          <View style={styles.referenceCard}>
            <Text style={styles.referenceLabel}>CONFIRMATION REFERENCE</Text>
            <Text style={styles.referenceValue}>{referenceNumber}</Text>
          </View>
        )}

        <Text style={styles.noticeText}>
          We&apos;ve sent a detailed receipt and access instructions to your registered email.
        </Text>
      </View>

      {/* Bottom Action Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={navigateToBooking}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Go to My Bookings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F9',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconContainer: {
    marginBottom: 24,
    // Soft glow effect behind icon
    shadowColor: '#2e7d32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#151718',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: mutedText,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  referenceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ECEDEE',
    marginBottom: 20,
  },
  referenceLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: mutedText,
    letterSpacing: 1,
    marginBottom: 4,
  },
  referenceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#151718',
  },
  noticeText: {
    fontSize: 13,
    color: mutedText,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  footer: {
    padding: 24,
  },
  primaryButton: {
    backgroundColor: brandBlue,
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});