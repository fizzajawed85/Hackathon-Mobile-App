import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Rocket } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import Layout from '../components/Layout';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import Logo from '../components/Logo';

const { height, width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

        <View style={styles.topSection}>
          <Logo size="large" />
        </View>

        <View style={styles.bottomSection}>
          <GlassCard style={styles.formCard}>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : colors.text }]}>
              {t('welcome.titlePart1')}{"\n"}
              <Text style={{ color: colors.primary }}>{t('welcome.titlePart2')}</Text>
            </Text>

            <Text style={[styles.cardSubtitle, { color: isDark ? '#94a3b8' : colors.secondaryText }]}>
              {t('welcome.subtitle')}
            </Text>

            <Button
              variant="premium"
              title={t('welcome.getStarted')}
              icon={<Rocket color="#fff" size={20} strokeWidth={2} />}
              onPress={() => navigation.navigate('Register')}
              style={{ width: '100%' }}
            />

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: isDark ? '#94a3b8' : colors.secondaryText }]}>{t('welcome.alreadyMember')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.signInText, { color: colors.primary }]}>{t('auth.loginLink')}</Text>
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
    paddingBottom: 40,
    justifyContent: 'center',
  },
  topSection: {
    alignItems: 'center',
    paddingTop: height * 0.05,
    paddingBottom: height * 0.02,
  },
  bottomSection: {
    paddingHorizontal: 20,
    marginTop: 0,
  },
  formCard: {
    borderRadius: 30,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  cardSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 36,
    paddingHorizontal: 15,
    opacity: 0.7,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
  },
  signInText: {
    fontSize: 14,
    fontWeight: '800',
  },
});

export default WelcomeScreen;
