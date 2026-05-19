import { Theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000' }} 
      style={styles.background}
    >
      {/* Dark overlay to make text pop */}
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>

          <View style={styles.topSection}>
            {/* Replace with your actual logo file */}
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>UR <Text style={{color: Theme.colors.primary}}>OWN</Text> <Text style={{color: '#fff'}}>STORAGE</Text></Text>
            </View>
            <Text style={styles.tagline}>Safe, local storage right in your neighborhood.</Text>
          </View>

          <View style={styles.bottomSection}>
            <TouchableOpacity 
              style={styles.primaryBtn}
              onPress={() => router.push('/(auth)/register')}
            >
              <Text style={styles.primaryBtnText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryBtn}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text style={styles.secondaryBtnText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.guestBtn}
              onPress={() => router.replace('/home')}
            >
              <Text style={styles.guestBtnText}>Continue as Guest</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.footerText}>
              By continuing, you agree to our Terms of Service.
            </Text>
          </View>

        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)', // Tint to make text readable
    padding: Theme.spacing.lg,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    marginTop: 60,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '900',
    color: Theme.colors.secondary,
    letterSpacing: -1,
  },
  tagline: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    opacity: 0.9,
    paddingHorizontal: 20,
  },
  bottomSection: {
    marginBottom: 20,
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: Theme.colors.secondary, // Brand Orange
    height: 56,
    borderRadius: Theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryBtn: {
    backgroundColor: '#fff',
    height: 56,
    borderRadius: Theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: Theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  guestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 8,
  },
  guestBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footerText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});