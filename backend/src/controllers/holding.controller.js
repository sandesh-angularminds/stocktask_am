const db = require("../models");
const Holdings = db.Holdings;
const catchAsync = require('./../utils/catchAsync')
// Create a new holding
exports.createHolding = catchAsync(async (req, res) => {
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
});

// Get all holdings
exports.getAllHoldings = catchAsync(async (req, res) => {
  try {
    const holdings = await Holdings.findAll();
    res.status(200).json(holdings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

exports.updateHoldings = catchAsync(async(req,res)=>{
  const {id} = req.params;
  const [updated] = await Holdings.update(req.body, {
    where: { id },
  });

  if (updated) {
    const updatedHolding = await Holdings.findByPk(id);
    res.status(200).json(updatedHolding);
  } else {
    res.status(404).json({ message: `Holding with ID ${id} not found.` });
  }
})

exports.deleteHoldings = catchAsync(async(req,res)=>{
  const {id} = req.params;
  const holding = await Holdings.findByPk(id);
  if(!holding){
    return res.status(404).json({message: "Holding not found!!!"})
  }
  await holding.destroy();
  res.status(200).json({message: "Holding soft deleted successfully."})
})
