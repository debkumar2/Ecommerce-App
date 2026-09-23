import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import {
  ArrowLeft,
  Bell,
  Package,
  Tag,
  Flame,
  CheckCheck,
  Volume2,
  Mail,
  MessageSquare,
  Sparkles,
  ShoppingBag,
  Clock,
  Circle,
} from 'lucide-react-native';
import { colors } from '../theme/colors';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Order Shipped! 🚚',
    message: 'Your order #ORD-98241 for Wireless Headphones has been dispatched and is out for delivery.',
    time: '10 mins ago',
    type: 'order',
    isRead: false,
  },
  {
    id: 'notif-2',
    title: 'Flash Sale Alert! 🔥',
    message: 'Up to 50% OFF on Top Electronics & Fashion items ends in 2 hours. Shop now!',
    time: '2 hours ago',
    type: 'promo',
    isRead: false,
  },
  {
    id: 'notif-3',
    title: 'Price Drop Alert 🏷️',
    message: 'An item in your wishlist "Smart Workout Watch" just dropped in price by ₹500!',
    time: '1 day ago',
    type: 'pricedrop',
    isRead: true,
  },
  {
    id: 'notif-4',
    title: 'Rewards Credited 💰',
    message: '320 ShopEase reward points have been added to your account for your recent order.',
    time: '2 days ago',
    type: 'reward',
    isRead: true,
  },
];

