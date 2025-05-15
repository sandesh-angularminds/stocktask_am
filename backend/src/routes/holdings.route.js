const express = require("express");
const {holdingController} = require("./../controllers/index");
const validate = require("../middlewares/validate");
const { createUserSchema } = require("../validations/user.validation");

const router = express.Router();


router
.route("")
.post(holdingController.createHolding ).get(holdingController.getAllHoldings)

router.route('/:id').put(holdingController.updateHoldings).delete(holdingController.deleteHoldings)
module.exports = router;