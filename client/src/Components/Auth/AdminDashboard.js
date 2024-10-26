// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Fetch users, campaigns, and donations from the backend
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('/api/admin/users');
        const campaignsResponse = await axios.get('/api/admin/campaigns');
        const donationsResponse = await axios.get('/api/admin/donations');

        setUsers(usersResponse.data);
        setCampaigns(campaignsResponse.data);
        setDonations(donationsResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Manage Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email}) - {user.role}
          </li>
        ))}
      </ul>

      <h2>Campaigns Overview</h2>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign._id}>
            {campaign.title} - {campaign.goal} - {campaign.currentAmount}
          </li>
        ))}
      </ul>

      <h2>Donation Statistics</h2>
      <ul>
        {donations.map((donation) => (
          <li key={donation._id}>
            {donation.amount} donated to {donation.campaignTitle} by {donation.donorName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
