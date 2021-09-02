const Product = require('../Models/product');
const { validationResult } = require('express-validator/check');

exports.getProducts=(req,res,next)=>{

    Product.find()
    .then(products=>{
      //  console.log(products)
        if(!products){
            const error = new Error('Couldnot fint any posts');
            error.statusCode = 500
            throw error 
         }

         res.status(201).json({
            message: 'Post fetched',
             products: products
         })
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });

}

exports.postProduct=(req,res,next)=>{
    console.log(req.body.title)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const title= req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;
    const imageUrl = req.file.path;
   

    const product  = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        category: category
  
    })
    product.save()
    .then(result=>{
        console.log(res)
       res.status(200).json({
            product: result
        })
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
})
}

exports.editProduct=(req,res,next)=>{

 const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const prodId = req.params.prodId
    const title= req.body.title;
    const price = req.body.price;
    const category = req.body.category;
    const description = req.body.description;
    let imageUrl= null;
    if(!req.file)
    {
        
        imageUrl= req.body.image
        console.log(req.body.image, 'path when filenot defined')
    }
    else{
        imageUrl = req.file.path;
    }
  
    
    Product.findById(prodId)
    .then(product=>{
       
        if(!product){
            const error = new Error('couldn"t fetch product');
            error.statusCode=401;
            throw error;
    
        }
        product.title = title;
        product.price = price;
        product.description= description;
        product.imageUrl = imageUrl;
        product.category = category;
        console.log(product, 'from edit prod')
        return product.save()
    })
   .then(result=>{
       console.log(result)
       res.status(201).json({
        message:"Updated successfully",
        product:result
       })
       
   }).catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
})


}


exports.getProduct=(req,res,next)=>{

    const prodId = req.params.prodId;
    Product.findById(prodId)
    .then(product=>{
      
        if(!product){
            const error = new Error("product fetch failed");
            error.statusCode = 401;
            throw error;
        }
        console.log(product, "From getProduct")
        res.status(201).json({
            message: "fetch product success",
            product: product
        })

    }).catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    })
}

exports.deleteProduct=(req,res,next)=>{
    const prodId= req.params.prodId;
    console.log('prodId', prodId)
    console.log(prodId)
    Product.findByIdAndRemove(prodId)
    .then(product=>{
        res.status(201).json({
            product: product,
            message: "product deleted succesfully"
        })
    }).catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    })

}