import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { 
  Camera, Crown, Package, Heart, Ticket, Star,
  User, MapPin, CreditCard, Bell, ShieldCheck, ChevronRight,
  HeadphonesIcon, FileText, Info, LogOut
} from 'lucide-react-native';
import { colors } from '../theme/colors';

const ProfileMenuItem = ({ icon: Icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.menuIconContainer}>
      <Icon size={22} color={colors.textPrimary} strokeWidth={1.5} />
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>
    <ChevronRight size={20} color={colors.textPlaceholder} />
  </TouchableOpacity>
);

export default function ProfileContent() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      
      {/* Profile Info Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileInfoRow}>
          {/* Avatar Area */}
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80' }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.cameraButton} activeOpacity={0.8}>
              <Camera size={14} color={colors.white} />
            </TouchableOpacity>
          </View>
          
          {/* User Details */}
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Supain Nandy</Text>
            <Text style={styles.userInfoText}>supain.nandy@gmail.com</Text>
            <Text style={styles.userInfoText}>+91 98765 43210</Text>
            
            <View style={styles.memberBadge}>
              <Crown size={12} color="#D97706" fill="#D97706" style={{ marginRight: 4 }} />
              <Text style={styles.memberBadgeText}>Member Since Mar 2024</Text>
            </View>
          </View>
        </View>

        {/* Decorative Quote */}
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>Good Shoppers Make a Better World</Text>
          <View style={styles.quoteUnderline} />
          <View style={styles.quoteUnderline2} />
        </View>
      </View>

      {/* Stats Row */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={[styles.statIconBg, { backgroundColor: '#FFEDD5' }]}>
            <Package size={20} color="#EA580C" />
          </View>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <View style={[styles.statIconBg, { backgroundColor: '#FCE7F3' }]}>
            <Heart size={20} color="#BE185D" />
          </View>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Wishlist</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <View style={[styles.statIconBg, { backgroundColor: '#DCFCE7' }]}>
            <Ticket size={20} color="#15803D" />
          </View>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Coupons</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <View style={[styles.statIconBg, { backgroundColor: '#FEF3C7' }]}>
            <Star size={20} color="#B45309" />
          </View>
          <Text style={styles.statValue}>320</Text>
          <Text style={styles.statLabel}>Reward Points</Text>
        </View>
      </View>

      {/* My Account Section */}
      <Text style={styles.sectionTitle}>My Account</Text>
      <View style={styles.sectionCard}>
        <ProfileMenuItem 
          icon={User} 
          title="Edit Profile" 
          subtitle="Update your personal information" 
        />
        <View style={styles.menuDivider} />
        <ProfileMenuItem 
          icon={MapPin} 
          title="Delivery Addresses" 
          subtitle="Manage your saved addresses" 
        />
        <View style={styles.menuDivider} />
        <ProfileMenuItem 
          icon={CreditCard} 
          title="Payment Methods" 
          subtitle="Manage your cards and wallets" 
        />
        <View style={styles.menuDivider} />
        <ProfileMenuItem 
          icon={Bell} 
          title="Notifications" 
          subtitle="Manage your notification preferences" 
        />
        <View style={styles.menuDivider} />
        <ProfileMenuItem 
          icon={ShieldCheck} 
          title="Privacy & Security" 
          subtitle="Manage your account security" 
        />
      </View>

      {/* Help & Support Section */}
      <Text style={styles.sectionTitle}>Help & Support</Text>
      <View style={styles.sectionCard}>
        <ProfileMenuItem 
          icon={HeadphonesIcon} 
          title="Help Center" 
          subtitle="Get help with your orders" 
        />
        <View style={styles.menuDivider} />
        <ProfileMenuItem 
          icon={FileText} 
          title="Terms & Conditions" 
          subtitle="Read our terms and policies" 
        />
        <View style={styles.menuDivider} />
        <ProfileMenuItem 
          icon={Info} 
          title="About ShopKart" 
          subtitle="App version 1.0.0" 
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
        <LogOut size={20} color="#DC2626" style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 30,
  },
  profileCard: {
    backgroundColor: '#FFF1E6', // Light peach background matching reference
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
  },
  profileInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#E5E7EB',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF1E6',
  },
  userDetails: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  userInfoText: {
    fontSize: 12,
    color: '#52525B',
    marginBottom: 2,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  memberBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D97706',
  },
  quoteContainer: {
    position: 'absolute',
    right: 16,
    top: 20,
    width: 80,
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#71717A',
    textAlign: 'center',
    lineHeight: 16,
  },
  quoteUnderline: {
    width: 40,
    height: 1.5,
    backgroundColor: '#A1A1AA',
    marginTop: 4,
    transform: [{ rotate: '-5deg' }],
  },
  quoteUnderline2: {
    width: 30,
    height: 1.5,
    backgroundColor: '#A1A1AA',
    marginTop: 2,
    marginLeft: 10,
    transform: [{ rotate: '-3deg' }],
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E4E4E7',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuIconContainer: {
    width: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 36,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#DC2626',
  },
});
