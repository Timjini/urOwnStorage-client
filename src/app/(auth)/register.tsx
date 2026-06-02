import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 24 }}>

          <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 30 }}>
            <Ionicons name="arrow-back" size={24} color="#151718" />
          </TouchableOpacity>

          <View style={{ marginBottom: 40 }}>
            <Text style={{ fontSize: 32, fontWeight: '800', color: '#151718', marginBottom: 8 }}>Create Account</Text>
            <Text style={{ fontSize: 16, color: '#687076' }}>Join the community to find storage space</Text>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', marginBottom: 8, textTransform: 'uppercase' }}>Full Name</Text>
              <TextInput 
                style={{ height: 55, backgroundColor: '#F5F7F9', borderRadius: 12, paddingHorizontal: 16, borderWidth: 1, borderColor: '#ECEDEE' }}
                placeholder="John Doe"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', marginBottom: 8, textTransform: 'uppercase' }}>Email</Text>
              <TextInput 
                style={{ height: 55, backgroundColor: '#F5F7F9', borderRadius: 12, paddingHorizontal: 16, borderWidth: 1, borderColor: '#ECEDEE' }}
                placeholder="email@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', marginBottom: 8, textTransform: 'uppercase' }}>Phone Number</Text>
              <TextInput 
                style={{ height: 55, backgroundColor: '#F5F7F9', borderRadius: 12, paddingHorizontal: 16, borderWidth: 1, borderColor: '#ECEDEE' }}
                placeholder="+1 258...."
                value={phone}
                onChangeText={setPhone}
                keyboardType="name-phone-pad"
                autoCapitalize="none"
              />
            </View>

            <View style={{ marginBottom: 30 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', marginBottom: 8, textTransform: 'uppercase' }}>Password</Text>
              <TextInput 
                style={{ height: 55, backgroundColor: '#F5F7F9', borderRadius: 12, paddingHorizontal: 16, borderWidth: 1, borderColor: '#ECEDEE' }}
                placeholder="Minimum 8 characters"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
                style={{ backgroundColor: '#0a7ea4', height: 56, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => router.replace('/(tabs)')}
            >
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Get Started</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ color: '#687076' }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={{ color: '#C83803', fontWeight: '700' }}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}