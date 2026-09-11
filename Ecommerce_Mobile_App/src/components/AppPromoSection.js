import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { DownloadCloud } from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function AppPromoSection({ onDownloadPress }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80' }}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Get the ShopEase App</Text>
          <Text style={styles.subtitle}>Unlock exclusive deals, early access to sales, and seamless shopping experience.</Text>
          <TouchableOpacity style={styles.button} onPress={onDownloadPress} activeOpacity={0.8}>
            <DownloadCloud size={18} color={colors.white} style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Download Now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  background: {
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  backgroundImage: {
    borderRadius: 20,
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
