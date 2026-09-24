const { sequelize } = require('./config/database');
const Cart = require('./models/Cart');
const Wishlist = require('./models/Wishlist');

async function checkDatabase() {
  try {
    await sequelize.authenticate();
    
    const cartItems = await Cart.findAll({ raw: true });
    const wishlistItems = await Wishlist.findAll({ raw: true });

    console.log("🛒 --- ITEMS STORED IN 'Carts' TABLE --- 🛒");
    console.table(cartItems);

    console.log("\n❤️ --- ITEMS STORED IN 'Wishlists' TABLE --- ❤️");
    console.table(wishlistItems);

    process.exit(0);
  } catch (error) {
    console.error("Error checking database:", error);
    process.exit(1);
  }
}

checkDatabase();
