import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Play, Eye } from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function ShopByVideoSection({ data, onVideoPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Discover via Video</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => onVideoPress && onVideoPress(item)}
          >
            <ImageBackground source={{ uri: item.videoThumbnail }} style={styles.thumbnail} imageStyle={{ borderRadius: 16 }}>
              {/* Play Button Overlay */}
              <View style={styles.playOverlay}>
                <View style={styles.playButton}>
                  <Play size={20} color={colors.white} style={{ marginLeft: 2 }} />
                </View>
              </View>

              {/* View Count Badge */}
              <View style={styles.viewsBadge}>
                <Eye size={12} color={colors.white} style={{ marginRight: 4 }} />
                <Text style={styles.viewsText}>{item.views}</Text>
              </View>

              {/* Bottom Gradient overlay */}
              <View style={styles.bottomGradient}>
                <View style={styles.bottomContent}>
                  <View style={styles.textContainer}>
                    <Text style={styles.creatorText}>{item.creator}</Text>
                    <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
                  </View>
                  
                  {/* Product Thumbnail inside video */}
                  <View style={styles.productThumbContainer}>
                    <Image source={{ uri: item.productImage }} style={styles.productImage} />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  card: {
    width: 160,
    height: 260,
    marginHorizontal: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  viewsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    margin: 12,
    zIndex: 2,
  },
  viewsText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  bottomGradient: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    zIndex: 2,
    marginTop: 'auto',
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  creatorText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  titleText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  productThumbContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.white,
    padding: 4,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
