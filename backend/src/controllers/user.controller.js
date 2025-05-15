const db = require("../models");
const catchAsync = require("../utils/catchAsync");
const User = db.User;

exports.createUser = catchAsync(async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

exports.getAllUsers = catchAsync(async (req, res) => {
  console.log('get all users')
  const users = await User.findAll();
  res.json(users);
});

// Add update/delete as needed
