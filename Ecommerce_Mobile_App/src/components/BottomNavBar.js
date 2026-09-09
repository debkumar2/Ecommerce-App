import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, LayoutGrid, Package, Heart, User } from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function BottomNavBar({ activeTab = 'home', onTabPress }) {
  const tabs = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'categories', label: 'Categories', Icon: LayoutGrid },
    { id: 'orders', label: 'Orders', Icon: Package },
    { id: 'wishlist', label: 'Wishlist', Icon: Heart },
    { id: 'profile', label: 'Profile', Icon: User },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.Icon;
        const iconColor = isActive ? colors.primary : '#9CA3AF';

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <IconComponent size={22} color={iconColor} strokeWidth={isActive ? 2.5 : 2} />
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>

            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#9CA3AF',
    marginTop: 4,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 6,
    width: 14,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
