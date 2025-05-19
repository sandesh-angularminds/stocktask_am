const express = require("express");
const { transactionController } = require("./../controllers");
const verifyAuth = require("../middlewares/auth.middleware");
const router = express.Router();

router.use(verifyAuth);
router.get("/", transactionController.getAllBanks);
router.post("/create", transactionController.createBankAccount);
router.post("/deposit", transactionController.depositAmount);
router.post("/withdraw", transactionController.withdrawAmount);

module.exports = router;
