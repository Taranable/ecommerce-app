//read it from mvc architecture notes

const express = require("express");                       
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails, productreviews, productReviews, deleteReviews, getProductReviews} = require("../controllers/productControllers");                     
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();     
         

router.route("/products").get(isAuthenticatedUser, getAllProducts);                                   
router.route("/admin/product/new").post(isAuthenticatedUser,authorizedRoles("admin"),createProduct);                                
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizedRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizedRoles("admin"),deleteProduct)

router.route("/product/:id").get(getProductDetails);                      
router.route("/product/reviews").put(isAuthenticatedUser,productReviews);                      
router.route("/product/allReviews/:id").get(getProductReviews)
// router.route("/product/allReviews").delete(isAuthenticatedUser,deleteReviews) m ake this route again see video 4:02min 
                                 
  

module.exports = router 