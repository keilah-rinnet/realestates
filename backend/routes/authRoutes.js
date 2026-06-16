const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Minimal inline User Schema for reference
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'realtor', 'driver'], default: 'customer' }
});

const User = mongoose.model('User', UserSchema);
const JWT_SECRET = process.env.JWT_SECRET || 'vstates_secret_key';

// 1. REGISTRATION ENDPOINT
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ success: false, message: 'User already exists' });

    user = new User({ name, email, password, role });

    // Hash the password safely using bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Sign JWT Token
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ success: true, token });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
});

// 2. LOGIN ENDPOINT
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid Credentials' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid Credentials' });

    // Sign and return JWT Token
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({ success: true, token, role: user.role });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

module.exports = router;