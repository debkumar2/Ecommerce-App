import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors } from '../theme/colors';

export default function Checkbox({ checked, onChange, onTermsPress, onPrivacyPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.box, checked && styles.boxChecked]}
        onPress={() => onChange(!checked)}
        activeOpacity={0.8}
      >
        {checked && <Check size={14} color={colors.white} strokeWidth={3} />}
      </TouchableOpacity>

      <Text style={styles.label}>
        I agree to the{' '}
        <Text style={styles.link} onPress={onTermsPress}>
          Terms & Conditions
        </Text>{' '}
        and{' '}
        <Text style={styles.link} onPress={onPrivacyPress}>
          Privacy Policy
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingRight: 10,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.8,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: colors.white,
  },
  boxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  link: {
    color: colors.primary,
    fontWeight: '700',
  },
});
