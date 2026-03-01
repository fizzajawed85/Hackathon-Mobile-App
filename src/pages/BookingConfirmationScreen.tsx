import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, Platform, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CheckCircle2, Calendar, Clock, MapPin, X } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import { useLanguage } from '../context/LanguageContext';

const BookingConfirmationScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { colors, isDark } = useTheme();
  const { showToast } = useToast();
  const { t, language } = useLanguage();
  const isRTL = language === 'ur' || language === 'ar';

  const { doctorName, date, time, location, doctorImageUrl } = route.params || {
    doctorName: 'Dr. Emily Carter',
    date: 'Mon, July 15th',
    time: '2:00 PM',
    location: '123 Health Clinic, Suite 200',
    doctorImageUrl: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c77d?q=80&w=150&auto=format&fit=crop'
  };

  return (
    <Layout>
      <TouchableOpacity
        onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        style={[styles.closeBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)' }, isRTL ? { left: 20 } : { right: 20 }]}
      >
        <X color={colors.text} size={22} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={[styles.successIconContainer, { borderColor: colors.primary + '25' }]}>
            <View style={[styles.successIconInner, { backgroundColor: colors.primary }]}>
              <CheckCircle2 color="#fff" size={36} />
            </View>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>{t('confirm.placed')}</Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
            {t('confirm.subtitle')}
          </Text>

          <GlassCard style={styles.infoGlassCard}>
            <View style={[styles.doctorSection, isRTL && { flexDirection: 'row-reverse' }]}>
              <View style={[styles.avatarContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }]}>
                <Image source={{ uri: doctorImageUrl || 'https://images.unsplash.com/photo-1559839734-2b71f1e3c77d?q=80&w=150&auto=format&fit=crop' }} style={styles.avatar} />
              </View>
              <View style={[styles.doctorInfo, isRTL ? { marginRight: 12 } : { marginLeft: 12 }, isRTL && { alignItems: 'flex-end' }]}>
                <Text style={[styles.docName, { color: colors.text }]}>{doctorName}</Text>
                <Text style={[styles.docSpec, { color: colors.secondaryText }]}>{t('common.notSet')}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={[styles.detailRow, isRTL && { flexDirection: 'row-reverse' }]}>
              <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }, isRTL ? { marginLeft: 14 } : { marginRight: 14 }]}>
                <Calendar color={colors.primary} size={20} />
              </View>
              <View style={[isRTL && { alignItems: 'flex-end' }]}>
                <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>{t('booking.labels.date')}</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{date} {t('medbot.chips.medInfo').includes('Info') ? 'at' : 'کو'} {time}</Text>
              </View>
            </View>

            <View style={[styles.detailRow, isRTL && { flexDirection: 'row-reverse' }]}>
              <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }, isRTL ? { marginLeft: 14 } : { marginRight: 14 }]}>
                <MapPin color={colors.primary} size={20} />
              </View>
              <View style={[isRTL && { alignItems: 'flex-end' }]}>
                <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>{t('booking.labels.location')}</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>{location || '123 Health Clinic, Suite 200'}</Text>
              </View>
            </View>
          </GlassCard>

          <TouchableOpacity
            style={[styles.calendarBtn, { backgroundColor: colors.primary }, isRTL && { flexDirection: 'row-reverse' }]}
            onPress={() => {
              showToast({ message: t('appointments.cancelled') ? 'Success' : 'Success', type: 'success' });
              navigation.navigate('MainTabs', { screen: 'Visits' });
            }}
          >
            <Calendar color="#fff" size={20} />
            <Text style={styles.calendarBtnText}>{t('confirm.addCalendar')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewAllBtn}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Visits' })}
          >
            <Text style={[styles.viewAllText, { color: colors.primary }]}>{t('confirm.viewHistory')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  closeBtn: { position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  scrollContainer: { paddingBottom: 20 },
  container: { flex: 1, alignItems: 'center', paddingHorizontal: 25, paddingTop: 60 },
  successIconContainer: { width: 90, height: 90, borderRadius: 45, borderWidth: 7, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  successIconInner: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', shadowColor: '#6366f1', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 10 },
  title: { fontSize: 26, fontWeight: '800', textAlign: 'center', marginBottom: 8, lineHeight: 34, letterSpacing: -0.5 },
  subtitle: { fontSize: 13, fontWeight: '500', textAlign: 'center', lineHeight: 20, marginBottom: 25, opacity: 0.7, paddingHorizontal: 10 },

  infoGlassCard: {
    width: '100%',
    padding: 18,
    borderRadius: 24,
    marginBottom: 25,
  },

  doctorSection: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  avatar: { width: 44, height: 44, borderRadius: 12 },
  doctorInfo: { marginLeft: 12 },
  docName: { fontSize: 16, fontWeight: '800', letterSpacing: -0.2 },
  docSpec: { fontSize: 12, fontWeight: '600', marginTop: 1 },
  divider: { height: 1, backgroundColor: 'rgba(150,150,150,0.12)', marginVertical: 18 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  iconBox: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  detailLabel: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  detailValue: { fontSize: 14, fontWeight: '800' },
  calendarBtn: { width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 50, gap: 10, shadowColor: '#6366f1', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12 },
  calendarBtnText: { color: '#fff', fontSize: 15, fontWeight: '800' },
  viewAllBtn: { marginTop: 15, paddingVertical: 10 },
  viewAllText: { fontSize: 14, fontWeight: '800', letterSpacing: 0.3 }
});

export default BookingConfirmationScreen;
