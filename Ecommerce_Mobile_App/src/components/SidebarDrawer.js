import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
  Easing,
} from 'react-native';
import {
  X,
  Home,
  Grid,
  Zap,
  Package,
  Heart,
  User,
  MapPin,
  CreditCard,
  Bell,
  ShieldCheck,
  Headphones,
  Info,
  ChevronRight,
  Crown,
} from 'lucide-react-native';
import { colors } from '../theme/colors';
import AppImage from './AppImage';

const DRAWER_WIDTH = Math.min(Dimensions.get('window').width * 0.82, 320);

export default function SidebarDrawer({
  visible = false,
  onClose,
  userProfile = {
    fullName: 'Supain Nandy',
    email: 'supain.nandy@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  },
  onNavigateTab,
  onOpenDeals,
  onOpenAddresses,
  onOpenPayments,
  onOpenNotifications,
  onOpenPrivacy,
  onOpenHelp,
  onOpenAbout,
}) {
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(visible);

  // Synchronize modal state synchronously during render to eliminate 1-frame delay
  if (visible && !modalVisible) {
    setModalVisible(true);
  }

  useEffect(() => {
    if (visible && modalVisible) {
      slideAnim.setValue(-DRAWER_WIDTH);
      fadeAnim.setValue(0);

      // Start animation immediately on next layout frame for instant response
      const animFrame = requestAnimationFrame(() => {
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 250,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 220,
            useNativeDriver: true,
          }),
        ]).start();
      });

      return () => cancelAnimationFrame(animFrame);
    }
  }, [visible, modalVisible]);

  const handleDismiss = (onFinishedAction) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 260,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      if (onClose) onClose();
      if (onFinishedAction) onFinishedAction();
    });
  };

  const handleMenuClick = (action) => {
    handleDismiss(action);
  };

  if (!modalVisible) return null;

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={() => handleDismiss()}
    >
      <View style={styles.overlayContainer}>
        {/* Animated Fade Backdrop */}
        <Animated.View
          style={[
            styles.backdrop,
            { opacity: fadeAnim },
          ]}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => handleDismiss()}
          />
        </Animated.View>

        {/* Animated Slide Left-to-Right Drawer Container */}
        <Animated.View
          style={[
            styles.drawerContent,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* Drawer Profile Header */}
          <View style={styles.headerCard}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => handleDismiss()}
              activeOpacity={0.7}
            >
              <X size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.profileRow}>
              <AppImage
                source={{ uri: userProfile.avatar }}
                style={styles.avatar}
                fallbackIcon={User}
              />
              <View style={styles.profileDetails}>
                <Text style={styles.userName} numberOfLines={1}>
                  {userProfile.fullName || 'Supain Nandy'}
                </Text>
                <Text style={styles.userEmail} numberOfLines={1}>
                  {userProfile.email || 'supain.nandy@gmail.com'}
                </Text>
                <View style={styles.memberBadge}>
                  <Crown size={10} color="#D97706" fill="#D97706" style={{ marginRight: 3 }} />
                  <Text style={styles.memberText}>VIP Member</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Menu Items List */}
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Primary Navigation Section */}
            <Text style={styles.sectionTitle}>Main Navigation</Text>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuClick(() => onNavigateTab && onNavigateTab('home'))}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBg, { backgroundColor: '#FFF1EB' }]}>
                <Home size={18} color={colors.primary} />
              </View>
              <Text style={styles.menuText}>Home Feed</Text>
              <ChevronRight size={16} color={colors.textPlaceholder} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuClick(() => onNavigateTab && onNavigateTab('categories'))}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBg, { backgroundColor: '#EFF6FF' }]}>
                <Grid size={18} color="#2563EB" />
              </View>
              <Text style={styles.menuText}>All Categories</Text>
              <ChevronRight size={16} color={colors.textPlaceholder} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuClick(onOpenDeals)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBg, { backgroundColor: '#FEF3C7' }]}>
                <Zap size={18} color="#D97706" />
              </View>
              <Text style={styles.menuText}>Today's Deals</Text>
              <View style={styles.hotBadge}>
                <Text style={styles.hotBadgeText}>HOT</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuClick(() => onNavigateTab && onNavigateTab('orders'))}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBg, { backgroundColor: '#FFEDD5' }]}>
                <Package size={18} color="#EA580C" />
              </View>
              <Text style={styles.menuText}>My Orders</Text>
              <ChevronRight size={16} color={colors.textPlaceholder} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuClick(() => onNavigateTab && onNavigateTab('wishlist'))}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBg, { backgroundColor: '#FCE7F3' }]}>
                <Heart size={18} color="#BE185D" />
              </View>
              <Text style={styles.menuText}>Wishlist</Text>
              <ChevronRight size={16} color={colors.textPlaceholder} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuClick(() => onNavigateTab && onNavigateTab('profile'))}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBg, { backgroundColor: '#F3F4F6' }]}>
                <User size={18} color={colors.textPrimary} />
              </View>
              <Text style={styles.menuText}>My Profile</Text>
              <ChevronRight size={16} color={colors.textPlaceholder} />
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Quick Settings & Services */}
            <Text style={styles.sectionTitle}>Account & Services</Text>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuClick(onOpenAddresses)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBg, { backgroundColor: '#FFF1EB' }]}>
                <MapPin size={18} color={colors.primary} />
              </View>
              <Text style={styles.menuText}>Delivery Addresses</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuClick(onOpenPayments)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBg, { backgroundColor: '#EFF6FF' }]}>
                <CreditCard size={18} color="#2563EB" />
              </View>
              <Text style={styles.menuText}>Payment Methods</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuClick(onOpenNotifications)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBg, { backgroundColor: '#FEF3C7' }]}>
                <Bell size={18} color="#D97706" />
              </View>
              <Text style={styles.menuText}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuClick(onOpenPrivacy)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBg, { backgroundColor: '#DCFCE7' }]}>
                <ShieldCheck size={18} color="#16A34A" />
              </View>
              <Text style={styles.menuText}>Privacy & Security</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuClick(onOpenHelp)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBg, { backgroundColor: '#F5F3FF' }]}>
                <Headphones size={18} color="#7C3AED" />
              </View>
              <Text style={styles.menuText}>Help Center</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleMenuClick(onOpenAbout)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBg, { backgroundColor: '#F1F5F9' }]}>
                <Info size={18} color={colors.textSecondary} />
              </View>
              <Text style={styles.menuText}>About ShopEase</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Drawer Footer */}
          <View style={styles.drawerFooter}>
            <Text style={styles.appVersionText}>ShopEase App v1.0.0</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContent: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    position: 'relative',
    zIndex: 10,
  },
  headerCard: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'ios' ? 48 : 36,
    paddingHorizontal: 16,
    paddingBottom: 20,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 48 : 20,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: 12,
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 11,
    color: '#FFE4D6',
    marginBottom: 4,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  memberText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPlaceholder,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  hotBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  hotBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  drawerFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  appVersionText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPlaceholder,
  },
});
