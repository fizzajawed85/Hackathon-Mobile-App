import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, StatusBar } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import * as authService from '../../services/authService';
import GlassCard from '../../components/GlassCard';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import { Lock, RotateCcw } from 'lucide-react-native';
import Logo from '../../components/Logo';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ResetPassword'>;
type ResetPasswordRouteProp = RouteProp<RootStackParamList, 'ResetPassword'>;

const ResetPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const route = useRoute<ResetPasswordRouteProp>();
  const { token } = route.params || {};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      showToast({ message: 'Please fill in all fields', type: 'warning' });
      return;
    }

    if (password !== confirmPassword) {
      showToast({ message: 'Passwords do not match', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      showToast({ message: 'Password reset successful!', type: 'success' });
      navigation.navigate('Login');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Reset failed';
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
              <Text style={[styles.title, { color: colors.text }]}>{t('auth.newPasswordTitle')}</Text>
              <Text style={[styles.subtitle, { color: colors.secondaryText }]}>{t('auth.newPasswordSub')}</Text>
            </View>

            <Input
              label={t('auth.newPassword')}
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Input
              label={t('auth.confirmPassword')}
              placeholder="••••••••"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <Button
              title={loading ? t('auth.updating') : t('auth.updatePassword')}
              icon={<RotateCcw color="#fff" size={18} />}
              onPress={handleReset}
              disabled={loading}
              style={{ width: '100%' }}
            />
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
});

export default ResetPasswordScreen;
