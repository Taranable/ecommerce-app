const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, getAllOrder, updateOrder, deleteOrder, allOrder } = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticatedUser,newOrder)
router.route("/getOrder/:id").get(isAuthenticatedUser,authorizedRoles("admin"),getSingleOrder);
router.route("/getAllOrder").get(isAuthenticatedUser,getAllOrder);
router.route("/order/all").get(isAuthenticatedUser,authorizedRoles("admin"),allOrder);
router.route("/order/status/:id").put(isAuthenticatedUser,authorizedRoles("admin"),updateOrder)
router.route("/order/:id").delete(isAuthenticatedUser,authorizedRoles("admin"),deleteOrder);

module.exports = router;
 