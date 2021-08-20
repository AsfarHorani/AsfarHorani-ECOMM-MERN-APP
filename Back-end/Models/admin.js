const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name:{
        type: String,
        req: true
    },
    email: {
        type: String,
        req: true
    },
    password:{
        type: String,
        req: true
       
    },
   
    

})

module.exports= mongoose.model('Admin', adminSchema)