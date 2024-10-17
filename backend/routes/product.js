const express = require("express");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
} = require("../controllers/productController");
const { authenticate, restrictToAdmin } = require("../middleware/auth");
const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.delete("/:id", deleteProduct);

module.exports = router;
