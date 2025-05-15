const db = require("../models");
const Holdings = db.Holdings;
const catchAsync = require("./../utils/catchAsync");
// Create a new holding
exports.createHolding = catchAsync(async (req, res) => {
  const userId = req.userId;
  const { symbol, quantity, averageBuyPrice, currentPrice } = req.body;
  console.log("symbol", userId);
  const newHolding = await Holdings.create({
    userId: String(userId),
    symbol,
    quantity,
    averageBuyPrice,
    currentPrice,
  });
  res.status(201).json(newHolding);
});

exports.getHolding = catchAsync(async (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  let holding = await Holdings.findByPk(id);
  res.status(201).json(holding);
});

// Get all holdings
exports.getAllHoldings = catchAsync(async (req, res) => {
  console.log("get holdings");
  let holdings = await Holdings.findAll({
    where: { userId: String(req.userId) },
  });
  holdings = holdings.map((holding) => ({
    ...holding.toJSON(),
    totalValue: holding.quantity * holding.currentPrice,
    pnl: (holding.currentPrice - holding.averageBuyPrice) * holding.quantity,
  }));
  res.status(200).json(holdings);
});

exports.updateHoldings = catchAsync(async (req, res) => {
  const { id } = req.params;
  const [updated] = await Holdings.update(req.body, {
    where: { id },
  });

  if (updated) {
    const updatedHolding = await Holdings.findByPk(id);
    res.status(200).json(updatedHolding);
  } else {
    res.status(404).json({ message: `Holding with ID ${id} not found.` });
  }
});

exports.deleteHoldings = catchAsync(async (req, res) => {
  const { id } = req.params;
  const holding = await Holdings.findByPk(id);
  if (!holding) {
    return res.status(404).json({ message: "Holding not found!!!" });
  }
  await holding.destroy();
  res.status(200).json({ message: "Holding soft deleted successfully." });
});
