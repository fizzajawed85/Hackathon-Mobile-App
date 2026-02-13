import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import * as authService from '../../services/authService';
import GlassCard from '../../components/GlassCard';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import { Mail, ShieldCheck } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'VerifyOtp'>;
type VerifyOtpRouteProp = RouteProp<RootStackParamList, 'VerifyOtp'>;

const VerifyOtpScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<VerifyOtpRouteProp>();
  const { email } = route.params || {};

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length < 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit verification code');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.verifyOtp(email, otpString);
      Alert.alert('Verified', 'Code verified successfully', [
        { text: 'OK', onPress: () => navigation.navigate('ResetPassword', { token: res.resetToken }) }
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Verification failed';
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
            <Mail color="#fff" size={24} />
          </View>
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.subtitle}>Enter the 6-digit code sent to {email}</Text>
        </View>

        <View style={styles.otpContainer}>
          <Text style={styles.label}>VERIFICATION CODE</Text>
          <View style={styles.grid}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => { inputs.current[index] = ref; }}
                style={styles.otpBox}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                placeholder="•"
                placeholderTextColor="rgba(148, 163, 184, 0.3)"
              />
            ))}
          </View>
        </View>

        <Button 
          title={loading ? "Verifying..." : "Verify Code"} 
          icon={<ShieldCheck color="#fff" size={18} />}
          onPress={handleVerify} 
          disabled={loading}
        />

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Change Email</Text>
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
  otpContainer: {
    marginBottom: 32,
  },
  label: {
    color: '#fff', 
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 20,
    marginLeft: 4,
    textTransform: 'uppercase', // Ensuring it's always uppercase properly
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  otpBox: {
    width: 42,
    height: 52,
    backgroundColor: 'rgba(30, 41, 59, 0.2)',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#818cf8', // indigo-400
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  link: {
    color: '#818cf8',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default VerifyOtpScreen;
