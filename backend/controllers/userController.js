const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
