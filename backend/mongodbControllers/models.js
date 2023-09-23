const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : String,
    pwd : String,
    email : String,
    role : String,
    refreshtoken : String
});

const orderSchema = new mongoose.Schema({
    order : Object,
    email : String,
})


const userModel = mongoose.model('users',userSchema);

const orderModel = mongoose.model('orders',orderSchema)
module.exports = {userModel,orderModel}
