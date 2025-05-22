const bcrypt = require("bcrypt");
const tokenService = require("./../services/token.service");
const db = require("../models");
const catchAsync = require("../utils/catchAsync");
const User = db.User;

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  const token = tokenService.generateToken(user.id);
  res.status(200).json({ user, token });
  // const user = await User.findByPk()
});

exports.getUser = catchAsync(async (req, res) => {
  const userId = req.userId;
  const user = await User.findByPk(userId);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  res.status(200).json({ status: "success", user });
});

exports.createUser = catchAsync(async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Add update/delete as needed
