const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from header

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.userId = decoded.userId; // Set userId in the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;