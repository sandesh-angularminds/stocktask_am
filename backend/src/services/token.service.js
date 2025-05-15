const jwt = require("jsonwebtoken");

const generateToken = (userId, secret = "secret") => {
  const payload = {
    sub: userId,
    exp: 100000000000,
  };
  return jwt.sign(payload, secret);
};

module.exports = { generateToken };
