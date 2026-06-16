import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function PropertyDetailScreen({ route, navigation }) {
  // Extract the specific property object handed off by the navigator
  const { property } = route.params;

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Image source={{ uri: property.imageUrl }} style={styles.heroImage} />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.price}>
          ${property.price}
          <Text style={styles.priceUnit}>{property.type === 'short_term' ? ' / night' : ' / month'}</Text>
        </Text>
        <Text style={styles.addressText}>📍 {property.address}</Text>

        <View style={styles.divider} />
        
        <Text style={styles.sectionHeader}>Overview</Text>
        <Text style={styles.description}>
          This pristine space offers exceptional natural lighting, modern high-end finishes, and integrated access to smart utilities. Perfect for professionals looking for comfort and unparalleled convenience.
        </Text>

        {/* Action Feature: Direct connection to logistics */}
        {property.isMoveEligible && (
          <View style={styles.logisticsBox}>
            <Text style={styles.logisticsTitle}>📦 V STATES Seamless Moving</Text>
            <Text style={styles.logisticsBody}>
              This estate supports our integrated transit crew. We can dispatch vehicles and loaders to securely transport your assets straight here.
            </Text>
            
            <TouchableOpacity 
              style={styles.moverButton}
              onPress={() => navigation.navigate('BookMover', {
                destinationAddress: property.address,
                propertyId: property._id
              })}
            >
              <Text style={styles.moverButtonText}>Book Transport to this Address</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroImage: {
    width: '100%',
    height: 300,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: '#007AFF',
    marginBottom: 8,
  },
  priceUnit: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  addressText: {
    fontSize: 15,
    color: '#555555',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 24,
  },
  logisticsBox: {
    backgroundColor: '#F4F9FF',
    borderWidth: 1,
    borderColor: '#D0E3FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  logisticsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 6,
  },
  logisticsBody: {
    fontSize: 13,
    color: '#4A5568',
    lineHeight: 18,
    marginBottom: 14,
  },
  moverButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  moverButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});