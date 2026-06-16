const express = require('express');
const router = express.Router();
/*const MovingOrder = require('../models/MovingOrder');*/ //previousliy 
const movingRoutes = require('./routes/movingRoutes');

// POST route to schedule a new transit order
router.post('/schedule', async (req, res) => {
  try {
    const { propertyId, pickupAddress, destinationAddress, vehicleType, crewSize, totalCost } = req.body;

    // 1. Essential field verification
    if (!propertyId || !pickupAddress || !destinationAddress || !totalCost) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing core data fields required to calculate transit parameters." 
      });
    }

    // 2. Instantiate and map the incoming payload to the database document
    // NOTE: In production, mockUserId should be replaced by req.user.id from your JWT auth middleware
    const newMovingOrder = new MovingOrder({
      userId: "65f123456789abcdef012345", // Mock authenticated user ID placeholder
      propertyId,
      pickupAddress,
      destinationAddress,
      vehicleType,
      crewSize,
      totalCost
    });

    // 3. Persist document directly to MongoDB
    const savedOrder = await newMovingOrder.save();

    // 4. Return complete order data back to frontend dashboard context
    return res.status(201).json({
      success: true,
      message: "V STATES transit crew scheduled successfully!",
      order: savedOrder
    });

  } catch (error) {
    console.error("Error creating moving order:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error processing transport reservation." 
    });
  }
});

module.exports = router;