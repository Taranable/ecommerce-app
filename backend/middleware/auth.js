const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")



// this isUthenticationUser is a function which ensure that the some of the api inly opens or work when the user is login or have token in cookies


exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>
{
  const {token} = req.cookies;  //here we fetch the only token from cookies or we can do also const token =req.cookies.token both have same output


  // if token is not in cookies or user not login 
  if(!token){
    return next(new Errorhandler("Please Login to access this resource",401))
  }



  // so here we first verify the token if availabe
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  // then while making a jwttoken we pass objec t id in signature . so from there we know who is the user by its id whuich is in token '
  
  // so extract id from token which is verified above

  req.user = await User.findById(decodedData.id);

  next();

});
