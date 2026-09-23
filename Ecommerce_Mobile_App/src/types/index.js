/**
 * ShopEase Standard Data Type Specifications & Validation Helpers
 */

/**
 * Validates and normalizes Product object properties safely.
 * @param {Object} product 
 * @returns {Object} Normalized Product object
 */
export const normalizeProduct = (product = {}) => {
  if (!product || typeof product !== 'object') {
    return {
      id: `prod-fallback-${Date.now()}`,
      name: 'Item Unavailable',
      price: 0,
      originalPrice: 0,
      rating: 4.5,
      reviewsCount: 0,
      imageUrl: '',
      category: 'General',
      discount: '',
      variant: 'Standard',
    };
  }

  const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
  const originalPrice = typeof product.originalPrice === 'number' ? product.originalPrice : parseFloat(product.originalPrice) || 0;
  const rating = typeof product.rating === 'number' ? product.rating : parseFloat(product.rating) || 4.5;
  const reviewsCount = typeof product.reviewsCount === 'number' ? product.reviewsCount : parseInt(product.reviewsCount, 10) || 0;

  return {
    id: product.id || `prod-${Date.now()}`,
    name: product.name || 'Unnamed Product',
    price,
    originalPrice,
    rating,
    reviewsCount,
    imageUrl: product.imageUrl || '',
    category: product.category || 'General',
    discount: product.discount || '',
    variant: product.variant || 'Standard',
  };
};

/**
 * Validates and normalizes CartItem object properties.
 * @param {Object} item 
 * @returns {Object} Normalized CartItem object
 */
export const normalizeCartItem = (item = {}) => {
  const normProd = normalizeProduct(item);
  const quantity = typeof item?.quantity === 'number' && item.quantity > 0 ? item.quantity : 1;
  return {
    ...normProd,
    quantity,
  };
};

/**
 * Validates and normalizes Address object properties.
 * @param {Object} address 
 * @returns {Object} Normalized Address object
 */
export const normalizeAddress = (address = {}) => {
  if (!address || typeof address !== 'object') {
    return {
      id: `addr-fallback-${Date.now()}`,
      name: 'Valued Customer',
      phone: '+91 98765 43210',
      type: 'HOME',
      isDefault: false,
      flatNo: '',
      street: '',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      fullAddress: 'Default Address',
    };
  }

  return {
    id: address.id || `addr-${Date.now()}`,
    name: address.name || 'Valued Customer',
    phone: address.phone || '+91 98765 43210',
    type: address.type || 'HOME',
    isDefault: !!address.isDefault,
    flatNo: address.flatNo || '',
    street: address.street || '',
    city: address.city || 'Bengaluru',
    state: address.state || 'Karnataka',
    pincode: address.pincode || '560001',
    fullAddress: address.fullAddress || `${address.flatNo || ''}, ${address.street || ''}, ${address.city || ''} - ${address.pincode || ''}`,
  };
};

/**
 * Validates and normalizes User Profile object properties.
 * @param {Object} user 
 * @returns {Object} Normalized User Profile object
 */
export const normalizeUser = (user = {}) => {
  if (!user || typeof user !== 'object') {
    return {
      fullName: 'Supain Nandy',
      email: 'supain.nandy@gmail.com',
      phone: '+91 98765 43210',
      gender: 'Male',
      dob: '1995-08-15',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
      quote: 'Good Shoppers Make a Better World',
      address: '123 Park Avenue, Salt Lake, Kolkata, 700091',
    };
  }

  return {
    fullName: user.fullName || 'Supain Nandy',
    email: user.email || 'supain.nandy@gmail.com',
    phone: user.phone || '+91 98765 43210',
    gender: user.gender || 'Male',
    dob: user.dob || '',
    avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
    quote: user.quote || 'Good Shoppers Make a Better World',
    address: user.address || '',
  };
};
