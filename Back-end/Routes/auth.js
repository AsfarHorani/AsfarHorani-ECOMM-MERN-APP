const express = require('express');
const router = express.Router();
const authRoutes = require('../Controllers/auth');
const isAuth = require('../Middleware/is-auth')
const { body,check } = require('express-validator');
const Admin = require('../Models/admin')

router.post('/signup',isAuth,[
    check('email').isEmail().withMessage('Email must be valid')
    .custom((value,{req})=>{
        Admin.findOne({email: value}).then(adminDoc=>{
            if(adminDoc){
                return Promise.reject(
                    'E-Mail exists already, please pick a different one.'
                  );
            }
        })
    }).normalizeEmail(),
    body('password', 'Password has to be valid.')
.isLength({ min: 5 })
.isAlphanumeric()
.trim()
] ,authRoutes.signup);


router.post('/login',[   body('email')
.isEmail()
.withMessage('Please enter a valid email address.')
.normalizeEmail(),
body('password', 'Password has to be valid.')
.isLength({ min: 5 })
.isAlphanumeric()
.trim()
], authRoutes.login);



module.exports = router;