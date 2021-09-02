const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const dummyUserSchema = new Schema({
  
    cart: {
        items:[],
        totalPrice: 0
      },

})

module.exports= mongoose.model('DummyUser', dummyUserSchema)