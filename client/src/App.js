import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import CampaignList from './Components/Campaign/CampaignList';
import CampaignDetail from './Components/Campaign/CampaignDetail';
import CreateCampaign from './Components/Campaign/CreateCampaign';
import AdminDashboard from './Components/Auth/AdminDashboard';
import UserDashboard from './Components/Auth/UserDashboard';
import Donate from './Components/Donate'; // Import Donate Component
import './App.css';
import axios from 'axios';

// Stripe-related imports
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51QAZgxLXIpq3tJ5rvJNrnwNDXnrQVwi0rR3cGXJCioWA8Dql0kaHHeq5zc1eesEpJCZzDquX2oLsdD9oUz6qS0wu00JYmU7vKG');

const App = () => {
  const [role, setRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Optionally, fetch user role if needed
      const fetchUserRole = async () => {
        try {
          const response = await axios.get('/api/auth/me'); // Backend endpoint to get user data
          setRole(response.data.role); // Set the role based on the API response
        } catch (error) {
          console.error('Error fetching user role', error);
        }
      };

      fetchUserRole();
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setIsAuthenticated(false); // Update authentication state
    setRole(''); // Clear role
  };

  return (
    <AuthProvider>
      <Router>
        {/* Pass isAuthenticated and onLogout to Navbar */}
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="container">
          <Routes>
            {/* Render Home component at the root path */}
            <Route path="/" element={<Home />} />
            <Route path="/campaigns" element={<CampaignList />} />
            <Route path="/campaigns/:id" element={<CampaignDetail />} />
            <Route 
              path="/create-campaign" 
              element={isAuthenticated ? <CreateCampaign /> : <Navigate to="/login" />} 
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

            {/* Admin and User Dashboard Routes */}
            <Route path="/admin" element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
            <Route path="/dashboard" element={role === 'user' ? <UserDashboard /> : <Navigate to="/" />} />

            {/* Stripe Donations Route */}
            <Route
              path="/campaigns/:id/donate"
              element={
                <Elements stripe={stripePromise}>
                  <Donate />
                </Elements>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
