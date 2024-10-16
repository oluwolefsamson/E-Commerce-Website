const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header("Authorization")?.split(" ")[1]; // Split the "Bearer " prefix

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store decoded user data in request
    next(); // Call the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.restrictToAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access restricted to admins only" });
  }
  next();
};
