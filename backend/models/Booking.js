const mongoose = require('mongoose');
const Vehicle = require('./Vehicle'); 

const bookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    pickupLocation: { type: String }, 
    dropoffLocation: { type: String }, 
    totalCost: { type: Number }, 
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled','completed'], default: 'pending' } 
});


bookingSchema.pre('save', async function(next) {
    try {
        const booking = this;
        const vehicle = await Vehicle.findById(booking.vehicle_id);

        if (!vehicle) {
            throw new Error('Vehicle not found');
        }

        const rentPerHrs = vehicle.rentPerHrs;
        const durationInHours = Math.ceil((booking.end_date - booking.start_date) / (1000 * 60 * 60)); 
        console.log(durationInHours,rentPerHrs);
        booking.totalCost = rentPerHrs * durationInHours;

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
