import React, { useState, useRef, useEffect } from 'react';
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
import SearchBar from '../components/SearchBar';
import HeroBanner from '../components/HeroBanner';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';
import HomePromoBanner from '../components/HomePromoBanner';
import FlashSaleSection from '../components/FlashSaleSection';
import NewArrivalsSection from '../components/NewArrivalsSection';
import TopBrandsSection from '../components/TopBrandsSection';
import ShopByVideoSection from '../components/ShopByVideoSection';
import DealOfTheDaySection from '../components/DealOfTheDaySection';
import ShopTheLookSection from '../components/ShopTheLookSection';
import CollectionsGrid from '../components/CollectionsGrid';
import BottomNavBar from '../components/BottomNavBar';
import SidebarDrawer from '../components/SidebarDrawer';
import CategoriesContent from './CategoriesContent';
import OrdersContent from './OrdersContent';
import WishlistContent from './WishlistContent';
import ProfileContent from './ProfileContent';
import EditProfileScreen from './EditProfileScreen';
import DeliveryAddressesScreen from './DeliveryAddressesScreen';
import AboutShopEaseScreen from './AboutShopEaseScreen';
import TermsScreen from './TermsScreen';
import HelpCenterScreen from './HelpCenterScreen';
import PrivacySecurityScreen from './PrivacySecurityScreen';
import NotificationsScreen from './NotificationsScreen';
import PaymentMethodsScreen from './PaymentMethodsScreen';
import CartScreen from './CartScreen';
import TodaysDealsScreen from './TodaysDealsScreen';
import StoryViewerScreen from './StoryViewerScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import AddToCartSuccessModal from '../components/AddToCartSuccessModal';
import OrderSuccessModal from '../components/OrderSuccessModal';
import { todaysDealsData, featuredProductsData, initialCartData, flashSaleData, topBrandsData, collectionsData, videoShortsData, dealOfTheDayData, shopTheLookData, newArrivalsData, getProductsByCategory } from '../data/mockData';
import { colors } from '../theme/colors';

const TABS = ['home', 'categories', 'orders', 'wishlist', 'profile'];

