const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');

// Create a new campaign
router.post('/', async (req, res) => {
  const { title, description, goal } = req.body;
  try {
    const newCampaign = new Campaign({ title, description, goal });
    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(400).json({ message: 'Error creating campaign', error });
  }
});

// Get all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns', error });
  }
});

// Get a specific campaign
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign', error });
  }
});

// Update campaign (for donations)
router.patch('/:id', async (req, res) => {
  const { amount } = req.body;
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { $inc: { amountRaised: amount } },
      { new: true }
    );
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json(campaign);
  } catch (error) {
    res.status(400).json({ message: 'Error updating campaign', error });
  }
});

module.exports = router;
