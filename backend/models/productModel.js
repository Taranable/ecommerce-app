// --------------------Make RESTful API----------------------

const mongoose =require("mongoose");
const User = require("../models/userModel")


const productSchema = new mongoose.Schema({

    name : {
        type:String,
        required:[true,"please enter the name"]  //required: This option indicates whether the field is mandatory or not. If required is set to true, it means that the "name" field must have a value when creating or updating a document. If it's set to false, the field can be left empty.
    },

    description:{
        type: String,
        required:[true,"please enter the desription of the product"]
    },

    price:{
        type:Number,
        required:[true,"please enter the price of the product"],
        maxLength:[8,"price cant be more then 8 character"]
    },

    ratings:{
        type: Number,
        required:true,
        default:0
    },

    // in image there is lots of images so make an array and in array there is object and in object there is 2 objects more 1 for publicid and url
    image: [{
        product_id:{
            type:String,
            required:true
        },
        url:{ 
            type:String,
            required:true
        }
    
    }],
    
    category:{
        type:String,
        required:[true,"please enter product key"]
        // we use enum method in frontend to have specific type of category
    },

    stock:{
        type: Number,
        required:[true,"please enter the price of the product"],
        maxLength:[4,"price cant be more then 8 character"],
        default:1
    },

    numOfReviews:{
        type:Number,
        required:false,
        default:0
    },

    reviews:[{
        user :{
            type: mongoose.Schema.ObjectId,
              ref:"User",
              required:true,
          },
        name:{
            type:String,
            required:true, 
        },
        rating:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true,
        }
    }],

   user :{
      type :mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },

    createdAt:{
    type:Date,
    default:Date.now
}
});

module.exports =mongoose.model("Products",productSchema); 






// now we will export this model to database and in products section
// mongoose.model("api where we export ",which schema)

// The Mongoose model is created using mongoose.model('Products', productSchema). The first argument 'Products' is the name of the collection in the database. Mongoose will automatically pluralize this name to form the actual collection name. The second argument productSchema is the schema you defined.
// module.exports is used to make the Products model available for other parts of your application. This allows you to import and use the model in other files when you need to interact with the "Products" collection in your MongoDB database.


