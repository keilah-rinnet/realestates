const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS allowed for mobile testing
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`🔌 Client connected to sockets: ${socket.id}`);

  // 1. Join a specific room based on the Moving Order ID
  socket.on('join_order_track', (orderId) => {
    socket.join(orderId);
    console.log(`📦 User joined tracking room for order: ${orderId}`);
  });

  // 2. Listen for live coordinate updates broadcasted by the Driver App
  socket.on('update_driver_location', (data) => {
    const { orderId, latitude, longitude, speed, status } = data;
    
    // 3. Broadcast the fresh coordinates to everyone inside that order's room (the customer)
    io.to(orderId).emit('driver_location_changed', {
      latitude,
      longitude,
      speed,
      status
    });
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected from sockets');
  });
});

// Start listening via the HTTP server wrapper instead of app.listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Secure Server active on port ${PORT}`));