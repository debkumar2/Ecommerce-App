import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function CategoryGridCard({ item, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.itemsCount}>{item.items}</Text>
        
        <View style={[styles.arrowButton, { backgroundColor: item.iconColor }]}>
          <ArrowRight size={16} color={colors.white} />
        </View>
      </View>
      
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 140,
    borderRadius: 16,
    margin: 8,
    overflow: 'hidden',
    position: 'relative',
    padding: 14,
  },
  textContainer: {
    zIndex: 2,
    flex: 1,
    width: '60%',
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  itemsCount: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  arrowButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  image: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    width: 80,
    height: 80,
    zIndex: 1,
  },
});
