const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const db = require("./../models/index");
const Transactionlog = db.Transactionlog;
const Bank = db.Bank;

const createBankAccount = catchAsync(async (req, res) => {
  const { userId } = req;
  console.log("create bank", req.userId);
  const { name, ifsc, amount = 0 } = req.body;
  const bank = await Bank.create({
    name,
    ifsc,
    totalBalance: amount,
    userId,
  });
  return res
    .status(200)
    .json({ status: "success", message: "New Bank created successfully!!!" });
});

const getAllBanks = catchAsync(async (req, res) => {
  let banks = await Bank.findAll({
    where: { userId: String(req.userId) },
  });
  console.log("banks data", banks);
  const totalBalance = banks.reduce((acc, data) => {
    return acc + data.totalBalance;
  }, 0);
  res.status(200).json({ status: "success", result: banks, totalBalance });
});

const depositAmount = catchAsync(async (req, res) => {
  const userId = req.userId;
  const { action, name = "HDFC bank", bankId = "1", amount } = req.body;

  if (action !== "deposit" || !amount) {
    throw new ApiError(`Deposit action and amount is required!!!`);
  }
  const bankInfo = await Bank.findOne({
    where: { id: bankId },
  });
  if (!bankInfo) {
    throw new ApiError(404, "Bank not found!!!");
  }

  const currBalance = bankInfo.totalBalance + amount;
  const newBankAction = await Bank.update(
    {
      name,
      userId,
      totalBalance: currBalance,
    },
    { where: { id: bankId } }
  );

  const newTransaction = await Transactionlog.create({
    action: "deposit",
    bankId: bankInfo.id,
    userId: userId,
    amount: amount,
  });
  return res.status(200).json({ status: "succes", result: newBankAction });
});

const withdrawAmount = catchAsync(async (req, res) => {
  const userId = req.userId;
  const { action, amount, bankId } = req.body;
  if (action !== "withdraw" && !amount) {
    throw new ApiError(404, `Withdraw action and amount is required!!!`);
  }
  const bankInfo = await Bank.findOne({
    id: bankId,
  });
  if (!bankInfo) {
    throw new ApiError(404, "Bank account not found!!!");
  }
  if (amount > bankInfo.totalBalance) {
    throw new ApiError(400, "Total balance is less than you amount!!!");
  }
  const currBalance = totalBalance - amount;
  const newBankAction = await Bank.update(
    {
      name,
      userId,
      totalBalance: currBalance,
    },
    { where: { id: bankId } }
  );

  const newTransaction = await Transactionlog.create({
    action: "withdraw",
    bankId: bankInfo.id,
    userId: userId,
    amount: amount,
  });
  return res.status(200).json({ status: "succes", result: newBankAction });
});

module.exports = {
  createBankAccount,
  depositAmount,
  withdrawAmount,
  getAllBanks,
};
