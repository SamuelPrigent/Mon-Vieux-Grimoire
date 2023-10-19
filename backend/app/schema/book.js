const mongoose = require("mongoose");

// --- Book ---
const thingSchema = mongoose.Schema({
  // id : { automatiquement généré }
  userId: { type: String, required: true }, // userId who created object
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imageUrlBig: { type: String, required: true },
  // userId in will be users who rated the book
  userRatings: [
    {
      userId: { type: String, required: true },
      rating: { type: Number, required: true },
    },
  ],
});

// Export
module.exports = mongoose.model("Book", thingSchema);
