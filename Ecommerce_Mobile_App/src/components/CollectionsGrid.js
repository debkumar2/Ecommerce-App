import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function CollectionsGrid({ data, onSelectCollection }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Curated Collections</Text>
      <View style={styles.gridContainer}>
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => onSelectCollection && onSelectCollection(item)}
            activeOpacity={0.8}
          >
            <View style={styles.textContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <View style={styles.actionRow}>
                <Text style={styles.actionText}>Shop</Text>
                <ArrowRight size={14} color={colors.primary} />
              </View>
            </View>
            <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
          </TouchableOpacity>
        ))}
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 140,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  textContent: {
    padding: 12,
    zIndex: 2,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 4,
  },
  image: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.9,
  },
});
