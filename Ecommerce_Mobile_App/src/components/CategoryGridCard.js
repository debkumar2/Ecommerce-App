import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

export default function CategoryGridCard({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Top Image Section */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Floating Icon Badge on Image */}
        <View style={[styles.iconBadge, { backgroundColor: item.color }]}>
          <ArrowRight size={14} color={item.iconColor} />
        </View>
      </View>

      {/* Bottom Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.itemsCount}>{item.items}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 190,
    borderRadius: 20,
    margin: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF', // Clean white background for the text area
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  imageContainer: {
    width: '100%',
    height: '65%', // Image takes up 65% of the card
    position: 'relative',
    backgroundColor: '#F9FAFB',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconBadge: {
    position: 'absolute',
    bottom: -14,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827', // Very dark grey/black
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  itemsCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280', // Subtle grey
  },
});
