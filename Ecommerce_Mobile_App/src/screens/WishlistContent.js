import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { Heart, Trash2, ShoppingBag, Star, ArrowRight } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { wishlistData as initialWishlist } from '../data/mockData';

export default function WishlistContent({ onAddToCart, onExploreProducts }) {
  const [items, setItems] = useState(initialWishlist);
  const [activeFilter, setActiveFilter] = useState('All');

  const handleRemoveItem = (id, name) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    const msg = `Removed "${name}" from your wishlist.`;
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Wishlist Updated', msg);
  };

  const handleMoveToCart = (item) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'In Stock') return item.inStock;
    if (activeFilter === 'On Sale') return !!item.discount;
    return true;
  });

  const renderWishlistItem = ({ item }) => (
    <View style={styles.card}>
      {/* Product Image & Badges */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} resizeMode="cover" />
        
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item.id, item.name)}
          activeOpacity={0.7}
        >
          <Trash2 size={15} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <View style={styles.contentContainer}>
        <View style={styles.stockRow}>
          <View style={[styles.stockDot, { backgroundColor: item.inStock ? '#10B981' : '#F59E0B' }]} />
          <Text style={[styles.stockText, { color: item.inStock ? '#059669' : '#D97706' }]}>
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>

        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price.toLocaleString('en-IN')}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>₹{item.originalPrice.toLocaleString('en-IN')}</Text>
          )}
        </View>

        <View style={styles.ratingRow}>
          <Star size={12} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviewsCount})</Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.cartButton, !item.inStock && styles.disabledCartButton]}
          onPress={() => handleMoveToCart(item)}
          disabled={!item.inStock}
          activeOpacity={0.8}
        >
          <ShoppingBag size={14} color={colors.white} style={{ marginRight: 6 }} />
          <Text style={styles.cartButtonText}>
            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Title */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>My Wishlist</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{items.length} Saved</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Save items you love and buy them anytime</Text>
      </View>

      {/* Filter Chips */}
      {items.length > 0 && (
        <View style={styles.filterRow}>
          {['All', 'In Stock', 'On Sale'].map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[styles.filterChip, isActive && styles.activeFilterChip]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.filterText, isActive && styles.activeFilterText]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Wishlist Grid */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={renderWishlistItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBg}>
              <Heart size={36} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
            <Text style={styles.emptySubtitle}>
              Explore our wide collection and save your favorite products here!
            </Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={onExploreProducts}
              activeOpacity={0.8}
            >
              <Text style={styles.exploreButtonText}>Explore Products</Text>
              <ArrowRight size={16} color={colors.white} style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginRight: 10,
  },
  countBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeFilterChip: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeFilterText: {
    color: colors.primary,
    fontWeight: '700',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  card: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    height: 120,
    backgroundColor: '#F8FAFC',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  discountText: {
    color: colors.white,
    fontSize: 9.5,
    fontWeight: '800',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  contentContainer: {
    padding: 10,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  stockText: {
    fontSize: 10,
    fontWeight: '700',
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginRight: 4,
  },
  originalPrice: {
    fontSize: 11,
    color: colors.textPlaceholder,
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textPrimary,
    marginLeft: 3,
  },
  reviewsText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginLeft: 2,
  },
  cartButton: {
    backgroundColor: colors.primary,
    height: 34,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  disabledCartButton: {
    backgroundColor: '#CBD5E1',
  },
  cartButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  emptyIconBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  exploreButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  exploreButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
