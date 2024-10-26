const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures email is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Two types of roles
    default: 'user', // Default to 'user'
  },
});

module.exports = mongoose.model('User', userSchema);
