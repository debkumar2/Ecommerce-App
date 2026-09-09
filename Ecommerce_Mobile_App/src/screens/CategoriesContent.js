import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { colors } from '../theme/colors';
import { categoriesData } from '../data/mockData';
import CategoryGridCard from '../components/CategoryGridCard';
import SearchBar from '../components/SearchBar';

export default function CategoriesContent() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryPress = (category) => {
    Alert.alert('Category Selected', `You selected ${category.name}`);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={() => Alert.alert('Search', `Searching categories for: ${searchQuery}`)}
      />

      <View style={styles.headerContainer}>
        <Text style={styles.title}>All Categories</Text>
        <Text style={styles.subtitle}>Explore our wide range of products</Text>
      </View>

      <View style={styles.gridContainer}>
        {categoriesData.map((category) => (
          <View key={category.id} style={styles.gridItem}>
            <CategoryGridCard 
              item={category} 
              onPress={() => handleCategoryPress(category)} 
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12, // 20 - 8 (margin from cards)
  },
  gridItem: {
    width: '50%',
  },
});
