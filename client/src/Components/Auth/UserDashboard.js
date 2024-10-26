// UserDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [user, setUser] = useState({});
  const [donations, setDonations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('/api/user/me'); // Fetch user profile
        const donationsResponse = await axios.get('/api/user/donations'); // Fetch user donations
        const campaignsResponse = await axios.get('/api/campaigns'); // Fetch available campaigns

        setUser(userResponse.data);
        setDonations(donationsResponse.data);
        setCampaigns(campaignsResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      <h2>Welcome, {user.name}</h2>
      <h3>Your Donations</h3>
      <ul>
        {donations.map((donation) => (
          <li key={donation._id}>
            {donation.amount} donated to {donation.campaignTitle}
          </li>
        ))}
      </ul>

      <h3>Available Campaigns</h3>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign._id}>
            {campaign.title} - Goal: {campaign.goal}
            <button onClick={() => handleDonate(campaign._id)}>Donate</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function handleDonate(campaignId) {
  // Logic to handle donation
  console.log(`Donate to campaign ${campaignId}`);
}

export default UserDashboard;
