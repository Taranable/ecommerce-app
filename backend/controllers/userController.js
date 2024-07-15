const Errorhandler = require("../utils/errorhandler");
const CatchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")

const crypto = require("crypto");
const { log } = require("console");



//------------------------ register a user!! -----------------------------
exports.registerUser = CatchAsyncError( async(req,res,next) => {
  const {name,email,password,role} = req.body;             //here we fetch data in starting
  
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
    role,
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




//------------------------------forgot password link generate--------------------------

exports.forgotPassword= CatchAsyncError(async (req, res, next) => { 
 
 const user = await User.findOne({email:req.body.email});

 if(!user){
  return next(new Errorhandler("User not found",404)); 
}

const resetToken = user.getResetPasswordToken();

await user.save({validateBeforeSave:false});

const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1//Password/reset/${resetToken}`

const message = `your password reset token is : \n\n  ${resetPasswordUrl} \n\n If you have not requested this link then, please ignore it.`


try {
  
  await sendEmail({
    email: user.email,
    subject : `Ecommerce Password Recovery`,
    message,
  })
  
  
  res.status(200).json({
    success: true,
    message: `Email sent to ${user.email} successfully`
  });
  
} catch (error) {
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save({validateBeforeSave:false});
  
  return next(new Errorhandler(error.message,500))
  
}

}) ;

// ------------------------reset password-----------------


exports.resetPassword= CatchAsyncError(async (req,res,next) =>{
  
  //create token hash
  const resetPasswordToken = crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex"); 
  
  
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {$gt: Date.now()},
  });
   
  if(!user){
    return next(new Errorhandler("User is invalid or link has been Expired",400))
  }; 
  
  if(req.body.password !== req.body.confirmPassword){
    return next(new Errorhandler("Password does not match",400))
  }; 
  
  user.password = req.body.password;
  
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  
  await user.save();

  sendToken(user,200,res);  


  })