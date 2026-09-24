const { sequelize } = require('./config/database');
const p = require('./models/Product');

async function run() {
  const products = await p.findAll({ raw: true });
  console.log('Total products:', products.length);
  for (let i = 0; i < Math.min(3, products.length); i++) {
    console.log(`Product ${products[i].id}: image=${products[i].image}`);
  }
  process.exit(0);
}
run();
