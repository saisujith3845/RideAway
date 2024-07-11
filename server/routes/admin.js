const express = require('express');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const Notification=require('../models/Notification');
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
        const userId = req.params.user_id;

        await User.findByIdAndDelete(userId);

        await Booking.deleteMany({ user_id: userId });

        await Notification.deleteMany({ user_id: userId });

        await Review.deleteMany({ user_id: userId });

        res.status(200).send({ message: 'User, bookings, notifications, and reviews deleted successfully' });
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



router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user_id','email').populate('vehicle_id');
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

router.post('/bookings/:id/confirm', async (req, res) => {
    try {
      const bookingId = req.params.id;
      const booking = await Booking.findById(bookingId).populate('vehicle_id');
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      booking.status = 'confirmed';
      await booking.save();
  
      res.status(200).json({ message: 'Booking confirmed successfully', booking });
    } catch (error) {
      console.error('Error confirming booking:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Add more admin routes as needed

module.exports = router;
