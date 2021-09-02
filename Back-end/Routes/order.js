const express = require('express');
const router = express.Router()
const orderController = require('../Controllers/order')
const isAuth = require('../Middleware/is-auth')
const { body } = require('express-validator');
router.get('/get-orders',isAuth, orderController.getOrders)
router.post('/add-order',  [
  body('name')
    .trim()
    .isLength({ min: 3 }),
  body('email')
    .isEmail(),
    body('phone').not().isEmpty().isLength({ min: 9 }),
    body('address').not().isEmpty().isLength({ min: 10 })
    
],orderController.addOrder)

router.delete('/delete-order/:orderId',isAuth,orderController.deleteOrder)
module.exports = router;