import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  StatusBar, TouchableOpacity, ActivityIndicator, TextInput, Alert,
  Platform, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserProfile, updateUserProfile } from '../services/medicalService';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import Header from '../components/Header';
import { useLanguage } from '../context/LanguageContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Info,
  LogOut,
  ChevronLeft,
  Sun,
  Moon,
  Camera,
  ChevronRight,
  Check,
  Globe,
  Bell
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { logout } = useAuth();
  const { colors, isDark, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const { t, language, setLanguage } = useLanguage();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ username: '', phoneNumber: '', location: '', about: '' });
  const [image, setImage] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setError('');
      const data = await getUserProfile();
      setProfile(data.user);
      setForm({
        username: data.user.username || '',
        phoneNumber: data.user.phoneNumber || '',
        location: data.user.location || '',
        about: data.user.about || '',
      });
      if (data.user.profileImage) {
        setImage(data.user.profileImage);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || t('history.loadErr'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  const handleSave = async () => {
    if (!form.username.trim()) return showToast({ message: t('newRecord.error.titleReq'), type: 'warning' });
    setSaving(true);
    try {
      const payload = {
        ...form,
        profileImage: (image && image.startsWith('data:')) ? image : undefined // Only send if it's new base64
      };
      const data = await updateUserProfile(payload);
      setProfile(data.user);
      setEditing(false);
      showToast({ message: t('newRecord.saved'), type: 'success' });
    } catch (err: any) {
      showToast({ message: err?.response?.data?.message || t('common.error'), type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        base64: true,
      });

      if (!result.canceled) {
        const base64Img = `data:image/jpeg;base64,${result.assets[0].base64}`;
        setImage(base64Img);
        showToast({ message: t('newRecord.attached'), type: 'success' });
      }
    } catch (err) {
      showToast({ message: t('newRecord.error.pickErr'), type: 'error' });
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <Layout includeBottomSafeArea={false}>
      <Header
        title={t('profile.title')}
        rightElement={
          <TouchableOpacity
            onPress={toggleTheme}
            style={[styles.backButton, { backgroundColor: colors.card + '50' }]}
          >
            {isDark ? <Sun color={colors.warning} size={20} /> : <Moon color={colors.primary} size={20} />}
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Identity Section */}
        <View style={styles.avatarContainer}>
          <View style={[styles.avatarBorder, { borderColor: colors.primary + '30' }]}>
            {image ? (
              <Image source={{ uri: image }} style={styles.avatarImage} />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primary + '10' }]}>
                <User color={colors.primary} size={40} />
              </View>
            )}
            <TouchableOpacity
              onPress={pickImage}
              style={[styles.cameraBtn, { backgroundColor: colors.primary, borderColor: colors.background }]}
            >
              <Camera color="#fff" size={16} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.profileName, { color: colors.text }]}>{profile?.username || 'User'}</Text>
          <Text style={[styles.profileEmail, { color: colors.secondaryText }]}>{t('profile.patientIdLabel')}: {profile?._id ? profile._id.toString().slice(-8).toUpperCase() : '...'}</Text>
          <TouchableOpacity
            onPress={() => setEditing(!editing)}
            style={[styles.editBadge, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}
          >
            <Text style={[styles.editBadgeText, { color: colors.primary }]}>{editing ? t('profile.backToProfile') : t('profile.editProfile')}</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>{t('profile.personalInfo')}</Text>
        <GlassCard style={styles.formGlassCard}>
          <ProfileField
            label={t('profile.email')}
            value={profile?.email}
            icon={<Mail color="#6366f1" size={20} />}
            editing={false}
            colors={colors}
            isDark={isDark}
            iconBg="#eef2ff"
            t={t}
          />
          <ProfileField
            label={t('profile.phone')}
            value={form.phoneNumber}
            icon={<Phone color="#10b981" size={20} />}
            editing={editing}
            onChangeText={(v: string) => setForm({ ...form, phoneNumber: v })}
            colors={colors}
            placeholder={t('profile.phonePlaceholder')}
            isDark={isDark}
            iconBg="#ecfdf5"
            t={t}
          />
          <ProfileField
            label={t('profile.address')}
            value={form.location}
            icon={<MapPin color="#8b5cf6" size={20} />}
            editing={editing}
            onChangeText={(v: string) => setForm({ ...form, location: v })}
            colors={colors}
            placeholder={t('profile.addressPlaceholder')}
            isDark={isDark}
            iconBg="#f5f3ff"
            t={t}
          />
          <ProfileField
            label={t('profile.about')}
            value={form.about}
            icon={<Info color="#f43f5e" size={20} />}
            editing={editing}
            onChangeText={(v: string) => setForm({ ...form, about: v })}
            colors={colors}
            multiline
            placeholder={t('profile.aboutPlaceholder')}
            isDark={isDark}
            iconBg="#fff1f2"
            t={t}
          />

          {editing && (
            <TouchableOpacity
              style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
              onPress={handleSave}
              disabled={saving}
              activeOpacity={0.8}
            >
              <View style={styles.primaryBtnIcon}>
                <Check color="#fff" size={24} />
              </View>
              <View style={styles.primaryBtnCenter}>
                <Text style={styles.primaryBtnTitle}>{t('common.save')}</Text>
                <Text style={styles.primaryBtnSub}>{t('profile.updateProfileSub')}</Text>
              </View>
              {saving ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <ChevronRight color="#fff" size={24} style={styles.primaryBtnArrow} />
              )}
            </TouchableOpacity>
          )}
        </GlassCard>

        <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>{t('profile.appPreferences')}</Text>
        <GlassCard style={styles.formGlassCard}>
          <ProfileOption
            label={t('profile.helpSupport')}
            icon={<Bell color="#3b82f6" size={22} />}
            onPress={() => navigation.navigate('HelpSupport')}
            colors={colors}
            isDark={isDark}
            iconBg="#eff6ff"
          />
          <ProfileOption
            label={t('profile.language')}
            icon={<Globe color="#f59e0b" size={22} />}
            onPress={() => navigation.navigate('LanguageSelection')}
            colors={colors}
            isDark={isDark}
            value={
              language === 'en' ? 'English' :
                language === 'ur' ? 'اردو' :
                  language === 'ar' ? 'العربية' :
                    language === 'hi' ? 'हिन्दी' :
                      language === 'es' ? 'Español' :
                        language === 'fr' ? 'Français' : '中文'
            }
            iconBg="#fffbeb"
          />
          <ProfileOption
            label={t('profile.logout')}
            icon={<LogOut color={colors.danger} size={22} />}
            onPress={logout}
            colors={colors}
            isDark={isDark}
            isLast
            iconBg={colors.danger + '10'}
          />
        </GlassCard>
      </ScrollView>
    </Layout>
  );
};

