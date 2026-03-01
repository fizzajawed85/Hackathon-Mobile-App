import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

interface InputProps extends TextInputProps {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, style, secureTextEntry, ...props }) => {
  const { colors, isDark } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = secureTextEntry;

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: isDark ? '#fff' : colors.text }]}>{label.toUpperCase()}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input, 
            { 
              backgroundColor: isDark ? 'rgba(30, 41, 59, 0.2)' : 'rgba(241, 245, 249, 0.5)',
              color: colors.text,
              borderColor: isFocused ? colors.primary : colors.border,
            },
            style, 
            isPassword && { paddingRight: 50 },
          ]}
          placeholderTextColor={isDark ? "rgba(148, 163, 184, 0.4)" : "rgba(100, 116, 139, 0.5)"}
          secureTextEntry={isPassword && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity 
            style={styles.eyeBtn}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <EyeOff size={18} color={isDark ? "rgba(148, 163, 184, 0.6)" : colors.secondaryText} />
            ) : (
              <Eye size={18} color={isDark ? "rgba(148, 163, 184, 0.6)" : colors.secondaryText} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
  },
  eyeBtn: {
    position: 'absolute',
    right: 16,
    padding: 4,
  }
});

export default Input;
