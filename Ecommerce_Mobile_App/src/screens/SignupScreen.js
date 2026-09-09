import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import BrandHeader from '../components/BrandHeader';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Checkbox from '../components/Checkbox';
import { TopBackgroundBlob, SignupBottomArt } from '../components/BackgroundArt';
import { colors } from '../theme/colors';

export default function SignupScreen({ onNavigateToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      const msg = 'Please fill in all required fields.';
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Missing Info', msg);
      return;
    }

    if (password !== confirmPassword) {
      const msg = 'Passwords do not match.';
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Validation Error', msg);
      return;
    }

    if (!agreeTerms) {
      const msg = 'Please agree to the Terms & Conditions to proceed.';
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Terms Agreement Required', msg);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const msg = `Account successfully created for ${fullName}!`;
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Success', msg);
      onNavigateToLogin();
    }, 1200);
  };

  const handleTermsPress = () => {
    const msg = 'Opening Terms & Conditions...';
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Terms & Conditions', msg);
  };

  const handlePrivacyPress = () => {
    const msg = 'Opening Privacy Policy...';
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Privacy Policy', msg);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBackgroundBlob />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top Header Row with Back Button */}
        <View style={styles.topHeaderNav}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onNavigateToLogin}
            activeOpacity={0.7}
          >
            <ChevronLeft size={26} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <BrandHeader />

        {/* Signup Form Container */}
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us and start your shopping journey</Text>

          {/* Full Name */}
          <CustomInput
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            iconName="user"
            autoCapitalize="words"
          />

          {/* Email Address */}
          <CustomInput
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            iconName="mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Phone Number */}
          <CustomInput
            label="Phone Number"
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
            iconName="phone"
            keyboardType="phone-pad"
          />

          {/* Password */}
          <CustomInput
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            iconName="lock"
            isPassword
          />

          {/* Confirm Password */}
          <CustomInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            iconName="lock"
            isPassword
          />

          {/* Terms & Conditions Checkbox */}
          <Checkbox
            checked={agreeTerms}
            onChange={setAgreeTerms}
            onTermsPress={handleTermsPress}
            onPrivacyPress={handlePrivacyPress}
          />

          {/* Primary Create Account Button */}
          <CustomButton
            title="Create Account"
            onPress={handleCreateAccount}
            loading={loading}
            style={styles.signupButton}
          />

          {/* Login Footer Link */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={onNavigateToLogin} activeOpacity={0.7}>
              <Text style={styles.footerLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Background Illustration */}
        <SignupBottomArt />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
    alignItems: 'center',
  },
  topHeaderNav: {
    width: '100%',
    maxWidth: 420,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: -20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    marginBottom: 20,
  },
  signupButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
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
});
