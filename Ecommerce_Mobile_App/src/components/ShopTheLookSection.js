import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Plus, X } from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function ShopTheLookSection({ data }) {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  if (!data) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{data.title}</Text>
      <Text style={styles.subtitle}>{data.subtitle}</Text>
      
      <View style={styles.imageWrapper}>
        <Image source={{ uri: data.mainImage }} style={styles.mainImage} resizeMode="cover" />
        
        {/* Render Hotspots */}
        {data.hotspots.map((hotspot) => {
          const isActive = activeHotspot === hotspot.id;
          return (
            <View key={hotspot.id} style={[styles.hotspotContainer, { left: `${hotspot.x}%`, top: `${hotspot.y}%` }]}>
              {/* Pulsing ring behind the button */}
              {!isActive && (
                <Animated.View
                  style={[
                    styles.pulseRing,
                    { transform: [{ scale: pulseAnim }] }
                  ]}
                />
              )}
              
              <TouchableOpacity
                style={[styles.hotspotDot, isActive && styles.hotspotDotActive]}
                activeOpacity={0.8}
                onPress={() => setActiveHotspot(isActive ? null : hotspot.id)}
              >
                {isActive ? (
                  <X size={14} color="#FFF" />
                ) : (
                  <Plus size={14} color="#000" />
                )}
              </TouchableOpacity>

              {/* Product Popup Card */}
              {isActive && (
                <View style={styles.productPopup}>
                  <View style={styles.popupTriangle} />
                  <View style={styles.popupContent}>
                    <Image source={{ uri: hotspot.product.imageUrl }} style={styles.popupImage} />
                    <View style={styles.popupTextContainer}>
                      <Text style={styles.popupProductName} numberOfLines={1}>{hotspot.product.name}</Text>
                      <Text style={styles.popupProductPrice}>{hotspot.product.price}</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          );
        })}
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  imageWrapper: {
    width: '100%',
    height: 400,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  hotspotContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    width: 30,
    height: 30,
    marginLeft: -15, // Center the dot on the x coordinate
    marginTop: -15,  // Center the dot on the y coordinate
  },
  pulseRing: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  hotspotDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  hotspotDotActive: {
    backgroundColor: colors.primary,
  },
  productPopup: {
    position: 'absolute',
    top: 36, // Below the dot
    left: -60, // Center popup horizontally relative to dot
    width: 150,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 20,
  },
  popupTriangle: {
    position: 'absolute',
    top: -8,
    left: '50%',
    marginLeft: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(255,255,255,0.95)',
  },
  popupContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popupImage: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  popupTextContainer: {
    flex: 1,
  },
  popupProductName: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  popupProductPrice: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
});
