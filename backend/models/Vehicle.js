const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    type: { type: String, enum: ['car', 'bike'], required: true },
    color: { type: String }, 
    fuelType: { type: String, enum: ['petrol', 'diesel'] }, 
    rentPerHrs: { type: Number }, 
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    availability: { type: Boolean, default: true }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
