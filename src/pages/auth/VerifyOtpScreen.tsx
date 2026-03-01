import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView, StatusBar } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import * as authService from '../../services/authService';
import GlassCard from '../../components/GlassCard';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import { Mail, ShieldCheck, CheckCircle2 } from 'lucide-react-native';
import Logo from '../../components/Logo';

import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'VerifyOtp'>;
type VerifyOtpRouteProp = RouteProp<RootStackParamList, 'VerifyOtp'>;

const VerifyOtpScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const { showToast } = useToast();
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
      showToast({ message: 'Please enter the complete 6-digit code', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const res = await authService.verifyOtp(email, otpString);
      showToast({ message: 'Code verified successfully', type: 'success' });
      navigation.navigate('ResetPassword', { token: res.resetToken });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Verification failed';
      showToast({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      >
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

        <View style={styles.contentGroup}>
          <GlassCard style={styles.card}>
            <View style={styles.header}>
              <Logo size="medium" />
              <Text style={[styles.title, { color: colors.text }]}>{t('auth.verificationTitle')}</Text>
              <Text style={[styles.subtitle, { color: colors.secondaryText }]}>{t('auth.verificationSub')}{email}</Text>
            </View>

            <View style={styles.otpContainer}>
              <Text style={[styles.label, { color: isDark ? '#fff' : colors.text }]}>{t('auth.verificationCode')}</Text>
              <View style={styles.grid}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => { inputs.current[index] = ref; }}
                    style={[
                      styles.otpBox,
                      {
                        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.2)' : 'rgba(241, 245, 249, 0.5)',
                        borderColor: digit ? colors.primary : colors.border,
                        color: colors.text,
                      }
                    ]}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    placeholder="•"
                    placeholderTextColor={isDark ? "rgba(148, 163, 184, 0.3)" : "rgba(100, 116, 139, 0.4)"}
                  />
                ))}
              </View>
            </View>

            <Button
              title={loading ? t('auth.verifying') : t('auth.verifyCode')}
              icon={<CheckCircle2 color="#fff" size={20} />}
              onPress={handleVerify}
              disabled={loading}
              style={{ width: '100%' }}
            />

            <View style={styles.footer}>
              <TouchableOpacity onPress={() => showToast({ message: 'Code resent to your email!', type: 'success' })}>
                <Text style={[styles.link, { color: colors.primary }]}>{t('auth.resendCode')}</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  contentGroup: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    borderRadius: 30,
    padding: 24,
    width: '100%',
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: '90%',
  },
  otpContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  otpBox: {
    width: 44,
    height: 54,
    borderRadius: 14,
    borderWidth: 1.5,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  link: {
    fontSize: 14,
    fontWeight: '800',
  },
});

export default VerifyOtpScreen;
