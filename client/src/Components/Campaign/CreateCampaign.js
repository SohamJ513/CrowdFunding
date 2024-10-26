import React, { useState } from 'react';
import './CreateCampaign.css';

const CreateCampaign = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/campaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, goal }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('Campaign created successfully!');
      setTitle('');
      setDescription('');
      setGoal('');
    } else {
      alert('Error creating campaign: ' + data.message);
    }
  };

  return (
    <div>
      <h2>Create a Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Goal Amount:</label>
          <input 
            type="number" 
            value={goal} 
            onChange={(e) => setGoal(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
};

export default CreateCampaign;
