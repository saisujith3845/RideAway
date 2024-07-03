const express = require('express');
const Vehicle = require('../models/Vehicle');
const { authenticateJWT, isAdmin } = require('../middleware/authenticateJWT');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Get all vehicles (accessible to authenticated users)
router.get('/', authenticateJWT,async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new vehicle (accessible only to admins)
router.post('/', authenticateJWT, isAdmin, async (req, res) => {
    try {
        const { make, model, year, type, color, fuelType, rentPerHrs, availability } = req.body;
        const newVehicle = new Vehicle({
            make,
            model,
            year,
            type,
            color,
            fuelType,
            rentPerHrs,
            owner_id: req.user.id,
            availability
        });
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific vehicle (accessible to authenticated users)
router.get('/:vehicle_id',authenticateJWT, async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.vehicle_id);
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a vehicle (accessible only to admins)
router.put('/:vehicle_id', authenticateJWT, async (req, res) => {
    try {
        const updates = req.body;
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.vehicle_id, updates);
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a vehicle (accessible only to admins)
router.delete('/:vehicle_id', authenticateJWT, isAdmin, async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.vehicle_id);
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.status(200).json({ message: 'Vehicle deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
