// routes/Auth.js
const express = require('express');
const User = require('../models/User'); // Ensure this path is correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Include JWT if you will use it for login

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body; // Accept input
    console.log({ name, email, password, role });

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role: role || 'user' }); // Default role is 'user'

        await newUser.save(); // Save user to the database
        res.status(201).json({ message: 'User registered successfully!' }); // Respond with success message
    } catch (error) {
        console.error('Registration error:', error); // Log error for debugging
        res.status(400).json({ error: 'User registration failed', details: error.message });
    }
});

// You can also add a login route here if needed
// 1. email, password <- req.body
// post request
// check email exsits in database
// hash the current password
// compare hash password and database password

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });

        }
        res.status(200).json({ message: 'logged in successfully!' });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}
);

module.exports = router;