export default function NotificationsScreen({ visible = false, onClose }) {
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' | 'preferences'
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Preference Toggle States
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promosDeals, setPromosDeals] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [soundVibration, setSoundVibration] = useState(true);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'order':
        return <Package size={20} color="#EA580C" />;
      case 'promo':
        return <Flame size={20} color="#EF4444" />;
      case 'pricedrop':
        return <Tag size={20} color="#2563EB" />;
      default:
        return <Sparkles size={20} color="#D97706" />;
    }
  };

  const getNotifIconBg = (type) => {
    switch (type) {
      case 'order':
        return '#FFEDD5';
      case 'promo':
        return '#FEE2E2';
      case 'pricedrop':
        return '#EFF6FF';
      default:
        return '#FEF3C7';
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
          <Text style={styles.headerTitle}>Notifications</Text>
          {activeTab === 'inbox' && unreadCount > 0 ? (
            <TouchableOpacity onPress={handleMarkAllRead} activeOpacity={0.8}>
              <Text style={styles.markReadText}>Mark All Read</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 38 }} />
          )}
        </View>

        {/* Tab Switcher Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'inbox' && styles.tabItemActive]}
            onPress={() => setActiveTab('inbox')}
            activeOpacity={0.8}
          >
            <Bell size={16} color={activeTab === 'inbox' ? colors.primary : colors.textSecondary} style={{ marginRight: 6 }} />
            <Text style={[styles.tabText, activeTab === 'inbox' && styles.tabTextActive]}>
              Inbox {unreadCount > 0 ? `(${unreadCount})` : ''}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'preferences' && styles.tabItemActive]}
            onPress={() => setActiveTab('preferences')}
            activeOpacity={0.8}
          >
            <Volume2 size={16} color={activeTab === 'preferences' ? colors.primary : colors.textSecondary} style={{ marginRight: 6 }} />
            <Text style={[styles.tabText, activeTab === 'preferences' && styles.tabTextActive]}>
              Preferences
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* TAB 1: NOTIFICATIONS INBOX */}
          {activeTab === 'inbox' && (
            <View>
              {notifications.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.notifCard, !item.isRead && styles.notifCardUnread]}
                  onPress={() => handleToggleRead(item.id)}
                  activeOpacity={0.85}
                >
                  <View style={[styles.notifIconBg, { backgroundColor: getNotifIconBg(item.type) }]}>
                    {getNotifIcon(item.type)}
                  </View>

                  <View style={styles.notifTextCol}>
                    <View style={styles.notifHeaderRow}>
                      <Text style={styles.notifTitle}>{item.title}</Text>
                      {!item.isRead && <Circle size={8} color={colors.primary} fill={colors.primary} />}
                    </View>
                    <Text style={styles.notifMessage}>{item.message}</Text>
                    <View style={styles.timeRow}>
                      <Clock size={12} color={colors.textPlaceholder} style={{ marginRight: 4 }} />
                      <Text style={styles.timeText}>{item.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* TAB 2: NOTIFICATION PREFERENCES */}
          {activeTab === 'preferences' && (
            <View>
              <Text style={styles.sectionHeaderTitle}>Alert Preferences</Text>
              <View style={styles.settingsCard}>
                {/* Order Status */}
                <View style={styles.settingRow}>
                  <View style={[styles.settingIconBg, { backgroundColor: '#FFEDD5' }]}>
                    <Package size={20} color="#EA580C" />
                  </View>
                  <View style={styles.settingTextCol}>
                    <Text style={styles.settingTitle}>Order Updates & Tracking</Text>
                    <Text style={styles.settingDesc}>Get alerts for shipping, delivery & dispatch</Text>
                  </View>
                  <Switch
                    value={orderUpdates}
                    onValueChange={setOrderUpdates}
                    trackColor={{ false: '#E2E8F0', true: colors.primary }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <View style={styles.settingDivider} />

                {/* Flash Deals */}
                <View style={styles.settingRow}>
                  <View style={[styles.settingIconBg, { backgroundColor: '#FEE2E2' }]}>
                    <Flame size={20} color="#EF4444" />
                  </View>
                  <View style={styles.settingTextCol}>
                    <Text style={styles.settingTitle}>Flash Sale & Promotion Alerts</Text>
                    <Text style={styles.settingDesc}>Receive daily deals and flash sales notifications</Text>
                  </View>
                  <Switch
                    value={promosDeals}
                    onValueChange={setPromosDeals}
                    trackColor={{ false: '#E2E8F0', true: colors.primary }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <View style={styles.settingDivider} />

                {/* Price Drop */}
                <View style={styles.settingRow}>
                  <View style={[styles.settingIconBg, { backgroundColor: '#EFF6FF' }]}>
                    <Tag size={20} color="#2563EB" />
                  </View>
                  <View style={styles.settingTextCol}>
                    <Text style={styles.settingTitle}>Wishlist Price Drops</Text>
                    <Text style={styles.settingDesc}>Alerts when items in your wishlist go on sale</Text>
                  </View>
                  <Switch
                    value={priceAlerts}
                    onValueChange={setPriceAlerts}
                    trackColor={{ false: '#E2E8F0', true: colors.primary }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <View style={styles.settingDivider} />

                {/* Email Newsletter */}
                <View style={styles.settingRow}>
                  <View style={[styles.settingIconBg, { backgroundColor: '#F5F3FF' }]}>
                    <Mail size={20} color="#7C3AED" />
                  </View>
                  <View style={styles.settingTextCol}>
                    <Text style={styles.settingTitle}>Email Newsletters & Summaries</Text>
                    <Text style={styles.settingDesc}>Weekly digest of trending items & offers</Text>
                  </View>
                  <Switch
                    value={emailDigest}
                    onValueChange={setEmailDigest}
                    trackColor={{ false: '#E2E8F0', true: colors.primary }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <View style={styles.settingDivider} />

                {/* Sound & Vibration */}
                <View style={styles.settingRow}>
                  <View style={[styles.settingIconBg, { backgroundColor: '#DCFCE7' }]}>
                    <Volume2 size={20} color="#16A34A" />
                  </View>
                  <View style={styles.settingTextCol}>
                    <Text style={styles.settingTitle}>Sound & Vibration</Text>
                    <Text style={styles.settingDesc}>Play alert sound for push notifications</Text>
                  </View>
                  <Switch
                    value={soundVibration}
                    onValueChange={setSoundVibration}
                    trackColor={{ false: '#E2E8F0', true: colors.primary }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              </View>
            </View>
          )}
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
  markReadText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingHorizontal: 16,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  notifCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  notifCardUnread: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  notifIconBg: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notifTextCol: {
    flex: 1,
  },
  notifHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  notifMessage: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 17,
    marginBottom: 6,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    color: colors.textPlaceholder,
    fontWeight: '600',
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
});
