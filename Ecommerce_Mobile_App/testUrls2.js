const https = require('https');

const urls = [
  'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80', // Electronics
  'https://images.unsplash.com/photo-1558066118-285fb79a3249?w=500&q=80', // Toys (Broken?)
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80', // Books
  'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=500&q=80', // Groceries
  'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500&q=80', // Alternative Toys
  'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80', // Alternative Toys 2
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`${url.substring(34, 45)}... -> ${res.statusCode}`);
  });
});
