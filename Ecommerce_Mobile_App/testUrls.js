const http = require('https');

const urls = [
  'https://images.unsplash.com/photo-1526406915894-7bcd65510266?w=500&q=80',
  'https://images.unsplash.com/photo-1587654780208-c782e380f2d4?w=500&q=80',
  'https://images.unsplash.com/photo-1495446811-db6705db37a0?w=500&q=80',
  'https://images.unsplash.com/photo-1542838132-92c533004ce6?w=500&q=80'
];

urls.forEach(url => {
  http.get(url, (res) => {
    console.log(url.substring(0, 45) + '... ->', res.statusCode);
  });
});
