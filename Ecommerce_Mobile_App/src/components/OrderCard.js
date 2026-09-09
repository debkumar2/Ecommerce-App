import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ChevronRight, Package, Truck, Clock, XCircle, Calendar } from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function OrderCard({ order }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return { bg: '#D1FAE5', text: '#047857', Icon: Package, rightIcon: Calendar };
      case 'Shipped':
        return { bg: '#DBEAFE', text: '#1D4ED8', Icon: Truck, rightIcon: Truck };
      case 'Processing':
        return { bg: '#FEF3C7', text: '#B45309', Icon: Clock, rightIcon: Clock };
      case 'Cancelled':
        return { bg: '#FCE7F3', text: '#BE185D', Icon: XCircle, rightIcon: XCircle };
      default:
        return { bg: '#F3F4F6', text: '#374151', Icon: Package, rightIcon: Calendar };
    }
  };

  const statusStyle = getStatusStyle(order.status);
  const StatusIcon = statusStyle.Icon;
  const RightIcon = statusStyle.rightIcon;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.orderNumber}>Order #{order.orderNumber}</Text>
          <Text style={styles.placedDate}>Placed on {order.placedDate}</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <StatusIcon size={12} color={statusStyle.text} style={styles.statusIcon} />
            <Text style={[styles.statusText, { color: statusStyle.text }]}>{order.status}</Text>
          </View>
          <ChevronRight size={20} color={colors.textSecondary} />
        </View>
      </View>

      <View style={styles.divider} />

      {/* Product Details */}
      <View style={styles.productSection}>
        {/* Left: Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: order.product.imageUrl }} style={styles.image} resizeMode="contain" />
        </View>

        {/* Middle: Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productName} numberOfLines={1}>{order.product.name}</Text>
          <Text style={styles.variants}>{order.product.variants}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{order.product.price}</Text>
            <Text style={styles.qty}>Qty: {order.product.qty}</Text>
          </View>
        </View>

        {/* Right: Actions */}
        <View style={styles.actionContainer}>
          <View style={styles.statusDateRow}>
            <RightIcon size={14} color={colors.textSecondary} style={styles.rightIcon} />
            <Text style={styles.statusDateText}>{order.statusDateText}</Text>
          </View>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{order.actionText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  placedDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 14,
  },
  productSection: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  variants: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    marginRight: 12,
  },
  qty: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  actionContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minWidth: 110,
  },
  statusDateRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  rightIcon: {
    marginTop: 2,
    marginRight: 6,
  },
  statusDateText: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'left',
    lineHeight: 14,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
});
