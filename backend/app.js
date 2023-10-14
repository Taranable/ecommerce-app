const express  = require("express");        //here to make a server first express is a 3rd paty module so here we import it and before that we install express in npm (npm i express)
const app = express();
//route import and use 
const product= require("./routes/productRoutes");             //here we putt in a const and in .use we use it
const errorMiddleware= require("./middleware/error")     



app.use(express.json());       //The express.json() middleware is used in an Express.js application to parse incoming JSON data from the request body. It's often used when building APIs to handle JSON-encoded data sent by clients in POST, PUT, and PATCH requests.
app.use("/api/v1",product);               //    it use it and make api/v1 as prefix so dont type it always /here we use it also (app.use(product)) but then it is only"/products but now api url is "/api/v1/products"
//middleware for errors:
app.use(errorMiddleware);

module.exports =app;                 // const app in imported in server.js