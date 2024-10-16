const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import route files
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

// Routes
app.use("/api/users", userRoutes); // Routes for user-related operations
app.use("/api/products", productRoutes); // Routes for product-related operations

// Error handling middleware (optional, for handling invalid routes)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
