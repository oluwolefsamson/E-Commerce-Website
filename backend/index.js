const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import route files
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL, // my Vercel app
  "http://localhost:5173", // my local development
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Middleware to parse JSON
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/", (req, res) => {
  res.send("API is working");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
