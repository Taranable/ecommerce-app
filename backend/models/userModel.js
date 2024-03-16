const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true,"please enter your name"],
    maxLength: [30, "name cant exceed 30 char"],
    minLength: [4, "name should be more then 4 char"],
    
  },

  email: {
    type: String,
    required: [true,"please enter your email id"],
    unique:true, //means email must be unique
    validate:[validator.isEmail,"please enter a valid email"] //import validator ,and it will tell you is yoyr email is valid or not!
   
  },

password: {
    type: String,
    required: [true,"please enter your name"],
    minLength: [8, "please enter a password min of 8 char"],
    select:false, 
   //select: false mean when at usercontroller we use a find() method to find all the users then it will send all data except password coz its value is set to false by default it is true
  },

avatar: {
  public_id: {
    type: String,
    required:true,
  },
  url: {
    type: String,
    required:true,
  }
},

role: {
    type: String,
    default:"user",
  },

  resetPasswordToken: String, 
  resetPasswordExpire: Date,  //  put when password is expires

})

module.exports = mongoose.model("User",userSchema);


