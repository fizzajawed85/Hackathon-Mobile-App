import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, View } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ title, icon, style, ...props }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      activeOpacity={0.7} 
      {...props}
    >
      <View style={styles.content}>
        <Text style={styles.text}>{title}</Text>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)', // slate-900/60
    borderWidth: 1,
    borderColor: 'rgba(129, 140, 248, 0.4)', // light indigo-400
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    opacity: 0.6,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default Button;
