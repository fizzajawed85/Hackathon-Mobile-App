import { View, StyleSheet, ViewProps } from 'react-native';
import React, { memo } from 'react';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  intensity?: number;
}

const GlassCard: React.FC<GlassCardProps> = memo(({ children, intensity = 20, style, ...props }) => {
  const { isDark, colors } = useTheme();
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.45)' : 'rgba(255, 255, 255, 0.75)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
        },
        style
      ]} 
      {...props}
    >
      <BlurView intensity={intensity} tint={isDark ? "dark" : "light"} style={styles.blur}>
        <View style={styles.content}>
          {children}
        </View>
      </BlurView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
  },
  blur: {
    width: '100%',
  },
  content: {
    padding: 0, // Removed hardcoded padding to prevent vertical breakage
  },
});

export default GlassCard;
