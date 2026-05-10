import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const brandOrange = '#C83803';
const brandBlue = '#0a7ea4';

export default function UniversalPicker() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const formatDate = (d: Date) => {
    return d.toISOString().split('T')[0];
  };

  const displayDate = (d: Date) => {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.datePickerBox}>
        <Text style={styles.dateLabel}>Start Date</Text>
        <View style={styles.dateValueRow}>
          <Ionicons name="calendar-outline" size={18} color={brandBlue} />
          <input
            type="date"
            value={formatDate(date)}
            onChange={(e) => setDate(new Date(e.target.value))}
            style={styles.webInputStyle}
          />
          <Text style={styles.dateValue}>{displayDate(date)}</Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity style={styles.datePickerBox} onPress={() => setShow(true)}>
        <Text style={styles.dateLabel}>Start Date</Text>
        <View style={styles.dateValueRow}>
          <Ionicons name="calendar-outline" size={18} color={brandBlue} />
          <Text style={styles.dateValue}>{displayDate(date)}</Text>
        </View>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShow(Platform.OS === 'ios');
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  webInputStyle:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0, 
    width: '100%',
    cursor: 'pointer',
  },
  datePickerBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ECEDEE',
    borderRadius: 12,
    backgroundColor: '#fff',
    position: 'relative',
    minWidth: 160,
  },
  dateLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: brandOrange,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  dateValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#151718',
  },
});