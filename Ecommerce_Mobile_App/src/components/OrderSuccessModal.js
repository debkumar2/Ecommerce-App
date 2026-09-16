import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { CheckCircle2, Truck, Sparkles, MapPin, Phone, ArrowRight } from 'lucide-react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function OrderSuccessModal({
  visible = false,
  onClose,
  orderData = null,
  onGoToHome,
}) {
  const [countdown, setCountdown] = useState(4);
  const scaleAnim = React.useRef(new Animated.Value(0.85)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer;
    if (visible) {
      setCountdown(4);
      scaleAnim.setValue(0.85);
      opacityAnim.setValue(0);

      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();

      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            if (onGoToHome) onGoToHome();
            else if (onClose) onClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [visible]);

  if (!visible) return null;

  const totalAmount = orderData?.totalAmount || 0;
  const address = orderData?.address || null;
  const isCod = orderData?.paymentMethod === 'cod' || !orderData?.paymentMethod;

  const handleDone = () => {
    if (onGoToHome) onGoToHome();
    else if (onClose) onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleDone}
    >
      <TouchableWithoutFeedback onPress={handleDone}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <Animated.View
              style={[
                styles.modalCard,
                {
                  opacity: opacityAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              {/* Success Icon Circle */}
              <View style={styles.iconCircle}>
                <CheckCircle2 size={52} color="#10B981" />
              </View>

              {/* Success Headline */}
              <Text style={styles.title}>Order Placed Successfully! 🎉</Text>

              {/* Payment Method Badge Pill */}
              <View style={styles.paymentBadge}>
                <Truck size={14} color={colors.primary} style={{ marginRight: 5 }} />
                <Text style={styles.paymentBadgeText}>
                  {isCod ? '💵 Cash on Delivery (COD) Confirmed' : '💳 Online Payment Received'}
                </Text>
              </View>

              {/* Description */}
              <Text style={styles.description}>
                {isCod
                  ? `Your order of ₹${totalAmount.toLocaleString('en-IN')} is confirmed! Please pay cash to our delivery agent upon arrival.`
                  : `Your order of ₹${totalAmount.toLocaleString('en-IN')} is confirmed and is being prepared for shipment.`}
              </Text>

              {/* Delivery Address Box */}
              {address && (
                <View style={styles.addressBox}>
                  <View style={styles.addressHeader}>
                    <MapPin size={15} color={colors.primary} style={{ marginRight: 4 }} />
                    <Text style={styles.addressTitle}>Delivering To: {address.name}</Text>
                  </View>
                  <Text style={styles.addressText}>{address.fullAddress}</Text>
                  <View style={styles.phoneRow}>
                    <Phone size={12} color={colors.textSecondary} style={{ marginRight: 4 }} />
                    <Text style={styles.phoneText}>{address.phone}</Text>
                  </View>
                </View>
              )}

              {/* Auto Redirect Countdown Box */}
              <View style={styles.countdownBanner}>
                <Sparkles size={14} color={colors.primary} style={{ marginRight: 6 }} />
                <Text style={styles.countdownText}>
                  Automatically returning to Home Page in <Text style={styles.boldTimer}>{countdown}s</Text>
                </Text>
              </View>

              {/* Main Redirect Button */}
              <TouchableOpacity
                style={styles.homeBtn}
                onPress={handleDone}
                activeOpacity={0.85}
              >
                <Text style={styles.homeBtnText}>Go to Home Page Now</Text>
                <ArrowRight size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: Math.min(width - 32, 400),
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#A7F3D0',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  paymentBadge: {
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
  paymentBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 19,
  },
  addressBox: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    marginTop: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#1E293B',
  },
  addressText: {
    fontSize: 11.5,
    color: '#334155',
    lineHeight: 16,
    fontWeight: '500',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  phoneText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  countdownBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFEDD5',
    width: '100%',
    justifyContent: 'center',
  },
  countdownText: {
    fontSize: 12,
    color: '#C2410C',
    fontWeight: '600',
  },
  boldTimer: {
    fontSize: 13.5,
    fontWeight: '900',
    color: colors.primary,
  },
  homeBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 13,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  homeBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
