import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, style, secureTextEntry, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = secureTextEntry;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label.toUpperCase()}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input, 
            style, 
            isPassword && { paddingRight: 50 },
            isFocused && styles.inputFocused
          ]}
          placeholderTextColor="rgba(148, 163, 184, 0.4)"
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
              <EyeOff size={18} color="rgba(148, 163, 184, 0.6)" />
            ) : (
              <Eye size={18} color="rgba(148, 163, 184, 0.6)" />
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
    color: '#fff', 
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
    backgroundColor: 'rgba(30, 41, 59, 0.2)', // slate-800/20
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)', // slate-600/50
  },
  inputFocused: {
    borderColor: '#818cf8', // indigo-400
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
  },
  eyeBtn: {
    position: 'absolute',
    right: 16,
    padding: 4,
  }
});

export default Input;
