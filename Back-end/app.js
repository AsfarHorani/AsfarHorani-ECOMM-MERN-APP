const express = require('express');
const shopRoutes = require('./Routes/shop');
const authRoutes=require('./Routes/auth');
const orderRoutes=require('./Routes/order');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const dataBaseURL = "mongodb+srv://asfar:101021@cluster0.mnphf.mongodb.net/mrfood";
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images');
  },
  filename: function(req, file, cb) {   
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
 

  app.use(orderRoutes); 
app.use(shopRoutes);
app.use(authRoutes);
  app.use((error, req,res,next)=>{
    console.log('from error middleware',error);
    const status= error.statusCode || 500;
    const message= error.message ||  "Something went wrong";
    res.status(status).json({
      message: message 
    })
  })


mongoose.connect(dataBaseURL)
.then(res=>{
  // User.findOne().then(user => {
  //   if (!user) {
  //     const user = new User({
  //       cart: {
  //         items: []
  //       }
  //     });
  //     user.save();
  //   }
  // });
    app.listen(8080);
})
.catch(err=>{
    console.log(err)
})

