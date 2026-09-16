import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { CheckCircle2, X, ArrowRight, Sparkles } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

const RedesignedBucketIcon = ({ size = 20, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M8 7.5V5.5C8 4.12 9.12 3 10.5 3H13.5C14.88 3 16 4.12 16 5.5V7.5"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <Path
      d="M4 7.5H20L18.6 19.3C18.45 20.3 17.55 21 16.55 21H7.45C6.45 21 5.55 20.3 5.4 19.3L4 7.5Z"
      fill={colors.primaryLight}
      stroke={color}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <Path
      d="M8.5 12H15.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

export default function AddToCartSuccessModal({
  visible = false,
  onClose,
  product = null,
  totalCartCount = 1,
  onViewCart,
}) {
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const checkScale = useRef(new Animated.Value(0)).current;
  const bagPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      scaleAnim.setValue(0.85);
      opacityAnim.setValue(0);
      checkScale.setValue(0);

      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(100),
          Animated.spring(checkScale, {
            toValue: 1,
            friction: 4,
            tension: 100,
            useNativeDriver: true,
          }),
        ]),
      ]).start();

      // Continuous subtle pulse on top bag badge callout
      Animated.loop(
        Animated.sequence([
          Animated.timing(bagPulse, {
            toValue: 1.08,
            duration: 600,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(bagPulse, {
            toValue: 1,
            duration: 600,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 3 }
      ).start();
    }
  }, [visible]);

  if (!visible || !product) return null;

  const displayPrice = product.price
    ? (typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price)
    : '$0.00';

  const displayOriginalPrice = product.originalPrice
    ? (typeof product.originalPrice === 'number' ? `$${product.originalPrice.toFixed(2)}` : product.originalPrice)
    : null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <Animated.View
              style={[
                styles.modalCard,
                {
                  opacity: opacityAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <X size={20} color={colors.textSecondary} />
              </TouchableOpacity>

              {/* Success Badge Header */}
              <View style={styles.headerSection}>
                <Animated.View
                  style={[
                    styles.checkBadgeCircle,
                    { transform: [{ scale: checkScale }] },
                  ]}
                >
                  <CheckCircle2 size={32} color="#10B981" />
                </Animated.View>

                <Text style={styles.successTitle}>Added to Cart Successfully!</Text>
                <Text style={styles.successSubtitle}>
                  Item has been added to your shopping bag
                </Text>
              </View>

              {/* Added Item Preview Box */}
              <View style={styles.productCard}>
                <Image
                  source={
                    typeof product.imageUrl === 'string'
                      ? { uri: product.imageUrl }
                      : product.imageUrl || require('../../assets/icon.png')
                  }
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <View style={styles.productDetails}>
                  {product.category && (
                    <Text style={styles.productCategory}>
                      {product.category.toUpperCase()}
                    </Text>
                  )}
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.productPrice}>{displayPrice}</Text>
                    {displayOriginalPrice && (
                      <Text style={styles.originalPrice}>{displayOriginalPrice}</Text>
                    )}
                  </View>
                  <View style={styles.variantBadge}>
                    <Sparkles size={11} color={colors.primary} />
                    <Text style={styles.variantText}>
                      Variant: {product.variant || 'Standard'}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Top Bag Section Notification Banner */}
              <Animated.View
                style={[
                  styles.topBagNotice,
                  { transform: [{ scale: bagPulse }] },
                ]}
              >
                <View style={styles.bagIconWrap}>
                  <RedesignedBucketIcon size={20} color={colors.primary} />
                  <View style={styles.miniBadge}>
                    <Text style={styles.miniBadgeText}>{totalCartCount}</Text>
                  </View>
                </View>
                <View style={styles.noticeTextWrap}>
                  <Text style={styles.noticeTitle}>
                    Updated Top Section Bag
                  </Text>
                  <Text style={styles.noticeDesc}>
                    You now have <Text style={styles.boldText}>{totalCartCount} item(s)</Text> in your top bag menu icon.
                  </Text>
                </View>
              </Animated.View>

              {/* Action Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.continueBtn}
                  onPress={onClose}
                  activeOpacity={0.8}
                >
                  <Text style={styles.continueBtnText}>Continue Shopping</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.viewCartBtn}
                  onPress={() => {
                    onClose();
                    if (onViewCart) onViewCart();
                  }}
                  activeOpacity={0.85}
                >
                  <Text style={styles.viewCartBtnText}>View Cart</Text>
                  <ArrowRight size={16} color="#FFFFFF" style={{ marginLeft: 4 }} />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: Math.min(width - 32, 400),
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  checkBadgeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#A7F3D0',
  },
  successTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  successSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 3,
    textAlign: 'center',
    fontWeight: '500',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    alignItems: 'center',
    marginBottom: 14,
  },
  productImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
  },
  productCategory: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  originalPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  variantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 5,
  },
  variantText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 3,
  },
  topBagNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#FFEDD5',
    marginBottom: 18,
  },
  bagIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  miniBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: colors.primary,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  miniBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  noticeTextWrap: {
    flex: 1,
    marginLeft: 12,
  },
  noticeTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#9A3412',
  },
  noticeDesc: {
    fontSize: 11.5,
    color: '#C2410C',
    marginTop: 1,
    lineHeight: 15,
  },
  boldText: {
    fontWeight: '800',
    color: colors.primary,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  continueBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  continueBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4B5563',
  },
  viewCartBtn: {
    flex: 1.2,
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  viewCartBtnText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
