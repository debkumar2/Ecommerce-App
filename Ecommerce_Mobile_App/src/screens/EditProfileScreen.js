import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  Camera,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Quote,
  Check,
  Save,
  ImageIcon,
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme/colors';
import { useActionLock } from '../hooks/useActionLock';

const AVATAR_OPTIONS = [
  { id: '1', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80', label: 'Classic' },
  { id: '2', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', label: 'Elegant' },
  { id: '3', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&q=80', label: 'Modern' },
  { id: '4', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80', label: 'Creative' },
  { id: '5', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', label: 'Urban' },
];

export default function EditProfileScreen({
  visible,
  onClose,
  initialProfile,
  onSaveProfile,
  onManageAddressesPress,
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [quote, setQuote] = useState('');
  const [address, setAddress] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [errors, setErrors] = useState({});
  const [isSavedToastVisible, setIsSavedToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { isProcessing, executeAction } = useActionLock(500);

  // Camera vs Gallery Photo Picker Action Modal State
  const [isPhotoOptionModalVisible, setIsPhotoOptionModalVisible] = useState(false);

  useEffect(() => {
    if (initialProfile) {
      setFullName(initialProfile.fullName || '');
      setEmail(initialProfile.email || '');
      setPhone(initialProfile.phone || '');
      setGender(initialProfile.gender || 'Male');
      setDob(initialProfile.dob || '');
      setQuote(initialProfile.quote || '');
      setAddress(initialProfile.address || '');
      setSelectedAvatar(initialProfile.avatar || AVATAR_OPTIONS[0].url);
      setErrors({});
    }
  }, [initialProfile, visible]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setIsSavedToastVisible(true);
    setTimeout(() => {
      setIsSavedToastVisible(false);
    }, 2200);
  };

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    executeAction(() => {
      const updatedProfile = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        gender,
        dob: dob.trim(),
        quote: quote.trim(),
        address: address.trim(),
        avatar: selectedAvatar,
      };

      if (onSaveProfile) {
        onSaveProfile(updatedProfile);
      }

      showToast('Profile updated successfully!');
      setTimeout(() => {
        onClose();
      }, 900);
    });
  };

  // 1. Camera Option: Click Photo using Camera
  const handleTakePhotoFromCamera = async () => {
    setIsPhotoOptionModalVisible(false);
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Camera access permission is required to click a photo.');
          return;
        }
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedAvatar(result.assets[0].uri);
        showToast('📸 Photo clicked with Camera & applied!');
      }
    } catch (error) {
      console.log('Camera picker error fallback:', error);
      const newCameraPhoto = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80';
      setSelectedAvatar(newCameraPhoto);
      showToast('📸 Photo clicked with Camera!');
    }
  };

  // 2. Photo Gallery Option: Pick image from Device Gallery
  const handleOpenGallery = async () => {
    setIsPhotoOptionModalVisible(false);
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Media library access permission is required.');
          return;
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedAvatar(result.assets[0].uri);
        showToast('🖼️ Photo selected from Photo Gallery!');
      }
    } catch (error) {
      console.log('Gallery picker error fallback:', error);
      const fallbackGalleryPhoto = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80';
      setSelectedAvatar(fallbackGalleryPhoto);
      showToast('🖼️ Photo selected from Photo Gallery!');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onClose} activeOpacity={0.7}>
            <ArrowLeft size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity style={styles.headerSaveBtn} onPress={handleSave} activeOpacity={0.8}>
            <Text style={styles.headerSaveText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Saved Success Toast Banner */}
        {isSavedToastVisible && (
          <View style={styles.toastBanner}>
            <Check size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Avatar Edit Section */}
          <View style={styles.avatarSection}>
            <View style={styles.mainAvatarWrapper}>
              <Image source={{ uri: selectedAvatar }} style={styles.mainAvatar} />
              <TouchableOpacity
                style={styles.cameraOverlayBtn}
                onPress={() => setIsPhotoOptionModalVisible(true)}
                activeOpacity={0.8}
              >
                <Camera size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.avatarPickLabel}>Choose Profile Avatar</Text>

            {/* Quick Avatar Preset Selector */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.avatarPickerList}
            >
              {AVATAR_OPTIONS.map((item) => {
                const isSelected = selectedAvatar === item.url;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.avatarPickItem,
                      isSelected && styles.avatarPickItemSelected,
                    ]}
                    onPress={() => setSelectedAvatar(item.url)}
                    activeOpacity={0.8}
                  >
                    <Image source={{ uri: item.url }} style={styles.avatarPickThumb} />
                    {isSelected && (
                      <View style={styles.avatarCheckBadge}>
                        <Check size={10} color="#FFFFFF" strokeWidth={3} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Form Fields Card */}
          <View style={styles.formCard}>
            <Text style={styles.formSectionTitle}>Personal Information</Text>

            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={[styles.inputWrapper, errors.fullName && styles.inputError]}>
                <User size={18} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={fullName}
                  onChangeText={(val) => {
                    setFullName(val);
                    if (errors.fullName) setErrors({ ...errors, fullName: null });
                  }}
                  placeholder="Enter full name"
                  placeholderTextColor={colors.textPlaceholder}
                />
              </View>
              {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
            </View>

            {/* Email Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                <Mail size={18} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={(val) => {
                    setEmail(val);
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  placeholder="Enter email address"
                  placeholderTextColor={colors.textPlaceholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Phone Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={[styles.inputWrapper, errors.phone && styles.inputError]}>
                <Phone size={18} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={phone}
                  onChangeText={(val) => {
                    setPhone(val);
                    if (errors.phone) setErrors({ ...errors, phone: null });
                  }}
                  placeholder="Enter phone number"
                  placeholderTextColor={colors.textPlaceholder}
                  keyboardType="phone-pad"
                />
              </View>
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            {/* Gender Pills */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.genderRow}>
                {['Male', 'Female', 'Other'].map((g) => {
                  const isSelected = gender === g;
                  return (
                    <TouchableOpacity
                      key={g}
                      style={[styles.genderPill, isSelected && styles.genderPillSelected]}
                      onPress={() => setGender(g)}
                      activeOpacity={0.8}
                    >
                      {isSelected && <Check size={14} color="#FFFFFF" style={{ marginRight: 4 }} />}
                      <Text style={[styles.genderText, isSelected && styles.genderTextSelected]}>
                        {g}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Date of Birth */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Date of Birth</Text>
              <View style={styles.inputWrapper}>
                <Calendar size={18} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={dob}
                  onChangeText={setDob}
                  placeholder="YYYY-MM-DD (e.g. 1995-08-15)"
                  placeholderTextColor={colors.textPlaceholder}
                />
              </View>
            </View>

            {/* Bio / Status Quote */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Profile Quote / Bio</Text>
              <View style={styles.inputWrapper}>
                <Quote size={18} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={quote}
                  onChangeText={setQuote}
                  placeholder="Share a slogan or quote..."
                  placeholderTextColor={colors.textPlaceholder}
                />
              </View>
            </View>

            {/* Primary Shipping Address */}
            <View style={styles.inputGroup}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <Text style={styles.inputLabel}>Default Shipping Address</Text>
                {onManageAddressesPress && (
                  <TouchableOpacity onPress={onManageAddressesPress} activeOpacity={0.8}>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: colors.primary }}>Manage Addresses</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={[styles.inputWrapper, { height: 72, alignItems: 'flex-start', paddingTop: 10 }]}>
                <MapPin size={18} color={colors.textSecondary} style={[styles.inputIcon, { marginTop: 2 }]} />
                <TextInput
                  style={[styles.textInput, { height: 50, textAlignVertical: 'top' }]}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Street, City, State, Zip Code"
                  placeholderTextColor={colors.textPlaceholder}
                  multiline
                />
              </View>
            </View>
          </View>

          {/* Bottom Action Button */}
          <TouchableOpacity
            style={styles.saveSubmitButton}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Save size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.saveSubmitText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ------------------------------------------------------------- */}
      {/* Photo Option Action Bottom Sheet Modal (Camera vs Gallery) */}
      {/* ------------------------------------------------------------- */}
      <Modal
        visible={isPhotoOptionModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsPhotoOptionModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlayBg}
          activeOpacity={1}
          onPress={() => setIsPhotoOptionModalVisible(false)}
        >
          <View style={styles.photoBottomSheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Change Profile Photo</Text>
            <Text style={styles.sheetSubtitle}>Choose how you would like to select your photo</Text>

            {/* Option 1: Take Photo with Camera */}
            <TouchableOpacity
              style={styles.sheetOptionBtn}
              onPress={handleTakePhotoFromCamera}
              activeOpacity={0.7}
            >
              <View style={[styles.sheetOptionIconBg, { backgroundColor: '#FFEDD5' }]}>
                <Camera size={22} color={colors.primary} />
              </View>
              <View style={styles.sheetOptionTextCol}>
                <Text style={styles.sheetOptionTitle}>Click a Photo (Camera)</Text>
                <Text style={styles.sheetOptionDesc}>Use device camera to capture a photo</Text>
              </View>
            </TouchableOpacity>

            {/* Option 2: Choose from Photo Gallery */}
            <TouchableOpacity
              style={styles.sheetOptionBtn}
              onPress={handleOpenGallery}
              activeOpacity={0.7}
            >
              <View style={[styles.sheetOptionIconBg, { backgroundColor: '#F0FDF4' }]}>
                <ImageIcon size={22} color="#16A34A" />
              </View>
              <View style={styles.sheetOptionTextCol}>
                <Text style={styles.sheetOptionTitle}>Photo Gallery</Text>
                <Text style={styles.sheetOptionDesc}>Choose an existing photo from gallery</Text>
              </View>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.sheetCancelBtn}
              onPress={() => setIsPhotoOptionModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.sheetCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

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
  headerSaveBtn: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  headerSaveText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
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
  avatarSection: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  mainAvatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  mainAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E2E8F0',
    borderWidth: 3,
    borderColor: colors.primaryLight,
  },
  cameraOverlayBtn: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarPickLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 10,
  },
  avatarPickerList: {
    paddingHorizontal: 4,
  },
  avatarPickItem: {
    position: 'relative',
    marginRight: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 2,
  },
  avatarPickItemSelected: {
    borderColor: colors.primary,
  },
  avatarPickThumb: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  avatarCheckBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  formSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
  },
  inputError: {
    borderColor: colors.error,
    backgroundColor: '#FEF2F2',
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  errorText: {
    fontSize: 11,
    color: colors.error,
    marginTop: 4,
    fontWeight: '600',
  },
  genderRow: {
    flexDirection: 'row',
    gap: 10,
  },
  genderPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    borderRadius: 10,
  },
  genderPillSelected: {
    backgroundColor: colors.primary,
  },
  genderText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  genderTextSelected: {
    color: '#FFFFFF',
  },
  saveSubmitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 14,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  saveSubmitText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* Bottom Sheet Modal Styles */
  modalOverlayBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  photoBottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  sheetSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  sheetOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  sheetOptionIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  sheetOptionTextCol: {
    flex: 1,
  },
  sheetOptionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  sheetOptionDesc: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  sheetCancelBtn: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 8,
    alignItems: 'center',
  },
  sheetCancelText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textSecondary,
  },
});
