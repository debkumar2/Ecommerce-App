import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import HomeHeader from '../components/HomeHeader';
import ProfileHeader from '../components/ProfileHeader';
import SearchBar from '../components/SearchBar';
import HeroBanner from '../components/HeroBanner';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';
import HomePromoBanner from '../components/HomePromoBanner';
import BottomNavBar from '../components/BottomNavBar';
import CategoriesContent from './CategoriesContent';
import OrdersContent from './OrdersContent';
import ProfileContent from './ProfileContent';
import { todaysDealsData, featuredProductsData } from '../data/mockData';
import { colors } from '../theme/colors';

const TABS = ['home', 'categories', 'orders', 'wishlist', 'profile'];

export default function HomeScreen({ onNavigateToAuth }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Fashion');
  const [cartCount, setCartCount] = useState(2);
  const [wishlistCount, setWishlistCount] = useState(3);
  const [activeBottomTab, setActiveBottomTab] = useState('profile');
  const [contentWidth, setContentWidth] = useState(Dimensions.get('window').width);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleAddToCart = (item) => {
    setCartCount(cartCount + 1);
    const msg = `Added "${item.name}" to your cart!`;
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Cart Updated', msg);
  };

  const handleToggleFavorite = (item, isFav) => {
    setWishlistCount(isFav ? wishlistCount + 1 : Math.max(0, wishlistCount - 1));
  };

  const handleSeeAllDeals = () => {
    const msg = 'Navigating to Today\'s Deals collection...';
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Today\'s Deals', msg);
  };

  const handleSeeAllFeatured = () => {
    const msg = 'Navigating to Featured Products collection...';
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Featured Products', msg);
  };

  const handleBottomTabPress = (tabId) => {
    if (activeBottomTab === tabId) return;
    setActiveBottomTab(tabId);
    
    const tabIndex = TABS.indexOf(tabId);
    Animated.timing(slideAnim, {
      toValue: tabIndex,
      duration: 380,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    if (tabId === 'profile') {
      const msg = 'Navigating to Profile / Account Settings';
    }
  };

  const onLayoutContent = (event) => {
    const { width } = event.nativeEvent.layout;
    if (width && width !== contentWidth) {
      setContentWidth(width);
    }
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: [0, -contentWidth, -contentWidth * 2, -contentWidth * 3, -contentWidth * 4],
  });

  return (
    <View style={styles.safeArea}>
      {/* Dynamic Top Header */}
      {activeBottomTab === 'profile' ? (
        <ProfileHeader
          notificationCount={3}
          onNotificationPress={() => Alert.alert('Notifications', 'You have 3 unread notifications.')}
          onSettingsPress={() => Alert.alert('Settings', 'Opening profile settings...')}
        />
      ) : (
        <HomeHeader
          wishlistCount={wishlistCount}
          cartCount={cartCount}
          onMenuPress={() => Alert.alert('Menu', 'Opening side navigation drawer...')}
          onWishlistPress={() => handleBottomTabPress('wishlist')}
          onCartPress={() => Alert.alert('Cart', `Your cart has ${cartCount} items.`)}
        />
      )}

      {/* Main Content with Slide Animation */}
      <View style={styles.mainContentWrapper} onLayout={onLayoutContent}>
        <Animated.View
          style={[
            styles.sliderTrack,
            {
              width: contentWidth * TABS.length,
              transform: [{ translateX }],
            },
          ]}
        >
          {/* 0: Home Page */}
          <View style={[styles.slidePage, { width: contentWidth }]}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Search Bar */}
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmit={() => Alert.alert('Search', `Searching for: ${searchQuery}`)}
              />

              {/* Fashion Hero Banner */}
              <HeroBanner
                onShopNowPress={() => Alert.alert('New Collection', 'Exploring New Fashion Collection!')}
              />

              {/* Categories Bar */}
              <CategoryList
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

              {/* Section 1: Today's Deals */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Today's Deals</Text>
                <TouchableOpacity
                  style={styles.seeAllRow}
                  onPress={handleSeeAllDeals}
                  activeOpacity={0.7}
                >
                  <Text style={styles.seeAllText}>See All</Text>
                  <ChevronRight size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>

              {/* Horizontal Deals Product List */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalProductsScroll}
              >
                {todaysDealsData.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </ScrollView>

              {/* Section 2: Secondary Home Upgrade Promo Banner */}
              <HomePromoBanner
                onShopNowPress={() => Alert.alert('Home Upgrade', 'Exploring Home & Living Deals!')}
              />

              {/* Section 3: Featured Products */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Featured Products</Text>
                <TouchableOpacity
                  style={styles.seeAllRow}
                  onPress={handleSeeAllFeatured}
                  activeOpacity={0.7}
                >
                  <Text style={styles.seeAllText}>See All</Text>
                  <ChevronRight size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>

              {/* Horizontal Featured Products Scroll */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalProductsScroll}
              >
                {featuredProductsData.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </ScrollView>
            </ScrollView>
          </View>

          {/* 1: Categories Page */}
          <View style={[styles.slidePage, { width: contentWidth }]}>
            <CategoriesContent />
          </View>

          {/* 2: Orders Page */}
          <View style={[styles.slidePage, { width: contentWidth }]}>
            <OrdersContent />
          </View>

          {/* 3: Wishlist Page (Placeholder) */}
          <View style={[styles.slidePage, { width: contentWidth }, styles.placeholderPage]}>
            <Text style={styles.placeholderText}>Wishlist Coming Soon</Text>
          </View>

          {/* 4: Profile Page */}
          <View style={[styles.slidePage, { width: contentWidth }]}>
            <ProfileContent />
          </View>
        </Animated.View>
      </View>

      {/* Fixed Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeBottomTab}
        onTabPress={handleBottomTabPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainContentWrapper: {
    flex: 1,
    overflow: 'hidden',
  },
  sliderTrack: {
    flex: 1,
    flexDirection: 'row',
  },
  slidePage: {
    height: '100%',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  seeAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 2,
  },
  horizontalProductsScroll: {
    paddingLeft: 20,
    paddingRight: 6,
    paddingBottom: 6,
  },
  placeholderPage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});
