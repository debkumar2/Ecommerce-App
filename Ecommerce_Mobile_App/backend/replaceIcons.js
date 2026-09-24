const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/mockData.js');
let content = fs.readFileSync(filePath, 'utf8');

const unsplashImages = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
  'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80',
  'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80',
  'https://images.unsplash.com/photo-1523293115678-d2900f5b1d65?w=500&q=80',
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80',
  'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffaed?w=500&q=80',
];

let i = 0;
content = content.replace(/https:\/\/img\.icons8\.com\/[^\s'"]+/g, () => {
  const img = unsplashImages[i % unsplashImages.length];
  i++;
  return img;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Replaced all icons8 with Unsplash in mockData.js');
