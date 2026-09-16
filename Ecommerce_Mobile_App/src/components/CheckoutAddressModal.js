import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  Plus,
  Phone,
  Home,
  Briefcase,
  User,
  CreditCard,
  Truck,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Edit2,
  Building,
} from 'lucide-react-native';
import { colors } from '../theme/colors';
import { storedAddressesData } from '../data/mockData';

export default function CheckoutAddressModal({
  visible = false,
  onClose,
  totalAmount = 0,
  cartItems = [],
  onOrderPlaced,
}) {
  const [step, setStep] = useState(1); // 1: Select Address, 2: Payment, 3: Success
  const [addresses, setAddresses] = useState(storedAddressesData);
  const [selectedAddressId, setSelectedAddressId] = useState('addr-1');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');

  // Form State for New Address
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFlat, setNewFlat] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPincode, setNewPincode] = useState('');
  const [newType, setNewType] = useState('HOME');

  const [countdown, setCountdown] = useState(3);

  React.useEffect(() => {
    let timer;
    if (step === 3) {
      setCountdown(3);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleCompleteOrderAndReturnHome();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [step]);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const handleAddNewAddress = () => {
    if (!newName.trim() || !newPhone.trim() || !newFlat.trim() || !newStreet.trim() || !newCity.trim() || !newPincode.trim()) {
      const msg = 'Please fill in all address details.';
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Missing Details', msg);
      return;
    }

    const newAddrObj = {
      id: `addr-${Date.now()}`,
      name: newName.trim(),
      phone: newPhone.trim(),
      type: newType,
      isDefault: false,
      flatNo: newFlat.trim(),
      street: newStreet.trim(),
      city: newCity.trim(),
      state: newState.trim() || 'Karnataka',
      pincode: newPincode.trim(),
      fullAddress: `${newFlat.trim()}, ${newStreet.trim()}, ${newCity.trim()}, ${newState.trim() || 'Karnataka'} - ${newPincode.trim()}`,
    };

    setAddresses([newAddrObj, ...addresses]);
    setSelectedAddressId(newAddrObj.id);
    setShowAddForm(false);

    // Reset form
    setNewName('');
    setNewPhone('');
    setNewFlat('');
    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewPincode('');

    const msg = 'New delivery address saved & selected successfully!';
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Address Saved 🎉', msg);
  };

  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      const msg = 'Please select a delivery address to proceed.';
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Select Address', msg);
      return;
    }
    setStep(2);
  };

  const handleFinalPlaceOrderWithMethod = (method) => {
    const activeMethod = method || selectedPaymentMethod;
    setSelectedPaymentMethod(activeMethod);
    setStep(3);
  };

  const handleCompleteOrderAndReturnHome = () => {
    const orderObj = {
      address: selectedAddress,
      paymentMethod: selectedPaymentMethod,
      totalAmount,
      cartItems,
    };
    setStep(1);
    setShowAddForm(false);
    setTimeout(() => {
      if (onOrderPlaced) {
        onOrderPlaced(orderObj);
      }
      if (onClose) {
        onClose();
      }
    }, 0);
  };

  const handleSelectPaymentMethod = (methodId) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleCloseAll = () => {
    setStep(1);
    setShowAddForm(false);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={handleCloseAll}>
      <View style={styles.container}>
        {/* Header Bar */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (step === 2) setStep(1);
              else handleCloseAll();
            }}
            activeOpacity={0.7}
          >
            <ArrowLeft size={22} color={colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>
              {step === 1 ? 'Select Delivery Address' : step === 2 ? 'Payment Method' : 'Order Success'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {step === 1 ? 'Step 1 of 2' : step === 2 ? 'Step 2 of 2' : 'Completed'}
            </Text>
          </View>

          <View style={{ width: 36 }} />
        </View>

        {/* Step Progress Tracker */}
        <View style={styles.stepTrackerRow}>
          <View style={[styles.stepDot, step >= 1 && styles.stepDotActive]}>
            <MapPin size={14} color={step >= 1 ? '#FFFFFF' : '#9CA3AF'} />
          </View>
          <View style={[styles.stepLine, step >= 2 && styles.stepLineActive]} />

          <View style={[styles.stepDot, step >= 2 && styles.stepDotActive]}>
            <CreditCard size={14} color={step >= 2 ? '#FFFFFF' : '#9CA3AF'} />
          </View>
          <View style={[styles.stepLine, step >= 3 && styles.stepLineActive]} />

          <View style={[styles.stepDot, step === 3 && styles.stepDotActive]}>
            <CheckCircle2 size={14} color={step === 3 ? '#FFFFFF' : '#9CA3AF'} />
          </View>
        </View>

        {/* STEP 1: SELECT STORED DELIVERY ADDRESS */}
        {step === 1 && (
          <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <View style={styles.sectionHeaderRow}>
                <View>
                  <Text style={styles.sectionHeading}>Saved Delivery Addresses</Text>
                  <Text style={styles.sectionSubheading}>
                    Tap any address to select where you want your order delivered
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.addBtnHeader}
                  onPress={() => setShowAddForm(!showAddForm)}
                  activeOpacity={0.8}
                >
                  <Plus size={16} color={colors.primary} />
                  <Text style={styles.addBtnHeaderText}>Add New</Text>
                </TouchableOpacity>
              </View>

              {/* Add New Address Form (Expandable) */}
              {showAddForm && (
                <View style={styles.addFormCard}>
                  <Text style={styles.formTitle}>Add New Delivery Address</Text>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Full Name</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. John Doe"
                      value={newName}
                      onChangeText={setNewName}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="+91 98765 43210"
                      keyboardType="phone-pad"
                      value={newPhone}
                      onChangeText={setNewPhone}
                    />
                  </View>

                  <View style={styles.inputRow}>
                    <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                      <Text style={styles.inputLabel}>Flat / House / Bldg</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="Flat 101, Block A"
                        value={newFlat}
                        onChangeText={setNewFlat}
                      />
                    </View>
                    <View style={[styles.inputGroup, { flex: 1 }]}>
                      <Text style={styles.inputLabel}>Street / Area</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="Main Road, Koramangala"
                        value={newStreet}
                        onChangeText={setNewStreet}
                      />
                    </View>
                  </View>

                  <View style={styles.inputRow}>
                    <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                      <Text style={styles.inputLabel}>City</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="Bengaluru"
                        value={newCity}
                        onChangeText={setNewCity}
                      />
                    </View>
                    <View style={[styles.inputGroup, { flex: 1 }]}>
                      <Text style={styles.inputLabel}>Pincode</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="560034"
                        keyboardType="number-pad"
                        value={newPincode}
                        onChangeText={setNewPincode}
                      />
                    </View>
                  </View>

                  {/* Address Type Pill Selection */}
                  <Text style={styles.inputLabel}>Save Address As</Text>
                  <View style={styles.typePillsRow}>
                    {['HOME', 'WORK', 'OTHER'].map((type) => (
                      <TouchableOpacity
                        key={type}
                        style={[styles.typePill, newType === type && styles.typePillActive]}
                        onPress={() => setNewType(type)}
                        activeOpacity={0.8}
                      >
                        <Text style={[styles.typePillText, newType === type && styles.typePillTextActive]}>
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Action Buttons for Form */}
                  <View style={styles.formBtnRow}>
                    <TouchableOpacity
                      style={styles.cancelFormBtn}
                      onPress={() => setShowAddForm(false)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.cancelFormBtnText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.saveFormBtn}
                      onPress={handleAddNewAddress}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.saveFormBtnText}>Save & Select Address</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* List of Stored Addresses */}
              {addresses.map((item) => {
                const isSelected = item.id === selectedAddressId;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.addressCard, isSelected && styles.addressCardSelected]}
                    onPress={() => setSelectedAddressId(item.id)}
                    activeOpacity={0.9}
                  >
                    <View style={styles.addressCardHeader}>
                      <View style={styles.tagGroup}>
                        <View
                          style={[
                            styles.typeBadge,
                            item.type === 'HOME'
                              ? styles.badgeHome
                              : item.type === 'WORK'
                              ? styles.badgeWork
                              : styles.badgeOther,
                          ]}
                        >
                          {item.type === 'HOME' ? (
                            <Home size={11} color="#1E40AF" style={{ marginRight: 3 }} />
                          ) : item.type === 'WORK' ? (
                            <Briefcase size={11} color="#6B21A8" style={{ marginRight: 3 }} />
                          ) : (
                            <MapPin size={11} color="#9A3412" style={{ marginRight: 3 }} />
                          )}
                          <Text
                            style={[
                              styles.typeBadgeText,
                              item.type === 'HOME'
                                ? { color: '#1E40AF' }
                                : item.type === 'WORK'
                                ? { color: '#6B21A8' }
                                : { color: '#9A3412' },
                            ]}
                          >
                            {item.type}
                          </Text>
                        </View>

                        {item.isDefault && (
                          <View style={styles.defaultBadge}>
                            <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                          </View>
                        )}
                      </View>

                      {/* Selection Radio Indicator */}
                      <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                        {isSelected && <CheckCircle2 size={20} color={colors.primary} />}
                      </View>
                    </View>

                    {/* Name & Phone */}
                    <Text style={styles.recipientName}>{item.name}</Text>
                    <View style={styles.phoneRow}>
                      <Phone size={13} color={colors.textSecondary} style={{ marginRight: 4 }} />
                      <Text style={styles.recipientPhone}>{item.phone}</Text>
                    </View>

                    {/* Full Address Text */}
                    <Text style={styles.fullAddressText}>{item.fullAddress}</Text>

                    {/* Card Footer Status */}
                    {isSelected && (
                      <View style={styles.selectedFooterBanner}>
                        <Sparkles size={13} color={colors.primary} />
                        <Text style={styles.selectedFooterText}>
                          Selected for Delivery
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Sticky Bottom Bar for Step 1 */}
            <View style={styles.bottomBar}>
              <View style={styles.bottomBarTextWrap}>
                <Text style={styles.bottomBarLabel}>Deliver to:</Text>
                <Text style={styles.bottomBarAddressName} numberOfLines={1}>
                  {selectedAddress ? `${selectedAddress.type} (${selectedAddress.city})` : 'Select Address'}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.proceedBtn}
                onPress={handleProceedToPayment}
                activeOpacity={0.85}
              >
                <Text style={styles.proceedBtnText}>Deliver to this Address</Text>
                <ChevronRight size={18} color="#FFFFFF" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* STEP 2: PAYMENT METHOD & REVIEW ORDER */}
        {step === 2 && (
          <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              {/* Selected Address Recap Card */}
              <View style={styles.recapCard}>
                <View style={styles.recapHeader}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MapPin size={18} color={colors.primary} style={{ marginRight: 6 }} />
                    <Text style={styles.recapTitle}>Delivery Address</Text>
                  </View>
                  <TouchableOpacity onPress={() => setStep(1)} activeOpacity={0.7}>
                    <Text style={styles.changeBtnText}>Change</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.recapName}>{selectedAddress?.name}</Text>
                <Text style={styles.recapAddress}>{selectedAddress?.fullAddress}</Text>
                <Text style={styles.recapPhone}>Phone: {selectedAddress?.phone}</Text>
              </View>

              {/* Payment Methods Section */}
              <Text style={styles.sectionHeading}>Select Payment Method</Text>

              {[
                { id: 'upi', title: 'UPI / GPay / PhonePe', desc: 'Instant Google Pay, PhonePe, Paytm', icon: Sparkles },
                { id: 'card', title: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', icon: CreditCard },
                { id: 'cod', title: 'Cash on Delivery (COD)', desc: 'Pay when package arrives at doorstep', icon: Truck },
              ].map((method) => {
                const isMethodSelected = selectedPaymentMethod === method.id;
                const IconComp = method.icon;
                return (
                  <TouchableOpacity
                    key={method.id}
                    style={[styles.paymentCard, isMethodSelected && styles.paymentCardSelected]}
                    onPress={() => handleSelectPaymentMethod(method.id)}
                    activeOpacity={0.85}
                  >
                    <View style={styles.paymentCardLeft}>
                      <View style={styles.paymentIconBg}>
                        <IconComp size={20} color={colors.primary} />
                      </View>
                      <View style={{ marginLeft: 12 }}>
                        <Text style={styles.paymentTitle}>{method.title}</Text>
                        <Text style={styles.paymentDesc}>{method.desc}</Text>
                      </View>
                    </View>

                    <View style={[styles.radioCircle, isMethodSelected && styles.radioCircleSelected]}>
                      {isMethodSelected && <CheckCircle2 size={20} color={colors.primary} />}
                    </View>
                  </TouchableOpacity>
                );
              })}

              {/* Amount Summary Box */}
              <View style={styles.recapCard}>
                <Text style={styles.recapTitle}>Order Total</Text>
                <View style={styles.amountRow}>
                  <Text style={styles.amountLabel}>Total Payable Amount</Text>
                  <Text style={styles.amountValue}>₹{totalAmount.toLocaleString('en-IN')}</Text>
                </View>
              </View>

              <View style={styles.securityBanner}>
                <ShieldCheck size={18} color="#059669" style={{ marginRight: 6 }} />
                <Text style={styles.securityText}>100% Encrypted & Safe Payments</Text>
              </View>
            </ScrollView>

            {/* Bottom Bar for Step 2 */}
            <View style={styles.bottomBar}>
              <View style={styles.bottomBarTextWrap}>
                <Text style={styles.bottomBarLabel}>Total Amount</Text>
                <Text style={styles.bottomBarPrice}>₹{totalAmount.toLocaleString('en-IN')}</Text>
              </View>

              <TouchableOpacity
                style={styles.proceedBtn}
                onPress={() => handleFinalPlaceOrderWithMethod()}
                activeOpacity={0.85}
              >
                <Text style={styles.proceedBtnText}>
                  {selectedPaymentMethod === 'cod' ? 'Place Order' : 'Pay & Place Order'}
                </Text>
                <ChevronRight size={18} color="#FFFFFF" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* STEP 3: ORDER PLACED SUCCESS */}
        {step === 3 && (
          <View style={styles.successContainer}>
            <View style={styles.successBadgeCircle}>
              <CheckCircle2 size={54} color="#10B981" />
            </View>

            <Text style={styles.successHeading}>
              {selectedPaymentMethod === 'cod' ? 'Order Placed Successfully! 🎉' : 'Order Placed Successfully! 🎉'}
            </Text>

            {/* Payment Method Badge */}
            <View style={styles.codTagBadge}>
              <Truck size={14} color={colors.primary} style={{ marginRight: 4 }} />
              <Text style={styles.codTagBadgeText}>
                {selectedPaymentMethod === 'cod' ? '💵 Cash on Delivery (COD) Confirmed' : '💳 Payment Received'}
              </Text>
            </View>

            <Text style={styles.successSub}>
              {selectedPaymentMethod === 'cod'
                ? `Your Cash on Delivery order of ₹${totalAmount.toLocaleString('en-IN')} has been placed successfully! Please pay cash upon package delivery.`
                : 'Thank you for shopping with ShopEase! Your order is currently being prepared for shipment.'}
            </Text>

            <View style={styles.orderRecapBox}>
              <Text style={styles.orderIdText}>Order ID: #ORD-2026-9842</Text>
              <Text style={styles.deliverToLabel}>Delivering to:</Text>
              <Text style={styles.deliverToText}>{selectedAddress?.fullAddress}</Text>
              <Text style={styles.etaText}>Estimated Delivery: 2-3 Business Days</Text>
            </View>

            {/* Auto Redirect Countdown Banner */}
            <View style={styles.autoRedirectBanner}>
              <Sparkles size={14} color={colors.primary} style={{ marginRight: 6 }} />
              <Text style={styles.autoRedirectText}>
                Automatically returning to Home Page in <Text style={styles.boldTimer}>{countdown}s</Text>...
              </Text>
            </View>

            <TouchableOpacity
              style={styles.doneBtn}
              onPress={handleCompleteOrderAndReturnHome}
              activeOpacity={0.85}
            >
              <Text style={styles.doneBtnText}>Go to Home Page Now</Text>
            </TouchableOpacity>
          </View>
        )}
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
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleWrap: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
  },
  headerSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  stepTrackerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepDotActive: {
    backgroundColor: colors.primary,
  },
  stepLine: {
    width: 50,
    height: 3,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 8,
    borderRadius: 2,
  },
  stepLineActive: {
    backgroundColor: colors.primary,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 110,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  sectionSubheading: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  addBtnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addBtnHeaderText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    marginLeft: 3,
  },
  addFormCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    elevation: 3,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
  },
  inputLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  formInput: {
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    fontSize: 12.5,
    color: '#1E293B',
  },
  typePillsRow: {
    flexDirection: 'row',
    marginBottom: 14,
    marginTop: 4,
  },
  typePill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  typePillActive: {
    backgroundColor: colors.primary,
  },
  typePillText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  typePillTextActive: {
    color: '#FFFFFF',
  },
  formBtnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelFormBtn: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  cancelFormBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  saveFormBtn: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  saveFormBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  addressCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#FFFBF9',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  addressCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 6,
  },
  badgeHome: {
    backgroundColor: '#EFF6FF',
  },
  badgeWork: {
    backgroundColor: '#F3E8FF',
  },
  badgeOther: {
    backgroundColor: '#FFF7ED',
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  defaultBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  defaultBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#047857',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: colors.primary,
    borderWidth: 0,
  },
  recipientName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 6,
  },
  recipientPhone: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  fullAddressText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
    fontWeight: '500',
  },
  selectedFooterBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#FFEDD5',
  },
  selectedFooterText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: colors.primary,
    marginLeft: 4,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    elevation: 10,
  },
  bottomBarTextWrap: {
    flex: 1,
    marginRight: 10,
  },
  bottomBarLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  bottomBarAddressName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
  },
  bottomBarPrice: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
  },
  proceedBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  proceedBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
  },
  recapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  recapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  recapTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  changeBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  recapName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  recapAddress: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  recapPhone: {
    fontSize: 11.5,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  paymentCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#FFFBF9',
  },
  paymentCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#1E293B',
  },
  paymentDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  amountLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  securityBanner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  securityText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  successBadgeCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#A7F3D0',
  },
  successHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
  },
  codTagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  codTagBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  successSub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 19,
  },
  orderRecapBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  orderIdText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 6,
  },
  deliverToLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  deliverToText: {
    fontSize: 12.5,
    color: '#334155',
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 8,
  },
  etaText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  autoRedirectBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  autoRedirectText: {
    fontSize: 12,
    color: '#C2410C',
    fontWeight: '600',
  },
  boldTimer: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.primary,
  },
  doneBtn: {
    backgroundColor: colors.primary,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
