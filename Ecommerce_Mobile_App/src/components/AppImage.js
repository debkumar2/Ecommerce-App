import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { ImageOff, ShoppingBag } from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function AppImage({
  source,
  style,
  resizeMode = 'cover',
  fallbackIcon: FallbackIcon = ShoppingBag,
  fallbackSource,
  iconSize = 32,
  iconColor = '#9CA3AF',
  showLoadingSpinner = true,
  ...restProps
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const hasValidUri = source && typeof source === 'object' && source.uri && typeof source.uri === 'string' && source.uri.trim().length > 0;
  const isRequireSource = typeof source === 'number' || (source && typeof source === 'object' && !source.uri);

  const shouldRenderImage = (hasValidUri || isRequireSource) && !error;

  return (
    <View style={[styles.container, style]}>
      {shouldRenderImage ? (
        <>
          <Image
            source={source}
            style={[styles.imageStyle, style]}
            resizeMode={resizeMode}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
            {...restProps}
          />
          {loading && showLoadingSpinner && (
            <View style={[styles.loadingOverlay, style]}>
              <ActivityIndicator size="small" color={colors.primary} />
            </View>
          )}
        </>
      ) : (
        <View style={[styles.fallbackContainer, style]}>
          {fallbackSource ? (
            <Image source={fallbackSource} style={[styles.imageStyle, style]} resizeMode={resizeMode} />
          ) : (
            <View style={styles.iconCenter}>
              {error ? (
                <ImageOff size={iconSize} color={iconColor} />
              ) : (
                <FallbackIcon size={iconSize} color={iconColor} />
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(248, 250, 252, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  fallbackContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
