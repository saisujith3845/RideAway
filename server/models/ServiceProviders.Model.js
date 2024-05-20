const mongoose=require('mongoose')

const serviceProviderSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
    address:String,
    vehicle:[{type:mongoose.Schema.Types.ObjectId,ref:'vehicles'}],
    notifications:[String]

})

const serviceProviderModel=mongoose.model('serviceprovider',serviceProviderSchema)

module.exports=serviceProviderModel