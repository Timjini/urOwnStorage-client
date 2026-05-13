import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import RecentBooking from '@/components/booking/RecentBooking';
import SearchBox from '@/components/booking/SearchBox';

const brandOrange = '#C83803';
const brandBlue = '#0a7ea4';
const lightBorder = '#ECEDEE';

export default function BookingSearchScreen() {

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Track Your Booking</Text>
          <Text style={styles.subtitle}>
            Enter your reference number to view status, gate codes, or manage your space.
          </Text>
        </View>

        <SearchBox />
        <RecentBooking />

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#151718',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#687076',
    lineHeight: 22,
  },
  searchCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: lightBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#C83803',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: lightBorder,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontWeight: '600',
    color: '#151718',
  },
  searchButton: {
    backgroundColor: brandOrange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    borderRadius: 12,
    gap: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 5,
    gap: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#687076',
    flex: 1,
  },
  recentSection: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#151718',
    marginBottom: 15,
  },
  miniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: lightBorder,
  },
  miniCardIcon: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#FFF1ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  miniCardContent: {
    flex: 1,
  },
  miniCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#151718',
  },
  miniCardSubtitle: {
    fontSize: 12,
    color: '#687076',
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#2E7D32',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});