const handleConfirmMove = async () => {
  // 1. Core Input Validation Check
  if (!pickupAddress.trim()) {
    Alert.alert('Missing Information', 'Please provide a pickup location for your belongings.');
    return;
  }

  // 2. Build the structural payload object from state
  const movePayload = {
    propertyId,
    pickupAddress: pickupAddress.trim(),
    destinationAddress,
    vehicleType: selectedVehicle,
    crewSize: moversNeeded,
    totalCost: estimatedTotal
  };

  try {
    // 3. Initiate the HTTP POST request to your backend router
    // REPLACE '192.168.1.XX' WITH YOUR ACTUAL MACHINE LOCAL IP ADDRESS
    const response = await fetch('http://192.168.1.XX:5000/api/moving/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Passes your user's security token to bypass the auth middleware check
        'x-auth-token': 'YOUR_STORED_JWT_TOKEN' 
      },
      body: JSON.stringify(movePayload)
    });

    const data = await response.json();

    // 4. Handle Backend Response Lifecycle States
    if (data.success) {
      Alert.alert(
        '🌟 Move Scheduled!',
        `Your V STATES transit crew has been assigned.\nOrder Ref: ${data.order._id}`,
        [
          { 
            text: 'Track Live Progress', 
            onPress: () => navigation.navigate('TrackerTab', { orderId: data.order._id }) 
          }
        ]
      );
    } else {
      Alert.alert('Booking Refused', data.message || 'Could not validate transit parameters.');
    }

  } catch (error) {
    console.error('Fetch Client Error:', error);
    Alert.alert(
      'Network Timeout', 
      'Unable to reach the V STATES cloud infrastructure. Check your server IP binding connection.'
    );
  }
};