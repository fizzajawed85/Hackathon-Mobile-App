import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  intensity?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, intensity = 40, style, ...props }) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <BlurView intensity={intensity} tint="dark" style={styles.blur}>
        <View style={styles.content}>
          {children}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 40, // 2.5rem
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.5)', // slate-700/50
    backgroundColor: 'rgba(15, 23, 42, 0.4)', // slate-900/40
  },
  blur: {
    width: '100%',
  },
  content: {
    padding: 24,
  },
});

export default GlassCard;
