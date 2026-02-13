import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import * as authService from '../../services/authService';
import GlassCard from '../../components/GlassCard';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import { Lock, RotateCcw } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ResetPassword'>;
type ResetPasswordRouteProp = RouteProp<RootStackParamList, 'ResetPassword'>;

const ResetPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ResetPasswordRouteProp>();
  const { token } = route.params || {};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      Alert.alert('Success', 'Password has been reset successfully', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Reset failed';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <GlassCard>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Lock color="#fff" size={24} />
          </View>
          <Text style={styles.title}>New Password</Text>
          <Text style={styles.subtitle}>Create a strong password to secure your account.</Text>
        </View>

        <Input 
          label="New Password" 
          placeholder="••••••••" 
          secureTextEntry 
          value={password}
          onChangeText={setPassword}
        />
        <Input 
          label="Confirm Password" 
          placeholder="••••••••" 
          secureTextEntry 
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Button 
          title={loading ? "Updating..." : "Update Password"} 
          icon={<RotateCcw color="#fff" size={18} />}
          onPress={handleReset} 
          disabled={loading}
        />
      </GlassCard>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 32,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
    maxWidth: '85%',
  },
});

export default ResetPasswordScreen;
