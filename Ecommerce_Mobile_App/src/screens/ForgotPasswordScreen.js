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
import { ChevronLeft, KeyRound, CheckCircle2 } from 'lucide-react-native';
import BrandHeader from '../components/BrandHeader';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { TopBackgroundBlob, LoginBottomArt } from '../components/BackgroundArt';
import { colors } from '../theme/colors';

export default function ForgotPasswordScreen({ onNavigateToLogin }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSendResetLink = () => {
    if (!email) {
      const msg = 'Please enter your registered email address.';
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Missing Email', msg);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleResend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const msg = 'Reset link has been resent to your email!';
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Link Resent', msg);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBackgroundBlob />

      {/* Top Left Back Navigation Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={onNavigateToLogin}
        activeOpacity={0.7}
      >
        <ChevronLeft size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <BrandHeader />

        {/* Form Container Card */}
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            {submitted ? (
              <CheckCircle2 size={32} color={colors.success} />
            ) : (
              <KeyRound size={32} color={colors.primary} />
            )}
          </View>

          <Text style={styles.title}>
            {submitted ? 'Check Your Email' : 'Forgot Password?'}
          </Text>
          <Text style={styles.subtitle}>
            {submitted
              ? `We have sent password reset instructions to ${email}`
              : "Enter your registered email address and we'll send you a link to reset your password."}
          </Text>

          {!submitted ? (
            <>
              {/* Registered Email Input */}
              <CustomInput
                label="Email Address"
                placeholder="Enter your email address"
                value={email}
                onChangeText={setEmail}
                iconName="mail"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Action Button */}
              <CustomButton
                title="Send Reset Link"
                onPress={handleSendResetLink}
                loading={loading}
                style={styles.actionButton}
              />
            </>
          ) : (
            <>
              <CustomButton
                title="Back to Login"
                onPress={onNavigateToLogin}
                style={styles.actionButton}
              />

              <TouchableOpacity
                style={styles.resendContainer}
                onPress={handleResend}
                activeOpacity={0.7}
                disabled={loading}
              >
                <Text style={styles.resendText}>
                  Didn't receive the email?{' '}
                  <Text style={styles.resendLink}>Click to resend</Text>
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* Footer Link back to Login */}
          {!submitted && (
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Remember your password? </Text>
              <TouchableOpacity onPress={onNavigateToLogin} activeOpacity={0.7}>
                <Text style={styles.footerLink}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Bottom Background Art */}
        <LoginBottomArt />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 96,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 44,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
    zIndex: 50,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  actionButton: {
    marginTop: 8,
    marginBottom: 14,
  },
  resendContainer: {
    marginTop: 4,
    marginBottom: 10,
  },
  resendText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  resendLink: {
    color: colors.primary,
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
