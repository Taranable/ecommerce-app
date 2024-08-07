const Order = require("../models/orderModel");  
const Product = require("../models/productModel");  
const Errorhandler = require("../utils/errorhandler");
const CatchAsyncError = require("../middleware/catchAsyncError");


//-----------------------create new order-----------------------

exports.newOrder = CatchAsyncError(async(req,res,next)=>{
  const {
    shippingInfo,
    orderItem,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  
  const order = await Order.create({
    shippingInfo,
    orderItem,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user: req.user._id
    
  })
  res.status(201).json({
    success:true,
    order, 
  })
}
)




// /-----------------------get single order details by user -----------------------

exports.getSingleOrder = CatchAsyncError(async(req,res,next)=>{


  const order = await Order.findById(req.params.id).populate("user","name email");

  if (!order){
    return next(new Errorhandler("order is not placed or cant get with this id", 404))
  }
  
  res.status(200).json({
    
    success:true,
    order,
  })
  
})




// /-----------------------get all orders of logged in user -----------------------

exports.getAllOrder = CatchAsyncError(async(req,res,next)=>{
  
  const orders = await Order.find({user:req.user._id});
  
  let totalAmount = 0;
  
  orders.forEach((order) =>{
    totalAmount += order.totalPrice;
  })
  
  
  res.status(200).json({
    
    success:true,
    totalAmount,
    orders,
  })
  
});


// /-----------------------get all orders of -admin -----------------------

exports.allOrder = CatchAsyncError(async(req,res,next)=>{
  
  const orders = await Order.find();
  
  let totalAmount = 0;
  
  orders.forEach((order) =>{
    totalAmount += order.totalPrice;
  })
  
  
  res.status(200).json({
    
    success:true,
    totalAmount,
    orders,
  })
  
});




// /-----------------------update order status-- admin -----------------------

exports.updateOrder= CatchAsyncError(async(req,res,next)=>{
  
  const order = await Order.findById(req.params.id);

  if (!order){
    return next(new Errorhandler("order is not placed or cant get with this id", 404))
  }
  
  if(order.orderStatus==="Delivered"){
    return next(new Errorhandler("you have already delivered this order",400));
  }
  
  order.orderItem.forEach(async order =>{
    await  updateStock(order.product, order.quantity)
  });
  
  order.orderStatus = req.body.orderStatus;
  
  
  if(req.body.orderStatus=== "Delivered"){
    order.deliveredAt =Date.now();
    
  }
  await order.save({validateBeforeSave :false})
  res.status(200).json({
    success:true,
  })
});

async function updateStock(id,quantity){
  const product = await Product.findById(id);
  product.stock =product.stock  -quantity;
  
  await product.save({validateBeforeSave :false}); 
  
}




// /----------------------delete orders -----------------------

exports.deleteOrder = CatchAsyncError(async(req,res,next)=>{
  
  const order = await Order.findByIdAndDelete(req.params.id);
  
  if (!order){
    return next(new Errorhandler("order is not placed or cant get with this id", 404))
  }

  // await order.remove();
  
  res.status(200).json({
    
    success:true,
   
  })
  
}); 