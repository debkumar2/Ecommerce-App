import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Clock,
} from 'lucide-react-native';
import { colors } from '../theme/colors';

const TERMS_SECTIONS = [
  {
    id: 'sec-1',
    title: '1. Introduction & Acceptance of Terms',
    icon: FileText,
    content:
      'Welcome to ShopEase! By accessing, downloading, or using the ShopEase mobile application, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please refrain from using our services.',
  },
  {
    id: 'sec-2',
    title: '2. Account Registration & Security',
    icon: ShieldCheck,
    content:
      'To access certain features of ShopEase, you may be required to register an account. You are responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account.',
  },
  {
    id: 'sec-3',
    title: '3. Products, Orders & Pricing',
    icon: AlertCircle,
    content:
      'All product descriptions, availability, and prices listed on ShopEase are subject to change without notice. We reserve the right to cancel or limit order quantities at our discretion in cases of pricing errors or inventory unavailability.',
  },
  {
    id: 'sec-4',
    title: '4. Shipping & Delivery Policy',
    icon: Clock,
    content:
      'Estimated delivery timelines are provided as estimates. ShopEase strives for express doorstep delivery within 2-5 business days across serviceable locations, provided accurate delivery address details are supplied by the user.',
  },
  {
    id: 'sec-5',
    title: '5. Returns, Replacements & Refunds',
    icon: CheckCircle2,
    content:
      'Eligible items can be returned within 7 days of delivery in their original unused condition with original packaging intact. Refunds are processed back to your original payment method or ShopEase wallet within 3-5 business days of inspection.',
  },
  {
    id: 'sec-6',
    title: '6. User Conduct & Privacy Protection',
    icon: ShieldCheck,
    content:
      'You agree not to misuse ShopEase for fraudulent purchases, automated scraping, or unauthorized access. We respect user privacy and safeguard personal data in strict compliance with applicable privacy regulations.',
  },
];

export default function TermsScreen({ visible = false, onClose }) {
  const [expandedSections, setExpandedSections] = useState({
    'sec-1': true,
    'sec-2': true,
  });

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
          <Text style={styles.headerTitle}>Terms & Conditions</Text>
          <View style={{ width: 38 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Top Date Banner */}
          <View style={styles.topBanner}>
            <FileText size={24} color={colors.primary} style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.topBannerTitle}>ShopEase Terms of Service</Text>
              <Text style={styles.topBannerDate}>Last Updated: September 23, 2026</Text>
            </View>
          </View>

          <Text style={styles.introText}>
            Please read these Terms and Conditions carefully before using our mobile e-commerce platform. Your continued use indicates your agreement to all terms.
          </Text>

          {/* Accordion / List of Legal Sections */}
          <View style={styles.sectionsWrapper}>
            {TERMS_SECTIONS.map((sec) => {
              const isExpanded = !!expandedSections[sec.id];
              const IconComp = sec.icon;
              return (
                <View key={sec.id} style={styles.sectionCard}>
                  <TouchableOpacity
                    style={styles.sectionHeaderBtn}
                    onPress={() => toggleSection(sec.id)}
                    activeOpacity={0.8}
                  >
                    <IconComp size={18} color={colors.primary} style={{ marginRight: 10 }} />
                    <Text style={styles.sectionHeaderTitle}>{sec.title}</Text>
                    {isExpanded ? (
                      <ChevronUp size={18} color={colors.textSecondary} />
                    ) : (
                      <ChevronDown size={18} color={colors.textSecondary} />
                    )}
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={styles.sectionBody}>
                      <Text style={styles.sectionBodyText}>{sec.content}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* Agreement Confirmation Box */}
          <View style={styles.agreeCard}>
            <CheckCircle2 size={20} color="#16A34A" style={{ marginRight: 10, marginTop: 2 }} />
            <Text style={styles.agreeText}>
              By using ShopEase, you confirm that you have read, understood, and agreed to these terms.
            </Text>
          </View>

          {/* Bottom Close Button */}
          <TouchableOpacity style={styles.closeActionBtn} onPress={onClose} activeOpacity={0.85}>
            <Text style={styles.closeActionBtnText}>I Understand & Agree</Text>
          </TouchableOpacity>
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
  topBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1EB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FFDCD0',
  },
  topBannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  topBannerDate: {
    fontSize: 12,
    color: colors.primaryDark,
    fontWeight: '600',
    marginTop: 2,
  },
  introText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 19,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionsWrapper: {
    marginBottom: 16,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  sectionHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  sectionHeaderTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  sectionBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  sectionBodyText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
    marginTop: 10,
  },
  agreeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#DCFCE7',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  agreeText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
    lineHeight: 17,
  },
  closeActionBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  closeActionBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
