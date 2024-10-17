const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose"); // Import mongoose

exports.register = async (req, res) => {
  const { username, email, password, phone, role } = req.body;

  // Validate the required fields
  if (!username || !email || !password || !phone) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check for existing users with the same email or phone
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or phone number already exists." });
    }

    // Create and save the new user
    const user = new User({ username, email, password, phone, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    // Handle specific validation errors if using mongoose validators
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    // General error handling
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Create the JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Exclude the password from the user details before sending the response
    const { password: _, ...userDetails } = user.toObject();

    // Respond with user details and token
    res.json({ token, user: userDetails });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  console.log("Fetching all users..."); // Debug log
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err); // Error log
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  // Trim any whitespace from the ID
  const trimmedId = id.trim();

  // Validate ObjectID
  if (!mongoose.isValidObjectId(trimmedId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(trimmedId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude the password before sending the response
    const { password: _, ...userDetails } = user.toObject();
    res.status(200).json(userDetails);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: err.message });
  }
};
