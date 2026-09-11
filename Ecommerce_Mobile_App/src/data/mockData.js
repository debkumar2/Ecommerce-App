export const categoriesData = [
  { 
    id: '1', name: 'Fashion', items: '1,200+ items', color: '#FFF0F0', iconColor: '#EF4444', imageUrl: 'https://img.icons8.com/color/256/dress-front-view.png',
    stories: [
      { id: 's1', imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80', title: 'Summer Collection', subtitle: 'New Arrivals', linkText: 'Shop Now' },
      { id: 's2', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', title: 'Vibrant Looks', subtitle: 'Stand Out', linkText: 'View Style' },
      { id: 's3', imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80', title: 'Streetwear', subtitle: 'Urban Vibes', linkText: 'Explore' }
    ]
  },
  { 
    id: '2', name: 'Electronics', items: '850+ items', color: '#F0F9FF', iconColor: '#3B82F6', imageUrl: 'https://img.icons8.com/color/256/laptop--v1.png',
    stories: [
      { id: 's4', imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80', title: 'Work From Home', subtitle: 'Setup Guide', linkText: 'Upgrade' },
      { id: 's5', imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80', title: 'Latest Gadgets', subtitle: 'Tech Deals', linkText: 'Discover' }
    ]
  },
  { 
    id: '3', name: 'Home & Living', items: '670+ items', color: '#ECFDF5', iconColor: '#10B981', imageUrl: 'https://img.icons8.com/color/256/armchair.png',
    stories: [
      { id: 's6', imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=800&q=80', title: 'Minimalist Spaces', subtitle: 'Interior Design', linkText: 'Shop Decor' },
      { id: 's7', imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28ce8f31161?w=800&q=80', title: 'Cozy Corners', subtitle: 'Living Room', linkText: 'Find Your Vibe' }
    ]
  },
  { 
    id: '4', name: 'Beauty & Personal Care', items: '950+ items', color: '#FDF4FF', iconColor: '#EC4899', imageUrl: 'https://img.icons8.com/color/256/perfume-bottle.png',
    stories: [
      { id: 's8', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?w=800&q=80', title: 'Skincare Routine', subtitle: 'Glow Up', linkText: 'Shop Products' }
    ]
  },
  { id: '5', name: 'Sports & Fitness', items: '420+ items', color: '#FFF7ED', iconColor: '#F97316', imageUrl: 'https://img.icons8.com/color/256/dumbbell.png' },
  { id: '6', name: 'Groceries', items: '1,100+ items', color: '#F0FDF4', iconColor: '#22C55E', imageUrl: 'https://img.icons8.com/color/256/shopping-basket-2.png' },
  { id: '7', name: 'Toys & Games', items: '540+ items', color: '#F5F3FF', iconColor: '#8B5CF6', imageUrl: 'https://img.icons8.com/color/256/teddy-bear.png' },
  { id: '8', name: 'Health & Wellness', items: '620+ items', color: '#FEFCE8', iconColor: '#EAB308', imageUrl: 'https://img.icons8.com/color/256/pills.png' },
  { id: '9', name: 'Mobiles & Accessories', items: '780+ items', color: '#EFF6FF', iconColor: '#3B82F6', imageUrl: 'https://img.icons8.com/color/256/iphone.png' },
  { id: '10', name: 'Books & Stationery', items: '360+ items', color: '#FFF1F2', iconColor: '#F43F5E', imageUrl: 'https://img.icons8.com/color/256/books.png' },
];

export const todaysDealsData = [
  {
    id: 'deal-1',
    name: 'Wireless Headphones',
    price: 1999,
    originalPrice: 3999,
    discount: '50% OFF',
    rating: 4.5,
    reviewsCount: '1.2k',
    type: 'headphones',
    badgeColor: '#EF4444',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  },
  {
    id: 'deal-2',
    name: "Men's Running Shoes",
    price: 2499,
    originalPrice: 4199,
    discount: '40% OFF',
    rating: 4.3,
    reviewsCount: '980',
    type: 'shoes',
    badgeColor: '#EF4444',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
  },
  {
    id: 'deal-3',
    name: 'Smart Watch',
    price: 2999,
    originalPrice: 4299,
    discount: '30% OFF',
    rating: 4.4,
    reviewsCount: '1.8k',
    type: 'watch',
    badgeColor: '#EF4444',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
  },
  {
    id: 'deal-4',
    name: 'Gaming Keyboard',
    price: 3499,
    originalPrice: 4999,
    discount: '30% OFF',
    rating: 4.7,
    reviewsCount: '850',
    type: 'keyboard',
    badgeColor: '#EF4444',
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80',
  },
  {
    id: 'deal-5',
    name: 'Ergonomic Chair',
    price: 8999,
    originalPrice: 12999,
    discount: '31% OFF',
    rating: 4.6,
    reviewsCount: '420',
    type: 'furniture',
    badgeColor: '#EF4444',
    imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80',
  },
  {
    id: 'deal-6',
    name: 'Wireless Mouse',
    price: 999,
    originalPrice: 1999,
    discount: '50% OFF',
    rating: 4.8,
    reviewsCount: '2.4k',
    type: 'mouse',
    badgeColor: '#EF4444',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
  },
  {
    id: 'deal-7',
    name: '4K Action Camera',
    price: 12999,
    originalPrice: 18999,
    discount: '31% OFF',
    rating: 4.5,
    reviewsCount: '920',
    type: 'camera',
    badgeColor: '#EF4444',
    imageUrl: 'https://images.unsplash.com/photo-1512753360435-329c4535a9a7?w=500&q=80',
  },
  {
    id: 'deal-8',
    name: 'Bluetooth Speaker',
    price: 1499,
    originalPrice: 2499,
    discount: '40% OFF',
    rating: 4.6,
    reviewsCount: '1.5k',
    type: 'speaker',
    badgeColor: '#EF4444',
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-411a51152d11?w=500&q=80',
  },
  {
    id: 'deal-9',
    name: 'Portable Power Bank',
    price: 899,
    originalPrice: 1599,
    discount: '43% OFF',
    rating: 4.7,
    reviewsCount: '3.1k',
    type: 'battery',
    badgeColor: '#EF4444',
    imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80',
  },
  {
    id: 'deal-10',
    name: 'Gaming Headset',
    price: 2499,
    originalPrice: 4999,
    discount: '50% OFF',
    rating: 4.8,
    reviewsCount: '1.8k',
    type: 'headphones',
    badgeColor: '#EF4444',
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80',
  },
];

export const ordersData = [
  {
    id: '1',
    orderNumber: 'SK12345678',
    placedDate: '12 Mar 2024',
    status: 'Delivered',
    statusDateText: 'Delivered on\n15 Mar 2024',
    actionText: 'Buy Again',
    product: {
      name: "Men's Running Shoes",
      variants: 'Size: 9 | Color: White',
      price: '₹2,499',
      qty: 1,
      imageUrl: 'https://img.icons8.com/color/256/sneakers.png'
    }
  },
  {
    id: '2',
    orderNumber: 'SK12345677',
    placedDate: '08 Mar 2024',
    status: 'Shipped',
    statusDateText: 'Expected Delivery\n12 Mar 2024',
    actionText: 'Track Order',
    product: {
      name: 'Smart Watch',
      variants: 'Color: Black',
      price: '₹2,999',
      qty: 1,
      imageUrl: 'https://img.icons8.com/color/256/apple-watch-apps.png'
    }
  },
  {
    id: '3',
    orderNumber: 'SK12345676',
    placedDate: '01 Mar 2024',
    status: 'Processing',
    statusDateText: "Preparing for shipment\nWe'll notify you soon",
    actionText: 'View Details',
    product: {
      name: "Women's Handbag",
      variants: 'Color: Pink',
      price: '₹1,299',
      qty: 1,
      imageUrl: 'https://img.icons8.com/color/256/womans-bag.png'
    }
  },
  {
    id: '4',
    orderNumber: 'SK12345675',
    placedDate: '20 Feb 2024',
    status: 'Cancelled',
    statusDateText: 'Cancelled on\n21 Feb 2024',
    actionText: 'View Details',
    product: {
      name: 'Wireless Headphones',
      variants: 'Color: Black',
      price: '₹1,999',
      qty: 1,
      imageUrl: 'https://img.icons8.com/color/256/headphones.png'
    }
  }
];

export const featuredProductsData = [
  {
    id: 'feat-1',
    name: 'Leather Handbag',
    price: 3499,
    originalPrice: 5999,
    discount: '42% OFF',
    rating: 4.6,
    reviewsCount: '2.1k',
    type: 'bag',
    imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80',
  },
  {
    id: 'feat-2',
    name: 'Flagship Smartphone',
    price: 54999,
    originalPrice: 69999,
    discount: '21% OFF',
    rating: 4.8,
    reviewsCount: '5.4k',
    type: 'phone',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
  },
  {
    id: 'feat-3',
    name: 'Luxury Perfume',
    price: 1899,
    originalPrice: 2999,
    discount: '36% OFF',
    rating: 4.7,
    reviewsCount: '890',
    type: 'perfume',
    imageUrl: 'https://images.unsplash.com/photo-1523293115678-d2900f5b1d65?w=500&q=80',
  },
  {
    id: 'feat-4',
    name: 'Classic White Sneakers',
    price: 2299,
    originalPrice: 3799,
    discount: '39% OFF',
    rating: 4.5,
    reviewsCount: '1.5k',
    type: 'shoes',
    imageUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80',
  },
];

export const wishlistData = [
  {
    id: 'wish-1',
    name: 'Wireless Headphones',
    price: 1999,
    originalPrice: 3999,
    discount: '50% OFF',
    rating: 4.5,
    reviewsCount: '1.2k',
    inStock: true,
    type: 'headphones',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  },
  {
    id: 'wish-2',
    name: "Men's Pro Running Shoes",
    price: 2499,
    originalPrice: 4199,
    discount: '40% OFF',
    rating: 4.3,
    reviewsCount: '980',
    inStock: true,
    type: 'shoes',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
  },
  {
    id: 'wish-3',
    name: 'Luxury Leather Handbag',
    price: 3499,
    originalPrice: 5999,
    discount: '42% OFF',
    rating: 4.6,
    reviewsCount: '2.1k',
    inStock: true,
    type: 'bag',
    imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80',
  },
  {
    id: 'wish-4',
    name: 'Smart Fitness Watch Series 5',
    price: 2999,
    originalPrice: 4299,
    discount: '30% OFF',
    rating: 4.4,
    reviewsCount: '1.8k',
    inStock: false,
    type: 'watch',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
  },
];

export const initialCartData = [
  {
    id: 'cart-1',
    name: 'Wireless Headphones',
    variant: 'Color: Matte Black',
    price: 1999,
    originalPrice: 3999,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  },
  {
    id: 'cart-2',
    name: "Men's Pro Running Shoes",
    variant: 'Size: 9 | Color: Red',
    price: 2499,
    originalPrice: 4199,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
  },
];

export const topBrandsData = [
  { id: 'b1', name: 'Nike', imageUrl: 'https://img.icons8.com/color/256/nike.png' },
  { id: 'b2', name: 'Apple', imageUrl: 'https://img.icons8.com/ios-filled/256/mac-os.png' },
  { id: 'b3', name: 'Sony', imageUrl: 'https://img.icons8.com/ios-filled/256/sony.png' },
  { id: 'b4', name: 'Adidas', imageUrl: 'https://img.icons8.com/color/256/adidas-trefoil.png' },
  { id: 'b5', name: 'Samsung', imageUrl: 'https://img.icons8.com/color/256/samsung.png' },
  { id: 'b6', name: 'Puma', imageUrl: 'https://img.icons8.com/ios-filled/256/puma.png' },
];

export const flashSaleData = [
  {
    id: 'fs-1',
    name: 'AirPods Pro Gen 2',
    price: 18999,
    originalPrice: 24999,
    discount: '24% OFF',
    rating: 4.9,
    reviewsCount: '12k',
    type: 'headphones',
    badgeColor: '#F59E0B',
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80',
  },
  {
    id: 'fs-2',
    name: 'Sony PS5 Console',
    price: 44990,
    originalPrice: 49990,
    discount: '10% OFF',
    rating: 4.8,
    reviewsCount: '8.5k',
    type: 'electronics',
    badgeColor: '#F59E0B',
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80',
  },
  {
    id: 'fs-3',
    name: 'Dyson V11 Vacuum',
    price: 39900,
    originalPrice: 52900,
    discount: '25% OFF',
    rating: 4.7,
    reviewsCount: '3.2k',
    type: 'home',
    badgeColor: '#F59E0B',
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&q=80',
  },
];

export const collectionsData = [
  {
    id: 'col-1',
    title: 'Summer Vibes',
    subtitle: 'Up to 50% Off',
    imageUrl: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=500&q=80',
    color: '#FDF4FF'
  },
  {
    id: 'col-2',
    title: 'Gadget Geeks',
    subtitle: 'New Arrivals',
    imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80',
    color: '#F0F9FF'
  },
  {
    id: 'col-3',
    title: 'Home Makeover',
    subtitle: 'Decor & More',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80',
    color: '#ECFDF5'
  },
  {
    id: 'col-4',
    title: 'Sneakerheads',
    subtitle: 'Hottest Drops',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80',
    color: '#FFF7ED'
  }
];

export const videoShortsData = [
  {
    id: 'v1',
    creator: '@styleicon',
    views: '1.2M',
    title: 'GRWM: Summer Party',
    videoThumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
    productImage: 'https://img.icons8.com/color/256/dress-front-view.png'
  },
  {
    id: 'v2',
    creator: '@techguru',
    views: '850K',
    title: 'Top 5 Desk Setups',
    videoThumbnail: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80',
    productImage: 'https://img.icons8.com/color/256/laptop--v1.png'
  },
  {
    id: 'v3',
    creator: '@homedecor',
    views: '420K',
    title: 'Cozy Living Room',
    videoThumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80',
    productImage: 'https://img.icons8.com/color/256/armchair.png'
  },
  {
    id: 'v4',
    creator: '@sneakerhead',
    views: '2.1M',
    title: 'Unboxing Rare Kicks',
    videoThumbnail: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80',
    productImage: 'https://img.icons8.com/color/256/sneakers.png'
  }
];

export const dealOfTheDayData = {
  id: 'dod-1',
  title: 'Deal of the Day',
  productName: 'Nike Air Max 270',
  description: 'Experience lightweight comfort with an iconic design.',
  price: 8999,
  originalPrice: 14999,
  discount: '40% OFF',
  imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  endTime: new Date(new Date().getTime() + 1000 * 60 * 60 * 8).toISOString(), // 8 hours from now
};

export const shopTheLookData = {
  id: 'stl-1',
  title: 'Shop The Look',
  subtitle: 'Urban Streetwear Collection',
  mainImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
  hotspots: [
    {
      id: 'hs-1',
      x: 35, // percentage from left
      y: 20, // percentage from top
      product: {
        name: 'Classic Sunglasses',
        price: '₹1,299',
        imageUrl: 'https://img.icons8.com/color/256/sunglasses.png'
      }
    },
    {
      id: 'hs-2',
      x: 60,
      y: 45,
      product: {
        name: 'Denim Jacket',
        price: '₹3,499',
        imageUrl: 'https://img.icons8.com/color/256/jacket.png'
      }
    },
    {
      id: 'hs-3',
      x: 45,
      y: 85,
      product: {
        name: 'White Sneakers',
        price: '₹2,999',
        imageUrl: 'https://img.icons8.com/color/256/sneakers.png'
      }
    }
  ]
};
