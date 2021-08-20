const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name:{
        type: String,
        req: true
    },
    email: {
        type: String,
       
    },
    phone:{
        type: Number,
        req: true
    },
    address:{
        type: String,
        req: true
    },
    orderItems :{
        type: Object,
        req: true
    }
})

module.exports= mongoose.model('Order', orderSchema)