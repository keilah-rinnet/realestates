import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import io from 'socket.io-client';

// Establish connection to your backend server
const SOCKET_URL = 'http://YOUR_LOCAL_IP_ADDRESS:5000';

export default function MovingTrackerScreen({ route, navigation }) {
  // Capture the order details passed from the successful booking payload
  const { orderId } = route.params || { orderId: 'demo_order_123' };

  // State managers to dynamically render asset vectors on your UI map
  const [driverLocation, setDriverLocation] = useState({ latitude: 0.3476, longitude: 32.5825 }); // Kampala defaults
  const [driverStatus, setDriverStatus] = useState('Awaiting Dispatch');
  const [eta, setEta] = useState('-- Mins');

  useEffect(() => {
    // 1. Initialize socket handshake connection
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      // 2. Securely join the isolated tracking stream room for this specific move
      socket.emit('join_order_track', orderId);
    });

    // 3. Listen for coordinates broadcasted by the server
    socket.on('driver_location_changed', (data) => {
      setDriverLocation({
        latitude: data.latitude,
        longitude: data.longitude
      });
      if (data.status) setDriverStatus(data.status);
      // In production, you'd feed these lat/lng variants into a utility 
      // to calculate an accurate dynamic ETA metric
      setEta('11 Mins'); 
    });

    // Clean up connection gracefully when user leaves the screen
    return () => {
      socket.disconnect();
    };
  }, [orderId]);

  return (
    <View style={styles.container}>
      {/* SIMULATED SPATIAL VIEWPORT */}
      <View style={styles.mapMock}>
        {/* The coordinates from 'driverLocation' would map directly to <Marker coordinate={driverLocation} /> */}
        <View style={styles.truckPin}>
          <Text style={styles.pinIcon}>🚚</Text>
        </View>
        
        <Text style={styles.coordsText}>
          Live Lat: {driverLocation.latitude.toFixed(4)} | Lng: {driverLocation.longitude.toFixed(4)}
        </Text>
      </View>

      {/* BOTTOM CONTROL PANEL */}
      <View style={styles.hudSheet}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.statusLabel}>Transit Progress</Text>
            <Text style={styles.statusValue}>{driverStatus}</Text>
          </View>
          <View style={styles.etaBox}>
            <Text style={styles.etaLabel}>ETA</Text>
            <Text style={styles.etaValue}>{eta}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  mapMock: { flex: 1, backgroundColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
  truckPin: { padding: 10, backgroundColor: '#FFFFFF', borderRadius: 20, borderWidth: 2, borderColor: '#007AFF' },
  pinIcon: { fontSize: 24 },
  coordsText: { marginTop: 12, fontSize: 12, fontWeight: '600', color: '#4A5568' },
  hudSheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusLabel: { fontSize: 12, color: '#718096', fontWeight: '600', textTransform: 'uppercase' },
  statusValue: { fontSize: 20, fontWeight: '800', color: '#1A202C', marginTop: 2 },
  etaBox: { backgroundColor: '#E8F2FF', padding: 10, borderRadius: 12, alignItems: 'center' },
  etaLabel: { fontSize: 10, color: '#007AFF', fontWeight: '700' },
  etaValue: { fontSize: 14, fontWeight: '800', color: '#007AFF' }
});