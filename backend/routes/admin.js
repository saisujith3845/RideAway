const express = require('express');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const { authenticateJWT, isAdmin } = require('../middleware/authenticateJWT');

const router = express.Router();

router.use(authenticateJWT, isAdmin);

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.delete('/users/:user_id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.user_id);
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).send(vehicles);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.delete('/vehicles/:vehicle_id', async (req, res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.vehicle_id);
        res.status(200).send({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.delete('/bookings/:booking_id', async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.booking_id);
        res.status(200).send({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.delete('/reviews/:review_id', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.review_id);
        res.status(200).send({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Add more admin routes as needed

module.exports = router;
