const Product = require('../models/Product');
const Category = require('../models/Category');

// @desc    Fetch all categories
// @route   GET /api/products/categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch all products (optionally filter by category)
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { categoryId } = req.query;
    let where = {};
    if (categoryId) {
      where.categoryId = categoryId;
    }
    const products = await Product.findAll({ 
      where, 
      include: [{ model: Category, as: 'category' }] 
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: 'category' }]
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getCategories,
  getProductById
};
