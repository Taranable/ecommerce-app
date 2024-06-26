const Errorhandler = require("../utils/errorhandler");
const CatchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken")




//------------------------ register a user!! -----------------------------
exports.registerUser = CatchAsyncError( async(req,res,next) => {
  const {name,email,password} = req.body;             //here we fetch data in starting
  
  // const salt = await bcrypt.genSalt(10);
  // const secpass = await bcrypt.hash(password,salt); //this is one way to hash password
  
  const user = await User.create({                     //in product creation we write here re.body but in this we fetch data previously so here only write it to print it or save it 
    name,
    email,
    password,
    // password:secpass,   //hash pass 
    avatar:{
      public_id:"this is a sample id",
      url:"profilepicurl",
    },
  })
  
  //use jwttoken to immediatly login after register:-
  
  // this is also a way but we make a sendtoken function in utils /jwtToken.js
  // const token = user.getJWTToken(); 
  // res.status(201).json({
  //   success: true,
  //   user,
  //   token
  //   });
  
  sendToken(user,201,res);
}
)




//------------------------ Login a user!! -----------------------------
exports.loginUser = CatchAsyncError(async(req,res,next) =>{
  const { email, password } = req.body;

  // Checking if the user provided email and password
  if (!email || !password) {
      return next(new Errorhandler("Please provide email and password", 400));
  }

  // Check if the given email exists
  const user = await User.findOne({ email }).select("+password");

  if (!user) { 
      return next(new Errorhandler("Email or password is incorrect", 401));
  }

  // Check if the password matches
  const isPasswordMatched = await user.comparePassword(password);

  if (isPasswordMatched) {
      // If password matches, generate JWT token and send success response
      // const token = user.getJWTToken(); 
      // return res.status(200).json({
      //     success: true,
      //     token
      // });
       sendToken(user,200,res);

  } else {
      // If password doesn't match, send error response
      return next(new Errorhandler("Email or password is incorrect", 401));
  }
});



// ----------------------------------user logout!--------------------------------


exports.logoutUser = CatchAsyncError(async (req, res, next) => {

   res.cookie("token",null,{
    expires : new Date(Date.now()),
    httpOnly: true,
   })


  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});