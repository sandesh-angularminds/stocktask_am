const catchAsync = require("../utils/catchAsync");
const db = require("./../models/index");
const Watchlist = db.Watchlist;

exports.creatWatchlist = catchAsync(async (req, res) => {
  const userId = req.userId;
  const newWatchlist = await Watchlist.create({
    ...req.body,
    userId: String(userId),
  });
  res.status(200).json(newWatchlist);
});

exports.getAllWatchlists = catchAsync(async (req, res) => {
  const userId = req.userId;
  const watchlist = await Watchlist.findAll({
    where: { userId: String(userId) },
  });
  res.status(200).json(watchlist);
});

exports.dropWatchlist = catchAsync(async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const watchlist = await Watchlist.findByPk(id);
  if (!watchlist) {
    return res.status(404).json({ message: "Watchlist not found!!!" });
  }
  await watchlist.destroy();
  res.status(200).json({ message: "Watchlist is deleted successfully..." });
});
