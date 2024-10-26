const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Donation = mongoose.model('Donation', DonationSchema);
module.exports = Donation;
