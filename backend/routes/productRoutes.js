//read it from mvc architecture notes

const express = require("express");                       
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productcontrollers");                     
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();     
         

router.route("/products").get(isAuthenticatedUser, getAllProducts);                                   
router.route("/product/new").post(isAuthenticatedUser,authorizedRoles("admin"),createProduct);                                
router.route("/product/:id").put(isAuthenticatedUser,authorizedRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizedRoles("admin"),deleteProduct).get(getProductDetails);                      
                                 
 

module.exports = router