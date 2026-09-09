import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
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
        
        <View style={styles.arrowButtonContainer}>
          <View style={[styles.arrowButtonBg, { backgroundColor: item.iconColor }]} />
          <ArrowRight size={16} color={item.iconColor} style={styles.arrowIcon} />
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
    color: '#1F2937', // Darker black for title
    marginBottom: 4,
  },
  itemsCount: {
    fontSize: 11,
    color: '#6B7280', // Neutral grey for items
    marginBottom: 12,
  },
  arrowButtonContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    position: 'relative',
  },
  arrowButtonBg: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    opacity: 0.2, // Faded background
  },
  arrowIcon: {
    zIndex: 1,
  },
  image: {
    position: 'absolute',
    right: -15,
    bottom: -15,
    width: 105,
    height: 105,
    zIndex: 1,
  },
});
