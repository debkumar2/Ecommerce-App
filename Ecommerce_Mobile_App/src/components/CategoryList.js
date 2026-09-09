import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Shirt, Laptop, Armchair, Sparkles, Activity, MoreHorizontal } from 'lucide-react-native';
import { categoriesData } from '../data/mockData';
import { colors } from '../theme/colors';

export default function CategoryList({ selectedCategory, onSelectCategory }) {
  const renderCategoryIcon = (iconName, iconColor) => {
    const iconProps = { size: 22, color: iconColor };
    switch (iconName) {
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
      case 'more-horizontal':
      default:
        return <MoreHorizontal {...iconProps} />;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categoriesData.map((item) => {
          const isSelected = selectedCategory === item.name;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryItem}
              onPress={() => onSelectCategory(item.name)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: item.color },
                  isSelected && styles.iconCircleSelected,
                ]}
              >
                {renderCategoryIcon(item.icon, item.iconColor)}
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
    marginBottom: 6,
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
