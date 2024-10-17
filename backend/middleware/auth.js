const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header("Authorization")?.split(" ")[1]; // Split the "Bearer " prefix

  console.log("Token:", token); // Debugging line

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.restrictToAdmin = (req, res, next) => {
  console.log("User Role:", req.user.role); // Debugging line
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access restricted to admins only" });
  }
  next();
};
