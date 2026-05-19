import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const brandOrange = '#C83803';
const brandBlue = '#0a7ea4';
const mutedText = '#687076';

export default function ConfirmationScreen() {
  const router = useRouter();
  
  const params = useLocalSearchParams<{
    id: string;
    amount: string;
    currency: string;
    startDate: string;
    endDate: string;
    status: string;
    storageSpace: string;
  }>();

  // 2. Parse out the nested configuration hash safely
  const storageSpaceData = params.storageSpace ? JSON.parse(params.storageSpace) : null;

  // Format booking references safely
  const referenceNumber = `BK-${params.id || '00000'}-STG`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* Success Header */}
        <View style={styles.successHeader}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark-sharp" size={50} color="#fff" />
          </View>
          <Text style={styles.mainTitle}>Booking Confirmed!</Text>
          <Text style={styles.subTitle}>
            Your space is reserved. Status: <Text style={{fontWeight: '700'}}>{params.status || 'Pending'}</Text>
          </Text>
        </View>

        <View style={styles.ticket}>

          <TouchableOpacity style={styles.ticketSection}>
            <Text style={styles.label}>Booking Reference</Text>
            <Text style={styles.refNumber}>{referenceNumber}</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dotLeft} />
            <View style={styles.dashedLine} />
            <View style={styles.dotRight} />
          </View>

          {/* Details Section */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View>
                <Text style={styles.smallLabel}>STORAGE UNIT</Text>
                {/* Fallback cleanly if metadata names vary inside storageSpace */}
                <Text style={styles.detailValue}>{storageSpaceData?.name || "Standard Unit"}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.smallLabel}>TOTAL AMOUNT</Text>
                <Text style={styles.detailValue}>{params.amount} {params.currency}</Text>
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

          {/* Action Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => router.replace('/(tabs)')} // Adjusted to root routing structure rule
            >
              <Text style={styles.primaryButtonText}>Back to Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton}>
              <Ionicons name="download-outline" size={18} color={brandBlue} />
              <Text style={styles.secondaryButtonText}>Save PDF Receipt</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.supportLink}>
          <Text style={styles.supportText}>Need to change your booking? <Text style={{ color: brandBlue, fontWeight: '700' }}>Contact Support</Text></Text>
        </TouchableOpacity>

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
  successHeader: {
    alignItems: 'center',
    marginVertical: 30,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#2E7D32', // Success Green
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    // Glow effect
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
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
  refNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: brandOrange,
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
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: brandBlue,
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    flexDirection: 'row',
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ECEDEE',
    gap: 8,
  },
  secondaryButtonText: {
    color: brandBlue,
    fontSize: 15,
    fontWeight: '600',
  },
  supportLink: {
    marginTop: 30,
    paddingBottom: 40,
  },
  supportText: {
    fontSize: 14,
    color: mutedText,
  }
});