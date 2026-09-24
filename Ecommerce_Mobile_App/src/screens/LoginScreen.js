import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import { Check } from 'lucide-react-native';
import BrandHeader from '../components/BrandHeader';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialButton from '../components/SocialButton';
import { TopBackgroundBlob, LoginBottomArt } from '../components/BackgroundArt';
import { colors } from '../theme/colors';

export default function LoginScreen({ onNavigateToSignup, onNavigateToForgotPassword, onNavigateToHome }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      const msg = 'Please enter both email and password.';
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Missing Fields', msg);
      return;
    }

    setLoading(true);

    const API_URL = 'http://192.168.31.64:5000/api/users/login';

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.token) {
          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
            if (onNavigateToHome) {
              onNavigateToHome();
            }
          }, 1500);
        } else {
          Alert.alert('Login Failed', data.message || 'Invalid email or password');
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Network Error', 'Ensure backend is running and IP address is correct.');
        console.error(error);
      });
  };

  const handleForgotPassword = () => {
    if (onNavigateToForgotPassword) {
      onNavigateToForgotPassword();
    }
  };

  const handleSocialAuth = (provider) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onNavigateToHome) {
        onNavigateToHome();
      }
    }, 600);
  };

  return (
    <View style={styles.safeArea}>
      <TopBackgroundBlob />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <BrandHeader />

          {/* Form Container Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue shopping</Text>

            {/* Email Input */}
            <CustomInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              iconName="mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Password Input */}
            <CustomInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              iconName="lock"
              isPassword
            />

            {/* Forgot Password Link */}
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Primary Login Button */}
            <CustomButton
              title="Login"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <SocialButton
              type="google"
              onPress={() => handleSocialAuth('Google')}
            />
            <SocialButton
              type="apple"
              onPress={() => handleSocialAuth('Apple')}
            />

            {/* Create Account Link Footer */}
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={onNavigateToSignup} activeOpacity={0.7}>
                <Text style={styles.footerLink}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Background Art & Tagline */}
          <LoginBottomArt />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Beautiful Success Modal */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIconContainer}>
              <Check size={40} color={colors.white} strokeWidth={3} />
            </View>
            <Text style={styles.modalTitle}>Login Successful!</Text>
            <Text style={styles.modalText}>Welcome back to ShopEase. Preparing your personalized experience...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginTop: -4,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  loginButton: {
    marginTop: 4,
    marginBottom: 16,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPlaceholder,
    letterSpacing: 1,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 6,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  footerLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 30,
    borderRadius: 24,
    alignItems: 'center',
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981', // Beautiful vibrant green
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
