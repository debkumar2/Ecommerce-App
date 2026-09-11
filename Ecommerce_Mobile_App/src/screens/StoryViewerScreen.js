import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
  SafeAreaView
} from 'react-native';
import { X, ChevronUp } from 'lucide-react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function StoryViewerScreen({ visible, onClose, stories, categoryName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && stories && stories.length > 0) {
      startStory();
    } else {
      progressAnim.setValue(0);
      setCurrentIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, currentIndex, stories]);

  const startStory = () => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000, // 5 seconds per story
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        nextStory();
      }
    });
  };

  const nextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const prevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Re-start current if it's the first one
      startStory();
    }
  };

  const handlePress = (e) => {
    const x = e.nativeEvent.locationX;
    if (x < width / 3) {
      prevStory();
    } else {
      nextStory();
    }
  };

  if (!stories || stories.length === 0) return null;

  const currentStory = stories[currentIndex];

  return (
    <Modal visible={visible} animationType="fade" transparent={false} onRequestClose={onClose}>
      <View style={styles.container}>
        <Image source={{ uri: currentStory.imageUrl }} style={styles.image} resizeMode="cover" />
        
        {/* Dark gradient overlay for readability at top and bottom */}
        <View style={styles.topGradient} />
        <View style={styles.bottomGradient} />

        {/* Top Progress Bars */}
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.progressContainer}>
            {stories.map((story, index) => {
              return (
                <View key={story.id} style={styles.progressTrack}>
                  <Animated.View
                    style={[
                      styles.progressBar,
                      {
                        width: index === currentIndex 
                          ? progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] })
                          : index < currentIndex ? '100%' : '0%'
                      }
                    ]}
                  />
                </View>
              );
            })}
          </View>
          
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Text style={styles.categoryText}>{categoryName || 'Story'}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Tap areas */}
        <View style={styles.touchArea} onTouchEnd={handlePress} />

        {/* Bottom content overlay */}
        <View style={styles.bottomOverlay} pointerEvents="box-none">
          <View style={styles.textContent}>
            <Text style={styles.subtitle}>{currentStory.subtitle}</Text>
            <Text style={styles.title}>{currentStory.title}</Text>
          </View>
          
          <TouchableOpacity style={styles.shopButton} activeOpacity={0.8} onPress={() => {}}>
            <ChevronUp size={20} color={colors.primary} />
            <Text style={styles.shopButtonText}>{currentStory.linkText || 'Shop Now'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    zIndex: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 2,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  closeBtn: {
    padding: 4,
  },
  touchArea: {
    position: 'absolute',
    top: 100,
    bottom: 150,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 10,
  },
  textContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    letterSpacing: -0.5,
  },
  shopButton: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  shopButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 4,
  },
});
