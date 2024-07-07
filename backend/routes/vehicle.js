const express = require('express');
const Vehicle = require('../models/Vehicle');
const { authenticateJWT, isAdmin } = require('../middleware/authenticateJWT');
const multer = require('multer');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get all vehicles (accessible to authenticated users)
router.get('/',authenticateJWT, async (req, res) => {
    try {
      const vehicles = await Vehicle.find();
      const vehiclesWithBase64Images = vehicles.map(vehicle => ({
        _id: vehicle._id,
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        type: vehicle.type,
        color: vehicle.color,
        fuelType: vehicle.fuelType,
        rentPerHrs: vehicle.rentPerHrs,
        availability: vehicle.availability,
        img: vehicle.img.data ? {
          data: vehicle.img.data.toString('base64'),
          contentType: vehicle.img.contentType,
        } : null,
      }));
      res.status(200).json(vehiclesWithBase64Images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  router.post('/', upload.single('img'), async (req, res) => {
    try {
      const newVehicle = new Vehicle({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        type: req.body.type,
        color: req.body.color,
        fuelType: req.body.fuelType,
        rentPerHrs: req.body.rentPerHrs,
        availability: req.body.availability,
        img: req.file ? {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        } : null,
      });
      await newVehicle.save();
      res.status(201).json(newVehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



//   router.get('/:id/image', async (req, res) => {
//     try {
//       const vehicle = await Vehicle.findById(req.params.id);
//       if (!vehicle || !vehicle.img.data) {
//         return res.status(404).json({ error: 'Image not found' });
//       }
  
//       res.set('Content-Type', vehicle.img.contentType);
//       res.send(vehicle.img.data);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  


// Create a new vehicle (accessible only to admins)
router.post('/', authenticateJWT, isAdmin, async (req, res) => {
    try {
        const { make, model, year, type, color, fuelType, rentPerHrs, availability ,img} = req.body;
        const newVehicle = new Vehicle({
            make,
            model,
            year,
            type,
            color,
            fuelType,
            rentPerHrs,
            owner_id: req.user.id,
            availability,
            img,
        });
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific vehicle (accessible to authenticated users)
router.get('/:vehicle_id', authenticateJWT, async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.vehicle_id);
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        const vehicleWithBase64Image = {
            _id: vehicle._id,
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year,
            type: vehicle.type,
            color: vehicle.color,
            fuelType: vehicle.fuelType,
            rentPerHrs: vehicle.rentPerHrs,
            availability: vehicle.availability,
            img: vehicle.img && vehicle.img.data ? {
                data: vehicle.img.data.toString('base64'),
                contentType: vehicle.img.contentType,
            } : null,
        };

        res.status(200).json(vehicleWithBase64Image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Update a vehicle (accessible only to admins)
router.put('/:vehicle_id', authenticateJWT, upload.single('img'), async (req, res) => {
    try {
        const updates = {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            type: req.body.type,
            color: req.body.color,
            fuelType: req.body.fuelType,
            rentPerHrs: req.body.rentPerHrs,
            availability: req.body.availability,
        };

        if (req.file) {
            updates.img = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            };
        }

        const vehicle = await Vehicle.findByIdAndUpdate(req.params.vehicle_id, updates);
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

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
