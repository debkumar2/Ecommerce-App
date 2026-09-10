import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import { ArrowLeft, Trash2, Plus, Minus, Tag, ShoppingBag, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { initialCartData } from '../data/mockData';

export default function CartScreen({ visible, onClose, onCheckoutSuccess, cartItems: propCartItems, setCartItems: setPropCartItems }) {
  const [localCart, setLocalCart] = useState(initialCartData);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const cartItems = propCartItems || localCart;
  const updateCartItems = setPropCartItems || setLocalCart;

  const handleQuantityChange = (id, delta) => {
    updateCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id, name) => {
    updateCartItems((prev) => prev.filter((item) => item.id !== id));
    const msg = `Removed "${name}" from cart.`;
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Cart Updated', msg);
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    if (isPromoApplied) {
      setIsPromoApplied(false);
      setAppliedDiscount(0);
      setPromoCode('');
      return;
    }

    if (promoCode.trim().toUpperCase() === 'SHOPEASE10' || promoCode.trim().toUpperCase() === 'SAVE500') {
      setIsPromoApplied(true);
      setAppliedDiscount(500);
      const msg = 'Coupon "SHOPEASE10" applied successfully! Saved ₹500.';
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Coupon Applied! 🎉', msg);
    } else {
      const msg = 'Invalid coupon code. Try "SHOPEASE10" for ₹500 off!';
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Invalid Coupon', msg);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0);
  const productDiscount = originalTotal - subtotal;
  const deliveryFee = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const totalAmount = Math.max(0, subtotal - appliedDiscount + deliveryFee);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    const msg = `Order placed successfully for ₹${totalAmount.toLocaleString('en-IN')}! Thank you for shopping with ShopEase.`;
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Order Confirmed! 🎉', msg);

    if (onCheckoutSuccess) {
      onCheckoutSuccess();
    }
    updateCartItems([]);
    if (onClose) onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose} activeOpacity={0.7}>
            <ArrowLeft size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>My Cart</Text>
            <Text style={styles.headerSubtitle}>
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </Text>
          </View>
          <View style={styles.headerRightPlaceholder} />
        </View>

        {cartItems.length === 0 ? (
          /* Empty State */
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBg}>
              <ShoppingBag size={48} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
            <Text style={styles.emptySubtitle}>
              Looks like you haven't added anything to your cart yet.
            </Text>
            <TouchableOpacity style={styles.shopNowButton} onPress={onClose} activeOpacity={0.8}>
              <Text style={styles.shopNowButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              {/* Free Delivery Banner */}
              <View style={styles.freeDeliveryBanner}>
                <CheckCircle2 size={18} color="#059669" style={{ marginRight: 8 }} />
                <Text style={styles.freeDeliveryText}>
                  {deliveryFee === 0
                    ? 'Yay! You qualify for FREE Express Delivery 🎉'
                    : `Add ₹${(1000 - subtotal).toLocaleString('en-IN')} more to unlock FREE Delivery!`}
                </Text>
              </View>

              {/* Items List */}
              <View style={styles.itemsListContainer}>
                {cartItems.map((item) => (
                  <View key={item.id} style={styles.itemCard}>
                    <Image source={{ uri: item.imageUrl }} style={styles.itemImage} resizeMode="cover" />

                    <View style={styles.itemDetails}>
                      <View style={styles.itemHeaderRow}>
                        <Text style={styles.itemName} numberOfLines={1}>
                          {item.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleRemoveItem(item.id, item.name)}
                          activeOpacity={0.7}
                          style={styles.deleteButton}
                        >
                          <Trash2 size={16} color="#EF4444" />
                        </TouchableOpacity>
                      </View>

                      {item.variant && <Text style={styles.itemVariant}>{item.variant}</Text>}

                      <View style={styles.itemBottomRow}>
                        {/* Price */}
                        <View style={styles.priceContainer}>
                          <Text style={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
                          {item.originalPrice && (
                            <Text style={styles.itemOriginalPrice}>
                              ₹{item.originalPrice.toLocaleString('en-IN')}
                            </Text>
                          )}
                        </View>

                        {/* Quantity Counter */}
                        <View style={styles.quantityContainer}>
                          <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleQuantityChange(item.id, -1)}
                            activeOpacity={0.7}
                          >
                            <Minus size={14} color={colors.textPrimary} />
                          </TouchableOpacity>
                          <Text style={styles.quantityText}>{item.quantity}</Text>
                          <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleQuantityChange(item.id, 1)}
                            activeOpacity={0.7}
                          >
                            <Plus size={14} color={colors.textPrimary} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Coupon Code Input */}
              <View style={styles.sectionCard}>
                <View style={styles.couponHeader}>
                  <Tag size={18} color={colors.primary} style={{ marginRight: 8 }} />
                  <Text style={styles.sectionTitle}>Apply Coupon Code</Text>
                </View>

                <View style={styles.couponInputRow}>
                  <TextInput
                    style={styles.couponInput}
                    placeholder="Enter SHOPEASE10"
                    placeholderTextColor={colors.textPlaceholder}
                    value={promoCode}
                    onChangeText={setPromoCode}
                    autoCapitalize="characters"
                    editable={!isPromoApplied}
                  />
                  <TouchableOpacity
                    style={[styles.applyButton, isPromoApplied && styles.appliedButton]}
                    onPress={handleApplyPromo}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.applyButtonText}>
                      {isPromoApplied ? 'Remove' : 'Apply'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {isPromoApplied && (
                  <Text style={styles.couponAppliedMsg}>
                    ✓ "SHOPEASE10" applied! You saved ₹500.
                  </Text>
                )}
              </View>

              {/* Price Details Breakdown */}
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Order Summary</Text>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal ({cartItems.length} items)</Text>
                  <Text style={styles.summaryValue}>₹{originalTotal.toLocaleString('en-IN')}</Text>
                </View>

                {productDiscount > 0 && (
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Product Discount</Text>
                    <Text style={styles.discountValue}>-₹{productDiscount.toLocaleString('en-IN')}</Text>
                  </View>
                )}

                {isPromoApplied && (
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Coupon Discount (SHOPEASE10)</Text>
                    <Text style={styles.discountValue}>-₹{appliedDiscount.toLocaleString('en-IN')}</Text>
                  </View>
                )}

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery Charge</Text>
                  <Text style={[styles.summaryValue, deliveryFee === 0 && styles.freeText]}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total Payable</Text>
                  <Text style={styles.totalValue}>₹{totalAmount.toLocaleString('en-IN')}</Text>
                </View>
              </View>

              {/* Guarantee Tag */}
              <View style={styles.guaranteeRow}>
                <ShieldCheck size={18} color="#059669" style={{ marginRight: 6 }} />
                <Text style={styles.guaranteeText}>100% Safe & Secure Checkout</Text>
              </View>
            </ScrollView>

            {/* Bottom Checkout Bar */}
            <View style={styles.checkoutBar}>
              <View style={styles.checkoutPriceContainer}>
                <Text style={styles.checkoutPriceLabel}>Total Amount</Text>
                <Text style={styles.checkoutPriceValue}>₹{totalAmount.toLocaleString('en-IN')}</Text>
              </View>

              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={handleCheckout}
                activeOpacity={0.8}
              >
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                <ArrowRight size={18} color={colors.white} style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
          </>
        )}
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
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  headerRightPlaceholder: {
    width: 36,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  freeDeliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  freeDeliveryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065F46',
    flex: 1,
  },
  itemsListContainer: {
    marginBottom: 16,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    padding: 2,
  },
  itemVariant: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  itemBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    marginRight: 4,
  },
  itemOriginalPrice: {
    fontSize: 11,
    color: colors.textPlaceholder,
    textDecorationLine: 'line-through',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
    marginHorizontal: 10,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  couponInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponInput: {
    flex: 1,
    height: 42,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appliedButton: {
    backgroundColor: '#EF4444',
  },
  applyButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  couponAppliedMsg: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
    marginTop: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  discountValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
  },
  freeText: {
    color: '#059669',
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  guaranteeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  guaranteeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    elevation: 8,
  },
  checkoutPriceContainer: {
    justifyContent: 'center',
  },
  checkoutPriceLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  checkoutPriceValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  shopNowButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  shopNowButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
