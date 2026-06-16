import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function PropertyCard({ property, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onPress} style={styles.cardContainer}>
      {/* 1. MEDIA DISPLAY PANEL & RENTAL TIER BADGE */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: property.imageUrl || 'https://via.placeholder.com/400x250' }} 
          style={styles.propertyImage} 
        />
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>
            {property.type === 'short_term' ? 'Short Stay' : 'Long Term'}
          </Text>
        </View>
      </View>

      {/* 2. PROPERTY CARD PROFILE DETAILS */}
      <View style={styles.infoContainer}>
        
        {/* Title Frame and Pricing Metrics */}
        <View style={styles.titleRow}>
          <Text style={styles.titleText} numberOfLines={1}>
            {property.title}
          </Text>
          <Text style={styles.priceText}>
            ${property.price}
            <Text style={styles.priceUnit}>{property.type === 'short_term' ? '/night' : '/mo'}</Text>
          </Text>
        </View>

        {/* Location Summary */}
        <Text style={styles.locationText} numberOfLines={1}>
          📍 {property.location}
        </Text>

        {/* 3. INTEGRATED V MOVE PARTNERSHIP BADGE */}
        {property.isMoveEligible && (
          <View style={styles.movingBadge}>
            <Text style={styles.movingBadgeText}>📦 V Move Eligible (Instant Quotes Available)</Text>
          </View>
        )}

        <View style={styles.divider} />

        {/* 4. REAL ESTATE SPECIFICATIONS BAR */}
        <View style={styles.specsRow}>
          <View style={styles.specItem}>
            <Text style={styles.specValue}>🛏️ {property.beds} <Text style={styles.specLabel}>Beds</Text></Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specValue}>🛁 {property.baths} <Text style={styles.specLabel}>Baths</Text></Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specValue}>📐 {property.sqft} <Text style={styles.specLabel}>sq ft</Text></Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  typeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  infoContainer: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  titleText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#007AFF', 
  },
  priceUnit: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
  },
  locationText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  movingBadge: {
    backgroundColor: '#E8F2FF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  movingBadgeText: {
    color: '#007AFF',
    fontSize: 11,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 12,
  },
  specsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
  },
  specLabel: {
    fontWeight: '400',
    color: '#888888',
  },
});