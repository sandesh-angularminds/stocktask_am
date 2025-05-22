const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const db = require("./../models/index");
const Transactionlog = db.Transactionlog;
const Bank = db.Bank;

const createBankAccount = catchAsync(async (req, res) => {
  const { userId } = req;
  const { name, ifsc, amount = 0 } = req.body;
  const bank = await Bank.create({
    name,
    ifsc,
    totalBalance: amount,
    userId,
  });
  await Transactionlog.create({
    action: "deposit",
    bankId: bank.id,
    userId: userId,
    amount: amount,
  });
  return res
    .status(200)
    .json({ status: "success", message: "New Bank created successfully!!!" });
});

const getAllBanks = catchAsync(async (req, res) => {
  let banks = await Bank.findAll({
    where: { userId: String(req.userId) },
  });
  const totalBalance = banks.reduce((acc, data) => {
    return acc + data.totalBalance;
  }, 0);
  res.status(200).json({ status: "success", result: banks, totalBalance });
});

const depositAmount = catchAsync(async (req, res) => {
  const userId = req.userId;
  const {
    action = "deposit",
    name = "HDFC bank",
    bankId = "1",
    amount,
  } = req.body;

  if (action !== "deposit" || !amount) {
    throw new ApiError(`Deposit action and amount is required!!!`);
  }
  const bankInfo = await Bank.findOne({
    where: {
      userId: String(userId),
    },
  });
  if (!bankInfo) {
    throw new ApiError(404, "Bank account not found!!!");
  }
  const currBalance = parseInt(+bankInfo.totalBalance + +amount);
  const newBankAction = await Bank.update(
    {
      totalBalance: currBalance,
    },
    { where: { userId: String(userId) } }
  );

   await Transactionlog.create({
    action: "deposit",
    bankId: bankInfo.id,
    userId: userId,
    amount: amount,
  });
  return res.status(200).json({ status: "succes", result: newBankAction });
});

const withdrawAmount = catchAsync(async (req, res) => {
  const userId = req.userId;
  const { action, amount } = req.body;
  if (action !== "withdraw" && !amount) {
    throw new ApiError(404, `Withdraw action and amount is required!!!`);
  }
  const bankInfo = await Bank.findOne({
    where: {
      userId: String(userId),
    },
  });
  if (!bankInfo) {
    throw new ApiError(404, "Bank account not found!!!");
  }
  if (amount > bankInfo.totalBalance) {
    throw new ApiError(400, "Total balance is less than you amount!!!");
  }
  const currBalance = parseInt(bankInfo.totalBalance - amount);
  const newBankAction = await Bank.update(
    {
      name: bankInfo.name,
      userId,
      totalBalance: currBalance,
    },
    { where: { userId: String(userId) } }
  );

  const newTransaction = await Transactionlog.create({
    action: "withdraw",
    bankId: bankInfo.id,
    userId: userId,
    amount: amount,
  });
  return res.status(200).json({ status: "succes", result: newBankAction });
});

const getAllTransactions = catchAsync(async (req, res) => {
  const transactions = await Transactionlog.findAll({
    where: { userId: String(req.userId) },
    order: [["createdAt", "DESC"]],
  });
  return res.status(200).json({ status: "success", result: transactions });
});

module.exports = {
  createBankAccount,
  depositAmount,
  withdrawAmount,
  getAllBanks,
  getAllTransactions,
};
