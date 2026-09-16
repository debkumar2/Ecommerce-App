import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Menu, Heart } from 'lucide-react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { colors } from '../theme/colors';

// Redesigned Modern 3D/Geometric Bucket Cart Logo Icon
const CartLogoIcon = () => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    {/* Bucket handle arch */}
    <Path
      d="M8 8V5.8C8 4.25 9.25 3 10.8 3H13.2C14.75 3 16 4.25 16 5.8V8"
      stroke={colors.primary}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Bucket body */}
    <Path
      d="M4.2 8H19.8L18.4 19.1C18.25 20.2 17.3 21 16.2 21H7.8C6.7 21 5.75 20.2 5.6 19.1L4.2 8Z"
      fill={colors.primaryLight}
      stroke={colors.primary}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Front bucket accent bar */}
    <Path
      d="M8.5 12H15.5"
      stroke={colors.primary}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// Redesigned Top Action Shopping Bucket Icon with Badge
const RedesignedBucketIcon = ({ size = 22, color = colors.textPrimary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Curved bucket handle */}
    <Path
      d="M8 7.5V5.5C8 4.12 9.12 3 10.5 3H13.5C14.88 3 16 4.12 16 5.5V7.5"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Tapered shopping bucket body */}
    <Path
      d="M4 7.5H20L18.6 19.3C18.45 20.3 17.55 21 16.55 21H7.45C6.45 21 5.55 20.3 5.4 19.3L4 7.5Z"
      fill={color === colors.primary ? colors.primaryLight : '#FFF5F0'}
      stroke={color}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Front bucket double accent line */}
    <Path
      d="M8.5 12H15.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M10 15.5H14"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.8"
    />
  </Svg>
);

export default function HomeHeader({
  wishlistCount = 3,
  cartCount = 2,
  onMenuPress,
  onWishlistPress,
  onCartPress,
}) {
  const badgeScale = useRef(new Animated.Value(1)).current;
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    Animated.sequence([
      Animated.spring(badgeScale, {
        toValue: 1.4,
        friction: 3,
        tension: 140,
        useNativeDriver: true,
      }),
      Animated.spring(badgeScale, {
        toValue: 1,
        friction: 5,
        tension: 90,
        useNativeDriver: true,
      }),
    ]).start();
  }, [cartCount]);

  return (
    <View style={styles.container}>
      {/* Left Navigation Menu Icon Button */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onMenuPress}
        activeOpacity={0.7}
      >
        <Menu size={22} color={colors.textPrimary} />
      </TouchableOpacity>

      {/* Center Brand Title with Modern Bucket Logo */}
      <View style={styles.brandContainer} pointerEvents="box-none">
        <View style={styles.titleRow}>
          <CartLogoIcon />
          <Text style={styles.titleShop}>Shop</Text>
          <Text style={styles.titleEase}>Ease</Text>
        </View>
        <Text style={styles.subtitle}>Shop More, Live Better</Text>
      </View>

      {/* Right Actions: Favorites & Redesigned Bucket Cart Pill Button */}
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onWishlistPress}
          activeOpacity={0.7}
        >
          <Heart size={21} color={colors.textPrimary} />
          {wishlistCount > 0 && (
            <View style={styles.wishlistBadge}>
              <Text style={styles.badgeText}>{wishlistCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Redesigned Shopping Bucket Cart Action Capsule Button */}
        <TouchableOpacity
          style={styles.bucketPillButton}
          onPress={onCartPress}
          activeOpacity={0.8}
        >
          <Animated.View
            style={[
              styles.bucketAnimWrapper,
              { transform: [{ scale: badgeScale }] },
            ]}
          >
            <RedesignedBucketIcon size={22} color={colors.primary} />
            {cartCount > 0 && (
              <View style={styles.bucketBadge}>
                <Text style={styles.bucketBadgeText}>{cartCount}</Text>
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    position: 'relative',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  brandContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleShop: {
    fontSize: 21,
    fontWeight: '800',
    color: colors.textPrimary,
    marginLeft: 5,
    letterSpacing: -0.5,
  },
  titleEase: {
    fontSize: 21,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 9.5,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: -2,
    letterSpacing: 0.2,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  wishlistBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
  },
  bucketPillButton: {
    marginLeft: 8,
    width: 44,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF1EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  bucketAnimWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bucketBadge: {
    position: 'absolute',
    top: -8,
    right: -10,
    backgroundColor: colors.primary,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  bucketBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
});
