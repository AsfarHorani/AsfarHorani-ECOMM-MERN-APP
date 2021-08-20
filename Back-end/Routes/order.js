const express = require('express');
const router = express.Router()
const orderController = require('../Controllers/order')
const isAuth = require('../Middleware/is-auth')
const { body } = require('express-validator');
router.get('/get-orders',isAuth, orderController.getOrders)
router.post('/add-order', isAuth,  [
  body('name')
    .trim()
    .isLength({ min: 3 }),
  body('email')
    .isEmail(),
    body('phone').not().isEmpty()
    
],orderController.addOrder)
module.exports = router;