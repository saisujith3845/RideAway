const express = require('express');
const Notification = require('../models/Notification');
const { authenticateJWT,isAdmin } = require('../middleware/authenticateJWT');

const router = express.Router();

router.use(authenticateJWT);

// GET all notifications for the authenticated user
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find({ user_id: req.user.id }).populate('vehicle_id');
        res.status(200).send(notifications);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// POST a new notification for the authenticated user
router.post('/', isAdmin, async (req, res) => {
    try {
        const notification = new Notification({ ...req.body });
        await notification.save();
        res.status(201).send(notification);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// DELETE a notification by ID
router.delete('/:id', async (req, res) => {
    try {
        const notification = await Notification.findOneAndDelete({ _id: req.params.id });
        if (!notification) {
            return res.status(404).send({ error: 'Notification not found' });
        }

        res.status(200).send({ message: 'Notification deleted' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
