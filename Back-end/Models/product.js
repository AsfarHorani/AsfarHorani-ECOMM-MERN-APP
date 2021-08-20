const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type: String,
        req: true
    },
    price: {
        type: String
    },
    description:{
        type: String,
       
    },
    imageUrl:{
        type: String,
        req: true
    },
    category: {
        type: String,
        req: true
    }
    

})

module.exports= mongoose.model('Product', productSchema)