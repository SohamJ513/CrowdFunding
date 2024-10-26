import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className={`navbar ${!isAuthenticated ? 'hidden' : ''}`}>
      <Link to="/">Home</Link>
      <Link to="/campaigns">Campaigns</Link>
      {isAuthenticated && (
        <>
          <Link to="/create-campaign">Create Campaign</Link>
          <button onClick={onLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