const ProfileField = ({ label, value, icon, editing, onChangeText, colors, multiline, placeholder, isDark, iconBg, t }: any) => (
  <View style={[styles.fieldWrapper, { borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
    <View style={styles.fieldHeader}>
      <View style={[styles.fieldIcon, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : (iconBg || 'rgba(0,0,0,0.05)') }]}>
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.fieldLabel, { color: colors.secondaryText }]}>{label}</Text>
        {!editing && <Text style={[styles.fieldValueText, { color: colors.text }]}>{value || t('common.notSet')}</Text>}
      </View>
    </View>
    {editing && (
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        multiline={multiline}
      />
    )}
  </View>
);

const ProfileOption = ({ label, icon, onPress, colors, isLast, isDark, value, iconBg }: any) => (
  <TouchableOpacity
    style={[styles.optionRow, !isLast && { borderBottomWidth: 1, borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.optionContent}>
      <View style={[styles.optionIcon, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : (iconBg || 'rgba(0,0,0,0.05)') }]}>
        {icon}
      </View>
      <Text style={[styles.optionLabel, { color: colors.text }]}>{label}</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      {value && <Text style={{ fontSize: 14, fontWeight: '600', color: colors.secondaryText }}>{value}</Text>}
      <ChevronRight color={colors.secondaryText} size={20} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { paddingBottom: 40 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  title: { fontSize: 20, fontWeight: '800' },
  themeBtn: { padding: 10, borderRadius: 12 },
  avatarContainer: { alignItems: 'center', marginVertical: 20 },
  avatarBorder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    padding: 4,
    marginBottom: 15,
    position: 'relative',
  },
  avatarImage: { width: '100%', height: '100%', borderRadius: 56 },
  avatarPlaceholder: { width: '100%', height: '100%', borderRadius: 56, alignItems: 'center', justifyContent: 'center' },
  cameraBtn: {
    position: 'absolute',
    bottom: 5,
    end: 5,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#0f172a',
  },
  profileName: { fontSize: 26, fontWeight: '800', letterSpacing: -0.5, marginBottom: 4 },
  profileEmail: { fontSize: 14, fontWeight: '500', marginBottom: 15 },
  sectionTitle: { fontSize: 14, fontWeight: '800', marginTop: 25, marginBottom: 15, marginHorizontal: 25, textTransform: 'uppercase', letterSpacing: 0.5 },
  editBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editBadgeText: { fontSize: 13, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },

  formGlassCard: {
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 0,
    overflow: 'hidden',
  },

  fieldWrapper: { padding: 20, borderBottomWidth: 1 },
  fieldHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  fieldIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  fieldLabel: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 },
  fieldValueText: { fontSize: 15, fontWeight: '700' },
  fieldValue: { fontSize: 17, fontWeight: '700', paddingStart: 50 },
  input: {
    marginTop: 10,
    marginStart: 0,
    fontSize: 16,
    fontWeight: '700',
    padding: 12,
    borderWidth: 1,
    borderRadius: 14,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  primaryBtn: {
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 20,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
  },
  primaryBtnIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnCenter: {
    flex: 1,
    paddingHorizontal: 14,
  },
  primaryBtnTitle: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 0.2 },
  primaryBtnSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '500', marginTop: 1 },
  primaryBtnArrow: { opacity: 0.8 },
  logoutBtn: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderTopWidth: 1,
  },
  logoutIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: { fontSize: 16, fontWeight: '800' },
  optionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  optionContent: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  optionIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  optionLabel: { fontSize: 16, fontWeight: '700' },
});

export default ProfileScreen;
