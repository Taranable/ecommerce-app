const Errorhandler = require("../utils/errorhandler");
const CatchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");




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

  const token = user.getJWTToken(); 

  res.status(201).json({
    success: true,
    user,
    token
  });
  
  }
)


// -------------------------Login User!------------------------