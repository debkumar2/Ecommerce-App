import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import {
  ArrowLeft,
  Heart,
  Star,
  Share2,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Zap,
  Eye,
} from 'lucide-react-native';
import { colors } from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS_LIST = [
  { id: 'c1', name: 'Midnight Black', hex: '#1F2937' },
  { id: 'c2', name: 'Navy Blue', hex: '#1E3A8A' },
  { id: 'c3', name: 'Crimson Red', hex: '#DC2626' },
  { id: 'c4', name: 'Emerald Green', hex: '#059669' },
];

export default function ProductDetailsScreen({
  visible,
  product,
  onClose,
  onAddToCart,
  onToggleFavorite,
  onBuyNow,
}) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(COLORS_LIST[0]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'reviews'
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(SCREEN_WIDTH);
  const [fullProduct, setFullProduct] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  React.useEffect(() => {
    if (product?.id && !isNaN(product.id)) {
      setLoadingDetails(true);
      fetch(`http://192.168.31.64:5000/api/products/${product.id}`)
        .then(res => res.json())
        .then(data => {
          setFullProduct(data);
          setLoadingDetails(false);
        })
        .catch(err => {
          console.error('Failed to fetch full product details:', err);
          setLoadingDetails(false);
        });
    } else {
      setFullProduct(null);
    }
  }, [product?.id]);

  const displayProduct = fullProduct ? {
    ...product,
    description: fullProduct.description,
    type: fullProduct.category ? fullProduct.category.name : product.type
  } : product;

  const imageScrollViewRef = useRef(null);

  if (!displayProduct) return null;

  const galleryImages = (displayProduct.images && displayProduct.images.length > 0)
    ? displayProduct.images
    : [
        displayProduct.imageUrl || 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
      ];

  const handleImageScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / sliderWidth);
    if (index !== activeImageIndex && index >= 0 && index < galleryImages.length) {
      setActiveImageIndex(index);
    }
  };

  const handleThumbnailPress = (index) => {
    setActiveImageIndex(index);
    if (imageScrollViewRef.current) {
      imageScrollViewRef.current.scrollTo({ x: index * sliderWidth, animated: true });
    }
  };

  const handleFavoriteToggle = () => {
    const nextState = !isFavorite;
    setIsFavorite(nextState);
    if (onToggleFavorite) {
      onToggleFavorite(product, nextState);
    }
  };

  const handleShare = () => {
    const msg = `Check out ${displayProduct.name} on ShopEase! Price: ₹${displayProduct.price}`;
    if (Platform.OS === 'web') {
      if (navigator.share) {
        navigator.share({ title: displayProduct.name, text: msg, url: window.location.href });
      } else {
        alert(msg);
      }
    } else {
      Alert.alert('Share Product', msg);
    }
  };

  const handleAddToCartPress = () => {
    const itemWithVariant = {
      ...displayProduct,
      variant: `Size: ${selectedSize} | Color: ${selectedColor.name}`,
    };
    if (onAddToCart) {
      onAddToCart(itemWithVariant);
    }
  };

  const handleBuyNowPress = () => {
    const itemWithVariant = {
      ...displayProduct,
      variant: `Size: ${selectedSize} | Color: ${selectedColor.name}`,
    };
    if (onAddToCart) {
      onAddToCart(itemWithVariant);
    }
    if (onBuyNow) {
      onBuyNow(itemWithVariant);
    } else {
      const msg = `Redirecting to Instant Checkout for ${displayProduct.name}!`;
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Buy Now', msg);
    }
  };

  const originalPrice = displayProduct.originalPrice || Math.round(displayProduct.price * 1.35);
  const discountPercent = displayProduct.discount || `${Math.round(((originalPrice - displayProduct.price) / originalPrice) * 100)}% OFF`;
  const savingsAmount = originalPrice - displayProduct.price;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Sticky Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={onClose} activeOpacity={0.7}>
            <ArrowLeft size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {displayProduct.name}
          </Text>
          <View style={styles.headerRightActions}>
            <TouchableOpacity style={styles.iconButton} onPress={handleShare} activeOpacity={0.7}>
              <Share2 size={20} color={colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleFavoriteToggle} activeOpacity={0.7}>
              <Heart
                size={20}
                color={isFavorite ? colors.primary : colors.textPrimary}
                fill={isFavorite ? colors.primary : 'transparent'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Bigger Interactive Image Slider Showcase */}
          <View
            style={styles.imageSliderContainer}
            onLayout={(e) => {
              const w = e.nativeEvent.layout.width;
              if (w && w !== sliderWidth) setSliderWidth(w);
            }}
          >
            <ScrollView
              ref={imageScrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleImageScroll}
              scrollEventThrottle={16}
            >
              {galleryImages.map((imgUrl, idx) => (
                <View key={idx} style={[styles.slideImageWrapper, { width: sliderWidth }]}>
                  <Image
                    source={{ uri: imgUrl }}
                    style={styles.productHeroImage}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </ScrollView>

            {/* Discount / New Badge Overlay */}
            {displayProduct.badgeText ? (
              <View style={[styles.badge, displayProduct.badgeColor ? { backgroundColor: displayProduct.badgeColor } : null]}>
                <Text style={styles.badgeText}>{displayProduct.badgeText}</Text>
              </View>
            ) : displayProduct.discount ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{displayProduct.discount}</Text>
              </View>
            ) : null}

            {/* Image Counter Badge Overlay */}
            <View style={styles.imageCounterBadge}>
              <Eye size={13} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.imageCounterText}>
                {activeImageIndex + 1} / {galleryImages.length}
              </Text>
            </View>

            {/* Pagination Dots Indicator */}
            <View style={styles.dotsContainer}>
              {galleryImages.map((_, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.dot,
                    activeImageIndex === idx && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Multiple Angle View Thumbnails Bar */}
          <View style={styles.thumbnailsContainer}>
            <Text style={styles.thumbnailsHeading}>Multiple Views ({galleryImages.length}):</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailsScrollContent}
            >
              {galleryImages.map((imgUrl, idx) => {
                const isSelected = activeImageIndex === idx;
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.thumbnailCard, isSelected && styles.selectedThumbnailCard]}
                    onPress={() => handleThumbnailPress(idx)}
                    activeOpacity={0.8}
                  >
                    <Image source={{ uri: imgUrl }} style={styles.thumbnailImage} resizeMode="cover" />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.detailsCard}>
            {/* Title & Brand */}
            <Text style={styles.brandName}>ShopEase Premium</Text>
            <Text style={styles.productTitle}>{displayProduct.name}</Text>

            {/* Rating & Reviews */}
            <View style={styles.ratingRow}>
              <View style={styles.starBadge}>
                <Star size={14} color="#FFFFFF" fill="#FFFFFF" />
                <Text style={styles.starRatingText}>{displayProduct.rating || '4.8'}</Text>
              </View>
              <Text style={styles.reviewCountText}>({displayProduct.reviewsCount || '120'} customer reviews)</Text>
              <View style={styles.stockStatus}>
                <View style={styles.stockDot} />
                <Text style={styles.stockText}>In Stock</Text>
              </View>
            </View>

            {/* Pricing Card */}
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.currentPrice}>₹{displayProduct.price.toLocaleString('en-IN')}</Text>
                <Text style={styles.originalPrice}>₹{originalPrice.toLocaleString('en-IN')}</Text>
                <View style={styles.discountTag}>
                  <Text style={styles.discountTagText}>{discountPercent}</Text>
                </View>
              </View>
              {savingsAmount > 0 && (
                <Text style={styles.savingsText}>
                  🎉 You save ₹{savingsAmount.toLocaleString('en-IN')} on this order
                </Text>
              )}
            </View>

            {/* Size Selector */}
            <View style={styles.optionSection}>
              <View style={styles.optionHeader}>
                <Text style={styles.optionTitle}>Select Size</Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.sizeGuideText}>Size Guide</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.sizesRow}>
                {SIZES.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <TouchableOpacity
                      key={size}
                      style={[styles.sizeChip, isSelected && styles.selectedSizeChip]}
                      onPress={() => setSelectedSize(size)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.sizeChipText, isSelected && styles.selectedSizeChipText]}>
                        {size}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Color Selector */}
            <View style={styles.optionSection}>
              <Text style={styles.optionTitle}>Selected Color: {selectedColor.name}</Text>
              <View style={styles.colorsRow}>
                {COLORS_LIST.map((colorItem) => {
                  const isSelected = selectedColor.id === colorItem.id;
                  return (
                    <TouchableOpacity
                      key={colorItem.id}
                      style={[
                        styles.colorSwatch,
                        { backgroundColor: colorItem.hex },
                        isSelected && styles.selectedColorSwatch,
                      ]}
                      onPress={() => setSelectedColor(colorItem)}
                      activeOpacity={0.8}
                    >
                      {isSelected && <Check size={16} color="#FFFFFF" />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Delivery & Trust Highlights */}
            <View style={styles.trustBox}>
              <View style={styles.trustItem}>
                <Truck size={20} color={colors.primary} />
                <View style={styles.trustTextContainer}>
                  <Text style={styles.trustTitle}>Free Express Delivery</Text>
                  <Text style={styles.trustSubtitle}>Delivered within 2-4 business days</Text>
                </View>
              </View>
              <View style={styles.trustDivider} />
              <View style={styles.trustItem}>
                <RotateCcw size={20} color={colors.primary} />
                <View style={styles.trustTextContainer}>
                  <Text style={styles.trustTitle}>7 Days Easy Return</Text>
                  <Text style={styles.trustSubtitle}>Hassle-free replacement guarantee</Text>
                </View>
              </View>
              <View style={styles.trustDivider} />
              <View style={styles.trustItem}>
                <ShieldCheck size={20} color={colors.primary} />
                <View style={styles.trustTextContainer}>
                  <Text style={styles.trustTitle}>100% Authentic Product</Text>
                  <Text style={styles.trustSubtitle}>Verified seller & brand warranty</Text>
                </View>
              </View>
            </View>

            {/* Tabs for Info */}
            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'overview' && styles.activeTabButton]}
                onPress={() => setActiveTab('overview')}
              >
                <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
                  Overview
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'specs' && styles.activeTabButton]}
                onPress={() => setActiveTab('specs')}
              >
                <Text style={[styles.tabText, activeTab === 'specs' && styles.activeTabText]}>
                  Details & Specs
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'reviews' && styles.activeTabButton]}
                onPress={() => setActiveTab('reviews')}
              >
                <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
                  Reviews
                </Text>
              </TouchableOpacity>
            </View>

            {/* Tab Body */}
            {activeTab === 'overview' && (
              <View style={styles.tabContent}>
                <Text style={styles.descriptionText}>
                  {displayProduct.description || `Elevate your everyday wardrobe with the ${displayProduct.name}. Crafted from premium breathable materials, designed for maximum durability, style, and effortless comfort. Perfect for modern lifestyle and versatility.`}
                </Text>
                <View style={styles.highlightsList}>
                  <View style={styles.highlightRow}>
                    <Sparkles size={16} color={colors.primary} style={{ marginRight: 8 }} />
                    <Text style={styles.highlightText}>Ultra-soft premium fabric construction</Text>
                  </View>
                  <View style={styles.highlightRow}>
                    <Sparkles size={16} color={colors.primary} style={{ marginRight: 8 }} />
                    <Text style={styles.highlightText}>Ergonomic fit tailored for sleek silhouette</Text>
                  </View>
                  <View style={styles.highlightRow}>
                    <Sparkles size={16} color={colors.primary} style={{ marginRight: 8 }} />
                    <Text style={styles.highlightText}>Color-fade resistant technology</Text>
                  </View>
                </View>
              </View>
            )}

            {activeTab === 'specs' && (
              <View style={styles.tabContent}>
                <View style={styles.specRow}>
                  <Text style={styles.specLabel}>Category:</Text>
                  <Text style={styles.specValue}>{displayProduct.type || 'Apparel / Lifestyle'}</Text>
                </View>
                <View style={styles.specRow}>
                  <Text style={styles.specLabel}>Material:</Text>
                  <Text style={styles.specValue}>100% Organic Cotton Blend</Text>
                </View>
                <View style={styles.specRow}>
                  <Text style={styles.specLabel}>Fit Type:</Text>
                  <Text style={styles.specValue}>Regular Fit</Text>
                </View>
                <View style={styles.specRow}>
                  <Text style={styles.specLabel}>Care Instructions:</Text>
                  <Text style={styles.specValue}>Machine Wash Warm, Tumble Dry Low</Text>
                </View>
              </View>
            )}

            {activeTab === 'reviews' && (
              <View style={styles.tabContent}>
                <View style={styles.reviewSummaryCard}>
                  <Text style={styles.reviewBigRating}>{displayProduct.rating || '4.8'}</Text>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={16} color="#F59E0B" fill="#F59E0B" />
                    ))}
                  </View>
                  <Text style={styles.reviewSummaryText}>Based on {displayProduct.reviewsCount || '120'} customer reviews</Text>
                </View>

                {/* Sample Review item */}
                <View style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewerName}>Alex M.</Text>
                    <Text style={styles.reviewDate}>2 days ago</Text>
                  </View>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} color="#F59E0B" fill="#F59E0B" />
                    ))}
                  </View>
                  <Text style={styles.reviewBody}>
                    Amazing product! Quality is outstanding and fits exactly as expected. Fast shipping too.
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Fixed Bottom Action Bar */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={handleAddToCartPress}
            activeOpacity={0.8}
          >
            <ShoppingBag size={18} color={colors.primary} style={{ marginRight: 6 }} />
            <Text style={styles.addToCartBtnText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buyNowBtn}
            onPress={handleBuyNowPress}
            activeOpacity={0.8}
          >
            <Zap size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.buyNowBtnText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    elevation: 2,
    zIndex: 10,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginHorizontal: 12,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  imageSliderContainer: {
    width: '100%',
    height: 420,
    backgroundColor: '#F1F5F9',
    position: 'relative',
  },
  slideImageWrapper: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productHeroImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  imageCounterBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  imageCounterText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
  activeDot: {
    width: 22,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  thumbnailsContainer: {
    backgroundColor: colors.white,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  thumbnailsHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  thumbnailsScrollContent: {
    gap: 12,
    alignItems: 'center',
  },
  thumbnailCard: {
    width: 64,
    height: 64,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
  },
  selectedThumbnailCard: {
    borderColor: colors.primary,
    borderWidth: 2.5,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  detailsCard: {
    backgroundColor: colors.white,
    padding: 20,
  },
  brandName: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 10,
    lineHeight: 28,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  starBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  starRatingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 4,
  },
  reviewCountText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  stockStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  stockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  priceContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currentPrice: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textPrimary,
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    color: colors.textPlaceholder,
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountTag: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  discountTagText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '800',
  },
  savingsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
    marginTop: 6,
  },
  optionSection: {
    marginBottom: 20,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  sizeGuideText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  sizesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  sizeChip: {
    width: 46,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSizeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sizeChipText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  selectedSizeChipText: {
    color: '#FFFFFF',
  },
  colorsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  colorSwatch: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  selectedColorSwatch: {
    borderWidth: 3,
    borderColor: colors.primary,
  },
  trustBox: {
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustTextContainer: {
    marginLeft: 12,
  },
  trustTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  trustSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  trustDivider: {
    height: 1,
    backgroundColor: '#CBD5E1',
    marginVertical: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 14,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '800',
  },
  tabContent: {
    paddingVertical: 6,
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  highlightsList: {
    gap: 8,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  specLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  specValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reviewSummaryCard: {
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  reviewBigRating: {
    fontSize: 32,
    fontWeight: '900',
    color: '#D97706',
  },
  starsRow: {
    flexDirection: 'row',
    marginVertical: 4,
    gap: 2,
  },
  reviewSummaryText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '600',
  },
  reviewItem: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reviewDate: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  reviewBody: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 16,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    elevation: 8,
  },
  addToCartBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartBtnText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  buyNowBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyNowBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
