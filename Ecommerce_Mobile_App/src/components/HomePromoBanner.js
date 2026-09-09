import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import Svg, { Path, Rect, Circle, G } from 'react-native-svg';
import { colors } from '../theme/colors';

const HomeLivingIllustration = () => (
  <Svg width={140} height={110} viewBox="0 0 140 110" fill="none">
    {/* Lamp hanging */}
    <Path d="M70 0 L70 20 L65 28 L75 28 Z" fill="#D97706" />
    <Circle cx="70" cy="30" r="3" fill="#FBBF24" />
    
    {/* Sofa */}
    <Rect x="20" y="55" width="80" height="35" rx="6" fill="#2D6A4F" />
    <Rect x="15" y="50" width="15" height="35" rx="4" fill="#1B4332" />
    <Rect x="90" y="50" width="15" height="35" rx="4" fill="#1B4332" />
    
    {/* Coffee Table */}
    <Rect x="35" y="82" width="50" height="8" rx="2" fill="#D97706" />
    <Path d="M40 90 L40 102 M80 90 L80 102" stroke="#B45309" strokeWidth="3" />
    
    {/* Plant */}
    <G transform="translate(108, 60)">
      <Rect x="5" y="25" width="14" height="18" rx="2" fill="#B45309" />
      <Path d="M12 25 Q 2 5, -5 0 Q 5 15, 12 25 Z" fill="#40916C" />
      <Path d="M12 25 Q 22 5, 29 0 Q 19 15, 12 25 Z" fill="#52B788" />
    </G>
  </Svg>
);

export default function HomePromoBanner({ onShopNowPress }) {
  return (
    <View style={styles.bannerContainer}>
      {/* Left Text & CTA */}
      <View style={styles.leftContent}>
        <Text style={styles.title}>Upgrade Your Home</Text>
        <Text style={styles.subtitle}>Stylish Living for a Better You</Text>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={onShopNowPress}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Shop Now</Text>
          <ArrowRight size={15} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Right Illustration & Hand Written Tagline */}
      <View style={styles.rightContent}>
        <HomeLivingIllustration />
        <View style={styles.taglineWrapper}>
          <Text style={styles.handwrittenText}>A Happier</Text>
          <Text style={styles.handwrittenText}>Home Awaits</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#E8F3EE',
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  leftContent: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1B4332',
    lineHeight: 24,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#40916C',
    marginBottom: 14,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B4332',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
    marginRight: 6,
  },
  rightContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  taglineWrapper: {
    position: 'absolute',
    right: 0,
    top: 10,
    alignItems: 'flex-end',
  },
  handwrittenText: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#2D6A4F',
    fontWeight: '600',
    lineHeight: 14,
  },
});
