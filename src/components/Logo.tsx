import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Stethoscope } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

const { height } = Dimensions.get('window');

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  horizontal?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true, horizontal = false }) => {
  const { colors, isDark } = useTheme();

  const getSizes = () => {
    switch (size) {
      case 'small':
        return { icon: 20, font: 16, ring: 36, padding: 4 };
      case 'large':
        return { icon: 42, font: 30, ring: 84, padding: 8 };
      default:
        return { icon: 28, font: 22, ring: 60, padding: 6 };
    }
  };

  const sizes = getSizes();

  return (
    <View style={[styles.container, horizontal && styles.horizontalContainer]}>
      <View 
        style={[
          styles.logoRing, 
          { 
            width: sizes.ring, 
            height: sizes.ring, 
            borderRadius: sizes.ring / 2,
            borderColor: colors.primary + '50',
            backgroundColor: isDark ? colors.primary + '15' : colors.primary + '08',
            marginBottom: horizontal ? 0 : 8,
          }
        ]}
      >
        <Stethoscope color={colors.primary} size={sizes.icon} strokeWidth={2.5} />
      </View>
      
      {showText && (
        <View style={[styles.textContainer, horizontal && { marginLeft: 10 }]}>
          <Text style={[styles.brandTitle, { fontSize: sizes.font, color: colors.text, fontWeight: '600' }]}>
            Med<Text style={{ color: colors.primary, fontWeight: '900' }}>Point</Text>
          </Text>
          <View style={[styles.dot, { backgroundColor: colors.primary }]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoRing: {
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  brandTitle: {
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginLeft: 3,
  },
});

export default Logo;
