import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { ArrowLeft, Filter } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { getProductsByCategory } from '../data/mockData';
import CategoryGridCard from '../components/CategoryGridCard';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const DEFAULT_WIDTH = Math.min(Dimensions.get('window').width, 500);

export default function CategoriesContent({ onSelectProduct, onAddToCart, onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pageWidth, setPageWidth] = useState(DEFAULT_WIDTH);
  const [dbCategories, setDbCategories] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);

  React.useEffect(() => {
    fetch('http://192.168.31.64:5000/api/products/categories')
      .then((res) => res.json())
      .then((data) => {
        const mappedCategories = data.map((c) => {
          let bgColor = '#F9FAFB';
          let iconColor = '#374151';
          let imageUrl = 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&q=80'; // Default

          if (c.name.includes('Fashion')) {
            bgColor = '#FFF0F0'; iconColor = '#EF4444';
            imageUrl = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80';
          } else if (c.name.includes('Electronics')) {
            bgColor = '#F0F9FF'; iconColor = '#3B82F6';
            imageUrl = 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80';
          } else if (c.name.includes('Home')) {
            bgColor = '#ECFDF5'; iconColor = '#10B981';
            imageUrl = 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80';
          } else if (c.name.includes('Beauty')) {
            bgColor = '#FDF4FF'; iconColor = '#EC4899';
            imageUrl = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80';
          } else if (c.name.includes('Sports')) {
            bgColor = '#FFF7ED'; iconColor = '#F97316';
            imageUrl = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80';
          } else if (c.name.includes('Toys')) {
            bgColor = '#FEF3C7'; iconColor = '#D97706';
            imageUrl = 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80';
          } else if (c.name.includes('Books')) {
            bgColor = '#F3E8FF'; iconColor = '#9333EA';
            imageUrl = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80';
          } else if (c.name.includes('Groceries')) {
            bgColor = '#ECFCCB'; iconColor = '#65A30D';
            imageUrl = 'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=500&q=80';
          }

          return {
            id: c.id.toString(),
            name: c.name,
            color: bgColor,
            iconColor: iconColor,
            imageUrl: imageUrl,
            items: '150+ Items',
          };
        });
        setDbCategories(mappedCategories);
      })
      .catch((err) => console.error('Failed to fetch categories:', err));
  }, []);

  // slideAnim: 0 = All Categories Grid, 1 = Category Products View
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    
    // Fetch products for this specific category
    fetch(`http://192.168.31.64:5000/api/products?categoryId=${category.id}`)
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
          category: p.category ? p.category.name : category.name,
          imageUrl: p.image,
          type: 'general',
          badgeColor: '#EF4444',
          badgeText: 'HOT',
        }));
        setDbProducts(mappedProducts);
      })
      .catch((err) => console.error('Failed to fetch category products:', err));

    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 380,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const handleBackToCategories = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 340,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setSelectedCategory(null);
    });
  };

  const onLayoutContainer = (event) => {
    const { width } = event.nativeEvent.layout;
    if (width && width !== pageWidth) {
      setPageWidth(width);
    }
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -pageWidth],
  });

  const categoryProducts = dbProducts;
  const filteredProducts = categoryProducts.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategories = dbCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container} onLayout={onLayoutContainer}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={() => Alert.alert('Search', `Searching for: ${searchQuery}`)}
      />

      {/* Sliding Track View */}
      <View style={styles.sliderTrackWrapper}>
        <Animated.View
          style={[
            styles.sliderTrack,
            {
              width: pageWidth * 2,
              transform: [{ translateX }],
            },
          ]}
        >
          {/* Slide 0: All Categories Grid View */}
          <View style={[styles.slidePage, { width: pageWidth }]}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.headerContainer}>
                <Text style={styles.title}>All Categories</Text>
                <Text style={styles.subtitle}>Explore our wide range of products</Text>
              </View>

              <View style={styles.gridContainer}>
                {filteredCategories.map((category) => (
                  <View key={category.id} style={styles.gridItem}>
                    <CategoryGridCard
                      item={category}
                      onPress={() => handleCategoryPress(category)}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Slide 1: Selected Category Products View */}
          <View style={[styles.slidePage, { width: pageWidth }]}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {selectedCategory && (
                <View style={styles.categoryProductsContainer}>
                  <View style={styles.subHeaderRow}>
                    <TouchableOpacity
                      style={styles.backBtn}
                      onPress={handleBackToCategories}
                      activeOpacity={0.7}
                    >
                      <ArrowLeft size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <View style={styles.categoryTextWrapper}>
                      <Text style={styles.title}>{selectedCategory.name}</Text>
                      <Text style={styles.subtitle}>{filteredProducts.length} items found</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.filterBtn}
                      onPress={() => Alert.alert('Filter', `Filter products in ${selectedCategory.name}`)}
                      activeOpacity={0.7}
                    >
                      <Filter size={18} color={colors.textPrimary} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.productsGrid}>
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        item={product}
                        onAddToCart={onAddToCart}
                        onToggleFavorite={onToggleFavorite}
                        onPress={onSelectProduct}
                        containerStyle={styles.productCardStyle}
                      />
                    ))}
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sliderTrackWrapper: {
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
  scrollContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  gridItem: {
    width: '50%',
  },
  categoryProductsContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  subHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 12,
  },
  categoryTextWrapper: {
    flex: 1,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCardStyle: {
    width: '48%',
    marginRight: 0,
    marginBottom: 16,
  },
});
