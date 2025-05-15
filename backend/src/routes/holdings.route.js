const express = require("express");
const { holdingController } = require("./../controllers/index");
const validate = require("../middlewares/validate");
const { createUserSchema } = require("../validations/user.validation");
const verifyAuth = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(verifyAuth);
router
  .route("")
  .post(holdingController.createHolding)
  .get(holdingController.getAllHoldings);

router
  .route("/:id").get(holdingController.getHolding)
  .put(holdingController.updateHoldings)
  .delete(holdingController.deleteHoldings);
module.exports = router;
