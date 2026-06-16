const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// Define a minimal inline Schema for Property reference
const PropertySchema = new mongoose.Schema({
  realtorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['short_term', 'long_term'], required: true },
  beds: { type: Number, required: true },
  baths: { type: Number, required: true },
  sqft: { type: Number, required: true },
  isMoveEligible: { type: Boolean, default: true },
  imageUrl: { type: String }
}, { timestamps: true });

const Property = mongoose.model('Property', PropertySchema);

// POST endpoint: Create a new estate listing
router.post('/create', auth, async (req, res) => {
  try {
    const { title, location, address, price, type, beds, baths, sqft, isMoveEligible, imageUrl } = req.body;

    // Validate that required fields exist
    if (!title || !location || !address || !price || !type) {
      return res.status(400).json({ success: false, message: 'Please provide all mandatory listing details.' });
    }

    const newProperty = new Property({
      realtorId: req.user.id, // Captured straight from your decoded JWT token middleware
      title,
      location,
      address,
      price,
      type,
      beds,
      baths,
      sqft,
      isMoveEligible,
      imageUrl: imageUrl || 'https://via.placeholder.com/400x250'
    });

    const savedProperty = await newProperty.save();
    return res.status(201).json({ success: true, property: savedProperty });

  } catch (error) {
    console.error('Error creating property listing:', error);
    return res.status(500).json({ success: false, message: 'Server error processing property upload.' });
  }
});

module.exports = router;