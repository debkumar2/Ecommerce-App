import React, { useState, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, Animated, Easing, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import { colors } from './src/theme/colors';

const DEFAULT_WIDTH = Math.min(Dimensions.get('window').width, 500);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'forgot' | 'login' | 'signup' | 'home'
  const [containerWidth, setContainerWidth] = useState(DEFAULT_WIDTH);
  
  // Track position: 0 = forgot, 1 = login (default), 2 = signup, 3 = home
  const slideAnim = useRef(new Animated.Value(1)).current;

  const navigateTo = (targetScreen) => {
    if (targetScreen === currentScreen) return;

    let toValue = 1;
    if (targetScreen === 'forgot') toValue = 0;
    if (targetScreen === 'login') toValue = 1;
    if (targetScreen === 'signup') toValue = 2;
    if (targetScreen === 'home') toValue = 3;

    Animated.timing(slideAnim, {
      toValue,
      duration: 380,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen(targetScreen);
    });
  };

  const onLayoutContainer = (event) => {
    const { width } = event.nativeEvent.layout;
    if (width && width !== containerWidth) {
      setContainerWidth(width);
    }
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [0, -containerWidth, -containerWidth * 2, -containerWidth * 3],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Screen Frame Container */}
      <View style={styles.screenWrapper} onLayout={onLayoutContainer}>
        <Animated.View
          style={[
            styles.sliderTrack,
            {
              width: containerWidth * 4,
              transform: [{ translateX }],
            },
          ]}
        >
          {/* Slide 0: Forgot Password Page */}
          <View style={[styles.slidePage, { width: containerWidth }]}>
            <ForgotPasswordScreen onNavigateToLogin={() => navigateTo('login')} />
          </View>

          {/* Slide 1: Login Page */}
          <View style={[styles.slidePage, { width: containerWidth }]}>
            <LoginScreen
              onNavigateToSignup={() => navigateTo('signup')}
              onNavigateToForgotPassword={() => navigateTo('forgot')}
              onNavigateToHome={() => navigateTo('home')}
            />
          </View>

          {/* Slide 2: Create Account Page */}
          <View style={[styles.slidePage, { width: containerWidth }]}>
            <SignupScreen
              onNavigateToLogin={() => navigateTo('login')}
              onNavigateToHome={() => navigateTo('home')}
            />
          </View>

          {/* Slide 3: E-Commerce Home Page */}
          <View style={[styles.slidePage, { width: containerWidth }]}>
            <HomeScreen onNavigateToAuth={() => navigateTo('login')} />
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  sliderTrack: {
    flex: 1,
    flexDirection: 'row',
  },
  slidePage: {
    height: '100%',
  },
});

