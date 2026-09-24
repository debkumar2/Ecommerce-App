const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const Category = require('../models/Category');

// Get all wishlist items for a user
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.params.userId || 1; // Default to user 1 for now

    const wishlistItems = await Wishlist.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          include: [{ model: Category, as: 'category' }] // Include category for product details
        }
      ]
    });

    res.status(200).json(wishlistItems);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Error fetching wishlist' });
  }
};

// Add item to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { userId = 1, productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Check if it already exists
    const existing = await Wishlist.findOne({ where: { userId, productId } });
    if (existing) {
      return res.status(400).json({ message: 'Product is already in wishlist' });
    }

    const newWishlistItem = await Wishlist.create({ userId, productId });
    res.status(201).json(newWishlistItem);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Error adding to wishlist' });
  }
};

// Remove item from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { userId = 1, productId } = req.body; // or could use req.params

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    await Wishlist.destroy({
      where: { userId, productId }
    });

    res.status(200).json({ message: 'Removed from wishlist successfully' });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Error removing from wishlist' });
  }
};
