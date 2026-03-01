import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, Platform, StatusBar, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAuth } from '../../context/AuthContext';
import GlassCard from '../../components/GlassCard';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import SocialLogins from '../../components/SocialLogins';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import Logo from '../../components/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, LogIn } from 'lucide-react-native';

const { height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuth();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      showToast({ message: t('auth.fillFields'), type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      showToast({ message: t('common.success'), type: 'success' });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
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
          <View style={styles.headerContainer}>
            <Logo size="medium" />
            <Text style={[styles.welcomeText, { color: colors.text }]}>{t('auth.welcomeBack')}</Text>
          </View>

          <GlassCard style={styles.formCard}>
            <Text style={[styles.cardSubtitle, { color: isDark ? '#94a3b8' : colors.secondaryText }]}>
              {t('auth.signInDesc')}
            </Text>

            <View style={styles.inputSection}>
              <Input
                label={t('auth.email')}
                placeholder="name@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <Input
                label={t('auth.password')}
                placeholder="••••••••"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                style={styles.forgotBtn}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={[styles.forgotText, { color: colors.primary }]}>{t('auth.forgotPassword')}</Text>
              </TouchableOpacity>
            </View>

            <Button
              title={loading ? t('auth.signingIn') : t('auth.signInBtn')}
              icon={<ArrowRight color="#fff" size={20} />}
              onPress={handleLogin}
              disabled={loading}
            />

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <SocialLogins />

            <View style={styles.footer}>
              <Text style={styles.footerText}>{t('auth.newHere')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={[styles.link, { color: colors.primary }]}>{t('auth.createAccount')}</Text>
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 12,
    letterSpacing: -0.5,
  },
  formCard: {
    borderRadius: 30,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  cardSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  inputSection: {
    marginBottom: 10,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: -8,
    marginBottom: 16,
    padding: 4,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
  },
  dividerText: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '800',
    marginHorizontal: 16,
    letterSpacing: 1.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  link: {
    fontSize: 14,
    fontWeight: '800',
  },
});

export default LoginScreen;
