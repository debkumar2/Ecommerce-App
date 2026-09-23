import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  MapPin,
  Plus,
  Home,
  Briefcase,
  Building,
  CheckCircle2,
  Trash2,
  Edit3,
  Phone,
  User,
  Check,
  Sparkles,
} from 'lucide-react-native';
import { colors } from '../theme/colors';
import { storedAddressesData } from '../data/mockData';

export default function DeliveryAddressesScreen({
  visible = false,
  onClose,
  addressesData = storedAddressesData,
  onUpdateAddresses,
}) {
  const [addresses, setAddresses] = useState(addressesData);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  // Form Fields State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('HOME'); // 'HOME' | 'OFFICE' | 'OTHER'
  const [flatNo, setFlatNo] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Karnataka');
  const [pincode, setPincode] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const resetForm = () => {
    setName('');
    setPhone('');
    setType('HOME');
    setFlatNo('');
    setStreet('');
    setCity('');
    setStateName('Karnataka');
    setPincode('');
    setIsDefault(false);
    setFormErrors({});
    setEditingAddressId(null);
  };

  const handleOpenAddForm = () => {
    resetForm();
    setIsAddModalVisible(true);
  };

  const handleEditAddress = (addr) => {
    setEditingAddressId(addr.id);
    setName(addr.name || '');
    setPhone(addr.phone || '');
    setType(addr.type || 'HOME');
    setFlatNo(addr.flatNo || '');
    setStreet(addr.street || '');
    setCity(addr.city || '');
    setStateName(addr.state || 'Karnataka');
    setPincode(addr.pincode || '');
    setIsDefault(!!addr.isDefault);
    setFormErrors({});
    setIsAddModalVisible(true);
  };

  const handleDeleteAddress = (id) => {
    const confirmDelete = () => {
      const updated = addresses.filter((a) => a.id !== id);
      setAddresses(updated);
      if (onUpdateAddresses) onUpdateAddresses(updated);
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete this address?')) {
        confirmDelete();
      }
    } else {
      Alert.alert(
        'Delete Address',
        'Are you sure you want to delete this address?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: confirmDelete },
        ]
      );
    }
  };

  const handleSetDefault = (id) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    setAddresses(updated);
    if (onUpdateAddresses) onUpdateAddresses(updated);
  };

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Full Name is required';
    if (!phone.trim()) errors.phone = 'Phone number is required';
    if (!flatNo.trim()) errors.flatNo = 'House / Flat No is required';
    if (!street.trim()) errors.street = 'Street / Area is required';
    if (!city.trim()) errors.city = 'City is required';
    if (!pincode.trim()) errors.pincode = 'Pincode is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveAddress = () => {
    if (!validateForm()) return;

    const fullAddress = `${flatNo.trim()}, ${street.trim()}, ${city.trim()}, ${stateName.trim()} - ${pincode.trim()}`;

    let updatedList;
    if (editingAddressId) {
      updatedList = addresses.map((a) => {
        if (a.id === editingAddressId) {
          return {
            ...a,
            name: name.trim(),
            phone: phone.trim(),
            type,
            flatNo: flatNo.trim(),
            street: street.trim(),
            city: city.trim(),
            state: stateName.trim(),
            pincode: pincode.trim(),
            fullAddress,
            isDefault: isDefault ? true : a.isDefault,
          };
        }
        return isDefault ? { ...a, isDefault: false } : a;
      });
    } else {
      const newAddr = {
        id: `addr-${Date.now()}`,
        name: name.trim(),
        phone: phone.trim(),
        type,
        isDefault: isDefault || addresses.length === 0,
        flatNo: flatNo.trim(),
        street: street.trim(),
        city: city.trim(),
        state: stateName.trim(),
        pincode: pincode.trim(),
        fullAddress,
      };

      updatedList = isDefault
        ? [newAddr, ...addresses.map((a) => ({ ...a, isDefault: false }))]
        : [...addresses, newAddr];
    }

    setAddresses(updatedList);
    if (onUpdateAddresses) onUpdateAddresses(updatedList);

    setIsAddModalVisible(false);
    resetForm();
  };

  const getTypeIcon = (addrType) => {
    switch (addrType) {
      case 'HOME':
        return <Home size={16} color="#EA580C" />;
      case 'OFFICE':
      case 'WORK':
        return <Briefcase size={16} color="#2563EB" />;
      default:
        return <Building size={16} color="#7C3AED" />;
    }
  };

  const getTypeBadgeStyle = (addrType) => {
    switch (addrType) {
      case 'HOME':
        return { bg: '#FFEDD5', text: '#EA580C', label: 'Home' };
      case 'OFFICE':
      case 'WORK':
        return { bg: '#EFF6FF', text: '#2563EB', label: 'Office' };
      default:
        return { bg: '#F5F3FF', text: '#7C3AED', label: 'Other' };
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
          <Text style={styles.headerTitle}>Delivery Addresses</Text>
          <TouchableOpacity
            style={styles.headerAddBtn}
            onPress={handleOpenAddForm}
            activeOpacity={0.8}
          >
            <Plus size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.headerAddBtnText}>Add New</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Top Banner Info */}
          <View style={styles.infoBanner}>
            <MapPin size={20} color={colors.primary} style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoBannerTitle}>Manage Saved Addresses</Text>
              <Text style={styles.infoBannerSubtitle}>
                Add or edit delivery addresses for Home, Office, or Others
              </Text>
            </View>
          </View>

          {/* List of Saved Addresses */}
          {addresses.map((item) => {
            const badge = getTypeBadgeStyle(item.type);
            return (
              <View
                key={item.id}
                style={[styles.addressCard, item.isDefault && styles.addressCardDefault]}
              >
                {/* Header Row */}
                <View style={styles.cardHeaderRow}>
                  <View style={styles.cardTitleGroup}>
                    <View style={[styles.typeBadge, { backgroundColor: badge.bg }]}>
                      {getTypeIcon(item.type)}
                      <Text style={[styles.typeBadgeText, { color: badge.text }]}>
                        {badge.label}
                      </Text>
                    </View>
                    {item.isDefault && (
                      <View style={styles.defaultTag}>
                        <CheckCircle2 size={12} color="#15803D" style={{ marginRight: 3 }} />
                        <Text style={styles.defaultTagText}>Default</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.actionIconsRow}>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => handleEditAddress(item)}
                      activeOpacity={0.7}
                    >
                      <Edit3 size={16} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconActionBtn}
                      onPress={() => handleDeleteAddress(item.id)}
                      activeOpacity={0.7}
                    >
                      <Trash2 size={16} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Receiver Info */}
                <Text style={styles.receiverName}>{item.name}</Text>
                <Text style={styles.receiverPhone}>📱 {item.phone}</Text>

                {/* Full Address Text */}
                <Text style={styles.addressText}>{item.fullAddress || `${item.flatNo}, ${item.street}, ${item.city} - ${item.pincode}`}</Text>

                {/* Set As Default Action Button */}
                {!item.isDefault && (
                  <TouchableOpacity
                    style={styles.setDefaultBtn}
                    onPress={() => handleSetDefault(item.id)}
                    activeOpacity={0.8}
                  >
                    <CheckCircle2 size={14} color={colors.primary} style={{ marginRight: 6 }} />
                    <Text style={styles.setDefaultText}>Set as Default Delivery Address</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}

          {/* Add New Address Big Button at Bottom */}
          <TouchableOpacity
            style={styles.bigAddButton}
            onPress={handleOpenAddForm}
            activeOpacity={0.85}
          >
            <Plus size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.bigAddButtonText}>Add New Delivery Address</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* ------------------------------------------------------------- */}
      {/* Add / Edit Address Form Modal */}
      {/* ------------------------------------------------------------- */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.formContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Modal Header */}
          <View style={styles.formHeader}>
            <Text style={styles.formHeaderTitle}>
              {editingAddressId ? 'Edit Delivery Address' : 'Add New Delivery Address'}
            </Text>
            <TouchableOpacity
              style={styles.formCloseBtn}
              onPress={() => setIsAddModalVisible(false)}
            >
              <Text style={styles.formCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formScroll}>
            {/* Address Type Selector */}
            <Text style={styles.fieldLabel}>Save Address As</Text>
            <View style={styles.typeSelectorRow}>
              {[
                { key: 'HOME', label: 'Home', icon: Home, bg: '#FFEDD5', color: '#EA580C' },
                { key: 'OFFICE', label: 'Office', icon: Briefcase, bg: '#EFF6FF', color: '#2563EB' },
                { key: 'OTHER', label: 'Other', icon: Building, bg: '#F5F3FF', color: '#7C3AED' },
              ].map((t) => {
                const isSelected = type === t.key;
                const IconComponent = t.icon;
                return (
                  <TouchableOpacity
                    key={t.key}
                    style={[
                      styles.typeOptionPill,
                      isSelected && styles.typeOptionPillSelected,
                    ]}
                    onPress={() => setType(t.key)}
                    activeOpacity={0.8}
                  >
                    <IconComponent
                      size={16}
                      color={isSelected ? '#FFFFFF' : t.color}
                      style={{ marginRight: 6 }}
                    />
                    <Text
                      style={[
                        styles.typeOptionText,
                        isSelected && styles.typeOptionTextSelected,
                      ]}
                    >
                      {t.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Receiver Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Receiver Name</Text>
              <View style={[styles.fieldInputWrapper, formErrors.name && styles.fieldInputError]}>
                <User size={18} color={colors.textSecondary} style={{ marginRight: 10 }} />
                <TextInput
                  style={styles.fieldTextInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="e.g. Supain Nandy"
                  placeholderTextColor={colors.textPlaceholder}
                />
              </View>
              {formErrors.name && <Text style={styles.errorText}>{formErrors.name}</Text>}
            </View>

            {/* Mobile Phone */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>10-digit Phone Number</Text>
              <View style={[styles.fieldInputWrapper, formErrors.phone && styles.fieldInputError]}>
                <Phone size={18} color={colors.textSecondary} style={{ marginRight: 10 }} />
                <TextInput
                  style={styles.fieldTextInput}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+91 98765 43210"
                  placeholderTextColor={colors.textPlaceholder}
                  keyboardType="phone-pad"
                />
              </View>
              {formErrors.phone && <Text style={styles.errorText}>{formErrors.phone}</Text>}
            </View>

            {/* House / Flat No */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Flat, House No., Building Name</Text>
              <View style={[styles.fieldInputWrapper, formErrors.flatNo && styles.fieldInputError]}>
                <MapPin size={18} color={colors.textSecondary} style={{ marginRight: 10 }} />
                <TextInput
                  style={styles.fieldTextInput}
                  value={flatNo}
                  onChangeText={setFlatNo}
                  placeholder="Flat 402, Green Valley Residency"
                  placeholderTextColor={colors.textPlaceholder}
                />
              </View>
              {formErrors.flatNo && <Text style={styles.errorText}>{formErrors.flatNo}</Text>}
            </View>

            {/* Street / Area */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Street, Area, Colony, Landmark</Text>
              <View style={[styles.fieldInputWrapper, formErrors.street && styles.fieldInputError]}>
                <MapPin size={18} color={colors.textSecondary} style={{ marginRight: 10 }} />
                <TextInput
                  style={styles.fieldTextInput}
                  value={street}
                  onChangeText={setStreet}
                  placeholder="MG Road, Indiranagar"
                  placeholderTextColor={colors.textPlaceholder}
                />
              </View>
              {formErrors.street && <Text style={styles.errorText}>{formErrors.street}</Text>}
            </View>

            {/* City & Pincode Grid */}
            <View style={styles.fieldRow}>
              <View style={[styles.fieldGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.fieldLabel}>City / District</Text>
                <View style={[styles.fieldInputWrapper, formErrors.city && styles.fieldInputError]}>
                  <TextInput
                    style={styles.fieldTextInput}
                    value={city}
                    onChangeText={setCity}
                    placeholder="Bengaluru"
                    placeholderTextColor={colors.textPlaceholder}
                  />
                </View>
                {formErrors.city && <Text style={styles.errorText}>{formErrors.city}</Text>}
              </View>

              <View style={[styles.fieldGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.fieldLabel}>Pincode</Text>
                <View style={[styles.fieldInputWrapper, formErrors.pincode && styles.fieldInputError]}>
                  <TextInput
                    style={styles.fieldTextInput}
                    value={pincode}
                    onChangeText={setPincode}
                    placeholder="560038"
                    placeholderTextColor={colors.textPlaceholder}
                    keyboardType="number-pad"
                  />
                </View>
                {formErrors.pincode && <Text style={styles.errorText}>{formErrors.pincode}</Text>}
              </View>
            </View>

            {/* State */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>State</Text>
              <View style={styles.fieldInputWrapper}>
                <TextInput
                  style={styles.fieldTextInput}
                  value={stateName}
                  onChangeText={setStateName}
                  placeholder="Karnataka"
                  placeholderTextColor={colors.textPlaceholder}
                />
              </View>
            </View>

            {/* Set Default Toggle */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setIsDefault(!isDefault)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkboxSquare, isDefault && styles.checkboxSquareChecked]}>
                {isDefault && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
              </View>
              <Text style={styles.checkboxLabel}>Set as default delivery address</Text>
            </TouchableOpacity>

            {/* Save Address Button */}
            <TouchableOpacity
              style={styles.saveAddressBtn}
              onPress={handleSaveAddress}
              activeOpacity={0.85}
            >
              <Text style={styles.saveAddressBtnText}>
                {editingAddressId ? 'Update Address' : 'Save Address'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
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
  headerAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  headerAddBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1EB',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFDCD0',
  },
  infoBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  infoBannerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  addressCardDefault: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 4,
  },
  defaultTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  defaultTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  actionIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiverName: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  receiverPhone: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
    marginBottom: 12,
  },
  setDefaultBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  setDefaultText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  bigAddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 14,
    marginTop: 8,
  },
  bigAddButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* Form Modal Styles */
  formContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  formHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  formHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  formCloseBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  formCloseText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
  },
  formScroll: {
    padding: 16,
    paddingBottom: 40,
  },
  typeSelectorRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  typeOptionPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 10,
    borderRadius: 12,
  },
  typeOptionPillSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeOptionText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  typeOptionTextSelected: {
    color: '#FFFFFF',
  },
  fieldGroup: {
    marginBottom: 14,
  },
  fieldRow: {
    flexDirection: 'row',
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  fieldInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
  },
  fieldInputError: {
    borderColor: colors.error,
    backgroundColor: '#FEF2F2',
  },
  fieldTextInput: {
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  checkboxSquare: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxSquareChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  saveAddressBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  saveAddressBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
