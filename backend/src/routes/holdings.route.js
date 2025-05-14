const express = require("express");
const controllers = require("./../controllers/index");
const validate = require("../middlewares/validate");
const { createUserSchema } = require("../validations/user.validation");

const router = express.Router();


router
.route("")
.post(controllers.holdingController.createHolding ).get(controllers.holdingController.getAllHoldings)


module.exports = router;