const express = require("express");
const { registerUser, loginUser, logoutUser,  forgotPassword, resetPassword, getUserDetails, getAllUsers, changePassword, updateUserProfile, getSingleUsers, changeRoles, userDelete } = require("../controllers/userController");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();


router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").post(logoutUser);
router.route("/Password/forgot").post(forgotPassword);
router.route("/Password/reset/:token").put(resetPassword);
router.route("/myProfile").get(isAuthenticatedUser, getUserDetails);
router.route("/password/change").put(isAuthenticatedUser, changePassword);
router.route("/myProfile/update").put(isAuthenticatedUser, updateUserProfile);
router.route("/getAllUsers").get(isAuthenticatedUser,authorizedRoles("admin"),getAllUsers);
router.route("/getSingleUser/:id").get(isAuthenticatedUser,authorizedRoles("admin"), getSingleUsers);
router.route("/userRole/:id").put(isAuthenticatedUser,authorizedRoles("admin"), changeRoles);
router.route("/userDelete/:id").delete(isAuthenticatedUser,authorizedRoles("admin"), userDelete);


module.exports = router;

 