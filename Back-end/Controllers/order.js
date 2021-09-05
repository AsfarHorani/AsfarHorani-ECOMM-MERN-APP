const Order = require('../Models/order');
const { validationResult } = require('express-validator/check');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'asfarhorani@gmail.com',
    pass: 'kpsygvrqlxadlrvx'
  }
});

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
    .then(ord=>{
      const items = order.orderItems.items.map(item=>{
              
        return(`<li>
         <div class="product">
          <div class="product-details">
      <h3 class="product-title">Product Name: ${item.product.title}</h3>
    
    </div>
    <p class="product-price">Price per item: ${item.product.price}</p>
    <p class="product-quantity">
   quantity: ${item.quantity}
    </p>
   
    <p class="product-line-price">Total: ${item.product.price * item.quantity}</p>
  </div>
        </li>`)})

 var mailOptions = {
        from: 'asfarhorani@gmail.com',
        to: email,
        subject: 'Order placed',
        html: `<h1>Your order has been placed!</h1> 
        <h3>OrderId:${ord._id} </3>
        <h1>order items: ${items} </h1>
        <div className="totals-item">
  
   <p className="totals-value" id="cart-subtotal"> Subtotal:${order.orderItems.totalPrice}
     </p>
     </div>
                 <div className="totals-item">    
   
   <p className="totals-value" id="cart-shipping">Shiping: ${Math.round((order.orderItems.totalPrice/100)*10,1)}</p>
 </div>
 <div className="totals-item">

   <p className="totals-value" id="cart-total">Grand Total: ${Math.round((order.orderItems.totalPrice/100)*10,1) + order.orderItems.totalPrice }  </p>
 </>
        
        `
      }
        
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
   

        res.status(201).json({
            message: 'order placed',
            order: ord
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