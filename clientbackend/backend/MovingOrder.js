const mongoose = require('mongoose');

const MovingOrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  pickupAddress: {
    type: String,
    required: [true, 'Pickup address is required'],
    trim: true
  },
  destinationAddress: {
    type: String,
    required: [true, 'Destination address is auto-filled and required'],
    trim: true
  },
  vehicleType: {
    type: String,
    enum: ['pickup', 'box_truck', 'large_van'],
    default: 'box_truck'
  },
  crewSize: {
    type: Number,
    min: 0,
    max: 5,
    default: 2
  },
  totalCost: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in_transit', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true // Automatically generates createdAt and updatedAt fields
});

module.exports = mongoose.model('MovingOrder', MovingOrderSchema);