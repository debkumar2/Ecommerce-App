import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Heart,
  Star,
  Globe,
  ExternalLink,
  Github,
  Mail,
  CheckCircle,
} from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function AboutShopEaseScreen({ visible = false, onClose }) {
  const handleOpenLink = (url) => {
    Linking.openURL(url).catch(() => {
      const msg = `Opening URL: ${url}`;
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Link', msg);
    });
  };

  const handleRateApp = () => {
    const msg = 'Thank you for rating ShopEase 5 stars!';
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Rate Us', msg);
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
          <Text style={styles.headerTitle}>About ShopEase</Text>
          <View style={{ width: 38 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Hero Branding Section */}
          <View style={styles.heroCard}>
            <View style={styles.logoBadge}>
              <ShoppingBag size={40} color={colors.primary} />
            </View>
            <Text style={styles.appName}>ShopEase</Text>
            <Text style={styles.appTagline}>Your Premium Shopping Destination</Text>
            <View style={styles.versionBadge}>
              <Text style={styles.versionText}>Version 1.0.0 (Build 2026.09)</Text>
            </View>
          </View>

          {/* Mission & Story Card */}
          <View style={styles.infoCard}>
            <Text style={styles.cardSectionTitle}>Our Mission</Text>
            <Text style={styles.cardParagraph}>
              ShopEase was built to redefine online mobile shopping. We bring top fashion brands, electronics, home decor, and everyday essentials right to your fingertips with effortless navigation, lightning-fast delivery, and secure payments.
            </Text>
          </View>

          {/* Highlights Grid */}
          <Text style={styles.sectionHeaderTitle}>Why Choose ShopEase?</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIconBg, { backgroundColor: '#FFEDD5' }]}>
                <Truck size={22} color="#EA580C" />
              </View>
              <Text style={styles.featureTitle}>Express Delivery</Text>
              <Text style={styles.featureDesc}>Fast & reliable doorstep delivery on all orders</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIconBg, { backgroundColor: '#DCFCE7' }]}>
                <ShieldCheck size={22} color="#16A34A" />
              </View>
              <Text style={styles.featureTitle}>100% Genuine</Text>
              <Text style={styles.featureDesc}>Authentic products directly from trusted brands</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIconBg, { backgroundColor: '#EFF6FF' }]}>
                <RotateCcw size={22} color="#2563EB" />
              </View>
              <Text style={styles.featureTitle}>Easy Returns</Text>
              <Text style={styles.featureDesc}>7-day hassle-free returns & instant refunds</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIconBg, { backgroundColor: '#F5F3FF' }]}>
                <Headphones size={22} color="#7C3AED" />
              </View>
              <Text style={styles.featureTitle}>24/7 Support</Text>
              <Text style={styles.featureDesc}>Dedicated customer support team anytime</Text>
            </View>
          </View>

          {/* Technical App Details */}
          <View style={styles.infoCard}>
            <Text style={styles.cardSectionTitle}>App Information</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Platform</Text>
              <Text style={styles.detailValue}>React Native (Expo SDK)</Text>
            </View>
            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Developer</Text>
              <Text style={styles.detailValue}>Debkumar & Team</Text>
            </View>
            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Release Date</Text>
              <Text style={styles.detailValue}>September 2026</Text>
            </View>
            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Security & Privacy</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckCircle size={14} color="#16A34A" style={{ marginRight: 4 }} />
                <Text style={[styles.detailValue, { color: '#16A34A' }]}>Encrypted (SSL)</Text>
              </View>
            </View>
          </View>

          {/* Interactive Rate & Contact Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.rateBtn} onPress={handleRateApp} activeOpacity={0.8}>
              <Star size={18} color="#D97706" fill="#D97706" style={{ marginRight: 8 }} />
              <Text style={styles.rateBtnText}>Rate ShopEase App</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactBtn}
              onPress={() => handleOpenLink('mailto:support@shopease.com')}
              activeOpacity={0.8}
            >
              <Mail size={18} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.contactBtnText}>Contact Support</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Copyright */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerHeart}>Crafted with <Heart size={12} color="#EF4444" fill="#EF4444" /> for seamless shopping</Text>
            <Text style={styles.footerCopyright}>© 2026 ShopEase Technologies Inc. All rights reserved.</Text>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  heroCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  logoBadge: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  appTagline: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 12,
  },
  versionBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  versionText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  cardParagraph: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
    marginLeft: 4,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  featureIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  actionRow: {
    gap: 10,
    marginBottom: 24,
  },
  rateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF3C7',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  rateBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#B45309',
  },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFDCD0',
  },
  contactBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  footerContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerHeart: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  footerCopyright: {
    fontSize: 11,
    color: colors.textPlaceholder,
  },
});
