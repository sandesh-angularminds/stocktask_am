const express = require("express");
const controllers = require("./../controllers/index");
const validate = require("../middlewares/validate");
const { createUserSchema } = require("../validations/user.validation");

const router = express.Router();


router
.route("")
.post(controllers.userController.createUser ).get(controllers.userController.getAllUsers)

// router.route('/').get(controllers.userController.getAllUsers);

// router
//   .route("/:id")
//   .get(controllers.userController.getUserById)
//   .put(controllers.userController.updateUser)
//   .delete(controllers.userController.deleteUser);

module.exports = router;
