import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Heart, Star, ShoppingBag, Headphones, Footprints, Watch, Smartphone, Sparkles } from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function ProductCard({ item, onAddToCart, onToggleFavorite, containerStyle }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    if (onToggleFavorite) onToggleFavorite(item, !isFavorite);
  };

  const renderProductIllustration = () => {
    if (item.imageUrl) {
      return (
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.productImage} 
          resizeMode="cover" 
        />
      );
    }
    
    // Fallback if no image URL
    const iconProps = { size: 48, color: '#374151' };
    switch (item.type) {
      case 'headphones':
        return <Headphones {...iconProps} color="#1F2937" />;
      case 'shoes':
        return <Footprints {...iconProps} color="#4B5563" />;
      case 'watch':
        return <Watch {...iconProps} color="#111827" />;
      case 'bag':
        return <ShoppingBag {...iconProps} color="#D97706" />;
      case 'phone':
        return <Smartphone {...iconProps} color="#2563EB" />;
      case 'perfume':
        return <Sparkles {...iconProps} color="#EC4899" />;
      default:
        return <ShoppingBag {...iconProps} />;
    }
  };

  return (
    <View style={[styles.card, containerStyle]}>
      {/* Image Container with Top Row overlaid */}
      <View style={styles.imageContainer}>
        {renderProductIllustration()}
        
        <View style={styles.topRowOverlay}>
          {item.discount ? (
            <View style={[styles.discountBadge, item.badgeColor ? { backgroundColor: item.badgeColor } : null]}>
              <Text style={styles.discountText}>{item.discount}</Text>
            </View>
          ) : <View />}

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            activeOpacity={0.7}
          >
            <Heart
              size={16}
              color={isFavorite ? colors.primary : '#6B7280'}
              fill={isFavorite ? colors.primary : 'transparent'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {/* Product Details */}
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price.toLocaleString('en-IN')}</Text>
          {item.originalPrice ? (
            <Text style={styles.originalPrice}>₹{item.originalPrice.toLocaleString('en-IN')}</Text>
          ) : null}
        </View>

        {/* Rating Row */}
        <View style={styles.ratingRow}>
          <Star size={13} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviewsCount})</Text>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => onAddToCart(item)}
          activeOpacity={0.8}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  imageContainer: {
    height: 140,
    backgroundColor: '#F9FAFB',
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  topRowOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 10,
  },
  discountBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  discountText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  favoriteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentContainer: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textPlaceholder,
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 3,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  addToCartText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
