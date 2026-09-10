import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu, Heart, ShoppingBag } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme/colors';

const CartLogoIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 60 60" fill="none">
    <Path
      d="M12 14H18L22.5 38H45.5L50 20H20"
      stroke={colors.primary}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M25 45C26.3807 45 27.5 43.8807 27.5 42.5C27.5 41.1193 26.3807 40 25 40C23.6193 40 22.5 41.1193 22.5 42.5C22.5 43.8807 23.6193 45 25 45Z"
      fill={colors.primary}
    />
    <Path
      d="M43 45C44.3807 45 45.5 43.8807 45.5 42.5C45.5 41.1193 44.3807 40 43 40C41.6193 40 40.5 41.1193 40.5 42.5C40.5 43.8807 41.6193 45 43 45Z"
      fill={colors.primary}
    />
    <Path
      d="M29 25H37M29 29H35M29 33H37"
      stroke={colors.primary}
      strokeWidth="3"
      strokeLinecap="round"
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
  return (
    <View style={styles.container}>
      {/* Left Menu Button */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onMenuPress}
        activeOpacity={0.7}
      >
        <Menu size={22} color={colors.textPrimary} />
      </TouchableOpacity>

      {/* Center Brand Title */}
      <View style={styles.brandContainer} pointerEvents="box-none">
        <View style={styles.titleRow}>
          <CartLogoIcon />
          <Text style={styles.titleShop}>Shop</Text>
          <Text style={styles.titleEase}>Ease</Text>
        </View>
        <Text style={styles.subtitle}>Shop More, Live Better</Text>
      </View>

      {/* Right Actions (Wishlist & Cart Badges) */}
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onWishlistPress}
          activeOpacity={0.7}
        >
          <Heart size={22} color={colors.textPrimary} />
          {wishlistCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{wishlistCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, { marginLeft: 4 }]}
          onPress={onCartPress}
          activeOpacity={0.7}
        >
          <ShoppingBag size={22} color={colors.textPrimary} />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    position: 'relative',
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 10,
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
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginLeft: 4,
    letterSpacing: -0.4,
  },
  titleEase: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 9.5,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: -1,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  badge: {
    position: 'absolute',
    top: 1,
    right: 1,
    backgroundColor: colors.primary,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  badgeText: {
    color: colors.white,
    fontSize: 9.5,
    fontWeight: '800',
  },
});
