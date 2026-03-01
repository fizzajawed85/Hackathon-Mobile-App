import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import GlassCard from './GlassCard';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const Toast = () => {
  const { toast, hideToast } = useToast();
  const { colors, isDark } = useTheme();
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: Platform.OS === 'ios' ? 60 : 40,
          useNativeDriver: true,
          tension: 40,
          friction: 7,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [toast]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle2 color={colors.success} size={20} />;
      case 'error': return <AlertCircle color={colors.danger} size={20} />;
      case 'warning': return <AlertTriangle color={colors.warning} size={20} />;
      default: return <Info color={colors.primary} size={20} />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success': return colors.success + '40';
      case 'error': return colors.danger + '40';
      case 'warning': return colors.warning + '40';
      default: return colors.primary + '40';
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          transform: [{ translateY }],
          opacity,
        }
      ]}
    >
      <GlassCard 
        style={[
          styles.toastCard, 
          { 
            borderColor: getBorderColor(),
            borderWidth: 1.5,
          }
        ]}
        intensity={40}
      >
        <View style={styles.content}>
          <View style={styles.iconBox}>
            {getIcon()}
          </View>
          <Text style={[styles.message, { color: colors.text }]}>{toast.message}</Text>
        </View>
      </GlassCard>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
    paddingHorizontal: 20,
  },
  toastCard: {
    width: '100%',
    maxWidth: width - 40,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});

export default Toast;
