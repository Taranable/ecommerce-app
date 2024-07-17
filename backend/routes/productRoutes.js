//read it from mvc architecture notes

const express = require("express");                       
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productcontrollers");                     
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();     
         

router.route("/products").get(isAuthenticatedUser, getAllProducts);                                   
router.route("/admin/product/new").post(isAuthenticatedUser,authorizedRoles("admin"),createProduct);                                
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizedRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizedRoles("admin"),deleteProduct)

router.route("/product/:id").get(getProductDetails);                      
                                 
  

module.exports = router 