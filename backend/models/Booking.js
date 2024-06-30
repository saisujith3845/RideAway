const mongoose = require('mongoose');
const Vehicle = require('./Vehicle'); // Adjust the path to where your Vehicle model is located

const bookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    pickupLocation: { type: String }, // Added pickupLocation attribute
    dropoffLocation: { type: String }, // Added dropoffLocation attribute
    totalCost: { type: Number }, // Added totalCost attribute
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' } // Added status attribute
});

// Pre-save middleware to calculate totalCost
bookingSchema.pre('save', async function(next) {
    try {
        const booking = this;
        const vehicle = await Vehicle.findById(booking.vehicle_id);

        if (!vehicle) {
            throw new Error('Vehicle not found');
        }

        const rentPerHrs = vehicle.rentPerHrs;
        const durationInHours = Math.ceil((booking.end_date - booking.start_date) / (1000 * 60 * 60)); // Duration in hours
        console.log(durationInHours,rentPerHrs);
        booking.totalCost = rentPerHrs * durationInHours;

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
