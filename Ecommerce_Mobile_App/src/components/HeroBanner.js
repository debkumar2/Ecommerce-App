import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import Svg, { Path, Rect, Circle, G } from 'react-native-svg';
import { colors } from '../theme/colors';

const FashionIllustration = () => (
  <Svg width={140} height={140} viewBox="0 0 140 140" fill="none">
    {/* Warm Background Circle */}
    <Circle cx="80" cy="70" r="55" fill="#FCE7D8" />
    
    {/* Stylized Model Silhouette / Shopping bags */}
    <G transform="translate(30, 20)">
      {/* Head */}
      <Circle cx="45" cy="25" r="12" fill="#D97706" />
      {/* Hair */}
      <Path d="M33 22 C30 35, 38 45, 42 50 C45 42, 55 35, 57 22 Z" fill="#78350F" />
      {/* Sweater */}
      <Path d="M30 45 C35 38, 55 38, 60 45 L65 85 L25 85 Z" fill="#FDBA74" />
      {/* Denim Pants */}
      <Path d="M28 85 L62 85 L58 125 L32 125 Z" fill="#1E3A8A" opacity={0.8} />
      
      {/* Shopping Bags */}
      <G transform="translate(0, 45)">
        <Rect x="0" y="15" width="22" height="28" rx="3" fill="#F43F5E" />
        <Path d="M6 15 C6 8, 16 8, 16 15" stroke="#9F1239" strokeWidth="2" fill="none" />
      </G>
      
      <G transform="translate(62, 50)">
        <Rect x="0" y="15" width="24" height="30" rx="3" fill="#FB7185" />
        <Path d="M7 15 C7 8, 17 8, 17 15" stroke="#BE123C" strokeWidth="2" fill="none" />
      </G>
    </G>
  </Svg>
);

export default function HeroBanner({ onShopNowPress }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.bannerContainer}>
        {/* Left Content */}
        <View style={styles.leftContent}>
          <Text style={styles.badge}>NEW COLLECTION</Text>
          <Text style={styles.title}>Fashion That Fits You</Text>
          <Text style={styles.subtitle}>Trendy Styles. Everyday Comfort.</Text>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={onShopNowPress}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>Shop Now</Text>
            <ArrowRight size={16} color={colors.white} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>

        {/* Right Illustration & Hand Written Tagline */}
        <View style={styles.rightContent}>
          <FashionIllustration />
          <View style={styles.taglineWrapper}>
            <Text style={styles.handwrittenText}>Good Looks</Text>
            <Text style={styles.handwrittenText}>Brighter Days</Text>
          </View>
        </View>
      </View>

      {/* Pagination Dots */}
      <View style={styles.dotsRow}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  bannerContainer: {
    backgroundColor: '#FFF1E8',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: '#E85D2A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  leftContent: {
    flex: 1,
    paddingRight: 10,
  },
  badge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8A5338',
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
    lineHeight: 26,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 14,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  ctaText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
    marginRight: 6,
  },
  arrowIcon: {
    marginTop: 1,
  },
  rightContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  taglineWrapper: {
    position: 'absolute',
    right: 4,
    top: 14,
    alignItems: 'flex-end',
  },
  handwrittenText: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#9C684B',
    fontWeight: '600',
    lineHeight: 14,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.primary,
  },
});
