import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  Phone,
  Copy,
  Package,
  Home,
  ShieldCheck,
  XCircle,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function OrderTrackingModal({ visible, order, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const isCancelled = order.status === 'Cancelled';
  const trackingNumber = `TRK${order.orderNumber.replace(/[^0-9]/g, '')}89IN`;

  const handleCopyTracking = () => {
    setCopied(true);
    const msg = `Tracking ID copied: ${trackingNumber}`;
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Copied to Clipboard', msg);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCallSupport = () => {
    const msg = 'Connecting to ShopEase Customer Support (+1800-123-4567)...';
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Customer Support', msg);
  };

  // Determine timeline steps based on status
  let currentStep = 1; // 0: Placed, 1: Processing, 2: Shipped, 3: Out for Delivery, 4: Delivered
  if (order.status === 'Shipped') currentStep = 2;
  if (order.status === 'Delivered') currentStep = 4;
  if (isCancelled) currentStep = -1;

  const standardTimelineSteps = [
    {
      id: 1,
      title: 'Order Placed',
      subtitle: 'Order confirmed & received by seller',
      time: `${order.placedDate}, 10:30 AM`,
      completed: currentStep >= 0,
      active: currentStep === 0,
      icon: CheckCircle2,
    },
    {
      id: 2,
      title: 'Preparing for Shipment',
      subtitle: 'Item packed & quality check passed at hub',
      time: `${order.placedDate}, 02:15 PM`,
      completed: currentStep >= 1,
      active: currentStep === 1,
      icon: Clock,
    },
    {
      id: 3,
      title: 'In Transit / Shipped',
      subtitle: 'Package on the way to nearest delivery hub',
      time: currentStep >= 2 ? 'Expected in 24 hrs' : 'Pending dispatch',
      completed: currentStep >= 2,
      active: currentStep === 2,
      icon: Truck,
    },
    {
      id: 4,
      title: 'Out for Delivery',
      subtitle: 'Courier executive assigned for delivery',
      time: currentStep >= 3 ? 'Today by 5:00 PM' : 'Expected soon',
      completed: currentStep >= 3,
      active: currentStep === 3,
      icon: Package,
    },
    {
      id: 5,
      title: 'Delivered',
      subtitle: 'Package handed over to customer',
      time: order.statusDateText ? order.statusDateText.replace('\n', ' ') : 'Estimated in 2 days',
      completed: currentStep >= 4,
      active: currentStep === 4,
      icon: Home,
    },
  ];

  const cancelledTimelineSteps = [
    {
      id: 1,
      title: 'Order Placed',
      subtitle: 'Order confirmed & payment verified',
      time: `${order.placedDate}, 10:30 AM`,
      completed: true,
      active: false,
      isRed: false,
      icon: CheckCircle2,
    },
    {
      id: 2,
      title: 'Cancellation Processed',
      subtitle: 'Order cancelled per user request',
      time: order.statusDateText ? order.statusDateText.replace('\n', ' ') : `${order.placedDate}, 04:00 PM`,
      completed: false,
      active: true,
      isRed: true,
      icon: XCircle,
    },
    {
      id: 3,
      title: 'Refund Initiated',
      subtitle: `Full refund of ${order.product.price} sent to payment provider`,
      time: `${order.placedDate}, 04:15 PM`,
      completed: true,
      active: false,
      isRed: true,
      icon: RotateCcw,
    },
    {
      id: 4,
      title: 'Refund Completed',
      subtitle: 'Amount credited to original payment method',
      time: 'Completed within 1-2 business days',
      completed: true,
      active: false,
      isRed: false,
      icon: CheckCircle2,
    },
  ];

  const timelineSteps = isCancelled ? cancelledTimelineSteps : standardTimelineSteps;

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
          <TouchableOpacity style={styles.iconButton} onPress={onClose} activeOpacity={0.7}>
            <ArrowLeft size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Order Details & Status</Text>
            <Text style={styles.headerSubtitle}>#{order.orderNumber}</Text>
          </View>
          <TouchableOpacity style={styles.iconButton} onPress={handleCallSupport} activeOpacity={0.7}>
            <Phone size={20} color={isCancelled ? '#DC2626' : colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Cancelled Warning Banner Box */}
          {isCancelled && (
            <View style={styles.cancelledAlertCard}>
              <XCircle size={24} color="#DC2626" style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.cancelledAlertTitle}>Order Cancelled</Text>
                <Text style={styles.cancelledAlertSubtitle}>
                  This order was cancelled on {order.statusDateText ? order.statusDateText.replace('\n', ' ') : '21 Feb 2024'}. A full refund of {order.product.price} has been initiated back to your payment account.
                </Text>
              </View>
            </View>
          )}

          {/* Order Item Overview Card */}
          <View style={styles.orderSummaryCard}>
            <Image
              source={{ uri: order.product.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productDetails}>
              <View style={styles.statusBadgeRow}>
                <View
                  style={[
                    styles.statusBadge,
                    order.status === 'Processing' && styles.processingBadge,
                    order.status === 'Shipped' && styles.shippedBadge,
                    order.status === 'Delivered' && styles.deliveredBadge,
                    isCancelled && styles.cancelledBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusBadgeText,
                      isCancelled && styles.cancelledBadgeText,
                    ]}
                  >
                    {order.status}
                  </Text>
                </View>
                <Text style={styles.priceText}>{order.product.price}</Text>
              </View>

              <Text style={styles.productName} numberOfLines={1}>
                {order.product.name}
              </Text>
              <Text style={styles.productVariant}>{order.product.variants}</Text>

              <View style={styles.estDeliveryRow}>
                {isCancelled ? (
                  <>
                    <XCircle size={14} color="#DC2626" style={{ marginRight: 4 }} />
                    <Text style={[styles.estDeliveryText, { color: '#DC2626', fontWeight: '800' }]}>
                      Status: Cancelled
                    </Text>
                  </>
                ) : order.status === 'Delivered' ? (
                  <>
                    <CheckCircle2 size={14} color="#059669" style={{ marginRight: 4 }} />
                    <Text style={[styles.estDeliveryText, { color: '#059669', fontWeight: '800' }]}>
                      Delivered on {order.statusDateText ? order.statusDateText.replace('Delivered on\n', '').replace('\n', ' ') : order.placedDate}
                    </Text>
                  </>
                ) : (
                  <>
                    <Clock size={14} color={colors.primary} style={{ marginRight: 4 }} />
                    <Text style={styles.estDeliveryText}>
                      Est. Delivery: <Text style={{ fontWeight: '800', color: colors.textPrimary }}>3-5 Days</Text>
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>

          {/* Tracking ID & Logistics Partner Box */}
          <View style={styles.trackingInfoCard}>
            <View style={styles.trackingRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.trackingLabel}>Logistics Partner</Text>
                <Text style={styles.trackingValue}>ShopEase Express Air</Text>
              </View>
              <View style={styles.dividerVertical} />
              <View style={{ flex: 1, paddingLeft: 12 }}>
                <Text style={styles.trackingLabel}>AWB Tracking ID</Text>
                <TouchableOpacity style={styles.copyRow} onPress={handleCopyTracking} activeOpacity={0.7}>
                  <Text style={[styles.trackingIdText, isCancelled && { color: '#DC2626' }]}>
                    {trackingNumber}
                  </Text>
                  <Copy size={14} color={isCancelled ? '#DC2626' : colors.primary} style={{ marginLeft: 4 }} />
                </TouchableOpacity>
              </View>
            </View>
            {copied && <Text style={styles.copiedToast}>✓ Copied to clipboard!</Text>}
          </View>

          {/* Step-by-Step Order Tracker Timeline */}
          <View style={[styles.timelineSection, isCancelled && styles.timelineSectionCancelled]}>
            <Text style={[styles.sectionHeading, isCancelled && { color: '#991B1B' }]}>
              {isCancelled ? 'Cancellation Tracker' : 'Order Status Timeline'}
            </Text>

            <View style={styles.timelineContainer}>
              {timelineSteps.map((step, index) => {
                const StepIcon = step.icon;
                const isLast = index === timelineSteps.length - 1;
                const isStepRed = step.isRed || (isCancelled && (step.active || index > 0));

                return (
                  <View key={step.id} style={styles.timelineItem}>
                    {/* Left Connector Line & Dot */}
                    <View style={styles.timelineLeftColumn}>
                      <View
                        style={[
                          styles.timelineCircle,
                          step.completed && styles.timelineCircleCompleted,
                          step.active && styles.timelineCircleActive,
                          isStepRed && styles.timelineCircleRed,
                        ]}
                      >
                        <StepIcon
                          size={14}
                          color={step.completed || step.active || isStepRed ? '#FFFFFF' : '#94A3B8'}
                        />
                      </View>
                      {!isLast && (
                        <View
                          style={[
                            styles.timelineLine,
                            step.completed && styles.timelineLineCompleted,
                            isCancelled && styles.timelineLineRed,
                          ]}
                        />
                      )}
                    </View>

                    {/* Right Step Content */}
                    <View style={styles.timelineRightColumn}>
                      <View style={styles.stepTitleRow}>
                        <Text
                          style={[
                            styles.stepTitle,
                            step.active && styles.stepTitleActive,
                            step.completed && styles.stepTitleCompleted,
                            isStepRed && styles.stepTitleRed,
                          ]}
                        >
                          {step.title}
                        </Text>
                        {step.active && order.status !== 'Delivered' && (
                          <View style={[styles.liveTag, isCancelled && styles.cancelledTag]}>
                            <View style={[styles.livePulseDot, isCancelled && { backgroundColor: '#DC2626' }]} />
                            <Text style={[styles.liveTagText, isCancelled && { color: '#DC2626' }]}>
                              {isCancelled ? 'CANCELLED' : 'IN PROGRESS'}
                            </Text>
                          </View>
                        )}
                      </View>

                      <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
                      <Text style={styles.stepTime}>{step.time}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Delivery Address Card */}
          <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <MapPin size={18} color={isCancelled ? '#DC2626' : colors.primary} style={{ marginRight: 6 }} />
              <Text style={styles.addressHeading}>Delivery Address</Text>
            </View>
            <Text style={styles.recipientName}>Rahul Sharma</Text>
            <Text style={styles.addressBody}>
              Flat 402, Sunshine Heights, Sector 15, Vashi, Navi Mumbai, Maharashtra - 400703
            </Text>
            <Text style={styles.phoneText}>Phone: +91 98765 43210</Text>
          </View>

          {/* Footer Protection Tag */}
          <View style={styles.trustFooter}>
            <ShieldCheck size={18} color={isCancelled ? '#DC2626' : '#059669'} style={{ marginRight: 6 }} />
            <Text style={[styles.trustFooterText, isCancelled && { color: '#DC2626' }]}>
              {isCancelled ? 'Protected by ShopEase 100% Refund Policy' : 'Protected by ShopEase On-Time Delivery Guarantee'}
            </Text>
          </View>
        </ScrollView>
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
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  cancelledAlertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  cancelledAlertTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#991B1B',
    marginBottom: 2,
  },
  cancelledAlertSubtitle: {
    fontSize: 12,
    color: '#B91C1C',
    lineHeight: 16,
  },
  orderSummaryCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  statusBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  processingBadge: {
    backgroundColor: '#FEF3C7',
  },
  shippedBadge: {
    backgroundColor: '#DBEAFE',
  },
  deliveredBadge: {
    backgroundColor: '#D1FAE5',
  },
  cancelledBadge: {
    backgroundColor: '#FEE2E2',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  cancelledBadgeText: {
    color: '#DC2626',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  productVariant: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  estDeliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estDeliveryText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  trackingInfoCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  trackingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerVertical: {
    width: 1,
    height: 36,
    backgroundColor: '#E2E8F0',
  },
  trackingLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  trackingValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  copyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackingIdText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  copiedToast: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
    marginTop: 8,
    textAlign: 'center',
  },
  timelineSection: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  timelineSectionCancelled: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FFF5F5',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  timelineContainer: {
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  timelineLeftColumn: {
    alignItems: 'center',
    width: 32,
  },
  timelineCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineCircleCompleted: {
    backgroundColor: '#10B981',
  },
  timelineCircleActive: {
    backgroundColor: colors.primary,
  },
  timelineCircleRed: {
    backgroundColor: '#EF4444',
  },
  timelineLine: {
    width: 2,
    height: 44,
    backgroundColor: '#E2E8F0',
    marginVertical: 2,
  },
  timelineLineCompleted: {
    backgroundColor: '#10B981',
  },
  timelineLineRed: {
    backgroundColor: '#FCA5A5',
  },
  timelineRightColumn: {
    flex: 1,
    marginLeft: 12,
    paddingBottom: 20,
  },
  stepTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  stepTitleCompleted: {
    color: colors.textPrimary,
    fontWeight: '800',
  },
  stepTitleActive: {
    color: colors.primary,
    fontWeight: '800',
  },
  stepTitleRed: {
    color: '#DC2626',
    fontWeight: '800',
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  cancelledTag: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 4,
  },
  liveTagText: {
    fontSize: 9,
    fontWeight: '900',
    color: colors.primary,
  },
  stepSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  stepTime: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  addressCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  recipientName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  addressBody: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 6,
  },
  phoneText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  trustFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  trustFooterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
});
