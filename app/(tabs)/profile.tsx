import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const brandOrange = '#C83803';
const brandBlue = '#0a7ea4';
const mutedText = '#687076';

const MENU_ITEMS = [
  { label: 'My Bookings', icon: 'calendar-outline' },
  { label: 'Payment Methods', icon: 'card-outline' },
  { label: 'Security', icon: 'lock-closed-outline' },
  { label: 'Support', icon: 'help-circle-outline' },
];

export default function ProfileScreen() {
  const router = useRouter();

  // TOGGLE THIS: Set to null to see the Register/Login buttons
  const user = null; 
  // const user = { name: "John Doe", email: "johndoe@example.com" };

  // --- LOGGED OUT VIEW ---
  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.authContainer}>
          <View style={styles.authIconCircle}>
            <Ionicons name="person-add-outline" size={40} color={brandBlue} />
          </View>
          <Text style={styles.authTitle}>Join the Community</Text>
          <Text style={styles.authSub}>Login or create an account to manage your storage spaces and bookings.</Text>

          <View style={styles.authButtonGroup}>
            <TouchableOpacity 
              style={styles.loginBtn}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.registerBtn}
              onPress={() => router.push('/register')}
            >
              <Text style={styles.registerBtnText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // --- LOGGED IN VIEW ---
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color="#fff" />
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <View style={styles.card}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuItem,
                index < MENU_ITEMS.length - 1 && styles.menuItemBorder,
              ]}
              activeOpacity={0.7}
            >
              <Ionicons
                name={item.icon as any}
                size={22}
                color={brandOrange}
                style={styles.menuIcon}
              />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={mutedText} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
           <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scroll: { flex: 1 },
  content: { padding: 20 },

  // Auth Styles
  authContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 30 
  },
  authIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F7F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  authTitle: { fontSize: 24, fontWeight: '800', color: '#151718', marginBottom: 10 },
  authSub: { fontSize: 15, color: mutedText, textAlign: 'center', lineHeight: 22, marginBottom: 30 },
  authButtonGroup: { width: '100%', gap: 12 },
  loginBtn: { 
    backgroundColor: brandBlue, 
    height: 55, 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  registerBtn: { 
    height: 55, 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ECEDEE'
  },
  registerBtnText: { color: '#151718', fontSize: 16, fontWeight: '600' },

  // Profile Styles
  avatarSection: { alignItems: 'center', marginVertical: 30 },
  avatar: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: brandBlue, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom: 15 
  },
  name: { fontSize: 22, fontWeight: '800', color: '#151718' },
  email: { fontSize: 14, color: mutedText, marginTop: 4 },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: '#F5F7F9',
    overflow: 'hidden'
  },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16 
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: '#F5F7F9' },
  menuIcon: { marginRight: 15 },
  menuLabel: { flex: 1, fontSize: 16, fontWeight: '500', color: '#151718' },
  logoutBtn: { marginTop: 30, alignItems: 'center' },
  logoutText: { color: brandOrange, fontWeight: '700' }
});