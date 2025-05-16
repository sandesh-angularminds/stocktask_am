const bcrypt = require("bcrypt");
const tokenService = require("./../services/token.service");
const db = require("../models");
const catchAsync = require("../utils/catchAsync");
const User = db.User;

exports.login = catchAsync(async (req, res) => {
  console.log("login");
  const { email, password } = req.body;
  console.log("email", email);
  const user = await User.findOne({ where: { email } });
  console.log("user", user);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  console.log("user", user);
  const token = tokenService.generateToken(user.id);
  console.log("token", token);
  res.status(200).json({ user, token });
  // const user = await User.findByPk()
});

exports.getUser = catchAsync(async (req, res) => {
  const userId = req.userId;
  console.log("user", userId);
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
  console.log("get all users");
  const users = await User.findAll();
  res.json(users);
});

// Add update/delete as needed
