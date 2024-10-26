// authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware to check user role
const checkRole = (roles) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1]; // Assuming token is in the format "Bearer token"
        if (!token) {
            return res.status(403).send({ message: 'Access denied, no token provided' });
        }
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret here
            req.user = decoded; // Attach user info to request object
            
            // Check if user role matches
            if (!roles.includes(req.user.role)) {
                return res.status(403).send({ message: 'Access denied, insufficient permissions' });
            }
            
            next(); // Proceed to the next middleware/route handler
        } catch (error) {
            return res.status(400).send({ message: 'Invalid token' });
        }
    };
};

module.exports = checkRole;
