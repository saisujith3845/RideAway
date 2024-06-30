const express = require('express');
const Notification = require('../models/Notification');
const { authenticateJWT } = require('../middleware/authenticateJWT');

const router = express.Router();

router.use(authenticateJWT);

router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find({ user_id: req.user.id });
        res.status(200).send(notifications);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const notification = new Notification({ ...req.body, user_id: req.user.id });
        await notification.save();
        res.status(201).send(notification);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
