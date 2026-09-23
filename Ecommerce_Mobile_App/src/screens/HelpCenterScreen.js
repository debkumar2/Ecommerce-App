import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  Search,
  Headphones,
  Package,
  RotateCcw,
  CreditCard,
  UserCheck,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  MessageSquare,
  Mail,
  HelpCircle,
} from 'lucide-react-native';
import { colors } from '../theme/colors';

const HELP_CATEGORIES = [
  { id: 'cat-1', title: 'Orders & Shipping', desc: 'Track, modify, or cancel orders', icon: Package, bg: '#FFEDD5', color: '#EA580C' },
  { id: 'cat-2', title: 'Returns & Refunds', desc: 'Return items & check refund status', icon: RotateCcw, bg: '#EFF6FF', color: '#2563EB' },
  { id: 'cat-3', title: 'Payments & Offers', desc: 'UPI, COD, coupons & wallet', icon: CreditCard, bg: '#DCFCE7', color: '#16A34A' },
  { id: 'cat-4', title: 'Account Security', desc: 'Profile, password & settings', icon: UserCheck, bg: '#F5F3FF', color: '#7C3AED' },
];

const FAQ_LIST = [
  {
    id: 'faq-1',
    category: 'Orders & Shipping',
    question: 'How do I track my order status?',
    answer: 'You can track your live order by going to the Orders tab in ShopEase or clicking the Order Tracking button on your active orders card.',
  },
  {
    id: 'faq-2',
    category: 'Orders & Shipping',
    question: 'What are the delivery charges?',
    answer: 'Standard delivery is FREE on all orders above ₹499. For orders below ₹499, a nominal delivery fee of ₹49 applies.',
  },
  {
    id: 'faq-3',
    category: 'Returns & Refunds',
    question: 'How do I return a product?',
    answer: 'You can request a return within 7 days of delivery. Go to Orders tab -> Select item -> Request Return. Our executive will pick it up from your address.',
  },
  {
    id: 'faq-4',
    category: 'Returns & Refunds',
    question: 'When will I receive my refund?',
    answer: 'Once the returned item is inspected, refunds are credited within 24 hours for UPI/Wallet and 3-5 business days for Credit/Debit cards.',
  },
  {
    id: 'faq-5',
    category: 'Payments & Offers',
    question: 'What payment methods are accepted?',
    answer: 'ShopEase accepts Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, and Net Banking.',
  },
  {
    id: 'faq-6',
    category: 'Account Security',
    question: 'How can I update my profile or phone number?',
    answer: 'Go to Profile tab -> Click Edit Profile. You can update your Full Name, Email, Phone Number, Date of Birth, and Profile Picture.',
  },
];

