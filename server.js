const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./Routes/Auth');
const projectRoute = require('./Routes/projects');
const campaignRoute = require('./Routes/campaign');
const donationsRoute = require('./Routes/donations'); // Ensure this path is correct

dotenv.config(); // Load environment variables

const app = express(); // Initialize the app here, before using middleware

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true,
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/campaigns', campaignRoute);
app.use('/api/projects', projectRoute);

// Adjust this line based on your access control needs
app.use('/api/donations', donationsRoute);
// If you want all users to access donations, remove checkRole

app.get('/', (_req, res) => {
    res.send('Welcome to CrowdFundIt API');
});

// Error Handling Middleware
app.use((err, _req, res, _next) => {
    console.error('Error:', err.message || err);
    res.status(err.status || 500).send({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
