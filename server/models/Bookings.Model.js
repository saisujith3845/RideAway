const mongoose=require('mongoose')

const bookingSchema=mongoose.Schema({
    customerId:{type:mongoose.Schema.Types.ObjectId,ref:'Customers'},
    serviceProviderId:{type:mongoose.Schema.Types.ObjectId,ref:'ServiceProviders'},
    vehicleId:{type:mongoose.Schema.Types.ObjectId,ref:'Vehicles'},
    bookedTime:Date,
    from:Date,
    to:Date,
    address:String,
    review:{type:mongoose.Schema.Types.ObjectId,ref:'Reviews'}
})

const bookingModel=mongoose.model('Booking',bookingSchema)

module.exports=bookingModel