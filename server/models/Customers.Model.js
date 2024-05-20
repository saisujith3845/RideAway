
const mongoose=require('mongoose')

const customerSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    notifications:Array,
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bookings'}]
})

const customerModel=mongoose.model('Customers',customerSchema);


module.exports=customerModel;  