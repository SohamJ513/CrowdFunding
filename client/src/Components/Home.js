import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../AuthContext'; // Import useAuth to access authentication context
import './Home.css';

const Homepage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const { isAuthenticated } = useAuth(); // Get authentication status

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/campaigns');
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    
    fetchCampaigns();
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Empowering Dreams Through Crowdfunding
          </h1>
          <p className="hero-description">
            Join our community of changemakers and innovators. Whether you want to 
            support a cause or bring your own project to life, you're in the right place.
          </p>
          <button 
            className="hero-button" 
            onClick={() => {
              if (isAuthenticated) {
                navigate('/create-campaign');
              } else {
                alert("You need to log in to start a campaign!");
                navigate('/login');
              }
            }}
          >
            Start Your Campaign
          </button>
          <button className="hero-button" onClick={() => navigate('/register')}>
            Register
          </button>
          <button className="hero-button" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">$2M+</div>
            <div className="stat-label">Funds Raised</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Successful Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Happy Backers</div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="projects-section">
        <div className="projects-container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <div key={campaign._id} className="project-card">
                  <div className="project-image">
                    <img
                      src={campaign.imageUrl || '/placeholder-image.jpg'}
                      alt={campaign.title}
                    />
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">{campaign.title}</h3>
                    <p className="project-description">
                      {campaign.description}
                    </p>
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill"
                        style={{ width: `${(campaign.currentAmount / campaign.goal) * 100}%` }}
                      ></div>
                    </div>
                    <div className="project-stats">
                      <span>
                        {campaign.currentAmount !== undefined && !isNaN(campaign.currentAmount)
                          ? `$${campaign.currentAmount.toLocaleString()} raised`
                          : 'N/A'}
                      </span>
                      <span>
                        {campaign.currentAmount !== undefined && campaign.goal !== undefined
                          ? `${((campaign.currentAmount / campaign.goal) * 100).toFixed(1)}%`
                          : 'N/A'}
                      </span>
                    </div>
                    {/* Add onClick for navigating to the campaigns page */}
                    <button 
                      className="project-button" 
                      onClick={() => {
                        if (isAuthenticated) {
                          navigate('/campaigns');
                        } else {
                          alert("You need to log in to view projects!");
                          navigate('/login');
                        }
                      }}
                    >
                      View Project
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="loading-state">
                <div className="loading-pulse">
                  <div style={{ height: "2rem", background: "#e5e7eb", borderRadius: "0.25rem", width: "12rem", marginBottom: "1rem" }}></div>
                  <div style={{ height: "1rem", background: "#e5e7eb", borderRadius: "0.25rem", width: "16rem" }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="steps-container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">
                <span>1</span>
              </div>
              <h3 className="step-title">Create Your Campaign</h3>
              <p className="step-description">
                Share your story, set your goals, and start collecting donations
              </p>
            </div>
            <div className="step-item">
              <div className="step-number">
                <span>2</span>
              </div>
              <h3 className="step-title">Share With Friends</h3>
              <p className="step-description">
                Spread the word through social media and email
              </p>
            </div>
            <div className="step-item">
              <div className="step-number">
                <span>3</span>
              </div>
              <h3 className="step-title">Make A Difference</h3>
              <p className="step-description">
                Watch your campaign grow and make your dreams reality
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
