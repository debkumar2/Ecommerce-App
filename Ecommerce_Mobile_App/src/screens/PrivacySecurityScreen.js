import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  KeyRound,
  Smartphone,
  Eye,
  Bell,
  Trash2,
  Check,
  ChevronRight,
  AlertTriangle,
  Sparkles,
} from 'lucide-react-native';
import { colors } from '../theme/colors';
import { useActionLock } from '../hooks/useActionLock';

export default function PrivacySecurityScreen({ visible = false, onClose }) {
  // Toggle States
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [personalizedAds, setPersonalizedAds] = useState(true);
  const [activitySharing, setActivitySharing] = useState(false);

  // Change Password Modal State
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const { isProcessing, executeAction } = useActionLock(500);

  const displayToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2200);
  };

  const handleOpenPasswordModal = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setIsPasswordModalVisible(true);
  };

  const handleSavePassword = () => {
    if (!currentPassword) {
      setPasswordError('Current password is required');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    executeAction(() => {
      setPasswordError('');
      setIsPasswordModalVisible(false);
      displayToast('🔒 Password updated successfully!');
    });
  };

  const handleClearCache = () => {
    const confirmClear = () => {
      displayToast('🧹 Search history and cache cleared!');
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Clear all local search history and cache?')) {
        confirmClear();
      }
    } else {
      Alert.alert(
        'Clear History & Cache',
        'Are you sure you want to clear your local search history and app cache?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Clear', style: 'destructive', onPress: confirmClear },
        ]
      );
    }
  };

  const handleDeleteAccount = () => {
    const confirmDelete = () => {
      const msg = 'Account deletion request submitted. Our support team will contact you within 24 hours.';
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Request Submitted', msg);
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Warning: Deleting your account is permanent. Do you want to proceed?')) {
        confirmDelete();
      }
    } else {
      Alert.alert(
        'Delete Account',
        'Warning: Deleting your account will permanently erase your profile, orders, and rewards points. Do you want to proceed?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Request Deletion', style: 'destructive', onPress: confirmDelete },
        ]
      );
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose} activeOpacity={0.7}>
            <ArrowLeft size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy & Security</Text>
          <View style={{ width: 38 }} />
        </View>

        {/* Toast Banner */}
        {showToast && (
          <View style={styles.toastBanner}>
            <Check size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Top Banner */}
          <View style={styles.infoBanner}>
            <ShieldCheck size={24} color={colors.primary} style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoBannerTitle}>Account Security & Data Privacy</Text>
              <Text style={styles.infoBannerSubtitle}>
                Manage your credentials, authentication methods, and data preferences
              </Text>
            </View>
          </View>

          {/* Account Security Card */}
          <Text style={styles.sectionHeaderTitle}>Security Settings</Text>
          <View style={styles.settingsCard}>
            {/* Change Password */}
            <TouchableOpacity
              style={styles.settingRow}
              onPress={handleOpenPasswordModal}
              activeOpacity={0.7}
            >
              <View style={[styles.settingIconBg, { backgroundColor: '#FFEDD5' }]}>
                <KeyRound size={20} color="#EA580C" />
              </View>
              <View style={styles.settingTextCol}>
                <Text style={styles.settingTitle}>Change Password</Text>
                <Text style={styles.settingDesc}>Update your account login password</Text>
              </View>
              <ChevronRight size={20} color={colors.textPlaceholder} />
            </TouchableOpacity>

            <View style={styles.settingDivider} />

            {/* 2-Factor Authentication */}
            <View style={styles.settingRow}>
              <View style={[styles.settingIconBg, { backgroundColor: '#DCFCE7' }]}>
                <Lock size={20} color="#16A34A" />
              </View>
              <View style={styles.settingTextCol}>
                <Text style={styles.settingTitle}>Two-Factor Authentication (2FA)</Text>
                <Text style={styles.settingDesc}>Send OTP code to your phone on login</Text>
              </View>
              <Switch
                value={twoFactorEnabled}
                onValueChange={(val) => {
                  setTwoFactorEnabled(val);
                  displayToast(val ? '🔒 2FA Enabled' : '🔓 2FA Disabled');
                }}
                trackColor={{ false: '#E2E8F0', true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingDivider} />

            {/* Biometric Login */}
            <View style={styles.settingRow}>
              <View style={[styles.settingIconBg, { backgroundColor: '#EFF6FF' }]}>
                <Smartphone size={20} color="#2563EB" />
              </View>
              <View style={styles.settingTextCol}>
                <Text style={styles.settingTitle}>Biometric / Face ID Login</Text>
                <Text style={styles.settingDesc}>Use fingerprint or Face ID to open app</Text>
              </View>
              <Switch
                value={biometricsEnabled}
                onValueChange={(val) => {
                  setBiometricsEnabled(val);
                  displayToast(val ? '☝️ Biometric Login Enabled' : 'Biometric Login Disabled');
                }}
                trackColor={{ false: '#E2E8F0', true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* Data & Privacy Settings */}
          <Text style={styles.sectionHeaderTitle}>Data Privacy & Preferences</Text>
          <View style={styles.settingsCard}>
            {/* Private Profile */}
            <View style={styles.settingRow}>
              <View style={[styles.settingIconBg, { backgroundColor: '#F5F3FF' }]}>
                <Eye size={20} color="#7C3AED" />
              </View>
              <View style={styles.settingTextCol}>
                <Text style={styles.settingTitle}>Private Profile Mode</Text>
                <Text style={styles.settingDesc}>Hide reviews and public wishlist stats</Text>
              </View>
              <Switch
                value={profilePrivate}
                onValueChange={setProfilePrivate}
                trackColor={{ false: '#E2E8F0', true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.settingDivider} />

            {/* Personalized Recommendations */}
            <View style={styles.settingRow}>
              <View style={[styles.settingIconBg, { backgroundColor: '#FEF3C7' }]}>
                <Sparkles size={20} color="#D97706" />
              </View>
              <View style={styles.settingTextCol}>
                <Text style={styles.settingTitle}>Personalized Recommendations</Text>
                <Text style={styles.settingDesc}>Tailor deals based on browsing history</Text>
              </View>
              <Switch
                value={personalizedAds}
                onValueChange={setPersonalizedAds}
                trackColor={{ false: '#E2E8F0', true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* Account Data Actions */}
          <Text style={styles.sectionHeaderTitle}>Account Storage & Data</Text>
          <View style={styles.settingsCard}>
            {/* Clear History */}
            <TouchableOpacity
              style={styles.settingRow}
              onPress={handleClearCache}
              activeOpacity={0.7}
            >
              <View style={[styles.settingIconBg, { backgroundColor: '#F1F5F9' }]}>
                <Trash2 size={20} color={colors.textPrimary} />
              </View>
              <View style={styles.settingTextCol}>
                <Text style={styles.settingTitle}>Clear Search History & Cache</Text>
                <Text style={styles.settingDesc}>Free up app memory & local search terms</Text>
              </View>
              <ChevronRight size={20} color={colors.textPlaceholder} />
            </TouchableOpacity>

            <View style={styles.settingDivider} />

            {/* Delete Account */}
            <TouchableOpacity
              style={styles.settingRow}
              onPress={handleDeleteAccount}
              activeOpacity={0.7}
            >
              <View style={[styles.settingIconBg, { backgroundColor: '#FEE2E2' }]}>
                <AlertTriangle size={20} color="#DC2626" />
              </View>
              <View style={styles.settingTextCol}>
                <Text style={[styles.settingTitle, { color: '#DC2626' }]}>Delete Account</Text>
                <Text style={styles.settingDesc}>Permanently remove profile & reward history</Text>
              </View>
              <ChevronRight size={20} color="#DC2626" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Change Password Modal */}
        <Modal
          visible={isPasswordModalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setIsPasswordModalVisible(false)}
        >
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Change Password</Text>
              <TouchableOpacity onPress={() => setIsPasswordModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
              {passwordError ? (
                <View style={styles.errorAlert}>
                  <AlertTriangle size={16} color="#DC2626" style={{ marginRight: 6 }} />
                  <Text style={styles.errorAlertText}>{passwordError}</Text>
                </View>
              ) : null}

              {/* Current Password */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Current Password</Text>
                <View style={styles.formInputWrapper}>
                  <Lock size={18} color={colors.textSecondary} style={{ marginRight: 10 }} />
                  <TextInput
                    style={styles.formInput}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholder="Enter current password"
                    placeholderTextColor={colors.textPlaceholder}
                    secureTextEntry
                  />
                </View>
              </View>

              {/* New Password */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>New Password</Text>
                <View style={styles.formInputWrapper}>
                  <KeyRound size={18} color={colors.textSecondary} style={{ marginRight: 10 }} />
                  <TextInput
                    style={styles.formInput}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Minimum 6 characters"
                    placeholderTextColor={colors.textPlaceholder}
                    secureTextEntry
                  />
                </View>
              </View>

              {/* Confirm New Password */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Confirm New Password</Text>
                <View style={styles.formInputWrapper}>
                  <KeyRound size={18} color={colors.textSecondary} style={{ marginRight: 10 }} />
                  <TextInput
                    style={styles.formInput}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Re-enter new password"
                    placeholderTextColor={colors.textPlaceholder}
                    secureTextEntry
                  />
                </View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={[styles.savePasswordBtn, isProcessing && { opacity: 0.7 }]}
                onPress={handleSavePassword}
                disabled={isProcessing}
                activeOpacity={0.85}
              >
                <Text style={styles.savePasswordBtnText}>Update Password</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  toastBanner: {
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1EB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFDCD0',
  },
  infoBannerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  infoBannerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  settingIconBg: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  settingTextCol: {
    flex: 1,
    marginRight: 8,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 56,
  },

  /* Password Modal Styles */
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  modalHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  errorAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorAlertText: {
    fontSize: 13,
    color: '#DC2626',
    fontWeight: '600',
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  formInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
  },
  formInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  savePasswordBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  savePasswordBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
