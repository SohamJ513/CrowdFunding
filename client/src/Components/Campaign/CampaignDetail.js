import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CampaignDetail.css'; // Import the CSS file

const CampaignDetail = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState('');
  const [name, setName] = useState(''); // State for user's name
  const [email, setEmail] = useState(''); // State for user's email
  const [phone, setPhone] = useState(''); // State for user's phone number
  const [showForm, setShowForm] = useState(false); // State to show/hide the form

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/campaigns/${id}`);
        setCampaign(response.data);
      } catch (error) {
        console.error('Error fetching campaign details:', error);
      }
    };
    fetchCampaign();
  }, [id]);

  const handleDonate = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `http://localhost:5000/api/donations/${id}/donate`,
        { amount, name, email, phone }, // Include user's details in the donation request
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Donation successful!');
      // Clear input fields after donation
      setAmount('');
      setName('');
      setEmail('');
      setPhone('');
      setShowForm(false); // Hide form after donation
    } catch (error) {
      alert('Error making donation: ' + error.response.data.error);
    }
  };

  if (!campaign) return <div>Loading...</div>;

  return (
    <div className="campaign-detail">
      <h2>{campaign.title}</h2>
      <p>{campaign.description}</p>
      <p>
        Current Amount: ${campaign.currentAmount} / Target Amount: ${campaign.targetAmount}
      </p>

      {/* Toggle the visibility of the donation form */}
      <button className="toggle-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Donation Form' : 'Donate'}
      </button>

      {/* Donation Form - only shows when `showForm` is true */}
      {showForm && (
        <form className="donation-form" onSubmit={handleDonate}>
          <input
            type="number"
            placeholder="Donation Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit">Submit Donation</button>
        </form>
      )}
    </div>
  );
};

export default CampaignDetail;
