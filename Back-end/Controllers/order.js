const Order = require('../Models/order');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
exports.addOrder=(req,res,next)=>{

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
            const error = new Error('Couldnot fint any posts');
            error.statusCode = 500
            throw error 
         }

         res.status(201).json({
            message: 'Post fetched',
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