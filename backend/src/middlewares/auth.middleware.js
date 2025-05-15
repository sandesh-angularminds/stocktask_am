// middleware/verifyAuth.js
const jwt = require("jsonwebtoken");

const SECRET_KEY = "secret";

const verifyAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if header exists and is in proper format
  console.log("authtoken", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("decoded", decoded);
    req.userId = decoded.sub; // Attach user info to request object
    next(); // Proceed to next middleware or route
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyAuth;
