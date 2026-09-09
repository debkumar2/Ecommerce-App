import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import { colors } from './src/theme/colors';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login' | 'signup'

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Main Screen Content */}
      <View style={styles.screenWrapper}>
        {currentScreen === 'login' ? (
          <LoginScreen onNavigateToSignup={() => setCurrentScreen('signup')} />
        ) : (
          <SignupScreen onNavigateToLogin={() => setCurrentScreen('login')} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  screenWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
});

