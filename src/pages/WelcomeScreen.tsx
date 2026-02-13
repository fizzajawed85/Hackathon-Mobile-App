import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { ShieldCheck, ArrowRight, UserPlus } from 'lucide-react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Layout>
      <GlassCard>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <ShieldCheck color="#fff" size={32} />
          </View>
          <Text style={styles.brandTitle}>Boilerplate</Text>
        </View>

        <Text style={styles.welcomeTitle}>Secure Access</Text>
        <Text style={styles.subtitle}>
          Your premium boilerplate for secure mobile authentication and modern UI designs.
        </Text>

        <View style={styles.footer}>
          <Button 
            title="Get Started" 
            icon={<ArrowRight color="#fff" size={18} />}
            onPress={() => navigation.navigate('Login')} 
          />
          <Button 
            title="Create Account" 
            icon={<UserPlus color="#fff" size={18} />}
            onPress={() => navigation.navigate('Register')}
            style={styles.registerBtn}
          />
        </View>
      </GlassCard>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#4f46e5', // indigo-600
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  brandTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1,
  },
  welcomeTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#94a3b8', // slate-400
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  footer: {
    gap: 12,
  },
  registerBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowOpacity: 0,
    elevation: 0,
  }
});

export default WelcomeScreen;
