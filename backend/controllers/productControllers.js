const CatchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productModel");  //here we import that product schema from productmodels FileSystemDirectoryReader
const apifeatures = require("../utils/apifeatures");
const Errorhandler = require("../utils/errorhandler");


//now to create a product there is function.-----only admin access
// so instead of use try and catch in every statement we make a middleware as
//  catchasyncerror which have a function in it and have promise that reslove if everythingok and catch it missing

exports.createProduct= CatchAsyncError(async(req,res,next)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});

//now import this in productroute.js


// // first it is created to check server

// exports.getAllProducts=(req,res)=>{
    
//     res.status(200).json({message:"route is working"})   //This code sends a JSON response with a status of 200 (OK) and a message indicating that the route is working. 
// }   

// //res.status(201), indicating that a new resource has been successfully created.
//  // it is now function is rady and it will imported by routes folder.


// get all products
exports.getAllProducts= CatchAsyncError(async(req,res)=>{
    const resultPerPage = 10;
    const productCount = await Product.countDocuments();

    const Apifeature =new apifeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await Apifeature.query;

    res.status(201).json({
        success:true,
        products
    })

})


// create an api for update products-- admin route
//see detail knowlege in onenote restful api notes

exports.updateProduct= CatchAsyncError(async(req,res,next)=>{
    let products = await Product.findById(req.params.id);
    if(!products){
        return next(new Errorhandler("product not found",404));     //next is a type of callback function

    }
        products = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:false,
        runValidators:true
     })

    res.status(200).json({
        success:true,
        products
    })
       

});


    
// create an api for update products --- admin route

exports.deleteProduct= CatchAsyncError(async(req,res,next)=>{
    const products = await Product.findById(req.params.id);
    
    if(!products){
        return next(new Errorhandler("product not found",404));     //next is a type of callback function

    }
     await products.deleteOne();  //The remove() method is deprecated in Mongoose starting from version 6.0.0. Instead, you should use the deleteOne() or deleteMany() method.
     //remove hatt gya h mongodb mai = deleteone aagya
    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })

})


//get detail of some prodeuct with id.
    
exports.getProductDetails= CatchAsyncError(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new Errorhandler("product not found",404));     //next is a type of callback function

    }

    res.status(200).json({
        success:true,
        product,
        productCount,
    })
       

});