const express = require("express");
const { transactionController } = require("./../controllers");
const verifyAuth = require("../middlewares/auth.middleware");
const router = express.Router();

router.use(verifyAuth);
router.get("/", transactionController.getAllBanks);
router.get("/default", transactionController.getDefaultBankDetails);
router.post('/default/:accountNo', transactionController.setDefaultBank)
router.post("/create", transactionController.createBankAccount);
router.post("/deposit", transactionController.depositAmount);
router.post("/withdraw", transactionController.withdrawAmount);
router.get("/transactions", transactionController.getAllTransactions);

module.exports = router;
