import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext'; // Import the Auth context
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Login.css'; // Ensure your CSS file is imported

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State to hold success or error messages
  const { login } = useAuth(); // Get the login function from Auth context
  const navigate = useNavigate(); // Get the navigate function for redirection

  const handleSubmit = async (e) => {
    const baseUrl = "http://localhost:5000";
    e.preventDefault();

    // Client-side validation (optional)
    if (!email || !password) {
      setMessage('Both email and password are required.');
      return;
    }

    console.log({ email, password });

    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, { email, password }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(response);

      if (response.status === 200) {
        setMessage(response.data.message || 'Login successful!'); // Set success message
        localStorage.setItem('token', response.data.token); // Store token in local storage
        login(response.data.token); // Call the login function from context with the token
        setIsAuthenticated(true); // Update the authenticated state in App.js
        setEmail(''); // Clear email input
        setPassword(''); // Clear password input
        navigate('/'); // Redirect to homepage after successful login
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.msg || 'Login failed'); // Set error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      
      <button type="submit">Login</button>
      
      {/* Display Success/Error Messages */}
      {message && <p className={message.includes('failed') ? 'error' : 'success'}>{message}</p>}
    </form>
  );
}

export default Login;
