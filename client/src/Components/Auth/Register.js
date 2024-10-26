import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Ensure your CSS file is imported

function Register() {
  const [role, setRole] = useState('user'); // Default to user
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State to hold success or error messages

  const handleSubmit = async (e) => {
    const baseUrl = "http://localhost:5000";
    e.preventDefault();

    // Client-side validation (optional)
    if (!name || !email || !password) {
      setMessage('All fields are required.');
      return;
    }

    console.log({name, email, password, role});

    try {
      const response = await axios.post(`${baseUrl}/api/auth/register`, {name, email, password, role}, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(response);

      if (response.status === 201) {
        setMessage(response.data.message || 'Registration successful!'); // Set success message
      }
      
      // Clear input fields on successful registration
      setName('');
      setEmail('');
      setPassword('');
      setRole('user'); // Reset to default role
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || 'User registration failed'); // Set error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
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
      
      {/* Role Selection with Proper Alignment */}
      <div className="role-selection">
        <label>
          <input
            type="radio"
            value="user"
            checked={role === 'user'}
            onChange={() => setRole('user')}
          />
          User
        </label>
        <label>
          <input
            type="radio"
            value="admin"
            checked={role === 'admin'}
            onChange={() => setRole('admin')}
          />
          Admin
        </label>
      </div>
      
      <button type="submit">Register</button>
      
      {/* Display Success/Error Messages */}
      {message && <p className={message.includes('failed') ? 'error' : 'success'}>{message}</p>}
    </form>
  );
}

export default Register;
