const bcrypt = require('bcrypt');
const Admin = require('../Models/admin');
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator/check');
exports.signup=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const name = req.body.name;
    const password= req.body.password;
    const email= req.body.email;

    console.log(req.body)
    bcrypt.hash(password,12)
    .then(hashedPassword=>{
        const admin = new Admin({
            name:name,
            email:email,
            password: hashedPassword,
        })
        return admin.save()
    }).then(result=>{
        console.log(result)
        res.status(200).json({
            message:'Sign up successful',
            admin: result
        })
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    })
    

}


exports.login=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    console.log(req.body.email, req.body.password)
    const email = req.body.email;
    const password= req.body.password;
    let loadedAdmin  ;
     console.log(email,password)
    Admin.findOne({email:email})
    .then(admin=>{
      
            if(!admin){
                console.log("admin doesnt exist")
             const error = new Error("User doesn't exist");
                error.statusCode = 401;
                throw error;
            }
            
            loadedAdmin = admin;

            return bcrypt.compare(password, admin.password)
    })
    .then(doMatch=>{
        if(!doMatch){
            console.log('incorrect password')
            const error = new Error("Password is incorrect");
            error.statusCode = 403;
            throw error;
        }
        console.log(loadedAdmin)
       const token=jwt.sign({
            email:loadedAdmin.email,
            adminId: loadedAdmin._id.toString()
        },'secret', {expiresIn: '1h'})

        console.log(loadedAdmin)
        res.status(200).json({
            token: token,
            adminId: loadedAdmin._id ,
            message:"Login succesfull"
        })
        console.log('login success')
    })
     
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        console.log('from catch login',err)
      
        next(err);
    })


}
