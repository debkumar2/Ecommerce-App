import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { colors } from '../theme/colors';

// Custom SVG Logo matching ShopEase branding in reference mockup
const ShopEaseLogo = () => (
  <Svg width={54} height={54} viewBox="0 0 60 60" fill="none">
    {/* Cart structure */}
    <Path
      d="M12 14H18L22.5 38H45.5L50 20H20"
      stroke={colors.primary}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Cart Wheels */}
    <Path
      d="M25 45C26.3807 45 27.5 43.8807 27.5 42.5C27.5 41.1193 26.3807 40 25 40C23.6193 40 22.5 41.1193 22.5 42.5C22.5 43.8807 23.6193 45 25 45Z"
      fill={colors.primary}
    />
    <Path
      d="M43 45C44.3807 45 45.5 43.8807 45.5 42.5C45.5 41.1193 44.3807 40 43 40C41.6193 40 40.5 41.1193 40.5 42.5C40.5 43.8807 41.6193 45 43 45Z"
      fill={colors.primary}
    />
    {/* 'E' inner cart tag */}
    <Path
      d="M29 25H37M29 29H35M29 33H37"
      stroke={colors.primary}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

export default function BrandHeader() {
  return (
    <View style={styles.container}>
      <ShopEaseLogo />
      <View style={styles.titleRow}>
        <Text style={styles.titleShop}>Shop</Text>
        <Text style={styles.titleEase}>Ease</Text>
      </View>
      <Text style={styles.subtitle}>Shop More, Live Better</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  titleShop: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  titleEase: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
});
