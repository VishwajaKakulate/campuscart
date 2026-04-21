const Product = require("../models/Product");

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ message: "Product added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Products
exports.getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};