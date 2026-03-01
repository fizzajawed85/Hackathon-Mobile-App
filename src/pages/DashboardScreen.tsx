import React, { useEffect, useState, memo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform,
  AppState,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import Logo from '../components/Logo';
import { useLanguage } from '../context/LanguageContext';
import {
  Bell,
  Search,
  Calendar,
  ClipboardList,
  Bot,
  Heart,
  Activity,
  Footprints,
  Moon,
  ChevronRight,
  Sun,
  Scan,
} from 'lucide-react-native';
import axios from 'axios';
import { BASE_API_URL } from '../constants/Config';
import { getNotifications } from '../services/medicalService';
import { useFocusEffect } from '@react-navigation/native';
import { Pedometer, Accelerometer } from 'expo-sensors';
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('window');

// --- Static Memoized Sub-Components ---

const GreetingSection = memo(({ username, colors, t }: { username: string, colors: any, t: any }) => (
  <View style={styles.greetingSection}>
    <Text style={[styles.greetingLabel, { color: colors.secondaryText }]}>{t('dashboard.welcome')}</Text>
    <Text style={[styles.greetingName, { color: colors.text }]}>{username}</Text>
  </View>
));

const HeroSection = memo(({ appointment, colors, isDark, navigation, t }: { appointment: any, colors: any, isDark: boolean, navigation: any, t: any }) => {
  if (!appointment) {
    return (
      <View style={styles.section}>
        <GlassCard style={styles.heroGlassCard} intensity={40}>
          <View style={styles.emptyHeroBody}>
            <View style={[styles.emptyCalIcon, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30' }]}>
              <Calendar color={colors.primary} size={30} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>{t('dashboard.noAppointments')}</Text>
            <Text style={[styles.emptySubtext, { color: colors.secondaryText }]}>{t('dashboard.bookFirstVisit')}</Text>
          </View>
          <View style={[styles.heroActionRow, { borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}>
            <TouchableOpacity
              style={[
                styles.heroSecondaryBtn,
                { borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }
              ]}
              onPress={() => navigation.navigate('Visits', { screen: 'AppointmentHistory' })}
            >
              <Text style={[styles.heroSecondaryBtnText, { color: colors.text }]}>{t('dashboard.history')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.heroPrimaryBtn, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate('MainTabs', { screen: 'Book' })}
            >
              <Text style={styles.heroPrimaryBtnText}>{t('dashboard.bookNow')}</Text>
              <ChevronRight color="#fff" size={16} />
            </TouchableOpacity>
          </View>
        </GlassCard>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <GlassCard style={styles.heroGlassCard} intensity={40}>
        <View style={styles.heroTopRow}>
          <View style={[styles.statusPill,
          appointment.status === 'Pending'
            ? { backgroundColor: '#f59e0b20', borderColor: '#f59e0b50' }
            : { backgroundColor: colors.primary + '20', borderColor: colors.primary + '40' }
          ]}>
            <View style={[styles.statusDot,
            { backgroundColor: appointment.status === 'Pending' ? '#f59e0b' : colors.primary }
            ]} />
            <Text style={[styles.statusPillText,
            { color: appointment.status === 'Pending' ? '#f59e0b' : colors.primary }
            ]}>
              {appointment.status === 'Pending' ? t('appointments.status.pending') : t('appointments.upcoming')}
            </Text>
          </View>
          <Text style={[styles.heroCardLabel, { color: colors.secondaryText }]}>{t('dashboard.nextVisit')}</Text>
        </View>

        <View style={styles.heroDoctorRow}>
          <View style={[styles.heroAvatarRing, { borderColor: colors.primary + '60' }]}>
            <Image
              source={{
                uri: appointment.doctorImageUrl ||
                  'https://images.unsplash.com/photo-1559839734-2b71f1e3c77d?q=80&w=200&auto=format&fit=crop'
              }}
              style={styles.heroDocAvatar}
              resizeMode="cover"
            />
          </View>
          <View style={styles.heroDocInfo}>
            <Text style={[styles.heroDocName, { color: colors.text }]}>{appointment.doctorName}</Text>
            <Text style={[styles.heroDocSpecialty, { color: colors.secondaryText }]}>{appointment.specialty}</Text>
            <View style={styles.heroChipsRow}>
              <View style={[styles.heroChip, { backgroundColor: colors.primary + '18', borderColor: colors.primary + '35' }]}>
                <Text style={[styles.heroChipText, { color: colors.primary }]}>{appointment.date}</Text>
              </View>
              <View style={[styles.heroChip, { backgroundColor: colors.primary + '18', borderColor: colors.primary + '35' }]}>
                <Text style={[styles.heroChipText, { color: colors.primary }]}>{appointment.time}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.heroActionRow, { borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}>
          <TouchableOpacity
            style={[styles.heroSecondaryBtn, { borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)' }]}
            onPress={() => navigation.navigate('Visits', { screen: 'AppointmentHistory' })}
          >
            <Text style={[styles.heroSecondaryBtnText, { color: colors.text }]}>{t('dashboard.history')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.heroPrimaryBtn, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Visits' })}
          >
            <Text style={styles.heroPrimaryBtnText}>{t('dashboard.allVisits')}</Text>
            <ChevronRight color="#fff" size={16} />
          </TouchableOpacity>
        </View>
      </GlassCard>
    </View>
  );
});

const ActionCard = memo(({ icon, title, onPress, colors }: { icon: any, title: string, onPress: () => void, colors: any }) => (
  <View style={styles.actionCardWrapper}>
    <TouchableOpacity onPress={onPress}>
      <GlassCard style={styles.actionGlassCard}>
        <View style={[styles.actionIconContainer, { backgroundColor: colors.primary + '15' }]}>
          {icon}
        </View>
        <Text style={[styles.actionTitle, { color: colors.text }]}>{title}</Text>
      </GlassCard>
    </TouchableOpacity>
  </View>
));

const StatCard = memo(({ stat, colors, onScan }: { stat: any, colors: any, onScan?: () => void }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'heart_rate': return <Heart color="#f43f5e" size={24} />;
      case 'bp': return <Activity color="#6366f1" size={24} />;
      case 'steps': return <Footprints color="#10b981" size={24} />;
      case 'sleep': return <Moon color="#f59e0b" size={24} />;
      default: return <Activity color={colors.primary} size={24} />;
    }
  };
  const getIconBg = (id: string) => {
    switch (id) {
      case 'heart_rate': return '#f43f5e20';
      case 'bp': return '#6366f120';
      case 'steps': return '#10b98120';
      case 'sleep': return '#f59e0b20';
      default: return colors.primary + '20';
    }
  };

  return (
    <GlassCard style={styles.statGlassCard}>
      <View style={styles.statHeader}>
        <View style={[styles.statIconWrapper, { backgroundColor: getIconBg(stat.id) }]}>
          {getIcon(stat.id)}
        </View>
        {(stat.id === 'heart_rate' || stat.id === 'bp') && (
          <TouchableOpacity
            style={[styles.scanSmallBtn, { backgroundColor: colors.primary + '15' }]}
            onPress={onScan}
          >
            <Scan color={colors.primary} size={14} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.statMain}>
        <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
        <Text style={[styles.statUnit, { color: colors.secondaryText }]}>{stat.unit}</Text>
        <Text style={[styles.statLabel, { color: colors.secondaryText }]}>{stat.label}</Text>
        <View style={styles.trendRow}>
          <Activity color={stat.status === 'up' ? colors.success : colors.danger} size={12} />
          <Text style={[styles.statTrend, { color: stat.status === 'up' ? colors.success : colors.danger }]}>
            {stat.trend}
          </Text>
        </View>
      </View>
    </GlassCard>
  );
});

const MedicationSection = memo(({ medication, colors, isDark, t }: { medication: any, colors: any, isDark: boolean, t: any }) => {
  if (!medication) return null;
  return (
    <View style={styles.medicationSection}>
      <Text style={[styles.sectionTitle, { color: colors.text, paddingHorizontal: 20 }]}>{t('dashboard.dailyMedication')}</Text>
      <GlassCard style={styles.medGlassCard} intensity={40}>
        <View style={styles.medContent}>
          <Text style={[styles.medLabel, { color: colors.primary }]}>{t('dashboard.nextDose')}</Text>
          <Text style={[styles.medName, { color: colors.text }]}>{medication.name}</Text>
          <Text style={[styles.medDetail, { color: colors.secondaryText }]}>
            {medication.dosage} • {medication.instruction}
          </Text>
          <Text style={[styles.medTime, { color: colors.secondaryText }]}>8:00 AM</Text>
        </View>
        <TouchableOpacity
          style={[styles.medDoneBtn, { backgroundColor: colors.primary }]}
          activeOpacity={0.8}
        >
          <Text style={styles.medDoneBtnText}>{t('dashboard.done')}</Text>
        </TouchableOpacity>
      </GlassCard>
    </View>
  );
});

// --- Main Page Component ---

const DashboardScreen = () => {
  const navigation = useNavigation<any>();
  const { user, token } = useAuth();
  const { colors, toggleTheme, isDark } = useTheme();
  const { showToast } = useToast();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [sleepData, setSleepData] = useState({ duration: '0h 0m', quality: '--' });

  const fetchNotificationCount = useCallback(async () => {
    try {
      const data = await getNotifications();
      const unread = data.filter((n: any) => !n.read).length;
      setUnreadCount(unread);
    } catch (err) {
      console.log('Error fetching notification count:', err);
    }
  }, []);

  const fetchDashboardData = useCallback(async () => {
    try {
      if (!token) return;
      const response = await axios.get(`${BASE_API_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(response.data);
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error.response?.status, error.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const subscribeToAccelerometer = useCallback(() => {
    // 40ms interval (25Hz) for better real-time capture
    Accelerometer.setUpdateInterval(40);
    let isPeak = false;
    // Lower threshold (1.15) makes it more sensitive to light walking
    const threshold = 1.15;
    const resetThreshold = 1.08;

    return Accelerometer.addListener(data => {
      // Calculate 3D magnitude
      const magnitude = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);

      if (magnitude > threshold && !isPeak) {
        isPeak = true;
        setCurrentStepCount(prev => {
          const newCount = prev + 1;
          // Periodically save to SecureStore (every 10 steps to not spam storage)
          if (newCount % 10 === 0) {
            SecureStore.setItemAsync('last_steps', newCount.toString());
          }
          return newCount;
        });
      } else if (magnitude < resetThreshold) {
        isPeak = false;
      }
    });
  }, []);

  const subscribeToPedometer = async () => {
    try {
      const isAvailable = await Pedometer.isAvailableAsync();

      if (!isAvailable) {
        console.log('Pedometer hardware not available, falling back to Accelerometer');
        showToast({ message: 'Using Smart-Motion for step tracking.', type: 'info' });
        return subscribeToAccelerometer();
      }

      const { granted, canAskAgain } = await Pedometer.getPermissionsAsync();

      let finalPermission = granted;

      if (!granted && canAskAgain) {
        const { granted: askGranted } = await Pedometer.requestPermissionsAsync();
        finalPermission = askGranted;
      }

      if (!finalPermission) {
        showToast({
          message: 'Step tracking needs "Physical Activity" permission. Please enable it in Settings.',
          type: 'warning',
          duration: 5000
        });
        return;
      }

      const end = new Date();
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      let pastSteps = 0;
      try {
        const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
        if (pastStepCountResult) {
          pastSteps = pastStepCountResult.steps;
          setCurrentStepCount(pastSteps);
        }
      } catch (e) {
        console.log('Error getting past steps:', e);
      }

      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(pastSteps + result.steps);
      });
    } catch (error) {
      console.log('Pedometer subscription error:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    let subscription: any;

    subscribeToPedometer().then(sub => {
      subscription = sub;
    });

    return () => {
      if (subscription && subscription.remove) {
        subscription.remove();
      }
    };
  }, [token, fetchDashboardData]);

  useFocusEffect(
    useCallback(() => {
      fetchDashboardData();
      fetchNotificationCount();
      checkSleepData();
    }, [fetchDashboardData, fetchNotificationCount])
  );

  const checkSleepData = async () => {
    try {
      const lastActive = await SecureStore.getItemAsync('last_active_time');
      const now = Date.now();

      if (lastActive) {
        const diffMs = now - parseInt(lastActive);
        const hours = diffMs / (1000 * 60 * 60);

        if (hours >= 4) { // Only count as sleep if > 4 hours inactivity
          const displayHours = Math.floor(hours);
          const displayMins = Math.round((hours - displayHours) * 60);

          // Calculate Quality based on Heart Rate (if available)
          const lastHR = await SecureStore.getItemAsync('last_scanned_hr');
          let quality = 'Good';
          if (lastHR) {
            const hr = parseInt(lastHR);
            if (hr < 60) quality = 'Excellent';
            else if (hr > 85) quality = 'Fair';
          }

          setSleepData({
            duration: `${displayHours}h ${displayMins}m`,
            quality: quality
          });
        }
      }

      // Update last active time
      await SecureStore.setItemAsync('last_active_time', now.toString());
    } catch (e) {
      console.log('Sleep track error:', e);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkSleepData();
      } else if (nextAppState === 'background') {
        SecureStore.setItemAsync('last_active_time', Date.now().toString());
        // Save final step count when app closes
        SecureStore.setItemAsync('last_steps', currentStepCount.toString());
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);


  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Layout includeBottomSafeArea={false}>
      {/* Natural Fixed Logo Bar */}
      <View style={styles.headerContainerFixed}>
        <Logo size="small" horizontal />
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={toggleTheme}
            style={[styles.headerActionBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}
          >
            {isDark ? <Sun color={colors.warning} size={20} /> : <Moon color={colors.primary} size={20} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Bell color={colors.text} size={24} />
            {unreadCount > 0 && <View style={[styles.notificationDot, { borderColor: colors.background }]} />}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        removeClippedSubviews={Platform.OS === 'android'}
        scrollEventThrottle={16}
      >
        <GreetingSection
          username={user?.username || dashboardData?.user?.username || 'Patient'}
          colors={colors}
          t={t}
        />

        <HeroSection
          appointment={dashboardData?.upcomingAppointment}
          colors={colors}
          isDark={isDark}
          navigation={navigation}
          t={t}
        />

        {/* Quick Actions Grid */}
        <View style={styles.gridSection}>
          <View style={styles.gridRow}>
            <ActionCard
              icon={<Bot color={colors.primary} size={24} />}
              title={t('dashboard.consultation')}
              onPress={() => navigation.navigate('ConsultationBot')}
              colors={colors}
            />
            <ActionCard
              icon={<Activity color={colors.primary} size={24} />}
              title={t('dashboard.bookVisit')}
              onPress={() => navigation.navigate('MainTabs', { screen: 'Book' })}
              colors={colors}
            />
          </View>
          <View style={styles.gridRow}>
            <ActionCard
              icon={<Search color={colors.primary} size={24} />}
              title={t('dashboard.findDoctor')}
              onPress={() => navigation.navigate('MainTabs', { screen: 'Book' })}
              colors={colors}
            />
            <ActionCard
              icon={<ClipboardList color={colors.primary} size={24} />}
              title={t('dashboard.myRecords')}
              onPress={() => navigation.navigate('MainTabs', { screen: 'Records' })}
              colors={colors}
            />
          </View>
        </View>

        {/* Health Statistics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('dashboard.healthStats')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsScroll}
          >
            {dashboardData?.statistics?.map((stat: any) => {
              let displayValue = stat.value;
              let displayLabel = stat.label;

              if (stat.id === 'steps') {
                displayValue = currentStepCount.toLocaleString();
                displayLabel = t('dashboard.steps');
              } else if (stat.id === 'sleep') {
                displayValue = sleepData.duration;
                displayLabel = `${t('dashboard.sleep')} Quality: ${sleepData.quality}`;
              } else if (stat.id === 'water') {
                displayLabel = t('dashboard.water');
              } else if (stat.id === 'heart_rate') {
                displayLabel = t('dashboard.bpm');
              }

              return (
                <StatCard
                  key={stat.id}
                  stat={{ ...stat, value: displayValue, label: displayLabel }}
                  colors={colors}
                  onScan={() => navigation.navigate('HealthScanner', { scanType: stat.id })}
                />
              );
            })}
          </ScrollView>
        </View>


        <MedicationSection
          medication={dashboardData?.medication}
          colors={colors}
          isDark={isDark}
          t={t}
        />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerContainerFixed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    height: 70,
    zIndex: 100,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  headerActionBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  notificationBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    end: 10,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#f43f5e',
    borderWidth: 1.5
  },
  greetingSection: { paddingHorizontal: 20, paddingTop: 5, paddingBottom: 25 },
  greetingLabel: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  greetingName: { fontSize: 32, fontWeight: '900', letterSpacing: -0.5, marginTop: 4 },

  section: { paddingHorizontal: 20, marginTop: 25 },
  sectionTitle: { fontSize: 17, fontWeight: '800', marginBottom: 15, letterSpacing: -0.2 },

  gridSection: { paddingHorizontal: 16, marginTop: 25 },
  gridRow: { flexDirection: 'row' },
  actionCardWrapper: { flex: 1, padding: 8 },
  actionGlassCard: {
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconContainer: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  actionTitle: { fontSize: 13, fontWeight: '800' },
  statsScroll: { paddingHorizontal: 20, paddingBottom: 10 },

  heroGlassCard: { borderRadius: 26, overflow: 'hidden' },
  heroTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 18, paddingBottom: 12 },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, borderWidth: 1 },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  statusPillText: { fontSize: 12, fontWeight: '800' },
  heroCardLabel: { fontSize: 12, fontWeight: '700' },

  heroDoctorRow: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingHorizontal: 20, paddingBottom: 18 },
  heroAvatarRing: { width: 88, height: 88, borderRadius: 26, borderWidth: 2.5, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  heroDocAvatar: { width: 88, height: 88, borderRadius: 24 },
  heroDocInfo: { flex: 1 },
  heroDocName: { fontSize: 18, fontWeight: '900', letterSpacing: -0.3 },
  heroDocSpecialty: { fontSize: 13, fontWeight: '600', marginTop: 3, marginBottom: 12 },
  heroChipsRow: { flexDirection: 'row', gap: 8 },
  heroChip: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1 },
  heroChipText: { fontSize: 12, fontWeight: '800' },

  heroActionRow: { flexDirection: 'row', borderTopWidth: 1 },
  heroSecondaryBtn: { flex: 1, paddingVertical: 17, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1 },
  heroSecondaryBtnText: { fontSize: 14, fontWeight: '800' },
  heroPrimaryBtn: { flex: 1.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 17, gap: 5 },
  heroPrimaryBtnText: { fontSize: 14, fontWeight: '900', color: '#fff' },

  emptyHeroBody: { alignItems: 'center', paddingTop: 28, paddingBottom: 20, paddingHorizontal: 20 },
  emptyCalIcon: { width: 70, height: 70, borderRadius: 35, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  emptyTitle: { fontSize: 17, fontWeight: '900', marginBottom: 6 },
  emptySubtext: { fontSize: 13, fontWeight: '600', textAlign: 'center', opacity: 0.7 },

  medicationSection: { marginTop: 30, marginBottom: 8 },
  medGlassCard: {
    borderRadius: 22,
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    overflow: 'hidden',
  },
  medContent: { flex: 1, paddingVertical: 18, paddingStart: 20, paddingEnd: 12 },
  medLabel: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 },
  medName: { fontSize: 16, fontWeight: '900' },
  medDetail: { fontSize: 12, fontWeight: '500', marginTop: 3 },
  medTime: { fontSize: 12, fontWeight: '700', marginTop: 6 },
  medDoneBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginEnd: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medDoneBtnText: { fontSize: 14, fontWeight: '900', color: '#fff' },

  statGlassCard: {
    width: 165,
    padding: 20,
    borderRadius: 28,
    marginEnd: 14,
    alignItems: 'center',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  scanSmallBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIconWrapper: { width: 54, height: 54, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  statMain: { alignItems: 'center' },
  statValue: { fontSize: 26, fontWeight: '900', letterSpacing: -0.5 },
  statUnit: { fontSize: 13, fontWeight: '700', marginTop: 2 },
  statLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 6, textAlign: 'center' },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 10 },
  statTrend: { fontSize: 11, fontWeight: '900' },
});

export default DashboardScreen;
