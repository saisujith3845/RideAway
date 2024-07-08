const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    type: { type: String, enum: ['car', 'bike'], required: true },
    color: { type: String }, 
    fuelType: { type: String, enum: ['petrol', 'diesel','electric','hybrid'] }, 
    rentPerHrs: { type: Number }, 
    availability: { type: Boolean, default: true },
    img: {
        data: Buffer,
        contentType: String,
      }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
