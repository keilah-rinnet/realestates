const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    realtorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links the property to the specific Realtor/Agent account who posted it
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please add a property title"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Please add a general neighborhood or city zone"], // e.g., "Kololo, Kampala"
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Please add the full physical street address"], // Crucial for auto-filling the moving destination
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a pricing value"],
    },
    type: {
      type: String,
      required: true,
      enum: ["short_term", "long_term"], // Differentiates between short-term stays (Airbnbs) and long-term lease rentals
      default: "short_term",
    },
    beds: {
      type: Number,
      required: [true, "Please specify the number of bedrooms"],
      default: 0,
    },
    baths: {
      type: Number,
      required: [true, "Please specify the number of bathrooms"],
      default: 0,
    },
    sqft: {
      type: Number,
      required: [true, "Please specify the square footage area"],
      default: 0,
    },
    imageUrl: {
      type: String,
      default: "https://via.placeholder.com/400x250", // Placeholder graphic if no image upload is initially supplied
    },
    isMoveEligible: {
      type: Boolean,
      default: true, // When true, it unlocks the "Book Transport" button on the app UI checkout screen
    },
  },
  {
    timestamps: true, // Automatically injects 'createdAt' and 'updatedAt' timestamp properties into MongoDB
  },
);

module.exports = mongoose.model("Property", PropertySchema);
