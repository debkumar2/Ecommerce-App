const { sequelize } = require('./config/database');
const Product = require('./models/Product');
const Category = require('./models/Category');

async function run() {
  const products = await Product.findAll({ 
    include: [{ model: Category, as: 'category' }]
  });
  const categoryCounts = {};
  products.forEach(p => {
    const cName = p.category ? p.category.name : 'Unknown';
    categoryCounts[cName] = (categoryCounts[cName] || 0) + 1;
  });
  console.log(categoryCounts);
  process.exit(0);
}
run();
