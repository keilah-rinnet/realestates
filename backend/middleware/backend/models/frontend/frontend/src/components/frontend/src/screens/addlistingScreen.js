import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';

export default function AddListingScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('short_term');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [sqft, setSqft] = useState('');
  const [isMoveEligible, setIsMoveEligible] = useState(true);

  const handlePublish = async () => {
    if (!title || !location || !address || !price) {
      Alert.alert('Incomplete Form', 'Please fill out the mandatory listing parameters.');
      return;
    }

    const listingPayload = {
      title, location, address, price: parseFloat(price),
      type, beds: parseInt(beds) || 0, baths: parseFloat(baths) || 0,
      sqft: parseInt(sqft) || 0, isMoveEligible
    };

    try {
      const response = await fetch('http://YOUR_LOCAL_IP_ADDRESS:5000/api/properties/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': 'YOUR_STORED_JWT_TOKEN'
        },
        body: JSON.stringify(listingPayload),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert('🎉 Success', 'Property has been listed on V STATES!', [
          { text: 'Awesome', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Network Error', 'Could not connect to the publishing network.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>Create New Listing</Text>

      <Text style={styles.sectionLabel}>Core Information</Text>
      <TextInput style={styles.input} placeholder="Property Title" value={title} onChangeText={setTitle} placeholderTextColor="#A0AEC0" />
      <TextInput style={styles.input} placeholder="Neighborhood Location" value={location} onChangeText={setLocation} placeholderTextColor="#A0AEC0" />
      <TextInput style={styles.input} placeholder="Full Address Street Location" value={address} onChangeText={setAddress} placeholderTextColor="#A0AEC0" />

      <Text style={styles.sectionLabel}>Pricing & Type</Text>
      <TextInput style={styles.input} placeholder="Price (USD)" keyboardType="numeric" value={price} onChangeText={setPrice} placeholderTextColor="#A0AEC0" />
      
      <View style={styles.toggleRow}>
        <TouchableOpacity style={[styles.typeBtn, type === 'short_term' && styles.typeBtnActive]} onPress={() => setType('short_term')}>
          <Text style={[styles.typeBtnText, type === 'short_term' && styles.typeBtnTextActive]}>Short Stay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.typeBtn, type === 'long_term' && styles.typeBtnActive]} onPress={() => setType('long_term')}>
          <Text style={[styles.typeBtnText, type === 'long_term' && styles.typeBtnTextActive]}>Long Term</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionLabel}>Property Specs</Text>
      <View style={styles.gridRow}>
        <TextInput style={[styles.input, styles.gridInput]} placeholder="Beds" keyboardType="numeric" value={beds} onChangeText={setBeds} placeholderTextColor="#A0AEC0" />
        <TextInput style={[styles.input, styles.gridInput]} placeholder="Baths" keyboardType="numeric" value={baths} onChangeText={setBaths} placeholderTextColor="#A0AEC0" />
        <TextInput style={[styles.input, styles.gridInput]} placeholder="Sq Ft" keyboardType="numeric" value={sqft} onChangeText={setSqft} placeholderTextColor="#A0AEC0" />
      </View>

      <View style={styles.switchContainer}>
        <View style={styles.switchTextContainer}>
          <Text style={styles.switchLabel}>📦 V Move Partnership</Text>
          <Text style={styles.switchSublabel}>Allow users to instantly order transport services to this address.</Text>
        </View>
        <Switch value={isMoveEligible} onValueChange={setIsMoveEligible} thumbColor={isMoveEligible ? "#007AFF" : "#F4F4F5"} />
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={handlePublish}>
        <Text style={styles.submitBtnText}>Publish Listing</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContainer: { padding: 20 },
  header: { fontSize: 24, fontWeight: '700', color: '#1A1A1A', marginBottom: 20 },
  sectionLabel: { fontSize: 12, fontWeight: '700', color: '#718096', textTransform: 'uppercase', marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, padding: 14, fontSize: 15, color: '#2D3748', marginBottom: 12 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  typeBtn: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, alignItems: 'center', backgroundColor: '#FFFFFF', marginHorizontal: 4 },
  typeBtnActive: { borderColor: '#007AFF', backgroundColor: '#F4F9FF' },
  typeBtnText: { color: '#718096', fontWeight: '600' },
  typeBtnTextActive: { color: '#007AFF' },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between' },
  gridInput: { flex: 1, marginHorizontal: 4, textAlign: 'center' },
  switchContainer: { flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', marginTop: 12, marginBottom: 24 },
  switchTextContainer: { flex: 1, paddingRight: 10 },
  switchLabel: { fontSize: 14, fontWeight: '700', color: '#2D3748' },
  switchSublabel: { fontSize: 11, color: '#718096', marginTop: 2 },
  submitBtn: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 30 },
  submitBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' }
});