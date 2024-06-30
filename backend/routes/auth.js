const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateJWT } = require('../middleware/authenticateJWT');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, address, phone, isAdmin } = req.body;
        console.log(req.body)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'User already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({ name, email, password: hashedPassword, address, phone, isAdmin });
        await user.save();

        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        res.status(200).send({ token});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/logout', authenticateJWT, (req, res) => {
    res.status(200).send({ message: 'User logged out successfully' });
});

module.exports = router;
