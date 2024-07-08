//authenticateJWT.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateJWT = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid or expired token.' });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found.' });
        }
        if (user.isAdmin) {
            next();
        } else {
            res.status(403).send({ error: 'Access denied. Admin privileges required.' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Server error.' });
    }
};

module.exports = { authenticateJWT, isAdmin };
