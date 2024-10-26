import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CampaignList.css'; // Import the CSS file

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaigns');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="campaign-list"> {/* Add className for styling */}
      <h2>Campaigns</h2>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign._id}>
            <Link to={`/campaigns/${campaign._id}`}>{campaign.title}</Link>
            <p>Current Amount: ${campaign.currentAmount} / Target Amount: ${campaign.targetAmount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignList;
