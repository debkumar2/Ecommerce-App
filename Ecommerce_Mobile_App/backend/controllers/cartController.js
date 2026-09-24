const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');

// Get all cart items for a user
exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId || 1; 

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          include: [{ model: Category, as: 'category' }] 
        }
      ]
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId = 1, productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Check if it already exists in cart, if so, increment quantity
    const existing = await Cart.findOne({ where: { userId, productId } });
    if (existing) {
      existing.quantity += 1;
      await existing.save();
      return res.status(200).json(existing);
    }

    const newCartItem = await Cart.create({ userId, productId, quantity: 1 });
    res.status(201).json(newCartItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Error adding to cart' });
  }
};

// Update cart item quantity
exports.updateCart = async (req, res) => {
  try {
    const { userId = 1, productId, quantity } = req.body;

    const cartItem = await Cart.findOne({ where: { userId, productId } });
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      await cartItem.destroy();
      return res.status(200).json({ message: 'Item removed from cart' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Error updating cart' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId = 1, productId } = req.body;

    await Cart.destroy({
      where: { userId, productId }
    });

    res.status(200).json({ message: 'Removed from cart successfully' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Error removing from cart' });
  }
};
