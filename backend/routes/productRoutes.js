const express = require("express");                                           //import express in aall api & routes
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productcontrollers");     //this is automatically imported when you type in .get or .post"s function. if not import it amnually
const router =express.Router();                                                 //express.Router() method is used to define routes within the routes.js module. This module exports the router instance, which is then mounted onto the main Express application using app.use().++++++++ It allows you to define routes for specific paths and HTTP methods within a separate router instance
                       
         


router.route("/products").get(getAllProducts);                                    //  1st route:- and now import this route in main file i.e app.js
router.route("/product/new").post(createProduct);                                   //  1st route:- and now import this route in main file i.e app.js
router.route("/product/:id").put(updateProduct);                                   //  1st route:- and now import this route in main file i.e app.js
router.route("/product/:id").delete(deleteProduct);                                   //  1st route:- and now import this route in main file i.e app.js
router.route("/product/:id").get(getProductDetails);                                   //  1st route:- and now import this route in main file i.e app.js



module.exports=router