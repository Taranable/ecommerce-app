const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "please enter your name"],
    maxLength: [30, "name cant exceed 30 char"],
    minLength: [4, "name should be more then 4 char"],

  },

  email: {
    type: String,
    required: [true, "please enter your email id"],
    unique: true, //means email must be unique
    validate: [validator.isEmail, "please enter a valid email"] //import validator ,and it will tell you is yoyr email is valid or not!

  },

  password: {
    type: String,
    required: [true, "please enter your name"],
    minLength: [8, "please enter a password min of 8 char"],
    select: false,
    //select: false mean when at usercontroller we use a find() method to find all the users then it will send all data except password coz its value is set to false by default it is true
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  },

  role: {
    type: String,
    required: [true, "please enter your role"],
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,  //  put when password is expires

})


//here we do hasing or securing password even for admin(any kind of hacking)
//use pre and save mean before saving this model first do hashing.
userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
}
)


//JWT Token

userSchema.methods.getJWTToken = function (){
  return jwt.sign({id : this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES
  });
}

//compare password!!

userSchema.methods.comparePassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model("User", userSchema);


 