import React, { useEffect, useState, memo, useCallback, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  StatusBar, TouchableOpacity, ActivityIndicator, RefreshControl,
  Platform, ScrollView, Image, Alert
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getUpcomingAppointments, cancelAppointment, getAllAppointments } from '../services/medicalService';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import Header from '../components/Header';
import {
  ChevronLeft,
  Calendar as CalendarIcon,
  Clock,
  User,
  MoreVertical,
  AlertCircle,
  XCircle,
  Stethoscope,
  Bell,
  Plus,
  FileText,
  CheckCircle2
} from 'lucide-react-native';

const STATUS_COLORS: Record<string, string> = {
  Confirmed: '#10b981',
  Pending: '#f59e0b',
  Cancelled: '#ef4444',
  Completed: '#6366f1',
};

const AppointmentCard = memo(({ item, isUpcoming, colors, isDark, onCancel, onReschedule, t }: any) => {
  if (isUpcoming) {
    return (
      <GlassCard style={[styles.appointmentGlassCard, { borderColor: colors.border }]}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Image
              source={{ uri: item.doctorImageUrl || 'https://images.unsplash.com/photo-1559839734-2b71f1e3c77d?q=80&w=200&auto=format&fit=crop' }}
              style={styles.docAvatar}
              resizeMode="cover"
            />
            <View style={styles.docInfo}>
              <Text style={[styles.docName, { color: colors.text }]} numberOfLines={1}>{item.doctorName}</Text>
              <Text style={[styles.specialty, { color: colors.secondaryText }]} numberOfLines={1}>{item.specialty}</Text>
            </View>
            <TouchableOpacity style={styles.moreBtn}>
              <MoreVertical color={colors.muted} size={20} />
            </TouchableOpacity>
          </View>

          <View style={[styles.infoRow, { backgroundColor: colors.primary + '10' }]}>
            <View style={styles.infoItem}>
              <CalendarIcon color={colors.primary} size={16} />
              <Text style={[styles.infoText, { color: colors.text }]}>{item.date}</Text>
            </View>
            <View style={styles.infoItem}>
              <Clock color={colors.primary} size={16} />
              <Text style={[styles.infoText, { color: colors.text }]}>{item.time}</Text>
            </View>
          </View>

          <View style={styles.cardActionRow}>
            <TouchableOpacity
              style={[styles.cancelBtn, { backgroundColor: colors.danger + '10' }]}
              onPress={() => onCancel(item._id)}
            >
              <Text style={[styles.cancelText, { color: colors.danger }]}>{t('appointments.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.rescheduleBtn, { backgroundColor: colors.primary }]}
              onPress={() => onReschedule(item)}
            >
              <Text style={[styles.rescheduleText, { color: '#fff' }]}>{t('appointments.reschedule')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </GlassCard>
    );
  }

  const statusColor = STATUS_COLORS[item.status] || colors.primary;
  const isCancelled = item.status === 'Cancelled';

  return (
    <GlassCard style={[styles.pastGlassCard, { borderColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }]}>
      <View style={styles.pastCardHeader}>
        <View style={[styles.avatarRing, { borderColor: colors.primary + '20' }]}>
          <Image
            source={{ uri: item.doctorImageUrl || 'https://images.unsplash.com/photo-1559839734-2b71f1e3c77d?q=80&w=200&auto=format&fit=crop' }}
            style={styles.avatarSmall}
          />
        </View>

        <View style={styles.pastInfo}>
          <Text style={[styles.pastDocName, { color: colors.text }]}>{item.doctorName}</Text>
          <Text style={[styles.pastSpecialty, { color: colors.secondaryText }]}>{item.specialty}</Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: statusColor + '10', borderColor: statusColor + '20' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{
            item.status === 'Confirmed' ? t('appointments.status.confirmed') || 'Confirmed' :
              item.status === 'Pending' ? t('appointments.status.pending') || 'Pending' :
                item.status === 'Cancelled' ? t('appointments.status.cancelled') || 'Cancelled' :
                  item.status === 'Completed' ? t('appointments.status.completed') || 'Completed' : item.status
          }</Text>
        </View>
      </View>

      <View style={[styles.pastDivider, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]} />

      <View style={styles.pastCardFooter}>
        <View style={styles.footerItem}>
          <CalendarIcon color={colors.primary} size={14} />
          <Text style={[styles.footerText, { color: colors.secondaryText }]}>{item.date}</Text>
        </View>
        <View style={styles.footerItem}>
          <Clock color={colors.primary} size={14} />
          <Text style={[styles.footerText, { color: colors.secondaryText }]}>{item.time}</Text>
        </View>
      </View>
    </GlassCard>
  );
});

const SectionHeader = memo(({ type, colors, navigation, t }: any) => (
  <View style={[styles.sectionHeaderRow, type === 'past' ? { marginTop: 40 } : {}]}>
    <Text style={[styles.sectionTitle, { color: colors.text }]}>
      {type === 'upcoming' ? t('appointments.upcoming') : t('appointments.past')}
    </Text>
    {type === 'upcoming' && (
      <TouchableOpacity
        style={[styles.scheduleBtn, { backgroundColor: 'rgba(99, 102, 241, 0.15)' }]}
        onPress={() => navigation.navigate('MainTabs', { screen: 'Book' })}
      >
        <Plus color={colors.primary} size={18} />
        <Text style={[styles.scheduleBtnText, { color: colors.primary }]}>{t('appointments.new')}</Text>
      </TouchableOpacity>
    )}
  </View>
));

const EmptyState = memo(({ text, colors }: any) => (
  <Text style={[styles.emptyTextSimple, { color: colors.secondaryText }]}>{text}</Text>
));

const UpcomingAppointmentsScreen = () => {
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    try {
      setError('');
      const data = await getAllAppointments();
      setAppointments(data.appointments || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load appointments');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchAppointments();
    }, [])
  );

  const timeToMinutes = useCallback((timeStr: string) => {
    try {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':');
      let h = parseInt(hours, 10);
      let m = parseInt(minutes, 10);
      if (modifier === 'PM' && h < 12) h += 12;
      if (modifier === 'AM' && h === 12) h = 0;
      return h * 60 + m;
    } catch { return 0; }
  }, []);

  const handleCancel = async (id: string) => {
    Alert.alert(
      t('appointments.cancelConfirmTitle'),
      t('appointments.cancelConfirmDesc'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await cancelAppointment(id);
              showToast({ message: t('appointments.cancelled'), type: 'success' });
              fetchAppointments();
            } catch (err: any) {
              showToast({ message: err?.response?.data?.message || t('booking.toast.failed'), type: 'error' });
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const handleReschedule = (item: any) => {
    navigation.navigate('MainTabs', {
      screen: 'Book',
      params: {
        rescheduleId: item._id,
        doctorName: item.doctorName,
        specialty: item.specialty,
        doctorImageUrl: item.doctorImageUrl
      }
    });
  };

  const onReschedule = useCallback((item: any) => handleReschedule(item), []);
  const onCancel = useCallback((item: any) => handleCancel(item), []);

  const combinedData = useMemo(() => {
    const now = new Date();
    // Local-aware date string (YYYY-MM-DD)
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    // Helper to check if appointment is past (for fallback)
    const isPast = (a: any) => {
      if (['Completed', 'Cancelled'].includes(a.status)) return true;
      if (a.date < todayStr) return true;
      if (a.date === todayStr) {
        return timeToMinutes(a.time) < (now.getHours() * 60 + now.getMinutes());
      }
      return false;
    };

    // 1. Separate
    const up = appointments.filter(a => ['Confirmed', 'Pending'].includes(a.status) && !isPast(a));
    const ps = appointments.filter(a => ['Completed', 'Cancelled'].includes(a.status) || (['Confirmed', 'Pending'].includes(a.status) && isPast(a)));

    // 2. Sort UPCOMING (Nearest First - Ascending)
    up.sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return timeToMinutes(a.time) - timeToMinutes(b.time);
    });

    // 3. Sort PAST (Latest First - Descending)
    ps.sort((a, b) => {
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      return timeToMinutes(b.time) - timeToMinutes(a.time);
    });

    return [
      { type: 'header', section: 'upcoming' },
      ...up.map(a => ({ ...a, type: 'upcoming' })),
      ...(up.length === 0 ? [{ type: 'empty', text: t('appointments.noUpcoming') }] : []),
      { type: 'header', section: 'past' },
      ...ps.map(a => ({ ...a, type: 'past' })),
      ...(ps.length === 0 && !loading ? [{ type: 'empty', text: t('appointments.noPast') }] : []),
    ];
  }, [appointments, loading, timeToMinutes, t]);

  const renderCombinedItem = useCallback(({ item }: any) => {
    if (item.type === 'header') {
      return (
        <SectionHeader
          type={item.section}
          colors={colors}
          navigation={navigation}
          t={t}
        />
      );
    }
    if (item.type === 'empty') {
      return <EmptyState text={item.text} colors={colors} />;
    }
    return (
      <AppointmentCard
        item={item}
        isUpcoming={item.type === 'upcoming'}
        colors={colors}
        isDark={isDark}
        onCancel={onCancel}
        onReschedule={onReschedule}
        t={t}
      />
    );
  }, [colors, isDark, onCancel, onReschedule, navigation, t]);

  return (
    <Layout includeBottomSafeArea={false}>
      <Header
        title={t('appointments.title')}
        rightElement={
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.card + '50' }]}
            onPress={() => navigation.navigate('AppointmentHistory')}
          >
            <CalendarIcon color={colors.text} size={22} />
          </TouchableOpacity>
        }
      />

      <FlatList
        data={combinedData}
        keyExtractor={(item, index) => item._id || item.id || `type-${item.type}-${index}`}
        renderItem={renderCombinedItem}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); fetchAppointments(); }}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'android'}
        ListHeaderComponent={loading ? <ActivityIndicator color={colors.primary} style={{ marginVertical: 30 }} /> : null}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backBtn: { padding: 5 },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  historyBtn: { padding: 5 },
  title: { fontSize: 20, fontWeight: '800' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '800', letterSpacing: -0.5 },
  scheduleBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, gap: 4 },
  scheduleBtnText: { fontSize: 13, fontWeight: '700' },

  // Glass Cards
  appointmentGlassCard: {
    borderRadius: 28,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
  },
  cardContent: { padding: 16 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  docAvatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  docInfo: { flex: 1 },
  docName: { fontSize: 18, fontWeight: '700' },
  specialty: { fontSize: 13, fontWeight: '500', marginTop: 2 },
  moreBtn: { padding: 8 },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderRadius: 15,
    marginBottom: 15,
  },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoText: { fontSize: 14, fontWeight: '600' },

  cardActionRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: { fontSize: 14, fontWeight: '700' },
  rescheduleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rescheduleText: { fontSize: 14, fontWeight: '700' },

  pastGlassCard: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginBottom: 12,
  },

  premiumHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, padding: 24, paddingBottom: 0 },
  premiumAvatar: { width: 56, height: 56, borderRadius: 28, marginRight: 15, borderWidth: 2, borderColor: 'rgba(255,255,255,0.1)' },
  premiumInfo: { flex: 1 },
  premiumSpecialty: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  premiumDocName: { color: '#fff', fontSize: 19, fontWeight: '800' },
  premiumDetails: { flexDirection: 'row', gap: 12, paddingHorizontal: 24, marginBottom: 20 },
  premiumChip: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 14, gap: 8 },
  premiumChipText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Past Card Components
  avatarRing: { width: 46, height: 46, borderRadius: 14, borderWidth: 1.5, padding: 2, marginRight: 12, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 },
  avatarSmall: { width: '100%', height: '100%', borderRadius: 12 },
  pastInfo: { flex: 1, marginRight: 8 },
  pastDocName: { fontSize: 16, fontWeight: '800', letterSpacing: -0.3 },
  pastSpecialty: { fontSize: 13, fontWeight: '500', marginTop: 1 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    flexShrink: 0,
    minWidth: 70,
    alignItems: 'center'
  },
  statusText: { fontSize: 9, fontWeight: '900', textTransform: 'uppercase' },
  pastCardHeader: { flexDirection: 'row', alignItems: 'center' },
  pastDivider: { height: 1, marginVertical: 14 },
  pastCardFooter: { flexDirection: 'row', gap: 16 },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerText: { fontSize: 12, fontWeight: '600' },

  emptyTextSimple: { textAlign: 'center', marginVertical: 30, fontSize: 15, fontWeight: '600' },
});

export default UpcomingAppointmentsScreen;
