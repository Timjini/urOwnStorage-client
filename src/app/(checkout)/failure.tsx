import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const brandOrange = '#C83803';
const mutedText = '#687076';

export default function FailureScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Failure Icon Badge */}
        <View style={styles.iconContainer}>
          <Ionicons name="close-circle" size={90} color={brandOrange} />
        </View>

        <Text style={styles.title}>Payment Failed</Text>
        <Text style={styles.subtitle}>
          Your transaction could not be processed. This might be due to insufficient funds, an expired card, or a temporary connection issue.
        </Text>

        <View style={styles.helpBox}>
          <Ionicons name="information-circle" size={18} color={mutedText} style={{ marginTop: 2 }} />
          <Text style={styles.helpText}>
            No funds have been deducted from your account. You can safely try your payment again or use a different card.
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Ionicons name="refresh-sharp" size={18} color="#fff" />
          <Text style={styles.primaryButtonText}>Try Payment Again</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.dismissAll()} 
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>Cancel Booking</Text>
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
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#151718',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: mutedText,
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 30,
  },
  helpBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF0EC',
    borderRadius: 12,
    padding: 16,
    gap: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#FCD7CE',
  },
  helpText: {
    fontSize: 13,
    color: '#652513',
    flex: 1,
    lineHeight: 18,
  },
  footer: {
    padding: 24,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: brandOrange,
    height: 55,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    color: mutedText,
    fontSize: 15,
    fontWeight: '600',
  },
});