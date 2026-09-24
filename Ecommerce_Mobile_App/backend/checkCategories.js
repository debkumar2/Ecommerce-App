const { sequelize } = require('./config/database');
const Category = require('./models/Category');

async function run() {
  const cats = await Category.findAll({ raw: true });
  cats.forEach(c => console.log(`ID: ${c.id}, Name: "${c.name}"`));
  process.exit(0);
}
run();
