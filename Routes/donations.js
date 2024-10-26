const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign'); // Adjust the path based on your project structure
const Donation = require('../models/Donations'); // Import the Donation model (ensure the file name matches)
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51QAZgxLXIpq3tJ5rAqeLjSKtEHoVIDF25Y9LfTO9tb61XkQcLSev0AnPEge3hORJZ90wL59GVfnnOtkb9ygJvPNY005WM5DkMH');

// Handle donations to a campaign
router.post('/:id/donate', async (req, res) => {
  const { id } = req.params;
  const { amount, name, email, phone } = req.body; // Include user details

  try {
    // Find the campaign by ID
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseFloat(amount) * 100, // Convert to cents as Stripe requires the smallest currency unit
      currency: 'usd',
      description: `Donation to ${campaign.title}`, // Optional: Description of the donation
      receipt_email: email, // Send receipt to the user's email
    });

    // Respond with the client secret to complete the payment on the frontend
    res.status(200).json({ clientSecret: paymentIntent.client_secret, message: 'Payment intent created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the payment intent' });
  }
});

// Handle updating the campaign and saving the donation after successful payment
router.post('/:id/donation-complete', async (req, res) => {
  const { id } = req.params;
  const { amount, name, email, phone } = req.body;

  try {
    // Find the campaign by ID
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Add the donation amount to the current amount
    campaign.currentAmount += parseFloat(amount);

    // Create a new donation document
    const donation = new Donation({
      amount: parseFloat(amount),
      name,
      email,
      phone,
      campaign: campaign._id, // Reference the campaign
    });

    // Save the donation and updated campaign to the database
    await donation.save();
    await campaign.save();

    res.status(200).json({ message: 'Donation successful', campaign });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the donation' });
  }
});

module.exports = router;
