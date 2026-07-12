import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

export default function SplashScreen({ navigation }) {
  const { theme } = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.88)).current;

  // Premium entrance motion
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 55,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [fadeAnim, scaleAnim, translateYAnim, navigation]);

  return (
    <LinearGradient
      colors={['#FFF7FB', '#F8F5FF', '#EEF4FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Ambient luxury background elements */}
      <View style={styles.topGlow} />
      <View style={styles.bottomGlow} />
      <View style={styles.floatingOrbOne} />
      <View style={styles.floatingOrbTwo} />
      <View style={styles.floatingOrbThree} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: translateYAnim },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        {/* Premium glass logo container */}
        <View style={styles.logoWrapper}>
          <LinearGradient
            colors={['#A855F7', '#7C3AED', '#4F46E5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoCircle}
          >
            {/* Monogram depth layer */}
            <View style={styles.logoInnerGlow}>
              <Text style={styles.logoIcon}>◈</Text>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.title}>Planix</Text>

        <Text style={styles.subtitle}>
          Turn Plans into Progress.
        </Text>

        {/* Elegant accent line */}
        <View style={styles.accentLine} />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  /* Premium ambient lighting */
  topGlow: {
    position: 'absolute',
    top: -120,
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: 'rgba(168,85,247,0.12)',
  },

  bottomGlow: {
    position: 'absolute',
    bottom: -180,
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: 'rgba(79,70,229,0.08)',
  },

  /* Floating luxury shapes */
  floatingOrbOne: {
    position: 'absolute',
    top: 110,
    right: 40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },

  floatingOrbTwo: {
    position: 'absolute',
    bottom: 160,
    left: -25,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(168,85,247,0.08)',
  },

  floatingOrbThree: {
    position: 'absolute',
    top: 220,
    left: 35,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },

  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  /* Premium logo treatment */
  logoWrapper: {
    marginBottom: 32,

    shadowColor: '#7C3AED',
    shadowOpacity: 0.35,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 18,
    },
    elevation: 24,
  },

  logoCircle: {
    width: 118,
    height: 118,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.45)',
  },

  /* Glassmorphism-inspired inner layer */
  logoInnerGlow: {
    width: 88,
    height: 88,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(255,255,255,0.12)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },

  logoIcon: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -2,

    textShadowColor: 'rgba(255,255,255,0.35)',
    textShadowRadius: 12,
  },

  /* Premium brand typography */
  title: {
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 1.4,
    color: '#1E1B4B',
  },

  subtitle: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.8,
    textAlign: 'center',
    color: '#6D28D9',
    maxWidth: 260,
    lineHeight: 24,
  },

  /* Luxury accent divider */
  accentLine: {
    marginTop: 28,
    width: 64,
    height: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(124,58,237,0.25)',
  },
});