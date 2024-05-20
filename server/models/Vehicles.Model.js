const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
    type: { type: String, required: true },
    model: { type: String, required: true },
    available: { type: Boolean, required: true },
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProviders'
    },
    review: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reviews'
        }
    ]
})
const vehicleModel = mongoose.model("Vehicle", vehicleSchema);

module.exports = vehicleModel;