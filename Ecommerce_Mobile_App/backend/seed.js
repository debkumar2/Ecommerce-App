const { sequelize } = require('./config/database');
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');

const categoriesData = [
  { name: 'Fashion', icon: 'https://img.icons8.com/color/256/dress-front-view.png' },
  { name: 'Electronics', icon: 'https://img.icons8.com/color/256/laptop--v1.png' },
  { name: 'Home & Living', icon: 'https://img.icons8.com/color/256/armchair.png' },
  { name: 'Beauty', icon: 'https://img.icons8.com/color/256/perfume-bottle.png' },
  { name: 'Sports', icon: 'https://img.icons8.com/color/256/dumbbell.png' },
  { name: 'Toys & Games', icon: 'https://img.icons8.com/color/256/rubiks-cube.png' },
  { name: 'Books', icon: 'https://img.icons8.com/color/256/books.png' },
  { name: 'Groceries', icon: 'https://img.icons8.com/color/256/shopping-cart-loaded.png' },
];

const productsData = [
  // Fashion
  {
    title: "Men's Running Shoes",
    description: 'Comfortable sport shoes for daily running.',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    rating: 4.3,
    categoryName: 'Fashion'
  },
  {
    title: 'Minimalist Wrist Watch',
    description: 'Elegant watch for men and women.',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80',
    rating: 4.9,
    categoryName: 'Fashion'
  },
  {
    title: 'Classic Denim Jacket',
    description: 'Vintage blue denim jacket for all seasons.',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80',
    rating: 4.6,
    categoryName: 'Fashion'
  },
  {
    title: 'Premium Leather Wallet',
    description: 'Genuine leather wallet with multiple card slots.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80',
    rating: 4.8,
    categoryName: 'Fashion'
  },
  
  // Electronics
  {
    title: 'Wireless Headphones',
    description: 'High quality noise cancelling headphones.',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    rating: 4.5,
    categoryName: 'Electronics'
  },
  {
    title: 'Smart Watch Series 7',
    description: 'Track your fitness and daily activities.',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    rating: 4.4,
    categoryName: 'Electronics'
  },
  {
    title: '4K Action Camera',
    description: 'Waterproof action camera for adventures.',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
    rating: 4.7,
    categoryName: 'Electronics'
  },
  {
    title: 'Wireless Gaming Mouse',
    description: 'RGB lighting with ultra-low latency.',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1527814050087-151f93f1bc33?w=500&q=80',
    rating: 4.5,
    categoryName: 'Electronics'
  },

  // Home & Living
  {
    title: 'Ergonomic Office Chair',
    description: 'Comfortable chair for long working hours.',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80',
    rating: 4.6,
    categoryName: 'Home & Living'
  },
  {
    title: 'Ceramic Coffee Mug',
    description: 'Handcrafted ceramic mug for your morning brew.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80',
    rating: 4.8,
    categoryName: 'Home & Living'
  },
  {
    title: 'Modern Table Lamp',
    description: 'Sleek metal desk lamp with warm LED light.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80',
    rating: 4.7,
    categoryName: 'Home & Living'
  },

  // Beauty
  {
    title: 'Luxury Perfume',
    description: 'Premium fragrance for special occasions.',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1523293115678-d2900f5b1d65?w=500&q=80',
    rating: 4.7,
    categoryName: 'Beauty'
  },
  {
    title: 'Organic Face Wash',
    description: 'Gentle cleanser with natural ingredients.',
    price: 349,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80',
    rating: 4.5,
    categoryName: 'Beauty'
  },

  // Sports
  {
    title: 'Premium Yoga Mat',
    description: 'Non-slip exercise mat for yoga and fitness.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80',
    rating: 4.8,
    categoryName: 'Sports'
  },
  {
    title: 'Tennis Racket Pro',
    description: 'Lightweight racket for professional players.',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1622279457486-69d73ce18721?w=500&q=80',
    rating: 4.6,
    categoryName: 'Sports'
  },

  // Toys & Games
  {
    title: 'Classic Board Game',
    description: 'Fun for the whole family.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffaed?w=500&q=80',
    rating: 4.9,
    categoryName: 'Toys & Games'
  },

  // Books
  {
    title: 'The Art of Design',
    description: 'A comprehensive guide to modern design.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80',
    rating: 4.9,
    categoryName: 'Books'
  },

  // Groceries
  {
    title: 'Organic Green Tea',
    description: 'Freshly picked green tea leaves.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1627492275512-42eb0ea9ed82?w=500&q=80',
    rating: 4.5,
    categoryName: 'Groceries'
  }
];

async function seedDatabase() {
  try {
    // We only sync Category and Product. If we use force:true it drops them. 
    // We shouldn't drop User if they already registered. Let's just sync without force, or use force for specific models.
    await Category.sync({ force: true });
    await Product.sync({ force: true });
    console.log('Database synced for Categories and Products!');

    // Create Categories
    const createdCategories = {};
    for (let cat of categoriesData) {
      const newCat = await Category.create(cat);
      createdCategories[newCat.name] = newCat.id;
    }
    console.log('Categories seeded!');

    // Create Products
    for (let prod of productsData) {
      const categoryId = createdCategories[prod.categoryName];
      if (categoryId) {
        await Product.create({
          title: prod.title,
          description: prod.description,
          price: prod.price,
          image: prod.image,
          rating: prod.rating,
          categoryId: categoryId
        });
      }
    }
    console.log('Products seeded!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedDatabase();
