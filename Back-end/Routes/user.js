const express = require('express');
const router = express.Router()
const userController = require('../Controllers/dummyUser');

router.get('/add-user',userController.addDummyUser)