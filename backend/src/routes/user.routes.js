const express = require("express");
const { userController } = require("./../controllers/index");
const validate = require("../middlewares/validate");
const { createUserSchema } = require("../validations/user.validation");
const verifyAuth = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.createUser);
router.use(verifyAuth);
router.route("/self").get(userController.getUser);
// router
//   .route("/:id")
//   .get(userController.getUserById)
//   .put(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
