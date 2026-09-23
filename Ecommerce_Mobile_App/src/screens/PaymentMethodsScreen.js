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
  CreditCard,
  Plus,
  Trash2,
  CheckCircle2,
  Wallet,
  Smartphone,
  Banknote,
  ShieldCheck,
  Check,
  Sparkles,
} from 'lucide-react-native';
import { colors } from '../theme/colors';
import { useActionLock } from '../hooks/useActionLock';

const INITIAL_CARDS = [
  {
    id: 'card-1',
    type: 'card',
    brand: 'VISA',
    last4: '4242',
    name: 'Supain Nandy',
    expiry: '08/28',
    isDefault: true,
    bg: '#1E293B',
  },
  {
    id: 'card-2',
    type: 'card',
    brand: 'Mastercard',
    last4: '8899',
    name: 'Supain Nandy',
    expiry: '11/27',
    isDefault: false,
    bg: '#334155',
  },
];

const INITIAL_UPI = [
  { id: 'upi-1', type: 'upi', vpa: 'supain.nandy@okicici', provider: 'Google Pay', isDefault: true },
  { id: 'upi-2', type: 'upi', vpa: 'supain@ybl', provider: 'PhonePe', isDefault: false },
];

export default function PaymentMethodsScreen({ visible = false, onClose }) {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [upiList, setUpiList] = useState(INITIAL_UPI);

  // Add Form Modal State
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [addMode, setAddMode] = useState('card'); // 'card' | 'upi'
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiVpa, setUpiVpa] = useState('');
  const [formError, setFormError] = useState('');
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

  const handleOpenAddModal = (mode = 'card') => {
    setAddMode(mode);
    setCardNumber('');
    setCardName('');
    setCardExpiry('');
    setCardCvv('');
    setUpiVpa('');
    setFormError('');
    setIsAddModalVisible(true);
  };

  const handleDeleteCard = (id) => {
    const confirmDelete = () => {
      setCards((prev) => prev.filter((c) => c.id !== id));
      displayToast('🗑️ Card removed from saved payments');
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Delete this card from saved payment methods?')) {
        confirmDelete();
      }
    } else {
      Alert.alert(
        'Delete Card',
        'Are you sure you want to remove this card from your saved payment methods?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', style: 'destructive', onPress: confirmDelete },
        ]
      );
    }
  };

  const handleDeleteUpi = (id) => {
    setUpiList((prev) => prev.filter((u) => u.id !== id));
    displayToast('🗑️ UPI ID removed');
  };

  const handleSetDefaultCard = (id) => {
    setCards((prev) =>
      prev.map((c) => ({
        ...c,
        isDefault: c.id === id,
      }))
    );
    displayToast('⭐ Default card updated');
  };

  const handleSavePaymentMethod = () => {
    setFormError('');

    if (addMode === 'card') {
      if (!cardNumber || cardNumber.trim().length < 12) {
        setFormError('Enter a valid 16-digit card number');
        return;
      }
      if (!cardName.trim()) {
        setFormError('Name on card is required');
        return;
      }
      if (!cardExpiry.trim() || !cardExpiry.includes('/')) {
        setFormError('Enter expiry date as MM/YY');
        return;
      }

      executeAction(() => {
        const last4 = cardNumber.trim().slice(-4) || '1234';
        const newCard = {
          id: `card-${Date.now()}`,
          type: 'card',
          brand: cardNumber.startsWith('4') ? 'VISA' : 'Mastercard',
          last4,
          name: cardName.trim(),
          expiry: cardExpiry.trim(),
          isDefault: cards.length === 0,
          bg: '#1E293B',
        };
        setCards([newCard, ...cards]);
        setIsAddModalVisible(false);
        displayToast('💳 Card added successfully!');
      });
    } else {
      if (!upiVpa.trim() || !upiVpa.includes('@')) {
        setFormError('Enter a valid UPI ID (e.g. name@upi)');
        return;
      }

      executeAction(() => {
        const newUpi = {
          id: `upi-${Date.now()}`,
          type: 'upi',
          vpa: upiVpa.trim(),
          provider: upiVpa.includes('ok') ? 'Google Pay' : 'BHIM UPI',
          isDefault: upiList.length === 0,
        };
        setUpiList([newUpi, ...upiList]);
        setIsAddModalVisible(false);
        displayToast('📱 UPI ID added successfully!');
      });
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
          <Text style={styles.headerTitle}>Payment Methods</Text>
          <TouchableOpacity
            style={styles.headerAddBtn}
            onPress={() => handleOpenAddModal('card')}
            activeOpacity={0.8}
          >
            <Plus size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.headerAddBtnText}>Add New</Text>
          </TouchableOpacity>
        </View>

        {/* Toast Banner */}
        {showToast && (
          <View style={styles.toastBanner}>
            <Check size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* ShopEase Wallet Banner */}
          <View style={styles.walletCard}>
            <View style={styles.walletHeaderRow}>
              <View style={styles.walletIconBg}>
                <Wallet size={22} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.walletTitle}>ShopEase Wallet</Text>
                <Text style={styles.walletSubtitle}>Instant Refunds & Cashback</Text>
              </View>
              <Text style={styles.walletBalance}>₹1,250.00</Text>
            </View>
          </View>

          {/* Saved Credit / Debit Cards */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Saved Cards</Text>
            <TouchableOpacity onPress={() => handleOpenAddModal('card')}>
              <Text style={styles.addLinkText}>+ Add Card</Text>
            </TouchableOpacity>
          </View>

          {cards.map((card) => (
            <View key={card.id} style={[styles.creditCardBox, { backgroundColor: card.bg }]}>
              <View style={styles.cardBoxHeader}>
                <Text style={styles.cardBrandText}>{card.brand}</Text>
                {card.isDefault ? (
                  <View style={styles.defaultBadge}>
                    <CheckCircle2 size={12} color="#15803D" style={{ marginRight: 3 }} />
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => handleSetDefaultCard(card.id)}>
                    <Text style={styles.setDefaultText}>Set Default</Text>
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.cardNumberText}>•••• •••• •••• {card.last4}</Text>

              <View style={styles.cardFooterRow}>
                <View>
                  <Text style={styles.cardLabel}>CARDHOLDER</Text>
                  <Text style={styles.cardValue}>{card.name}</Text>
                </View>
                <View>
                  <Text style={styles.cardLabel}>EXPIRES</Text>
                  <Text style={styles.cardValue}>{card.expiry}</Text>
                </View>
                <TouchableOpacity
                  style={styles.cardDeleteBtn}
                  onPress={() => handleDeleteCard(card.id)}
                >
                  <Trash2 size={16} color="#F87171" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Saved UPI IDs */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Saved UPI IDs</Text>
            <TouchableOpacity onPress={() => handleOpenAddModal('upi')}>
              <Text style={styles.addLinkText}>+ Add UPI</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.upiListCard}>
            {upiList.map((upi, idx) => (
              <React.Fragment key={upi.id}>
                {idx > 0 && <View style={styles.upiDivider} />}
                <View style={styles.upiItemRow}>
                  <View style={[styles.upiIconBg, { backgroundColor: '#EFF6FF' }]}>
                    <Smartphone size={20} color="#2563EB" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.upiVpaText}>{upi.vpa}</Text>
                    <Text style={styles.upiProviderText}>{upi.provider}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.upiDeleteBtn}
                    onPress={() => handleDeleteUpi(upi.id)}
                  >
                    <Trash2 size={16} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            ))}
          </View>

          {/* Cash on Delivery (COD) Info Card */}
          <Text style={styles.sectionTitle}>Pay on Delivery</Text>
          <View style={styles.codCard}>
            <View style={[styles.upiIconBg, { backgroundColor: '#DCFCE7' }]}>
              <Banknote size={20} color="#16A34A" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.codTitle}>Cash / Pay on Delivery (COD)</Text>
              <Text style={styles.codDesc}>Pay via Cash or QR code when order arrives at your doorstep</Text>
            </View>
            <CheckCircle2 size={20} color="#16A34A" />
          </View>
        </ScrollView>

        {/* Add Payment Method Modal */}
        <Modal
          visible={isAddModalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setIsAddModalVisible(false)}
        >
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {addMode === 'card' ? 'Add Credit / Debit Card' : 'Add UPI ID'}
              </Text>
              <TouchableOpacity onPress={() => setIsAddModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
              {/* Type Switcher Pills */}
              <View style={styles.typeRow}>
                <TouchableOpacity
                  style={[styles.typePill, addMode === 'card' && styles.typePillSelected]}
                  onPress={() => {
                    setAddMode('card');
                    setFormError('');
                  }}
                >
                  <CreditCard size={16} color={addMode === 'card' ? '#FFFFFF' : colors.textPrimary} style={{ marginRight: 6 }} />
                  <Text style={[styles.typePillText, addMode === 'card' && styles.typePillTextSelected]}>Card</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.typePill, addMode === 'upi' && styles.typePillSelected]}
                  onPress={() => {
                    setAddMode('upi');
                    setFormError('');
                  }}
                >
                  <Smartphone size={16} color={addMode === 'upi' ? '#FFFFFF' : colors.textPrimary} style={{ marginRight: 6 }} />
                  <Text style={[styles.typePillText, addMode === 'upi' && styles.typePillTextSelected]}>UPI</Text>
                </TouchableOpacity>
              </View>

              {formError ? (
                <View style={styles.errorAlert}>
                  <Text style={styles.errorAlertText}>{formError}</Text>
                </View>
              ) : null}

              {addMode === 'card' ? (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Card Number</Text>
                    <View style={styles.formInputWrapper}>
                      <CreditCard size={18} color={colors.textSecondary} style={{ marginRight: 10 }} />
                      <TextInput
                        style={styles.formInput}
                        value={cardNumber}
                        onChangeText={setCardNumber}
                        placeholder="1234 5678 9012 3456"
                        placeholderTextColor={colors.textPlaceholder}
                        keyboardType="number-pad"
                        maxLength={19}
                      />
                    </View>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Name on Card</Text>
                    <View style={styles.formInputWrapper}>
                      <TextInput
                        style={styles.formInput}
                        value={cardName}
                        onChangeText={setCardName}
                        placeholder="e.g. Supain Nandy"
                        placeholderTextColor={colors.textPlaceholder}
                      />
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View style={[styles.formGroup, { flex: 1 }]}>
                      <Text style={styles.formLabel}>Expiry (MM/YY)</Text>
                      <View style={styles.formInputWrapper}>
                        <TextInput
                          style={styles.formInput}
                          value={cardExpiry}
                          onChangeText={setCardExpiry}
                          placeholder="08/28"
                          placeholderTextColor={colors.textPlaceholder}
                        />
                      </View>
                    </View>

                    <View style={[styles.formGroup, { flex: 1 }]}>
                      <Text style={styles.formLabel}>CVV</Text>
                      <View style={styles.formInputWrapper}>
                        <TextInput
                          style={styles.formInput}
                          value={cardCvv}
                          onChangeText={setCardCvv}
                          placeholder="123"
                          placeholderTextColor={colors.textPlaceholder}
                          keyboardType="number-pad"
                          secureTextEntry
                          maxLength={4}
                        />
                      </View>
                    </View>
                  </View>
                </>
              ) : (
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Virtual Payment Address (UPI ID)</Text>
                  <View style={styles.formInputWrapper}>
                    <Smartphone size={18} color={colors.textSecondary} style={{ marginRight: 10 }} />
                    <TextInput
                      style={styles.formInput}
                      value={upiVpa}
                      onChangeText={setUpiVpa}
                      placeholder="e.g. username@okicici"
                      placeholderTextColor={colors.textPlaceholder}
                      autoCapitalize="none"
                    />
                  </View>
                </View>
              )}

              <TouchableOpacity
                style={[styles.saveBtn, isProcessing && { opacity: 0.7 }]}
                onPress={handleSavePaymentMethod}
                disabled={isProcessing}
                activeOpacity={0.85}
              >
                <Text style={styles.saveBtnText}>Save Payment Method</Text>
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
  walletCard: {
    backgroundColor: '#FFF1EB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFDCD0',
  },
  walletHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  walletTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  walletSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  walletBalance: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primaryDark,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginLeft: 4,
  },
  addLinkText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  creditCardBox: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  cardBoxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardBrandText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  defaultBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  setDefaultText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  cardNumberText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 20,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardLabel: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '700',
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  cardDeleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upiListCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  upiItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  upiIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  upiVpaText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  upiProviderText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  upiDeleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upiDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  codCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  codTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  codDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },

  /* Modal Styles */
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
  typeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  typePill: {
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
  typePillSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typePillText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  typePillTextSelected: {
    color: '#FFFFFF',
  },
  errorAlert: {
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
  saveBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
