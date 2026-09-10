import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { colors } from '../theme/colors';

const FashionIllustration = () => (
  <Svg width={110} height={110} viewBox="0 0 140 140" fill="none">
    <Circle cx="80" cy="70" r="55" fill="#FCE7D8" />
    <G transform="translate(30, 20)">
      <Circle cx="45" cy="25" r="12" fill="#D97706" />
      <Path d="M33 22 C30 35, 38 45, 42 50 C45 42, 55 35, 57 22 Z" fill="#78350F" />
      <Path d="M30 45 C35 38, 55 38, 60 45 L65 85 L25 85 Z" fill="#FDBA74" />
      <Path d="M28 85 L62 85 L58 125 L32 125 Z" fill="#1E3A8A" opacity={0.8} />
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

const BANNER_SLIDES = [
  {
    id: 'slide-1',
    badge: 'NEW COLLECTION',
    title: 'Fashion That Fits You',
    subtitle: 'Trendy Styles. Everyday Comfort.',
    buttonText: 'Shop Now',
    bgColor: '#FFF1E8',
    badgeColor: '#8A5338',
    buttonColor: colors.primary,
    taglineLine1: 'Good Looks',
    taglineLine2: 'Brighter Days',
    taglineColor: '#9C684B',
    type: 'illustration',
  },
  {
    id: 'slide-2',
    badge: 'SPECIAL TECH SALE',
    title: 'Next-Gen Audio & Tech',
    subtitle: 'Up to 50% Off Headphones & Watches.',
    buttonText: 'Explore Tech',
    bgColor: '#EFF6FF',
    badgeColor: '#1E40AF',
    buttonColor: '#2563EB',
    taglineLine1: 'Pure Sound',
    taglineLine2: 'Smart Living',
    taglineColor: '#1D4ED8',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  },
  {
    id: 'slide-3',
    badge: 'HOME & LIVING',
    title: 'Transform Your Home',
    subtitle: 'Cozy Decor & Luxury Interiors.',
    buttonText: 'Discover Home',
    bgColor: '#ECFDF5',
    badgeColor: '#065F46',
    buttonColor: '#059669',
    taglineLine1: 'Warm Spaces',
    taglineLine2: 'Happy Homes',
    taglineColor: '#047857',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80',
  },
  {
    id: 'slide-4',
    badge: 'GLOW UP DEALS',
    title: 'Luxury Beauty Line',
    subtitle: 'Flat 30% Off Premium Skincare.',
    buttonText: 'Grab Offer',
    bgColor: '#FDF4FF',
    badgeColor: '#9D174D',
    buttonColor: '#DB2777',
    taglineLine1: 'Radiant Skin',
    taglineLine2: 'Bold Beauty',
    taglineColor: '#BE185D',
    imageUrl: 'https://images.unsplash.com/photo-1523293115678-d2900f5b1d65?w=500&q=80',
  },
];

export default function HeroBanner({ onShopNowPress }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(
    Math.min(Dimensions.get('window').width, 500) - 32
  );
  const scrollViewRef = useRef(null);

  const onLayoutContainer = (event) => {
    const { width } = event.nativeEvent.layout;
    if (width && width !== containerWidth) {
      setContainerWidth(width);
    }
  };

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % BANNER_SLIDES.length;
      setActiveIndex(nextIndex);
      if (scrollViewRef.current && containerWidth > 0) {
        scrollViewRef.current.scrollTo({
          x: nextIndex * containerWidth,
          animated: true,
        });
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [activeIndex, containerWidth]);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / containerWidth);
    if (index !== activeIndex && index >= 0 && index < BANNER_SLIDES.length) {
      setActiveIndex(index);
    }
  };

  const handleDotPress = (index) => {
    setActiveIndex(index);
    if (scrollViewRef.current && containerWidth > 0) {
      scrollViewRef.current.scrollTo({
        x: index * containerWidth,
        animated: true,
      });
    }
  };

  const currentSlide = BANNER_SLIDES[activeIndex] || BANNER_SLIDES[0];

  return (
    <View style={styles.wrapper} onLayout={onLayoutContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {BANNER_SLIDES.map((slide) => (
          <View
            key={slide.id}
            style={[
              styles.bannerContainer,
              { width: containerWidth, backgroundColor: slide.bgColor },
            ]}
          >
            {/* Left Content */}
            <View style={styles.leftContent}>
              <Text style={[styles.badge, { color: slide.badgeColor }]}>
                {slide.badge}
              </Text>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.subtitle}>{slide.subtitle}</Text>

              <TouchableOpacity
                style={[styles.ctaButton, { backgroundColor: slide.buttonColor }]}
                onPress={() => onShopNowPress && onShopNowPress(slide)}
                activeOpacity={0.85}
              >
                <Text style={styles.ctaText}>{slide.buttonText}</Text>
                <ArrowRight size={15} color={colors.white} style={styles.arrowIcon} />
              </TouchableOpacity>
            </View>

            {/* Right Content */}
            <View style={styles.rightContent}>
              {slide.type === 'illustration' ? (
                <FashionIllustration />
              ) : (
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: slide.imageUrl }}
                    style={styles.bannerImage}
                    resizeMode="cover"
                  />
                </View>
              )}

              {/* Tagline */}
              <View style={styles.taglineWrapper}>
                <Text style={[styles.handwrittenText, { color: slide.taglineColor }]}>
                  {slide.taglineLine1}
                </Text>
                <Text style={[styles.handwrittenText, { color: slide.taglineColor }]}>
                  {slide.taglineLine2}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.dotsRow}>
        {BANNER_SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <TouchableOpacity
              key={slide.id}
              onPress={() => handleDotPress(index)}
              activeOpacity={0.7}
              style={[
                styles.dot,
                isActive && [
                  styles.dotActive,
                  { backgroundColor: currentSlide.buttonColor },
                ],
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 10,
  },
  bannerContainer: {
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    height: 160,
  },
  leftContent: {
    flex: 1,
    paddingRight: 10,
    justifyContent: 'center',
  },
  badge: {
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
    lineHeight: 24,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11.5,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  ctaText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    marginRight: 4,
  },
  arrowIcon: {
    marginTop: 1,
  },
  rightContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 110,
    height: 110,
  },
  imageWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  taglineWrapper: {
    position: 'absolute',
    right: -2,
    top: 6,
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  handwrittenText: {
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '700',
    lineHeight: 12,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 4,
  },
  dotActive: {
    width: 20,
  },
});
