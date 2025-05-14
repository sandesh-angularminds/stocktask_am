const db = require("../models");
const Holdings = db.Holdings;

// Create a new holding
exports.createHolding = async (req, res) => {
  try {
    const { symbol, quantity, averageBuyPrice, currentPrice } = req.body;
    console.log('symbol',symbol)
    const newHolding = await Holdings.create({
      symbol,
      quantity,
      averageBuyPrice,
      currentPrice,
    });

    res.status(201).json(newHolding);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all holdings
exports.getAllHoldings = async (req, res) => {
  try {
    const holdings = await Holdings.findAll();
    res.status(200).json(holdings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
