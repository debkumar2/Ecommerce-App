export const categoriesData = [
  { id: '1', name: 'Fashion', items: '1,200+ items', color: '#FFF0F0', iconColor: '#EF4444', imageUrl: 'https://img.icons8.com/color/256/dress-front-view.png' },
  { id: '2', name: 'Electronics', items: '850+ items', color: '#F0F9FF', iconColor: '#3B82F6', imageUrl: 'https://img.icons8.com/color/256/laptop--v1.png' },
  { id: '3', name: 'Home & Living', items: '670+ items', color: '#ECFDF5', iconColor: '#10B981', imageUrl: 'https://img.icons8.com/color/256/armchair.png' },
  { id: '4', name: 'Beauty & Personal Care', items: '950+ items', color: '#FDF4FF', iconColor: '#EC4899', imageUrl: 'https://img.icons8.com/color/256/perfume-bottle.png' },
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
