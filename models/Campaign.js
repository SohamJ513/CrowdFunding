const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  amountRaised: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Campaign = mongoose.model('Campaign', CampaignSchema);
module.exports = Campaign;