export default function HomeScreen({ onNavigateToAuth }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState(initialCartData);
  const [wishlistCount, setWishlistCount] = useState(3);
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    // Fetch live products
    fetch('http://192.168.31.64:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        const mappedProducts = data.map((p) => ({
          id: p.id.toString(),
          name: p.title,
          price: Number(p.price),
          originalPrice: Math.floor(Number(p.price) * 1.5),
          discount: '33% OFF',
          rating: p.rating,
          reviewsCount: '850',
          category: p.category ? p.category.name : 'General',
          imageUrl: p.image,
          type: 'general',
          badgeColor: '#EF4444',
          badgeText: 'NEW',
        }));
        setDbProducts(mappedProducts);
      })
      .catch((err) => console.error('Failed to fetch products:', err));

    // Fetch live wishlist count
    fetch('http://192.168.31.64:5000/api/wishlist/1')
      .then((res) => res.json())
      .then((data) => setWishlistCount(data.length))
      .catch((err) => console.error('Failed to fetch wishlist count:', err));

    // Fetch live cart count and items
    fetch('http://192.168.31.64:5000/api/cart/1')
      .then((res) => res.json())
      .then((data) => {
        const mappedCart = data.map((c) => ({
          id: c.id.toString(), // cart item id
          productId: c.Product.id,
          name: c.Product.title,
          price: Number(c.Product.price),
          originalPrice: Math.floor(Number(c.Product.price) * 1.5),
          quantity: c.quantity,
          imageUrl: c.Product.image,
          variant: 'Standard',
          category: c.Product.Category ? c.Product.Category.name : 'General',
        }));
        setCartItems(mappedCart);
      })
      .catch((err) => console.error('Failed to fetch cart:', err));
  }, []);
  const [activeBottomTab, setActiveBottomTab] = useState('home');
  const [isCartModalVisible, setIsCartModalVisible] = useState(false);
  const [isTodaysDealsVisible, setIsTodaysDealsVisible] = useState(false);
  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const [activeStoryCategory, setActiveStoryCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailsVisible, setIsProductDetailsVisible] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const [isAddToCartSuccessVisible, setIsAddToCartSuccessVisible] = useState(false);
  const [completedOrderData, setCompletedOrderData] = useState(null);
  const [isOrderSuccessVisible, setIsOrderSuccessVisible] = useState(false);
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
  const [isDeliveryAddressesVisible, setIsDeliveryAddressesVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isTermsVisible, setIsTermsVisible] = useState(false);
  const [isHelpCenterVisible, setIsHelpCenterVisible] = useState(false);
  const [isPrivacySecurityVisible, setIsPrivacySecurityVisible] = useState(false);
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  const [isPaymentMethodsVisible, setIsPaymentMethodsVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    fullName: 'Supain Nandy',
    email: 'supain.nandy@gmail.com',
    phone: '+91 98765 43210',
    gender: 'Male',
    dob: '1995-08-15',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
    quote: 'Good Shoppers Make a Better World',
    address: '123 Park Avenue, Salt Lake, Kolkata, 700091',
  });
  const [contentWidth, setContentWidth] = useState(Dimensions.get('window').width);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleAddToCart = (item) => {
    fetch('http://192.168.31.64:5000/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 1, productId: Number(item.id) })
    })
    .then((res) => res.json())
    .then((data) => {
      setCartItems((prev) => {
        const existing = prev.find((i) => i.productId == item.id || i.name === item.name);
        if (existing) {
          return prev.map((i) =>
            (i.productId == item.id || i.name === item.name)
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [
          ...prev,
          {
            id: data.id ? data.id.toString() : `cart-${Date.now()}`,
            productId: item.id,
            name: item.name,
            price: item.price,
            originalPrice: item.originalPrice,
            quantity: 1,
            imageUrl: item.imageUrl,
            variant: item.variant || 'Standard',
            category: item.category || 'General',
          },
        ];
      });

      setAddedProduct(item);
      setIsAddToCartSuccessVisible(true);
    })
    .catch((err) => console.error('Failed to add to cart:', err));
  };

  const handleToggleFavorite = (item, isFav) => {
    setWishlistCount(isFav ? wishlistCount + 1 : Math.max(0, wishlistCount - 1));
    
    // Sync with backend API
    const endpoint = isFav ? 'add' : 'remove';
    fetch(`http://192.168.31.64:5000/api/wishlist/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 1, productId: Number(item.id) })
    })
    .catch((err) => console.error(`Failed to ${endpoint} wishlist item:`, err));
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setIsProductDetailsVisible(true);
  };

  const handleCategoryPress = (categoryItem) => {
    setSelectedCategory(categoryItem.name);
    if (categoryItem.stories && categoryItem.stories.length > 0) {
      setActiveStoryCategory(categoryItem);
      setIsStoryVisible(true);
    }
  };

  const handleSeeAllDeals = () => {
    setIsTodaysDealsVisible(true);
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

  const categoryProducts = getProductsByCategory(selectedCategory);

  return (
    <View style={styles.safeArea}>
      {/* Standardized Top Header for all screens */}
      <HomeHeader
        wishlistCount={wishlistCount}
        cartCount={totalCartCount}
        onMenuPress={() => setIsSidebarOpen(true)}
        onWishlistPress={() => handleBottomTabPress('wishlist')}
        onCartPress={() => setIsCartModalVisible(true)}
      />

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

              {/* Multi-Post Auto Hero Banner Carousel */}
              <HeroBanner
                onShopNowPress={(slide) =>
                  Alert.alert(
                    slide ? slide.badge : 'Collection',
                    `Exploring ${slide ? slide.title : 'New Collection'}!`
                  )
                }
              />

              {/* Categories Bar */}
              <CategoryList
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryPress}
              />

              {/* Filtered Category View or Full Home Content */}
              {selectedCategory && selectedCategory !== 'All' ? (
                <View style={styles.categoryFilteredContainer}>
                  <View style={styles.categoryActiveBanner}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.categoryActiveTitle}>{selectedCategory}</Text>
                      <Text style={styles.categoryActiveSubtitle}>
                        Showing {categoryProducts.length} items in {selectedCategory}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.clearCategoryBtn}
                      onPress={() => setSelectedCategory('All')}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.clearCategoryBtnText}>Show All</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.categoryProductsGrid}>
                    {categoryProducts.map((item) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        onAddToCart={handleAddToCart}
                        onToggleFavorite={handleToggleFavorite}
                        onPress={handleSelectProduct}
                        containerStyle={styles.categoryCardStyle}
                      />
                    ))}
                  </View>
                </View>
              ) : (
                <>
                  {/* New Arrivals Section - Now powered by live database! */}
                  <NewArrivalsSection
                    data={dbProducts.length > 0 ? dbProducts.slice(0, 4) : newArrivalsData}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                    onSelectProduct={handleSelectProduct}
                    onSeeAll={() => Alert.alert('New Arrivals', 'Viewing all new arrivals!')}
                  />

                  {/* Flash Sale Section */}
                  <FlashSaleSection 
                    data={flashSaleData} 
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                    onSelectProduct={handleSelectProduct}
                    onSeeAll={() => Alert.alert('Flash Sale', 'Viewing all flash sale items!')}
                  />

                  {/* Shop by Video (Shorts/Reels style) */}
                  <ShopByVideoSection
                    data={videoShortsData}
                    onVideoPress={(video) => Alert.alert('Play Video', `Playing: ${video.title}`)}
                  />

                  {/* Top Brands */}
                  <TopBrandsSection 
                    data={topBrandsData} 
                    onSelectBrand={(brand) => Alert.alert('Brand', `Viewing ${brand.name} products`)}
                  />

                  {/* Deal of the Day */}
                  <DealOfTheDaySection 
                    data={dealOfTheDayData} 
                    onShopNow={() => Alert.alert('Deal of the Day', `Shopping ${dealOfTheDayData.productName}`)} 
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
                    {(dbProducts.length > 0 ? dbProducts : todaysDealsData).map((item) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        onAddToCart={handleAddToCart}
                        onToggleFavorite={handleToggleFavorite}
                        onPress={handleSelectProduct}
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

                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Featured For You</Text>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalProductsScroll}
                  >
                    {(dbProducts.length > 0 ? dbProducts.slice(0, 6).reverse() : featuredProductsData).map((item) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        onAddToCart={handleAddToCart}
                        onToggleFavorite={handleToggleFavorite}
                        onPress={handleSelectProduct}
                      />
                    ))}
                  </ScrollView>

                  {/* Shop The Look (Hotspots) */}
                  <ShopTheLookSection data={shopTheLookData} />

                  {/* Collections Grid */}
                  <CollectionsGrid 
                    data={collectionsData}
                    onSelectCollection={(col) => Alert.alert('Collection', `Exploring ${col.title}`)}
                  />
                </>
              )}
            </ScrollView>
          </View>

          {/* 1: Categories Page */}
          <View style={[styles.slidePage, { width: contentWidth }]}>
            <CategoriesContent
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          </View>

          {/* 2: Orders Page */}
          <View style={[styles.slidePage, { width: contentWidth }]}>
            <OrdersContent />
          </View>

          {/* 3: Wishlist Page */}
          <View style={[styles.slidePage, { width: contentWidth }]}>
            <WishlistContent
              onAddToCart={handleAddToCart}
              onExploreProducts={() => handleBottomTabPress('categories')}
            />
          </View>

          {/* 4: Profile Page */}
          <View style={[styles.slidePage, { width: contentWidth }]}>
            <ProfileContent
              userProfile={userProfile}
              onEditProfilePress={() => setIsEditProfileVisible(true)}
              onDeliveryAddressesPress={() => setIsDeliveryAddressesVisible(true)}
              onAboutPress={() => setIsAboutVisible(true)}
              onTermsPress={() => setIsTermsVisible(true)}
              onHelpCenterPress={() => setIsHelpCenterVisible(true)}
              onPrivacySecurityPress={() => setIsPrivacySecurityVisible(true)}
              onNotificationsPress={() => setIsNotificationsVisible(true)}
              onPaymentMethodsPress={() => setIsPaymentMethodsVisible(true)}
            />
          </View>
        </Animated.View>
      </View>

      {/* Fixed Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeBottomTab}
        onTabPress={handleBottomTabPress}
      />

      {/* Interactive Cart Screen Modal */}
      <CartScreen
        visible={isCartModalVisible}
        onClose={() => setIsCartModalVisible(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
        onCheckoutSuccess={(orderData) => {
          setCartItems([]);
          setIsCartModalVisible(false);
          setCompletedOrderData(orderData);
          setIsOrderSuccessVisible(true);
        }}
      />

      {/* Today's Deals See All Modal */}
      <TodaysDealsScreen
        visible={isTodaysDealsVisible}
        onClose={() => setIsTodaysDealsVisible(false)}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        onSelectProduct={handleSelectProduct}
      />

      {/* Category Stories Viewer */}
      <StoryViewerScreen
        visible={isStoryVisible}
        onClose={() => setIsStoryVisible(false)}
        stories={activeStoryCategory?.stories}
        categoryName={activeStoryCategory?.name}
      />

      {/* Product Details Modal Screen */}
      <ProductDetailsScreen
        visible={isProductDetailsVisible}
        product={selectedProduct}
        onClose={() => setIsProductDetailsVisible(false)}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        onBuyNow={(item) => {
          setIsProductDetailsVisible(false);
          setIsCartModalVisible(true);
        }}
      />

      {/* Added to Cart Success Modal */}
      <AddToCartSuccessModal
        visible={isAddToCartSuccessVisible}
        onClose={() => setIsAddToCartSuccessVisible(false)}
        product={addedProduct}
        totalCartCount={totalCartCount}
        onViewCart={() => setIsCartModalVisible(true)}
      />

      {/* Order Placed Success Modal (COD / Online) */}
      <OrderSuccessModal
        visible={isOrderSuccessVisible}
        onClose={() => {
          setIsOrderSuccessVisible(false);
          handleBottomTabPress('home');
        }}
        orderData={completedOrderData}
        onGoToHome={() => {
          setIsOrderSuccessVisible(false);
          handleBottomTabPress('home');
        }}
      />

      {/* Edit Profile Full Screen Modal */}
      <EditProfileScreen
        visible={isEditProfileVisible}
        onClose={() => setIsEditProfileVisible(false)}
        initialProfile={userProfile}
        onSaveProfile={(updatedProfile) => setUserProfile(updatedProfile)}
        onManageAddressesPress={() => {
          setIsEditProfileVisible(false);
          setIsDeliveryAddressesVisible(true);
        }}
      />

      {/* Delivery Addresses Management Modal */}
      <DeliveryAddressesScreen
        visible={isDeliveryAddressesVisible}
        onClose={() => setIsDeliveryAddressesVisible(false)}
      />

      {/* About ShopEase Screen Modal */}
      <AboutShopEaseScreen
        visible={isAboutVisible}
        onClose={() => setIsAboutVisible(false)}
      />

      {/* Terms & Conditions Screen Modal */}
      <TermsScreen
        visible={isTermsVisible}
        onClose={() => setIsTermsVisible(false)}
      />

      {/* Help Center Screen Modal */}
      <HelpCenterScreen
        visible={isHelpCenterVisible}
        onClose={() => setIsHelpCenterVisible(false)}
      />

      {/* Privacy & Security Screen Modal */}
      <PrivacySecurityScreen
        visible={isPrivacySecurityVisible}
        onClose={() => setIsPrivacySecurityVisible(false)}
      />

      {/* Notifications Screen Modal */}
      <NotificationsScreen
        visible={isNotificationsVisible}
        onClose={() => setIsNotificationsVisible(false)}
      />

      {/* Payment Methods Screen Modal */}
      <PaymentMethodsScreen
        visible={isPaymentMethodsVisible}
        onClose={() => setIsPaymentMethodsVisible(false)}
      />

      {/* Sidebar Navigation Drawer Modal */}
      <SidebarDrawer
        visible={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userProfile={userProfile}
        onNavigateTab={(tabId) => handleBottomTabPress(tabId)}
        onOpenDeals={() => setIsTodaysDealsVisible(true)}
        onOpenAddresses={() => setIsDeliveryAddressesVisible(true)}
        onOpenPayments={() => setIsPaymentMethodsVisible(true)}
        onOpenNotifications={() => setIsNotificationsVisible(true)}
        onOpenPrivacy={() => setIsPrivacySecurityVisible(true)}
        onOpenHelp={() => setIsHelpCenterVisible(true)}
        onOpenAbout={() => setIsAboutVisible(true)}
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
  categoryFilteredContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  categoryActiveBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginBottom: 16,
  },
  categoryActiveTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  categoryActiveSubtitle: {
    fontSize: 12,
    color: '#3B82F6',
    marginTop: 2,
    fontWeight: '600',
  },
  clearCategoryBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  clearCategoryBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  categoryProductsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCardStyle: {
    width: '48%',
    marginRight: 0,
    marginBottom: 16,
  },
});
