const Errorhandler = require("../utils/errorhandler");
const CatchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");


//------------------------ register a user!! -----------------------------
exports.registerUser = CatchAsyncError( async(req,res,next) => {
  const {name,email,password} = req.body;             //here we fetch data in starting
  const user = await User.create({                     //in product creation we write here re.body but in this we fetch data previously so here only write it to print it or save it 
    name,
    email,
    password,
    avatar:{
      public_id:"this is a sample id",
      url:"profilepicurl",
    },
  })

  res.status(201).json({
    success: true,
    user,
  });
  
  }
)
