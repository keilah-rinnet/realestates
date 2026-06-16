const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import middleware
const MovingOrder = require('../models/MovingOrder');

// Add 'auth' as the second argument to lock down this POST endpoint
router.post('/schedule', auth, async (req, res) => {
  try {
    const { propertyId, pickupAddress, destinationAddress, vehicleType, crewSize, totalCost } = req.body;

    if (!propertyId || !pickupAddress || !destinationAddress || !totalCost) {
      return res.status(400).json({ success: false, message: "Missing core data fields." });
    }

    const newMovingOrder = new MovingOrder({
      userId: req.user.id, // Successfully captured from decrypted JWT token!
      propertyId,
      pickupAddress,
      destinationAddress,
      vehicleType,
      crewSize,
      totalCost
    });

    const savedOrder = await newMovingOrder.save();
    return res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});