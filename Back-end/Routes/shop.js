const express = require('express');
const router = express.Router()
const shopController = require('../Controllers/shop')
const isAuth = require('../Middleware/is-auth')
const { body } = require('express-validator');


router.get('/get-product/:prodId', shopController.getProduct)
router.get('/get-products', shopController.getProducts);
router.post('/add-product',isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('description')
      .trim()
      .isLength({ min: 5, max: 400 }),
      body('price')
      .isFloat()
      
  ], shopController.postProduct);
  
router.delete('/delete-product/:prodId',isAuth,shopController.deleteProduct);
router.put('/edit-product/:prodId',isAuth,  [
  body('title')
    .trim()
    .isLength({ min: 5 }),
  body('description')
    .trim()
    .isLength({ min: 5, max: 400 }),
    body('price')
    .isFloat()
    
], shopController.editProduct)
module.exports = router;