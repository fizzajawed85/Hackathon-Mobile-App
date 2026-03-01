import React, { useEffect, useState, memo, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  StatusBar, TouchableOpacity, ActivityIndicator, RefreshControl,
  Platform, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAppointmentHistory } from '../services/medicalService';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import Header from '../components/Header';
import { useLanguage } from '../context/LanguageContext';
import {
  ChevronLeft,
  Calendar as CalendarIcon,
  Clock,
  User,
  AlertCircle,
  CheckCircle2,
  Stethoscope,
  Filter
} from 'lucide-react-native';

const STATUS_COLORS: Record<string, string> = {
  Confirmed: '#10b981',
  Pending: '#f59e0b',
  Cancelled: '#ef4444',
  Completed: '#6366f1',
};

const AppointmentHistoryItem = memo(({ item, colors, isDark, t, isRTL }: any) => {
  const statusColor = STATUS_COLORS[item.status] || colors.primary;
  const dateObj = new Date(item.date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('default', { month: 'short' });
  const localizedStatus = t(`appointments.status.${item.status?.toLowerCase()}`) || item.status;

  return (
    <GlassCard style={styles.historyGlassCard}>
      <View style={[styles.cardHeader, isRTL && { flexDirection: 'row-reverse' }]}>
        <View style={[styles.avatarRing, { borderColor: colors.primary + '20' }, isRTL ? { marginLeft: 12 } : { marginRight: 12 }]}>
          <Image
            source={{ uri: item.doctorImageUrl || 'https://images.unsplash.com/photo-1559839734-2b71f1e3c77d?q=80&w=200&auto=format&fit=crop' }}
            style={styles.avatar}
          />
        </View>

        <View style={[styles.cardInfo, isRTL && { alignItems: 'flex-end' }]}>
          <Text style={[styles.docName, { color: colors.text }]}>{item.doctorName}</Text>
          <Text style={[styles.specialty, { color: colors.secondaryText }]}>{item.specialty}</Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: statusColor + '10', borderColor: statusColor + '20' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{localizedStatus}</Text>
        </View>
      </View>

      <View style={[styles.cardDivider, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }]} />

      <View style={[styles.cardFooter, isRTL && { flexDirection: 'row-reverse' }]}>
        <View style={[styles.footerItem, isRTL && { flexDirection: 'row-reverse' }]}>
          <CalendarIcon color={colors.primary} size={14} />
          <Text style={[styles.footerText, { color: colors.text }]}>{day} {month}, {dateObj.getFullYear()}</Text>
        </View>
        <View style={[styles.footerItem, isRTL && { flexDirection: 'row-reverse' }]}>
          <Clock color={colors.primary} size={14} />
          <Text style={[styles.footerText, { color: colors.text }]}>{item.time}</Text>
        </View>
      </View>
    </GlassCard>
  );
});

const AppointmentHistoryScreen = () => {
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme();
  const { t, language } = useLanguage();
  const isRTL = language === 'ur' || language === 'ar';
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    try {
      setError('');
      const data = await getAppointmentHistory();
      setAppointments(data.appointments || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || t('history.loadErr'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const renderItem = useCallback(({ item }: any) => (
    <AppointmentHistoryItem
      item={item}
      colors={colors}
      isDark={isDark}
      t={t}
      isRTL={isRTL}
    />
  ), [colors, isDark, t, isRTL]);

  return (
    <Layout includeBottomSafeArea={false}>
      <Header
        title={t('history.title')}
        rightElement={
          <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.card + '50' }]}>
            <Filter color={colors.text} size={22} />
          </TouchableOpacity>
        }
      />

      {loading && !refreshing ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <AlertCircle color={colors.danger} size={48} />
          <Text style={[styles.errorText, { color: colors.text }]}>{error}</Text>
          <TouchableOpacity onPress={fetchHistory} style={[styles.retryBtn, { backgroundColor: colors.primary }]}>
            <Text style={styles.retryText}>{t('history.retry')}</Text>
          </TouchableOpacity>
        </View>
      ) : appointments.length === 0 ? (
        <View style={styles.center}>
          <View style={[styles.emptyIconContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
            <CalendarIcon color={colors.muted} size={48} />
          </View>
          <Text style={[styles.emptyText, { color: colors.text }]}>{t('history.noRecords')}</Text>
          <Text style={[styles.emptyDesc, { color: colors.secondaryText }]}>{t('history.noRecordsDesc')}</Text>
        </View>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item, idx) => item._id || String(idx)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => { setRefreshing(true); fetchHistory(); }}
              tintColor={colors.primary}
            />
          }
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          windowSize={5}
          maxToRenderPerBatch={10}
          removeClippedSubviews={Platform.OS === 'android'}
        />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
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
  filterBtn: { padding: 5 },
  title: { fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  list: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 40 },

  historyGlassCard: {
    borderRadius: 24,
    marginBottom: 16,
    padding: 16,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  avatarRing: {
    width: 50,
    height: 50,
    borderRadius: 15,
    borderWidth: 1.5,
    padding: 2,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
  },
  cardInfo: { flex: 1, marginRight: 8 },
  docName: { fontSize: 17, fontWeight: '800', letterSpacing: -0.3 },
  specialty: { fontSize: 13, fontWeight: '600', marginTop: 2 },
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
  cardDivider: { height: 1, marginVertical: 14 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerText: { fontSize: 12, fontWeight: '700' },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  errorText: { fontSize: 16, fontWeight: '800', marginTop: 15, textAlign: 'center' },
  retryBtn: { marginTop: 20, paddingHorizontal: 30, paddingVertical: 12, borderRadius: 12 },
  retryText: { color: '#fff', fontSize: 15, fontWeight: '800' },
  emptyIconContainer: { width: 110, height: 110, borderRadius: 55, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  emptyText: { fontSize: 20, fontWeight: '800', marginBottom: 12 },
  emptyDesc: { fontSize: 14, fontWeight: '500', textAlign: 'center', lineHeight: 22 },
});

export default AppointmentHistoryScreen;
