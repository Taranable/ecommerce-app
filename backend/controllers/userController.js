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
  }
  
  user.password = req.body.password;
  
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  
  await user.save();

  sendToken(user,200,res);  


  })







  
  

  
  
  //--------------------------get user detail/profile check-------------------------------------------
  
  exports.getUserDetails = CatchAsyncError(async (req,res,next)=>{
    
    const user = await User.findById(req.user.id)
    // .select('name email role ')
    
    
    // .select or we can do this laso
    const userData = {
      name:user.name,
      email: user.email,
      role: user.role,
    }
    
    res.status(200).json({
      success: true,
      // user,
      userData
      
    });
    
  });
  
  
  
  //--------------------Password update/change when login-------------------------------
  
  
  exports.changePassword= CatchAsyncError(async(req,res,next)=>{
    
    const user = await User.findById(req.user.id).select("+password");
    
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

if(!isPasswordMatched){
  return next(new Errorhandler("old password is incorrect",400));
}

if(req.body.newPassword !== req.body.confirmPassword){
  return next(new Errorhandler("New Passwords Does't match",400));
}

user.password = req.body.newPassword;

await user.save(); 

sendToken(user,200,res)

})



//-------------------- update/change profile------------------------------


exports.updateUserProfile= CatchAsyncError(async(req,res,next)=>{
  
  
  // easy way
  
  // const user = await User.findById(req.user.id);
  
  //   user.name = req.body.newName
  //   user.email =req.body.newEmail
  
  
  const newUserData= {
    name :req.body.newName,
    email :req.body.newEmail
    
  }
  
  const user =  await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  })
  
  res.status(200).json({
    success:true,
    newUserData,
  })
  
  
  
})



//--------------------------get all user- (admin)------------------------------------------
// admin route

exports.getAllUsers = CatchAsyncError(async (req,res,next)=>{
  
  const user = await User.find();
  
  
  res.status(200).json({
    success: true,
    user,
  });
  
  
})



//---------------------get single user data (admin)-------------------------------

exports.getSingleUsers = CatchAsyncError(async (req,res,next)=>{
  
  const user = await User.findById(req.params.id);
  
  
  if(!user){
    return next(new Errorhandler(`user does not exist with Id: ${req.params.id}`))
  }
  
  res.status(200).json({
    success: true,
    user,
  });
  
  
})



//-------------------- roles update/change of user- admin------------------------------


exports.changeRoles= CatchAsyncError(async(req,res,next)=>{
  
  
  const roleUpdate= {
    role :req.body.newRole,
  }
  
  const user =  await User.findByIdAndUpdate(req.params.id,roleUpdate,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  })

  if(!user){
    return next(new Errorhandler("user doesnt exist or deleted ",400))
  }
  
  res.status(200).json({
    success:true,
    roleUpdate,
  })
  
})





//-------------------- users delete - admin------------------------------


exports.userDelete= CatchAsyncError(async(req,res,next)=>{

  const user =  await User.findByIdAndDelete(req.params.id,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  })

  if(!user){
    return next(new Errorhandler(`user doesnt exist or deleted ${req.params.id}`,400))
  }
  
  res.status(200).json({
    success:true,
    message:`successfully deleted ${user.name}`
  })
  
})