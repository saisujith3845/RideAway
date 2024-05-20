const mongoose = require('mongoose');

const reviewsSchema = mongoose.Schema({
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers'
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicles'
    },
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProviders'
    }
})
const reviewsModel = mongoose.model("Review", reviewsSchema);

module.exports = reviewsModel;