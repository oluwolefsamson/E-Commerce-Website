const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import route files
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

dotenv.config();

const app = express();

// Define allowed origins for CORS
const allowedOrigins = [
  "https://e-commerce-website-iota-taupe.vercel.app", // Your Vercel app
  "http://localhost:5173", // Local development
  "https://e-commerce-website1-4kwy.onrender.com", // Your Render backend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true, // Enable sending cookies with requests
  })
);

// Middleware to parse JSON
app.use(express.json());

// Handle preflight requests
app.options("*", cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

// Health check route
app.get("/", (req, res) => {
  res.send("API is working");
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
