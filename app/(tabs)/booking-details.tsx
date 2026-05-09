import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const brandOrange = '#C83803';
const brandBlue = '#0a7ea4';
const lightBorder = '#ECEDEE';

export default function BookingDetailsScreen() {
  const [fullName, setFullName] = useState('');
  const [notes, setNotes] = useState('');
  const router = useRouter();


  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.listingPreview}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=200' }} 
              style={styles.previewImage} 
            />
            <View style={styles.previewText}>
              <Text style={styles.listingTitle}>Climate Controlled Basement</Text>
              <Text style={styles.listingLocation}>3500 Franklin Pike, Nashville</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Select Dates</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.datePickerBox}>
              <Text style={styles.dateLabel}>Start Date</Text>
              <View style={styles.dateValueRow}>
                <Ionicons name="calendar-outline" size={18} color={brandBlue} />
                <Text style={styles.dateValue}>May 12, 2026</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.datePickerBox}>
              <Text style={styles.dateLabel}>End Date</Text>
              <View style={styles.dateValueRow}>
                <Ionicons name="calendar-outline" size={18} color={brandBlue} />
                <Text style={styles.dateValue}>Jun 12, 2026</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Your Details</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput 
              style={styles.input}
              placeholder="John Doe"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Items to be stored</Text>
            <View style={styles.selectRow}>
              {['Furniture', 'Boxes', 'Vehicle', 'Other'].map((item) => (
                <TouchableOpacity key={item} style={[styles.chip, item === 'Boxes' && styles.activeChip]}>
                  <Text style={[styles.chipText, item === 'Boxes' && styles.activeChipText]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Special Instructions (Optional)</Text>
            <TextInput 
              style={[styles.input, styles.textArea]}
              placeholder="e.g. Will need access on weekends..."
              multiline
              numberOfLines={4}
              value={notes}
              onChangeText={setNotes}
            />
          </View>

          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>$85.00 x 1 month</Text>
              <Text style={styles.summaryText}>$85.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Service Fee</Text>
              <Text style={styles.summaryText}>$5.00</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalPrice}>$90.00</Text>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomPrice}>$90.00</Text>
          <Text style={styles.bottomSub}>Total for 30 days</Text>
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={() => router.push('/booking-confirmation')}>
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  listingPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F7F9',
    borderRadius: 12,
    marginBottom: 25,
  },
  previewImage: { width: 60, height: 60, borderRadius: 8 },
  previewText: { marginLeft: 12, flex: 1 },
  listingTitle: { fontSize: 16, fontWeight: '700', color: '#151718' },
  listingLocation: { fontSize: 13, color: '#687076', marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#151718', marginBottom: 15, marginTop: 10 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  datePickerBox: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: lightBorder,
    borderRadius: 12,
  },
  dateLabel: { fontSize: 11, fontWeight: '700', color: brandOrange, textTransform: 'uppercase', marginBottom: 4 },
  dateValueRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dateValue: { fontSize: 14, fontWeight: '600', color: '#151718' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#151718', marginBottom: 8 },
  input: {
    backgroundColor: '#F5F7F9',
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: lightBorder,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  selectRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: lightBorder,
    backgroundColor: '#fff',
  },
  activeChip: { backgroundColor: brandBlue, borderColor: brandBlue },
  chipText: { fontSize: 13, color: '#687076', fontWeight: '500' },
  activeChipText: { color: '#fff' },
  summaryBox: {
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: lightBorder,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryText: { color: '#687076', fontSize: 14 },
  totalRow: { marginTop: 8, paddingTop: 8 },
  totalText: { fontSize: 16, fontWeight: '700', color: '#151718' },
  totalPrice: { fontSize: 18, fontWeight: '800', color: brandOrange },
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