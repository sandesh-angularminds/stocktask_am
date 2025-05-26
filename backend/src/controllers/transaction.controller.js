const { where } = require("sequelize");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const db = require("./../models/index");
const Transactionlog = db.Transactionlog;
const Bank = db.Bank;

const createBankAccount = catchAsync(async (req, res) => {
  const { userId } = req;
  console.log("userid", userId);
  let banks = await Bank.findAll({
    where: { userId: String(req.userId) },
  });
  let isDefault = false;
  if (!banks || !banks?.length) {
    isDefault = true;
  }
  const { name, ifsc, amount = 0, accountNo } = req.body;
  console.log(name, ifsc, amount);
  const bank = await Bank.create({
    name,
    ifsc,
    isDefault,
    totalBalance: amount,
    accountNo,
    userId,
  });
  await Transactionlog.create({
    action: "deposit",
    bankId: bank.id,
    accountNo: bank.accountNo,
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
  // const totalBalance = banks.reduce((acc, data) => {
  //   return acc + data.totalBalance;
  // }, 0);

  res.status(200).json({ status: "success", result: banks });
});

const getDefaultBankDetails = catchAsync(async (req, res) => {
  let bank = await Bank.findOne({
    where: { userId: String(req.userId), isDefault: true },
    order: [["isDefault", "ASC"]],
  });
  res.status(200).json({ status: "success", result: bank });
});

const setDefaultBank = catchAsync(async (req, res) => {
  let userId = req.userId;
  let { accountNo } = req.params;
  let bank = await Bank.findOne({
    where: { userId: String(req.userId), accountNo: accountNo },
  });
  if (!bank) {
    throw new ApiError("Bank not found", 404);
  }
  await Bank.update(
    { isDefault: false },
    { where: { userId: String(userId) } }
  );
  let [updated] = await Bank.update(
    { isDefault: true },
    {
      where: {
        accountNo: accountNo,
        userId: String(userId),
      },
    }
  );
  if (updated) {
    const updatedBank = await Bank.findOne({
      where: { userId: String(userId), accountNo },
    });
    res.status(200).json({ status: "success", result: updatedBank });
  }
});

const depositAmount = catchAsync(async (req, res) => {
  const userId = req.userId;
  const { action = "deposit", amount, accountNo } = req.body;

  if (action !== "deposit" || !amount) {
    throw new ApiError(`Deposit action and amount is required!!!`);
  }
  const bankInfo = await Bank.findOne({
    where: {
      userId: String(userId),
      accountNo: accountNo,
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
    { where: { userId: String(userId), accountNo: accountNo } }
  );

  await Transactionlog.create({
    action: "deposit",
    bankId: bankInfo.id,
    accountNo: accountNo,
    userId: userId,
    amount: amount,
  });
  return res.status(200).json({ status: "succes", result: newBankAction });
});

const withdrawAmount = catchAsync(async (req, res) => {
  const userId = req.userId;
  const { action, amount, accountNo } = req.body;
  if (action !== "withdraw" && !amount && !accountNo) {
    throw new ApiError(
      404,
      `Withdraw action, amount and accountNo  is required!!!`
    );
  }
  const bankInfo = await Bank.findOne({
    where: {
      userId: String(userId),
      accountNo: accountNo,
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
    { where: { userId: String(userId), accountNo: accountNo } }
  );

  const newTransaction = await Transactionlog.create({
    action: "withdraw",
    bankId: bankInfo.id,
    userId: userId,
    accountNo,
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
  getDefaultBankDetails,
  setDefaultBank,
};
