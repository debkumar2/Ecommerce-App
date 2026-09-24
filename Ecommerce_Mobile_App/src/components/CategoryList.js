import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Shirt, Laptop, Armchair, Sparkles, Activity, MoreHorizontal, LayoutGrid, Smile, BookOpen, ShoppingBag } from 'lucide-react-native';
import { colors } from '../theme/colors';

const ALL_CATEGORY = { id: 'all', name: 'All', color: '#F3F4F6', iconColor: '#374151', icon: 'grid' };

export default function CategoryList({ selectedCategory, onSelectCategory }) {
  const renderCategoryIcon = (iconName, iconColor) => {
    const iconProps = { size: 22, color: iconColor };
    switch (iconName) {
      case 'grid':
        return <LayoutGrid {...iconProps} />;
      case 'shirt':
        return <Shirt {...iconProps} />;
      case 'laptop':
        return <Laptop {...iconProps} />;
      case 'armchair':
        return <Armchair {...iconProps} />;
      case 'sparkles':
        return <Sparkles {...iconProps} />;
      case 'activity':
        return <Activity {...iconProps} />;
      case 'smile':
        return <Smile {...iconProps} />;
      case 'book-open':
        return <BookOpen {...iconProps} />;
      case 'shopping-bag':
        return <ShoppingBag {...iconProps} />;
      case 'more-horizontal':
      default:
        return <MoreHorizontal {...iconProps} />;
    }
  };

  const [listData, setListData] = useState([ALL_CATEGORY]);

  useEffect(() => {
    // Fetch live categories from Postgres Database!
    fetch('http://192.168.31.64:5000/api/products/categories')
      .then((res) => res.json())
      .then((data) => {
        const mappedCategories = data.map((c) => {
          let iconName = 'more-horizontal';
          let bgColor = '#EFF6FF';
          let iconColor = '#3B82F6';

          if (c.name.includes('Fashion')) {
            iconName = 'shirt';
            bgColor = '#FFF0F0';
            iconColor = '#EF4444';
          } else if (c.name.includes('Electronics')) {
            iconName = 'laptop';
            bgColor = '#F0F9FF';
            iconColor = '#3B82F6';
          } else if (c.name.includes('Home')) {
            iconName = 'armchair';
            bgColor = '#ECFDF5';
            iconColor = '#10B981';
          } else if (c.name.includes('Beauty')) {
            iconName = 'sparkles';
            bgColor = '#FDF4FF';
            iconColor = '#EC4899';
          } else if (c.name.includes('Sports')) {
            iconName = 'activity';
            bgColor = '#FFF7ED';
            iconColor = '#F97316';
          } else if (c.name.includes('Toys')) {
            iconName = 'smile';
            bgColor = '#FEF3C7';
            iconColor = '#D97706';
          } else if (c.name.includes('Books')) {
            iconName = 'book-open';
            bgColor = '#F3E8FF';
            iconColor = '#9333EA';
          } else if (c.name.includes('Groceries')) {
            iconName = 'shopping-bag';
            bgColor = '#ECFCCB';
            iconColor = '#65A30D';
          }

          return {
            id: c.id.toString(),
            name: c.name,
            color: bgColor,
            iconColor: iconColor,
            icon: iconName,
          };
        });
        setListData([ALL_CATEGORY, ...mappedCategories]);
      })
      .catch((err) => console.error('Failed to fetch categories:', err));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {listData.map((item) => {
          const isSelected = selectedCategory === item.name || (!selectedCategory && item.name === 'All');
          const hasStories = item.stories && item.stories.length > 0;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryItem}
              onPress={() => onSelectCategory(item)}
              activeOpacity={0.7}
            >
              <View style={[styles.storyRingWrapper, hasStories && styles.storyRingActive]}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: item.color },
                    isSelected && !hasStories && styles.iconCircleSelected,
                  ]}
                >
                  {renderCategoryIcon(item.icon, item.iconColor)}
                </View>
              </View>
              <Text
                style={[
                  styles.categoryName,
                  isSelected && styles.categoryNameSelected,
                ]}
                numberOfLines={1}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 68,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyRingWrapper: {
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  storyRingActive: {
    borderColor: colors.primary,
  },
  iconCircleSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  categoryName: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  categoryNameSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
});
