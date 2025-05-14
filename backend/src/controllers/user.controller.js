const db = require("../models");
const User = db.User;

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  console.log('get all users')
  const users = await User.findAll();
  res.json(users);
};

// Add update/delete as needed
