const express = require('express');
const Booking = require('../models/Booking');
const { authenticateJWT, isAdmin } = require('../middleware/authenticateJWT');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', authenticateJWT,async (req, res) => {
    try {
        console.log(req.user);
        const bookings = await Booking.find({ user_id: req.user.id }).populate('vehicle_id');
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.post('/', authenticateJWT, async (req, res) => {
    try {
        const { vehicle_id, start_date, end_date, pickupLocation, dropoffLocation } = req.body;
        const booking = new Booking({
            vehicle_id,
            start_date,
            end_date,
            pickupLocation,
            dropoffLocation,
            user_id: req.user.id
        });
        await booking.save();
        res.status(201).send(booking);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.get('/:booking_id', authenticateJWT, async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.params.booking_id, user_id: req.user.id }).populate('vehicle_id');
        if (!booking) {
            return res.status(404).send({ error: 'Booking not found' });
        }
        res.status(200).send(booking);
    } catch (error) {
        console.error('Error retrieving booking:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

router.put('/:booking_id', authenticateJWT, async (req, res) => {
    try {
        const booking = await Booking.findOneAndUpdate({ _id: req.params.booking_id, user_id: req.user.id }, req.body, { new: true });
        if (!booking) {
            return res.status(404).send({ error: 'Booking not found' });
        }
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.delete('/:booking_id', authenticateJWT, async (req, res) => {
    try {
        const booking = await Booking.findOneAndDelete({ _id: req.params.booking_id, user_id: req.user.id });
        if (!booking) {
            return res.status(404).send({ error: 'Booking not found' });
        }
        res.status(200).send({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
