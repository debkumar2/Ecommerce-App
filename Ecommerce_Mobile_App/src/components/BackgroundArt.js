import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { colors } from '../theme/colors';

// Top subtle peach/warm curve blob
export const TopBackgroundBlob = () => (
  <View style={styles.topBlobContainer} pointerEvents="none">
    <Svg width="100%" height={160} viewBox="0 0 400 160" preserveAspectRatio="none">
      <Path
        d="M-20 -20 Q 120 110, 240 40 T 420 80 L 420 -20 Z"
        fill="#FDF3EB"
        opacity={0.8}
      />
      <Path
        d="M100 -20 Q 280 80, 420 10 L 420 -20 Z"
        fill="#FDEBE0"
        opacity={0.6}
      />
    </Svg>
  </View>
);

// Login Bottom Illustration: Shopping bags & slogan "Best Products For a Better You"
export const LoginBottomArt = () => (
  <View style={styles.bottomContainer} pointerEvents="none">
    <Svg width="100%" height={140} viewBox="0 0 400 140" preserveAspectRatio="none">
      {/* Background shape */}
      <Path
        d="M-20 70 Q 150 20, 420 60 L 420 160 L -20 160 Z"
        fill="#FDF3EB"
        opacity={0.9}
      />
      {/* Peach Shopping Bag Left */}
      <G transform="translate(25, 45)">
        <Rect x="10" y="25" width="45" height="55" rx="6" fill="#F49A73" />
        {/* Handles */}
        <Path d="M22 25 C22 12, 43 12, 43 25" stroke="#D47347" strokeWidth="3" fill="none" />
      </G>
      {/* Golden Shopping Bag Right */}
      <G transform="translate(55, 60)">
        <Rect x="10" y="20" width="38" height="45" rx="5" fill="#EEA76D" />
        <Path d="M20 20 C20 10, 38 10, 38 20" stroke="#CD8448" strokeWidth="2.5" fill="none" />
      </G>
    </Svg>
    <View style={styles.loginTaglineWrapper}>
      <Text style={styles.handwrittenText}>Best Products</Text>
      <Text style={styles.handwrittenText}>For a Better You</Text>
    </View>
  </View>
);

// Signup Bottom Illustration: Shopping bag with handles, leaves, and taglines "Same Cart Brighter Days", "Good Things Await"
export const SignupBottomArt = () => (
  <View style={styles.bottomContainer} pointerEvents="none">
    <Svg width="100%" height={150} viewBox="0 0 400 150" preserveAspectRatio="none">
      {/* Warm curve background */}
      <Path
        d="M-20 60 Q 160 10, 420 50 L 420 160 L -20 160 Z"
        fill="#FDF3EB"
        opacity={0.9}
      />
      {/* Plant leaves behind bag */}
      <G transform="translate(300, 30)">
        <Path d="M10 50 Q 0 10, -20 0 Q 5 20, 10 50 Z" fill="#6B9080" />
        <Path d="M15 50 Q 30 15, 45 10 Q 25 30, 15 50 Z" fill="#A4C3B2" />
      </G>
      {/* Orange Shopping Bag on bottom right */}
      <G transform="translate(315, 40)">
        <Rect x="5" y="25" width="60" height="70" rx="8" fill="#E85D2A" />
        <Path d="M22 25 C22 8, 48 8, 48 25" stroke="#C4481A" strokeWidth="3.5" fill="none" />
        {/* Heart tag */}
        <Circle cx="35" cy="72" r="3" fill="#FFFFFF" />
      </G>
    </Svg>

    <View style={styles.signupLeftTextWrapper}>
      <Text style={styles.handwrittenText}>Same Cart</Text>
      <Text style={styles.handwrittenText}>Brighter Days</Text>
    </View>

    <View style={styles.signupRightTextWrapper}>
      <Text style={styles.bagTextTitle}>Good</Text>
      <Text style={styles.bagTextTitle}>Things</Text>
      <Text style={styles.bagTextTitle}>Await</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  topBlobContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  bottomContainer: {
    position: 'relative',
    width: '100%',
    marginTop: 20,
  },
  loginTaglineWrapper: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    alignItems: 'flex-end',
  },
  handwrittenText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#8A7A70',
    fontWeight: '500',
    lineHeight: 18,
  },
  signupLeftTextWrapper: {
    position: 'absolute',
    left: 24,
    bottom: 24,
  },
  signupRightTextWrapper: {
    position: 'absolute',
    right: 48,
    bottom: 45,
    alignItems: 'center',
  },
  bagTextTitle: {
    fontSize: 11,
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 14,
  },
});
