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
import { UserPlus } from 'lucide-react-native';

const { height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { register } = useAuth();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      showToast({ message: 'Please fill in all fields', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      await register({ username, email, password });
      showToast({ message: 'Account created! Please login.', type: 'success' });
      navigation.navigate('Login');
    } catch (error: any) {
      console.error('Registration error:', error);
      let message = 'Registration failed. Please try again.';

      if (error.response) {
        message = error.response.data?.message || message;
      } else if (error.request) {
        message = 'Cannot connect to server. Check your local connection.';
      } else {
        message = error.message || message;
      }

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
            <Text style={[styles.welcomeText, { color: colors.text }]}>{t('auth.createAccountTitle')}</Text>
          </View>

          <GlassCard style={styles.formCard}>
            <Text style={[styles.cardSubtitle, { color: isDark ? '#94a3b8' : colors.secondaryText }]}>
              {t('auth.joinCommunity')}
            </Text>

            <View style={styles.inputSection}>
              <Input
                label={t('auth.fullName')}
                placeholder="John Doe"
                value={username}
                onChangeText={setUsername}
              />
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
            </View>

            <Button
              title={loading ? t('auth.creatingAccount') : t('auth.signUpBtn')}
              icon={<UserPlus color="#fff" size={20} />}
              onPress={handleRegister}
              disabled={loading}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>{t('auth.alreadyHaveAccount')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.link, { color: colors.primary }]}>{t('auth.loginLink')}</Text>
              </TouchableOpacity>
            </View>

            <SocialLogins />
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
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '800',
    marginTop: 10,
    letterSpacing: -0.5,
  },
  formCard: {
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  cardSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  inputSection: {
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
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

export default RegisterScreen;
