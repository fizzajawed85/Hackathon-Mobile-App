import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import Layout from '../components/Layout';
import { ShieldCheck, LogOut, User as UserIcon } from 'lucide-react-native';

const HomeScreen = () => {
  const { user, logout } = useAuth();

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <GlassCard>
          {/* Header / Branding Section */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <ShieldCheck color="#fff" size={24} />
            </View>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.usernameText}>{user?.username || 'User'}</Text>
            <Text style={styles.subtitle}>
              You have successfully accessed your secure dashboard. All systems are operational.
            </Text>
          </View>

          {/* Account Details Section */}
          <View style={styles.detailsContainer}>
            <View style={styles.accountHeader}>
              <View style={styles.avatarPlaceholder}>
                <UserIcon size={20} color="#818cf8" />
              </View>
              <View>
                <Text style={styles.accountLabel}>ACCOUNT STATUS</Text>
                <View style={styles.statusRow}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Verified & Active</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoList}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Email Address</Text>
                <Text style={styles.infoValue} numberOfLines={1}>{user?.email}</Text>
              </View>
              <View style={[styles.infoItem, styles.noBorder]}>
                <Text style={styles.infoLabel}>Username</Text>
                <Text style={styles.infoValue}>{user?.username}</Text>
              </View>
            </View>
          </View>

          <Button 
            title="Secure Sign Out" 
            onPress={logout} 
            icon={<LogOut size={16} color="#fff" />}
          />
        </GlassCard>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(71, 85, 105, 0.2)',
    paddingBottom: 24,
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
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '400',
  },
  usernameText: {
    color: '#818cf8',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
    maxWidth: '85%',
  },
  detailsContainer: {
    marginBottom: 32,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.3)',
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(71, 85, 105, 0.4)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  accountLabel: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  statusText: {
    color: '#10b981',
    fontSize: 13,
    fontWeight: '600',
  },
  infoList: {
    backgroundColor: 'rgba(30, 41, 59, 0.2)',
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(71, 85, 105, 0.2)',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    maxWidth: '60%',
  },
});

export default HomeScreen;
