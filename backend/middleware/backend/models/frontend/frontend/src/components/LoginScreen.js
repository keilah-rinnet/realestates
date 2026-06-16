import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both your email and password.');
      return;
    }

    const loginPayload = {
      email: email.toLowerCase().trim(),
      password: password
    };

    try {
      // Replace with your computer's local IPv4 network address
      const response = await fetch('http://YOUR_LOCAL_IP_ADDRESS:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload)
      });

      const data = await response.json();

      if (data.success) {
        // In production, save 'data.token' securely using a utility like Expo SecureStore or AsyncStorage
        Alert.alert('Welcome back!', 'Authentication successful.', [
          { text: 'Enter V STATES', onPress: () => navigation.replace('AppMain') }
        ]);
      } else {
        Alert.alert('Authentication Failed', data.message);
      }
    } catch (error) {
      Alert.alert('Network Error', 'Could not establish connection to the authorization grid.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.brandContainer}>
        <Text style={styles.logoText}>V STATES</Text>
        <Text style={styles.tagline}>Premium Living & Relocation Ecosystem</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput 
          style={styles.input} 
          placeholder="name@example.com" 
          value={email} 
          onChangeText={setEmail} 
          autoCapitalize="none" 
          keyboardType="email-address"
          placeholderTextColor="#A0AEC0"
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder="••••••••" 
          secureTextEntry 
          value={password} 
          onChangeText={setPassword} 
          autoCapitalize="none"
          placeholderTextColor="#A0AEC0"
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerLink} onPress={() => Alert.alert('Navigate', 'Link this to your signup view next!')}>
          <Text style={styles.registerLinkText}>Don't have an account? <Text style={styles.highlightText}>Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  brandContainer: { alignItems: 'center', marginBottom: 40, paddingHorizontal: 20 },
  logoText: { fontSize: 36, fontWeight: '900', color: '#1A1A1A', letterSpacing: 2 },
  tagline: { fontSize: 13, color: '#718096', marginTop: 8, fontWeight: '500' },
  formContainer: { paddingHorizontal: 24 },
  inputLabel: { fontSize: 12, fontWeight: '700', color: '#4A5568', textTransform: 'uppercase', marginBottom: 6, marginLeft: 2 },
  input: { backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 16, fontSize: 15, color: '#2D3748', marginBottom: 20 },
  loginBtn: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#007AFF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 3 },
  loginBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  registerLink: { alignItems: 'center', marginTop: 24 },
  registerLinkText: { color: '#718096', fontSize: 14, fontWeight: '500' },
  highlightText: { color: '#007AFF', fontWeight: '700' }
});