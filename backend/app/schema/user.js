const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// --- User ---
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Apply plugin unique validator
userSchema.plugin(uniqueValidator);

// Export
module.exports = mongoose.model("User", userSchema);
