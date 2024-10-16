const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  image: { type: String, required: true }, // Add image field (URL of the image)
});

module.exports = mongoose.model("Product", productSchema);
