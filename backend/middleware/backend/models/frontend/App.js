import React from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import PropertyCard from './frontend/src/components/PropertyCard';

// Dummy data from our previous step
const dummyProperties = [
  {
    _id: "prop_01",
    title: "The Urban Zenith Penthouse",
    location: "Nakasero, Kampala",
    price: 250,
    type: "short_term",
    beds: 2,
    baths: 2,
    sqft: 1450,
    isMoveEligible: true,
    address: "Plot 12, Nakasero Road, Kampala",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
  },
  {
    _id: "prop_02",
    title: "Serene Heights Apartment",
    location: "Kololo, Kampala",
    price: 1800,
    type: "long_term",
    beds: 3,
    baths: 3.5,
    sqft: 2200,
    isMoveEligible: true,
    address: "Acacia Avenue, Block B, Kololo, Kampala",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  }
];

export default function ExploreScreen({ navigation }) {
  
  const handlePropertyPress = (property) => {
    // Navigate to 'PropertyDetails' and send the entire property object as parameters
    navigation.navigate('PropertyDetails', { property });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dummyProperties}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PropertyCard 
            property={item} 
            onPress={() => handlePropertyPress(item)} 
          />
        )}
        contentContainerStyle={styles.listPadding}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listPadding: {
    paddingBottom: 20,
  }
});