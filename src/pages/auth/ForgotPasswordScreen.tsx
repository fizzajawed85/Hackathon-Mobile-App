import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import * as authService from '../../services/authService';
import GlassCard from '../../components/GlassCard';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import { ArrowRight } from 'lucide-react-native';
import Logo from '../../components/Logo';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      showToast({ message: 'Please enter your email', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      await authService.forgotPassword(email);
      showToast({ message: 'Verification code sent to your email', type: 'success' });
      navigation.navigate('VerifyOtp', { email });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to send reset code';
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
              <Text style={[styles.title, { color: isDark ? '#fff' : colors.text }]}>{t('auth.forgotPasswordTitle')}</Text>
              <Text style={[styles.subtitle, { color: isDark ? '#94a3b8' : colors.secondaryText }]}>{t('auth.forgotPasswordSub')}</Text>
            </View>

            <Input
              label={t('auth.email')}
              placeholder="name@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Button
              title={loading ? t('auth.sending') : t('auth.sendResetCode')}
              icon={<ArrowRight color="#fff" size={20} />}
              onPress={handleSendOtp}
              disabled={loading}
              style={{ width: '100%' }}
            />

            <View style={styles.footer}>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.link, { color: colors.primary }]}>{t('auth.backToLogin')}</Text>
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
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  link: {
    fontSize: 14,
    fontWeight: '800',
  },
});

export default ForgotPasswordScreen;
