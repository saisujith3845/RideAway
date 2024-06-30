const express = require('express');
const mongoose = require('mongoose');
const Review = require('../models/Review');
const { authenticateJWT } = require('../middleware/authenticateJWT');

const router = express.Router();

router.get('/:vehicle_id/', authenticateJWT, async (req, res) => {
  try {
    const { vehicle_id } = req.params;
    const vehicleObjectId =new  mongoose.Types.ObjectId(vehicle_id); // Convert to ObjectId using new

    console.log('Fetching reviews for vehicle_id:', vehicleObjectId);

    const reviews = await Review.find({vehicle_id:vehicle_id}).populate('user_id');
    console.log('Reviews fetched:', reviews);

    res.status(200).send(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send({ error: error.message });
  }
});

router.post('/:vehicle_id/', authenticateJWT, async (req, res) => {
  try {
    const { vehicle_id } = req.params;
    const vehicleObjectId = new mongoose.Types.ObjectId(vehicle_id); // Convert to ObjectId using new

    const review = new Review({ ...req.body, vehicle_id: vehicleObjectId, user_id: req.user.id });
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(400).send({ error: error.message });
  }
});

router.put('/:review_id', authenticateJWT, async (req, res) => {
  try {
    const { review_id } = req.params;

    const review = await Review.findByIdAndUpdate(review_id, req.body, { new: true }).populate('user_id', 'name');
    if (review) {
      res.status(200).send(review);
    } else {
      res.status(404).send({ error: 'Review not found' });
    }
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).send({ error: error.message });
  }
});

router.delete('/:review_id', authenticateJWT, async (req, res) => {
  try {
    const { review_id } = req.params;

    const review = await Review.findByIdAndDelete(review_id);
    if (review) {
      res.status(200).send({ message: 'Review deleted successfully' });
    } else {
      res.status(404).send({ error: 'Review not found' });
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
