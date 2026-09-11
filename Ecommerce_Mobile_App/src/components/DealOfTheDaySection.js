import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Clock, ArrowRight } from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function DealOfTheDaySection({ data, onShopNow }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!data?.endTime) return;
    const end = new Date(data.endTime).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = end - now;
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft(0);
      } else {
        setTimeLeft(Math.floor(distance / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data?.endTime]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  if (!data) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{data.title}</Text>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: data.imageUrl }} style={styles.image} resizeMode="cover" />
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{data.discount}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.productName}>{data.productName}</Text>
          <Text style={styles.description} numberOfLines={2}>{data.description}</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{data.price.toLocaleString()}</Text>
            <Text style={styles.originalPrice}>₹{data.originalPrice.toLocaleString()}</Text>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.timerContainer}>
              <Clock size={14} color={colors.primary} style={{ marginRight: 4 }} />
              <Text style={styles.timerText}>Ends in {formatTime(timeLeft)}</Text>
            </View>
            <TouchableOpacity style={styles.shopButton} onPress={onShopNow} activeOpacity={0.8}>
              <Text style={styles.shopButtonText}>Shop Now</Text>
              <ArrowRight size={14} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#EF4444',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  discountText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  content: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  price: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primary,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    marginBottom: 3,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timerText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  shopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  shopButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
    marginRight: 4,
  },
});
