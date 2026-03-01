import React, { useEffect, useState, memo, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  StatusBar, TouchableOpacity, ActivityIndicator, Alert,
  Platform, Dimensions, Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDoctors, bookAppointment, cancelAppointment } from '../services/medicalService';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import Header from '../components/Header';
import { useLanguage } from '../context/LanguageContext';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Sun,
  Moon,
  Calendar as CalendarIcon,
  Clock,
  Stethoscope
} from 'lucide-react-native';

const TIME_SLOTS_MORNING = ['06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'];
const TIME_SLOTS_AFTERNOON = ['12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
const TIME_SLOTS_EVENING = ['05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'];
const TIME_SLOTS_NIGHT = ['10:00 PM', '11:00 PM', '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM'];

const BookAppointmentScreen = () => {
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme();
  const { showToast } = useToast();
  const { t, language, isRTL } = useLanguage();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());
  const [selectedTime, setSelectedTime] = useState('');
  const [booking, setBooking] = useState(false);

  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  const route = useRoute<any>();
  const rescheduleId = route.params?.rescheduleId;

  useEffect(() => {
    getDoctors()
      .then((d) => {
        const docs = d.doctors || [];
        setDoctors(docs);

        // If rescheduling, pre-select the doctor
        if (route.params?.doctorName) {
          const doc = docs.find((dt: any) => dt.name === route.params.doctorName);
          if (doc) setSelectedDoctor(doc);
        }
      })
      .catch((err) => console.log('Err loading doctors:', err))
      .finally(() => setLoadingDoctors(false));
  }, []);

  const handleBook = async () => {
    if (!selectedDoctor) return showToast({ message: t('booking.toast.selectDoc'), type: 'warning' });
    if (!selectedTime) return showToast({ message: t('booking.toast.selectTime'), type: 'warning' });

    setBooking(true);
    try {
      const year = currentCalendarDate.getFullYear();
      const month = (currentCalendarDate.getMonth() + 1).toString().padStart(2, '0');
      const dateStr = `${year}-${month}-${selectedDate.toString().padStart(2, '0')}`;
      const res = await bookAppointment({
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        date: dateStr,
        time: selectedTime,
        doctorImageUrl: selectedDoctor.imageUrl
      });

      // If rescheduling, cancel the old appointment
      if (rescheduleId) {
        try {
          await cancelAppointment(rescheduleId);
        } catch (err) {
          console.error('Failed to cancel old appointment during reschedule:', err);
        }
      }

      navigation.navigate('BookingConfirmation', {
        appointmentId: res.appointment?._id || 'new',
        doctorName: selectedDoctor.name,
        doctorImageUrl: selectedDoctor.imageUrl,
        date: dateStr,
        time: selectedTime,
        location: t('booking.labels.location') || '123 Health Clinic, Suite 200'
      });
    } catch (err: any) {
      showToast({ message: err?.response?.data?.message || t('booking.toast.failed'), type: 'error' });
    } finally {
      setBooking(false);
    }
  };

  const renderCalendar = () => {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    // Get days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const handlePrevMonth = () => {
      const prev = new Date(year, month - 1, 1);
      setCurrentCalendarDate(prev);
    };

    const handleNextMonth = () => {
      const next = new Date(year, month + 1, 1);
      setCurrentCalendarDate(next);
    };

    return (
      <GlassCard style={styles.calendarGlassCard}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={handlePrevMonth}><ChevronLeft color={colors.text} size={20} style={isRTL && { transform: [{ rotate: '180deg' }] }} /></TouchableOpacity>
          <Text style={[styles.monthTitle, { color: colors.text }]}>
            {currentCalendarDate.toLocaleString(language, { month: 'long', year: 'numeric' })}
          </Text>
          <TouchableOpacity onPress={handleNextMonth}><ChevronRight color={colors.text} size={20} style={isRTL && { transform: [{ rotate: '180deg' }] }} /></TouchableOpacity>
        </View>
        <View style={[styles.daysHeader, isRTL && { flexDirection: 'row-reverse' }]}>
          {(isRTL ? ['ہ', 'ج', 'ج', 'ب', 'م', 'س', 'ا'] : ['S', 'M', 'T', 'W', 'T', 'F', 'S']).map((d, i) => <Text key={`${d}-${i}`} style={styles.dayLabel}>{d}</Text>)}
        </View>
        <View style={styles.calendarGrid}>
          {blanks.map(b => <View key={`blank-${b}`} style={styles.dayBtn} />)}
          {days.map(d => {
            const isSelected = selectedDate === d;
            const isToday = d === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            const isPast = (d < new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) || (year < new Date().getFullYear()) || (year === new Date().getFullYear() && month < new Date().getMonth());

            return (
              <TouchableOpacity
                key={d}
                style={[
                  styles.dayBtn,
                  isSelected && { backgroundColor: colors.primary },
                  isToday && !isSelected && { borderWidth: 1, borderColor: colors.primary }
                ]}
                onPress={() => setSelectedDate(d)}
                disabled={isPast}
              >
                <Text style={[styles.dayText, isSelected ? { color: '#fff' } : { color: isPast ? colors.muted : colors.text }]}>{d}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </GlassCard>
    );
  };

  const TimeSlot = memo(({ slot, isSelected, onPress, colors, isDark }: any) => {
    return (
      <TouchableOpacity
        key={slot}
        style={[styles.timeBtn, {
          backgroundColor: isSelected ? colors.primary : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'),
          borderColor: isSelected ? 'transparent' : colors.border
        }]}
        onPress={() => onPress(slot)}
      >
        <Text style={[styles.timeText, { color: isSelected ? '#fff' : colors.text }]}>{slot}</Text>
      </TouchableOpacity>
    );
  });

  const handleTimeSelect = useCallback((time: string) => {
    setSelectedTime(time);
  }, []);

  const renderSlot = (slot: string) => {
    return (
      <TimeSlot
        key={slot}
        slot={slot}
        isSelected={selectedTime === slot}
        onPress={handleTimeSelect}
        colors={colors}
        isDark={isDark}
      />
    );
  };

  return (
    <Layout includeBottomSafeArea={false}>
      <Header title={t('booking.title')} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* --- PROGRESS BAR --- */}
        <View style={styles.progressContainer}>
          <View style={styles.progressRow}>
            <View style={[styles.progressStep, { backgroundColor: colors.primary }]} />
            <View style={[styles.progressStep, { backgroundColor: selectedDoctor && selectedDate ? colors.primary : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)' }]} />
            <View style={[styles.progressStep, { backgroundColor: selectedTime ? colors.primary : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)' }]} />
          </View>
          <View style={[styles.progressLabels, isRTL && { flexDirection: 'row-reverse' }]}>
            <Text style={[styles.stepLabel, { color: colors.primary }]}>{t('booking.steps.details')}</Text>
            <Text style={[styles.stepLabel, { color: selectedDoctor && selectedDate ? colors.primary : colors.secondaryText }]}>{t('booking.steps.doc')}</Text>
            <Text style={[styles.stepLabel, { color: selectedTime ? colors.primary : colors.secondaryText }]}>{t('booking.steps.time')}</Text>
          </View>
        </View>

        {/* --- DATE SECTION --- */}
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconBox}>
              <CalendarIcon color="#fff" size={18} />
            </View>
            <View style={isRTL && { alignItems: 'flex-end', flex: 1 }}>
              <Text style={[styles.mainLabel, { color: colors.text }]}>{t('booking.labels.date')}</Text>
              <Text style={[styles.mainLabelSub, { color: colors.secondaryText }]}>{t('booking.labels.dateSub')}</Text>
            </View>
          </View>
          {renderCalendar()}
        </View>

        {/* --- DOCTOR SECTION --- */}
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconBox}>
              <Stethoscope color="#fff" size={18} />
            </View>
            <View style={isRTL && { alignItems: 'flex-end', flex: 1 }}>
              <Text style={[styles.mainLabel, { color: colors.text }]}>{t('booking.labels.spec')}</Text>
              <Text style={[styles.mainLabelSub, { color: colors.secondaryText }]}>{t('booking.labels.specSub')}</Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.docList} contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}>
            {doctors.length > 0 ? doctors.map(doc => (
              <TouchableOpacity
                key={doc._id}
                onPress={() => setSelectedDoctor(doc)}
                activeOpacity={0.9}
              >
                <GlassCard style={[
                  styles.docGlassCard,
                  selectedDoctor?._id === doc._id && {
                    borderColor: colors.primary,
                    borderWidth: 2,
                    backgroundColor: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.05)'
                  }
                ]}>
                  <View style={styles.avatarContainer}>
                    <Image
                      source={{
                        uri: doc.imageUrl ||
                          'https://images.unsplash.com/photo-1559839734-2b71f1e3c77d?q=80&w=200&auto=format&fit=crop&crop=faces'
                      }}
                      style={[styles.docAvatar, { borderColor: selectedDoctor?._id === doc._id ? colors.primary : colors.border }]}
                      resizeMode="cover"
                    />
                    {selectedDoctor?._id === doc._id && (
                      <View style={[styles.checkBadge, { backgroundColor: colors.primary }]}>
                        <View style={styles.whiteDot} />
                      </View>
                    )}
                  </View>
                  <Text style={[styles.docNameTitle, { color: colors.text }]} numberOfLines={1}>{doc.name}</Text>
                  <Text style={[styles.docSpecText, { color: colors.secondaryText }]} numberOfLines={1}>{doc.specialty}</Text>
                  <View style={styles.ratingRow}>
                    <Star color="#f59e0b" size={14} fill="#f59e0b" />
                    <Text style={[styles.ratingText, { color: colors.secondaryText }]}>4.9</Text>
                  </View>
                </GlassCard>
              </TouchableOpacity>
            )) : (
              <View style={styles.emptyContainer}>
                <ActivityIndicator color={colors.primary} />
                <Text style={[styles.emptyText, { color: colors.secondaryText }]}>{t('common.loading')}</Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* --- TIME SECTION --- */}
        <View style={styles.sectionWrapper}>
          {/* Main section header */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconBox}>
              <Clock color="#fff" size={18} />
            </View>
            <View style={isRTL && { alignItems: 'flex-end', flex: 1 }}>
              <Text style={[styles.mainLabel, { color: colors.text }]}>{t('booking.labels.time')}</Text>
              <Text style={[styles.mainLabelSub, { color: colors.secondaryText }]}>{t('booking.labels.timeSub')}</Text>
            </View>
          </View>

          {/* Morning Card */}
          <GlassCard style={styles.timeCard}>
            <View style={[styles.timeCardBanner, { borderLeftColor: '#6366f1' }, isRTL && { flexDirection: 'row-reverse', borderLeftWidth: 0, borderRightWidth: 4, borderRightColor: '#6366f1' }]}>
              <View style={[styles.timeCardDot, { backgroundColor: '#6366f1' }]} />
              <View style={isRTL && { alignItems: 'flex-end' }}>
                <Text style={[styles.timeCardTitle, { color: colors.text }]}>{t('booking.times.morning')}</Text>
                <Text style={[styles.timeCardSub, { color: colors.secondaryText }]}>06:00 AM – 11:00 AM</Text>
              </View>
            </View>
            <View style={[styles.timeGrid, isRTL && { flexDirection: 'row-reverse' }]}>{TIME_SLOTS_MORNING.map(renderSlot)}</View>
          </GlassCard>

          {/* Afternoon Card */}
          <GlassCard style={styles.timeCard}>
            <View style={[styles.timeCardBanner, { borderLeftColor: '#f59e0b' }, isRTL && { flexDirection: 'row-reverse', borderLeftWidth: 0, borderRightWidth: 4, borderRightColor: '#f59e0b' }]}>
              <View style={[styles.timeCardDot, { backgroundColor: '#f59e0b' }]} />
              <View style={isRTL && { alignItems: 'flex-end' }}>
                <Text style={[styles.timeCardTitle, { color: colors.text }]}>{t('booking.times.afternoon')}</Text>
                <Text style={[styles.timeCardSub, { color: colors.secondaryText }]}>12:00 PM – 04:00 PM</Text>
              </View>
            </View>
            <View style={[styles.timeGrid, isRTL && { flexDirection: 'row-reverse' }]}>{TIME_SLOTS_AFTERNOON.map(renderSlot)}</View>
          </GlassCard>

          {/* Evening Card */}
          <GlassCard style={styles.timeCard}>
            <View style={[styles.timeCardBanner, { borderLeftColor: '#8b5cf6' }, isRTL && { flexDirection: 'row-reverse', borderLeftWidth: 0, borderRightWidth: 4, borderRightColor: '#8b5cf6' }]}>
              <View style={[styles.timeCardDot, { backgroundColor: '#8b5cf6' }]} />
              <View style={isRTL && { alignItems: 'flex-end' }}>
                <Text style={[styles.timeCardTitle, { color: colors.text }]}>{t('booking.times.evening')}</Text>
                <Text style={[styles.timeCardSub, { color: colors.secondaryText }]}>05:00 PM – 09:00 PM</Text>
              </View>
            </View>
            <View style={[styles.timeGrid, isRTL && { flexDirection: 'row-reverse' }]}>{TIME_SLOTS_EVENING.map(renderSlot)}</View>
          </GlassCard>

          {/* Night Card */}
          <GlassCard style={styles.timeCard}>
            <View style={[styles.timeCardBanner, { borderLeftColor: '#1e3a5f' }, isRTL && { flexDirection: 'row-reverse', borderLeftWidth: 0, borderRightWidth: 4, borderRightColor: '#1e3a5f' }]}>
              <View style={[styles.timeCardDot, { backgroundColor: '#1e3a5f' }]} />
              <View style={isRTL && { alignItems: 'flex-end' }}>
                <Text style={[styles.timeCardTitle, { color: colors.text }]}>{t('booking.times.night')}</Text>
                <Text style={[styles.timeCardSub, { color: colors.secondaryText }]}>10:00 PM – 05:00 AM</Text>
              </View>
            </View>
            <View style={[styles.timeGrid, isRTL && { flexDirection: 'row-reverse' }]}>{TIME_SLOTS_NIGHT.map(renderSlot)}</View>
          </GlassCard>
        </View>

        <TouchableOpacity
          style={[styles.primaryBtn, { backgroundColor: colors.primary, opacity: 1 }, isRTL && { flexDirection: 'row-reverse' }]}
          onPress={handleBook}
          disabled={booking}
          activeOpacity={0.88}
        >
          {/* Left icon circle */}
          <View style={styles.primaryBtnIcon}>
            {booking ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <CalendarIcon color="#fff" size={22} />
            )}
          </View>
          {/* Center text */}
          <View style={[styles.primaryBtnCenter, isRTL && { alignItems: 'flex-end' }]}>
            <Text style={styles.primaryBtnTitle}>
              {booking ? t('booking.confirming') : t('booking.confirm')}
            </Text>
            <Text style={styles.primaryBtnSub}>{t('booking.reserved')}</Text>
          </View>
          {/* Right arrow */}
          <View style={[styles.primaryBtnArrow, isRTL && { transform: [{ rotate: '180deg' }] }]}>
            <ChevronRight color="rgba(255,255,255,0.7)" size={22} />
          </View>
        </TouchableOpacity>

      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
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
  title: { fontSize: 20, fontWeight: '800' },
  container: { paddingHorizontal: 20, paddingBottom: 40 },
  progressContainer: { marginBottom: 18 },
  progressRow: { flexDirection: 'row', height: 5, borderRadius: 4, overflow: 'hidden', gap: 5 },
  progressStep: { flex: 1, height: 5, borderRadius: 4 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  stepLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  sectionWrapper: {
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 32,
    paddingVertical: 5,
  },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 10, marginBottom: 18, paddingHorizontal: 14 },
  sectionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  mainLabel: { fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  mainLabelSub: { fontSize: 12, fontWeight: '500', marginTop: 1 },

  // Glass Elements
  calendarGlassCard: {
    padding: 20,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  docGlassCard: {
    width: 160,
    padding: 15,
    borderRadius: 28,
    marginRight: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  monthTitle: { fontSize: 16, fontWeight: '800' },
  daysHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  dayLabel: { width: 34, textAlign: 'center', fontSize: 12, fontWeight: '700', opacity: 0.4 },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
  dayBtn: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center', margin: 2 },
  dayText: { fontSize: 13, fontWeight: '700' },

  docList: { paddingBottom: 5 },
  avatarContainer: { position: 'relative', marginBottom: 10 },
  docAvatar: { width: 70, height: 70, borderRadius: 35, borderWidth: 3 },
  checkBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },
  docNameTitle: { fontSize: 15, fontWeight: '800', marginBottom: 4, textAlign: 'center' },
  docSpecText: { fontSize: 12, fontWeight: '600', marginBottom: 8, textAlign: 'center' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 11, fontWeight: '700' },

  emptyContainer: { width: 300, padding: 40, alignItems: 'center', justifyContent: 'center' },
  emptyText: { marginTop: 15, fontSize: 14, fontWeight: '600' },

  timeSection: { marginTop: 0, marginBottom: 12, paddingHorizontal: 14 },
  timeCard: {
    marginBottom: 12,
    padding: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
  timeCardBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  timeCardDot: { width: 10, height: 10, borderRadius: 5 },
  timeCardTitle: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  timeCardSub: { fontSize: 11, fontWeight: '500', marginTop: 2, opacity: 0.7 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 14, paddingBottom: 16 },
  timeBtn: { paddingVertical: 12, paddingHorizontal: 10, borderRadius: 16, borderWidth: 1.5, minWidth: '29%', alignItems: 'center' },
  timeText: { fontSize: 13, fontWeight: '700', letterSpacing: 0.3 },

  primaryBtn: {
    marginTop: 24,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 16,
  },
  primaryBtnIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnCenter: {
    flex: 1,
    paddingHorizontal: 16,
  },
  primaryBtnTitle: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 0.2 },
  primaryBtnSub: { color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: '500', marginTop: 2 },
  primaryBtnArrow: { opacity: 0.8 },
  primaryBtnInner: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  primaryBtnText: { color: '#fff', fontSize: 17, fontWeight: '900', letterSpacing: 0.6 },
  primaryBtnBadge: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },
});

export default BookAppointmentScreen;
