import { useStripePayment } from '@/features/booking';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Consistent Branding Palette
const brandOrange = '#C83803';
const brandBlue = '#0a7ea4';
const mutedText = '#687076';

export default function BookingPaymentScreen() {
  const params = useLocalSearchParams<{
    id: string;
    amount: string;
    currency: string;
    startDate: string;
    endDate: string;
    storageSpace: string;
    paymentIntentClientSecret: string;
    reference: string;
  }>();

  const { isReady, loading, presentCheckout } = useStripePayment({
    paymentIntentClientSecret: params.paymentIntentClientSecret,
  });

  const storageSpaceData = params.storageSpace ? JSON.parse(params.storageSpace) : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Secure Payment</Text>
          <Text style={styles.subTitle}>
            Review your rental summary and complete your booking safely via Stripe.
          </Text>
        </View>

        {/* Breakdown Ticket */}
        <View style={styles.ticket}>
          <View style={styles.ticketSection}>
            <Text style={styles.label}>Amount Due</Text>
            <Text style={styles.amountText}>
              {params.amount} {params.currency?.toUpperCase()}
            </Text>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dotLeft} />
            <View style={styles.dashedLine} />
            <View style={styles.dotRight} />
          </View>

          {/* Details Section */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.smallLabel}>STORAGE UNIT</Text>
                <Text style={styles.detailValue}>{storageSpaceData?.name || "Standard Unit"}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.smallLabel}>REFERENCE</Text>
                <Text style={[styles.detailValue, { color: brandOrange }]}>{params.reference}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View>
                <Text style={styles.smallLabel}>START DATE</Text>
                <Text style={styles.detailValue}>{params.startDate || 'N/A'}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.smallLabel}>END DATE</Text>
                <Text style={styles.detailValue}>{params.endDate || 'N/A'}</Text>
              </View>
            </View>

            <View style={styles.addressSection}>
              <Text style={styles.smallLabel}>LOCATION</Text>
              <Text style={styles.detailValue}>{storageSpaceData?.address || "Assigned Facility Location"}</Text>
            </View>
          </View>

          {/* Footer Action */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.primaryButton, (!isReady || loading) && styles.disabledButton]}
              disabled={!isReady || loading} 
              onPress={presentCheckout}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Ionicons name="lock-closed-sharp" size={18} color="#fff" />
                  <Text style={styles.primaryButtonText}>
                    Pay Now • {params.amount} {params.currency?.toUpperCase()}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.securityNotice}>
              <Ionicons name="shield-checkmark" size={14} color={mutedText} />
              <Text style={styles.securityNoticeText}>Encrypted, secure payment processing</Text>
            </View>
          </View>
        </View>

        <View style={styles.supportLink}>
          <Text style={styles.supportText}>
            Secured by <Text style={{ fontWeight: '700', color: '#635BFF' }}>stripe</Text>
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F9',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginVertical: 30,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#151718',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    color: mutedText,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  ticket: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    paddingVertical: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  ticketSection: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: mutedText,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  amountText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#151718',
    marginTop: 5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    overflow: 'hidden',
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: '#ECEDEE',
    borderStyle: 'dashed',
    borderRadius: 1,
  },
  dotLeft: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F5F7F9',
    marginLeft: -10,
  },
  dotRight: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F5F7F9',
    marginRight: -10,
  },
  detailsContainer: {
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  smallLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: mutedText,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#151718',
  },
  addressSection: {
    marginTop: 5,
  },
  footer: {
    paddingHorizontal: 25,
    marginTop: 15,
  },
  primaryButton: {
    backgroundColor: brandBlue,
    height: 55,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  disabledButton: {
    backgroundColor: '#A0D1E1',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 4,
  },
  securityNoticeText: {
    fontSize: 12,
    color: mutedText,
  },
  supportLink: {
    marginTop: 30,
    paddingBottom: 40,
  },
  supportText: {
    fontSize: 13,
    color: mutedText,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  }
});