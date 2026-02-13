import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import * as authService from '../../services/authService';
import GlassCard from '../../components/GlassCard';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import { KeyRound, Send } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      await authService.forgotPassword(email);
      Alert.alert('Success', 'Verification code sent to your email', [
        { text: 'OK', onPress: () => navigation.navigate('VerifyOtp', { email }) }
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to send reset code';
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
              <KeyRound color="#fff" size={24} />
            </View>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter your email to receive a verification code.</Text>
          </View>

          <Input 
            label="Email Address" 
            placeholder="name@company.com" 
            keyboardType="email-address" 
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Button 
            title={loading ? "Sending..." : "Send Verification Code"} 
            icon={<Send color="#fff" size={18} />}
            onPress={handleSendOtp} 
            disabled={loading}
          />

          <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>Back to Login</Text>
            </TouchableOpacity>
        </View>
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
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  link: {
    color: '#94a3b8', // slate-400 as per user request
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ForgotPasswordScreen;
