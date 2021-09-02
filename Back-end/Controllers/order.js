const Order = require('../Models/order');
const { validationResult } = require('express-validator/check');
exports.addOrder=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const name= req.body.name;
    const email= req.body.email;
    const phone= req.body.phone;
    const address= req.body.address;
    const orderItems= req.body.order;

    const order = new Order({
        name: name,
        email: email,
        phone: phone,
        address: address,
        orderItems: orderItems
    })
    
    order.save()
    .then(result=>{
        res.status(201).json({
            message: 'order placed',
            order: result
        })
    }).catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
}
exports.getOrders=(req,res,next)=>{
    Order.find()
    .then(orders=>{
        console.log(orders)
        if(!orders){
            const error = new Error('Couldnot fint any orders');
            error.statusCode = 500
            throw error 
         }

         res.status(201).json({
            message: 'Orders fetched',
             orders: orders
         })
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
}


exports.deleteOrder=(req,res,next)=>{
    const orderId= req.params.orderId;
    Order.findByIdAndRemove(orderId)
    .then(resData=>{
            res.status(201).json({
            message:'Order deleted sucessfully',
            resData:resData
            })
    }).catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    })
}