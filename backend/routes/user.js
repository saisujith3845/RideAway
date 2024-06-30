const express = require('express');
const User = require('../models/User');
const Booking = require('../models/Booking');

const { authenticateJWT } = require('../middleware/authenticateJWT');
const bcrypt = require('bcrypt');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/:user_id',authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.put('/:user_id', async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const user = await User.findByIdAndUpdate(req.params.user_id, req.body, { new: true });
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/:user_id/bookings', authenticateJWT, async (req, res) => {
    try {
        const bookings = await Booking.find({ user_id: req.params.user_id }).populate('vehicle_id', 'type model');
        if (bookings.length > 0) {
            res.status(200).send(bookings);
        } else {
            res.status(404).send({ error: 'Bookings not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
