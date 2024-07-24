const CatchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productModel");  
const { findById } = require("../models/userModel");
const apifeatures = require("../utils/apifeatures");
const Errorhandler = require("../utils/errorhandler");


// so instead of use try and catch in every statement we make a (error handler)middleware as
//  catchasyncerror which have a function in it and have promise that reslove if everythingok and catch it missing





//------------------- create new product!!(admin) ------------------
exports.createProduct= CatchAsyncError(async(req,res,next)=>{

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});





//----------------------- get all products!! ----------------------
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


//--------------------- To update products!! (admin)------------------
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


    
//------------------------To Delete product!!(admin) ------------------------
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


//------------------------Detail with Id!!------------------------
    exports.getProductDetails= CatchAsyncError(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new Errorhandler("product not found",404));     //next is a type of callback function

    }

    res.status(200).json({
        success:true,
        product,
    
    })
       

});





 
//------------------------Reviews of products----------



exports.productReviews = CatchAsyncError(async (req,res,next)=>{
    const {rating , comment, productId} = req.body;
    
    const review = {
        name:req.user.name,
        user:req.user._id,
        rating:Number(rating),
        comment,
    }
    
    const product = await Product.findById(productId)
    
    const isReviewed = product.reviews.find(
        (rev)=> 
            rev.name.toString() === req.user._id.toString()
    );
    
    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if (rev.name.toString() === req.user._id.toString())
                (rev.rating= rating),(rev.comment = comment)
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    
    let avg = 0;
    product.reviews.forEach((rev)=>{
        avg+= rev.rating;})
        
        product.ratings = avg / product.reviews.length;
        
        
        await product.save({validateBeforeSave: false})
        
        res.status(200).json({
            success:true,
        })
        
        
    }); 
    
    
    

    


//----------------------------get all reviews of 1 product--------------------


//i use  let productId= req.params.id; instead of  let productId= req.query.id; coz query was not working 

exports.getProductReviews = CatchAsyncError(async (req, res, next) => {
    // Find the product by ID

    let productId= req.params.id;
    let product = await Product.findById(productId);

    if (!product) {
        return next (new Errorhandler("Product not found", 404))

    }
    res.status(200).json({
        success: true, 
        review: product.reviews,
    });
});





//make this again


//----------------------------delete reviews of 1 product--------------------

exports.deleteReviews = CatchAsyncError(async (req, res, next) => {
    // Find the product by ID

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next (new Errorhandler("Product not found", 404))
       
    }

const reviews = product.reviews.filter(
    (rev)=>rev._id.toString() !== req.query.id.toString());

let avg = 0;
    reviews.forEach((rev)=>{
        avg+= rev.rating;});
        
        const ratings = avg / reviews.length;

        const numOfReviews = reviews.length;
        await Product.findByIdAndUpdate(req.query.productId,{
            reviews,
            ratings,
            numOfReviews,
        },{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        })

    res.status(200).json({
        success: true, 

    });
});
