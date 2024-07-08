const express = require('express');
const Booking = require('../models/Booking');
const Vehicle=require('../models/Vehicle')
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
        const { start_date, end_date, pickupLocation, dropoffLocation } = req.body;

        const booking = await Booking.findOne({ _id: req.params.booking_id, user_id: req.user.id }).populate('vehicle_id');
        if (!booking) {
            return res.status(404).send({ error: 'Booking not found' });
        }

        // Assuming the vehicle's rate per day is stored in the vehicle model
        const vehicle = booking.vehicle_id;
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const totalCost = vehicle.rentPerHrs * days;

        booking.start_date = start_date;
        booking.end_date = end_date;
        booking.pickupLocation = pickupLocation;
        booking.dropoffLocation = dropoffLocation;
        booking.totalCost = totalCost;

        await booking.save();

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

        const vehicle = await Vehicle.findByIdAndUpdate(booking.vehicle_id, { availability: true });
        if (!vehicle) {
            return res.status(404).send({ error: 'Vehicle not found' });
        }

        res.status(200).send({ message: 'Booking cancelled and vehicle availability updated successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