export default function HelpCenterScreen({ visible = false, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFaqId, setExpandedFaqId] = useState('faq-1');

  const filteredFaqs = FAQ_LIST.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCallSupport = () => {
    const phone = 'tel:18001234567';
    Linking.openURL(phone).catch(() => {
      const msg = 'Toll Free Support Number: 1800-123-4567 (Mon-Sat, 9 AM - 9 PM)';
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Call Support', msg);
    });
  };

  const handleLiveChat = () => {
    const msg = 'Connecting to a Live Customer Support Executive...';
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Live Support', msg);
  };

  const handleEmailSupport = () => {
    const email = 'mailto:support@shopease.com';
    Linking.openURL(email).catch(() => {
      const msg = 'Email Support: support@shopease.com';
      if (Platform.OS === 'web') alert(msg);
      else Alert.alert('Email Support', msg);
    });
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
          <Text style={styles.headerTitle}>Help Center</Text>
          <View style={{ width: 38 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Hero Banner with Search */}
          <View style={styles.heroBanner}>
            <Headphones size={32} color="#FFFFFF" style={{ marginBottom: 8 }} />
            <Text style={styles.heroTitle}>How can we help you today?</Text>
            <Text style={styles.heroSubtitle}>Search topics, orders, returns, and payments</Text>

            {/* Help Search Bar */}
            <View style={styles.searchWrapper}>
              <Search size={18} color={colors.textSecondary} style={{ marginRight: 10 }} />
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search help questions, topics..."
                placeholderTextColor={colors.textPlaceholder}
              />
            </View>
          </View>

          {/* Support Categories Grid */}
          <Text style={styles.sectionTitle}>Browse Help Topics</Text>
          <View style={styles.categoriesGrid}>
            {HELP_CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.title;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryCard,
                    isSelected && styles.categoryCardSelected,
                  ]}
                  onPress={() => setSelectedCategory(isSelected ? 'All' : cat.title)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.categoryIconBg, { backgroundColor: cat.bg }]}>
                    <IconComp size={22} color={cat.color} />
                  </View>
                  <Text style={styles.categoryTitle}>{cat.title}</Text>
                  <Text style={styles.categoryDesc}>{cat.desc}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Frequently Asked Questions */}
          <View style={styles.faqSectionHeader}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            {selectedCategory !== 'All' && (
              <TouchableOpacity onPress={() => setSelectedCategory('All')}>
                <Text style={styles.clearCategoryText}>Show All</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.faqListWrapper}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <View key={faq.id} style={styles.faqCard}>
                    <TouchableOpacity
                      style={styles.faqHeaderBtn}
                      onPress={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                      activeOpacity={0.8}
                    >
                      <HelpCircle size={18} color={colors.primary} style={{ marginRight: 10 }} />
                      <Text style={styles.faqQuestionText}>{faq.question}</Text>
                      {isExpanded ? (
                        <ChevronUp size={18} color={colors.textSecondary} />
                      ) : (
                        <ChevronDown size={18} color={colors.textSecondary} />
                      )}
                    </TouchableOpacity>

                    {isExpanded && (
                      <View style={styles.faqBody}>
                        <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                      </View>
                    )}
                  </View>
                );
              })
            ) : (
              <View style={styles.noResultsCard}>
                <Text style={styles.noResultsText}>No help topics found matching "{searchQuery}"</Text>
              </View>
            )}
          </View>

          {/* Contact Support Section */}
          <Text style={styles.sectionTitle}>Still Need Assistance?</Text>
          <View style={styles.contactRow}>
            {/* Call Us */}
            <TouchableOpacity style={styles.contactCard} onPress={handleCallSupport} activeOpacity={0.8}>
              <View style={[styles.contactIconBg, { backgroundColor: '#FFEDD5' }]}>
                <PhoneCall size={20} color="#EA580C" />
              </View>
              <Text style={styles.contactTitle}>Call Us</Text>
              <Text style={styles.contactDesc}>Toll Free 1800-123-4567</Text>
            </TouchableOpacity>

            {/* Live Chat */}
            <TouchableOpacity style={styles.contactCard} onPress={handleLiveChat} activeOpacity={0.8}>
              <View style={[styles.contactIconBg, { backgroundColor: '#DCFCE7' }]}>
                <MessageSquare size={20} color="#16A34A" />
              </View>
              <Text style={styles.contactTitle}>Live Chat</Text>
              <Text style={styles.contactDesc}>24/7 Agent Support</Text>
            </TouchableOpacity>

            {/* Email Support */}
            <TouchableOpacity style={styles.contactCard} onPress={handleEmailSupport} activeOpacity={0.8}>
              <View style={[styles.contactIconBg, { backgroundColor: '#EFF6FF' }]}>
                <Mail size={20} color="#2563EB" />
              </View>
              <Text style={styles.contactTitle}>Email Us</Text>
              <Text style={styles.contactDesc}>support@shopease.com</Text>
            </TouchableOpacity>
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
  heroBanner: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#FFE4D6',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
    marginLeft: 4,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryCardSelected: {
    borderColor: colors.primary,
    borderWidth: 1.5,
    backgroundColor: colors.primaryLight,
  },
  categoryIconBg: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  categoryDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
  faqSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clearCategoryText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    marginRight: 4,
  },
  faqListWrapper: {
    marginBottom: 20,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  faqHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  faqBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  faqAnswerText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 19,
    marginTop: 8,
  },
  noResultsCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  noResultsText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  contactCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  contactIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  contactDesc: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
