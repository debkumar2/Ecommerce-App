import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import ProductCard from './ProductCard';
import { colors } from '../theme/colors';

export default function NewArrivalsSection({ data, onAddToCart, onToggleFavorite, onSeeAll }) {
  if (!data || data.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New Arrivals</Text>
        <TouchableOpacity
          style={styles.seeAllRow}
          onPress={onSeeAll}
          activeOpacity={0.7}
        >
          <Text style={styles.seeAllText}>See All</Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {data.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  title: {
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
  scrollContent: {
    paddingLeft: 20,
    paddingRight: 6,
    paddingBottom: 6,
  },
});
