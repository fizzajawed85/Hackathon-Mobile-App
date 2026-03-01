import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator,
  Platform, ScrollView, KeyboardAvoidingView, Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { addMedicalRecord, updateMedicalRecord } from '../services/medicalService';
import Layout from '../components/Layout';
import Header from '../components/Header';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { useLanguage } from '../context/LanguageContext';
import {
  FilePlus,
  ChevronRight,
  Edit3,
  Camera,
  Image as ImageIcon,
  X,
  FileText,
  File as FileIcon
} from 'lucide-react-native';

const RECORD_TYPES = ['Lab Report', 'Prescription', 'X-Ray', 'Scan', 'Other'];

const NewRecordScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { colors, isDark } = useTheme();
  const { showToast } = useToast();
  const { t, language, isRTL } = useLanguage();

  const isEdit = !!route.params?.id;
  const recordId = route.params?.id;
  const initialData = route.params?.record || { title: '', description: '', recordType: 'Other', fileUrl: '' };

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialData);
  const [selectedImage, setSelectedImage] = useState<string | null>(initialData.fileUrl && initialData.fileUrl.startsWith('data:image') ? initialData.fileUrl : null);
  const [selectedFile, setSelectedFile] = useState<{ name: string, uri: string } | null>(
    initialData.fileUrl && !initialData.fileUrl.startsWith('data:image') ? { name: 'Attached Document', uri: initialData.fileUrl } : null
  );

  const pickImage = async (useCamera: boolean) => {
    let result;
    if (useCamera) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        showToast({ message: t('newRecord.error.camDeny'), type: 'error' });
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.5,
        base64: true,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.5,
        base64: true,
      });
    }

    if (!result.canceled) {
      const base64Img = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setSelectedImage(result.assets[0].uri);
      setSelectedFile(null); // Clear file if image picked
      setForm({ ...form, fileUrl: base64Img });
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];

        // Convert file to base64
        const base64File = await FileSystem.readAsStringAsync(file.uri, {
          encoding: 'base64',
        });

        const fullBase64 = `data:${file.mimeType || 'application/octet-stream'};base64,${base64File}`;

        setSelectedFile({ name: file.name, uri: file.uri });
        setSelectedImage(null); // Clear image if file picked
        setForm({ ...form, fileUrl: fullBase64 });

        if (!form.title) {
          setForm((prev: any) => ({ ...prev, title: file.name.split('.')[0] }));
        }
      }
    } catch (err) {
      showToast({ message: t('newRecord.error.pickErr'), type: 'error' });
    }
  };

  const handleSave = async () => {
    if (!form.title.trim()) return showToast({ message: t('newRecord.error.titleReq'), type: 'warning' });
    setSaving(true);
    try {
      if (isEdit) {
        await updateMedicalRecord(recordId, form);
        showToast({ message: t('newRecord.updated'), type: 'success' });
      } else {
        await addMedicalRecord(form);
        showToast({ message: t('newRecord.saved'), type: 'success' });
      }
      navigation.goBack();
    } catch (err: any) {
      showToast({ message: err?.response?.data?.message || t('newRecord.error.saveErr'), type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout includeBottomSafeArea={false}>
      <Header
        title={isEdit ? t('newRecord.edit') : t('newRecord.title')}
        showBack={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={[styles.label, { color: colors.secondaryText }, isRTL && { textAlign: 'right' }]}>{t('newRecord.labels.title')}</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                color: colors.text,
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                textAlign: isRTL ? 'right' : 'left'
              }
            ]}
            placeholder={t('newRecord.placeholders.title')}
            placeholderTextColor={colors.muted}
            value={form.title}
            onChangeText={(t) => setForm({ ...form, title: t })}
          />

          <Text style={[styles.label, { color: colors.secondaryText }, isRTL && { textAlign: 'right' }]}>{t('newRecord.labels.attachments')}</Text>
          <View style={[styles.attachmentOptions, isRTL && { flexDirection: 'row-reverse' }]}>
            <TouchableOpacity
              style={[styles.attachBtn, { backgroundColor: colors.primary + '10' }, isRTL && { flexDirection: 'row-reverse' }]}
              onPress={() => pickImage(true)}
            >
              <Camera color={colors.primary} size={20} />
              <Text style={[styles.attachText, { color: colors.primary }]}>{t('newRecord.actions.camera')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.attachBtn, { backgroundColor: colors.primary + '10' }, isRTL && { flexDirection: 'row-reverse' }]}
              onPress={() => pickImage(false)}
            >
              <ImageIcon color={colors.primary} size={20} />
              <Text style={[styles.attachText, { color: colors.primary }]}>{t('newRecord.actions.gallery')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.attachBtn, { backgroundColor: colors.primary + '10' }, isRTL && { flexDirection: 'row-reverse' }]}
              onPress={pickDocument}
            >
              <FileIcon color={colors.primary} size={20} />
              <Text style={[styles.attachText, { color: colors.primary }]}>{t('newRecord.actions.files')}</Text>
            </TouchableOpacity>
          </View>

          {selectedImage && (
            <View style={styles.previewContainer}>
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.removeImageBtn}
                onPress={() => { setSelectedImage(null); setForm({ ...form, fileUrl: '' }); }}
              >
                <X color="#fff" size={16} />
              </TouchableOpacity>
            </View>
          )}

          {selectedFile && (
            <View style={[styles.filePreviewContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}>
              <View style={styles.filePreviewIcon}>
                <FileText color={colors.primary} size={24} />
              </View>
              <View style={styles.filePreviewContent}>
                <Text style={[styles.filePreviewName, { color: colors.text }]} numberOfLines={1}>
                  {selectedFile.name}
                </Text>
                <Text style={[styles.filePreviewPill, { color: colors.primary, backgroundColor: colors.primary + '15' }]}>
                  {t('newRecord.attached')}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeFileBtn}
                onPress={() => { setSelectedFile(null); setForm({ ...form, fileUrl: '' }); }}
              >
                <X color={colors.muted} size={20} />
              </TouchableOpacity>
            </View>
          )}

          <Text style={[styles.label, { color: colors.secondaryText }, isRTL && { textAlign: 'right' }]}>{t('newRecord.labels.description')}</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                color: colors.text,
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                height: 100,
                textAlign: isRTL ? 'right' : 'left'
              }
            ]}
            placeholder={t('newRecord.placeholders.description')}
            placeholderTextColor={colors.muted}
            value={form.description}
            onChangeText={(t) => setForm({ ...form, description: t })}
            multiline
            textAlignVertical="top"
          />

          <Text style={[styles.label, { color: colors.secondaryText }, isRTL && { textAlign: 'right' }]}>{t('newRecord.labels.category')}</Text>
          <View style={[styles.typeGrid, isRTL && { flexDirection: 'row-reverse' }]}>
            {[
              { label: t('records.labReport'), value: 'Lab Report' },
              { label: t('records.prescription'), value: 'Prescription' },
              { label: t('records.xray'), value: 'X-Ray' },
              { label: t('records.scan'), value: 'Scan' },
              { label: t('records.other'), value: 'Other' },
            ].map((type) => {
              const isSelected = form.recordType === type.value;
              return (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.typeChip,
                    {
                      backgroundColor: isSelected ? colors.primary : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'),
                      borderColor: isSelected ? colors.primary : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)')
                    }
                  ]}
                  onPress={() => setForm({ ...form, recordType: type.value })}
                >
                  <Text style={[styles.typeChipText, { color: isSelected ? '#fff' : colors.text }]}>{type.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={handleSave}
            style={[styles.primaryBtn, { backgroundColor: colors.primary }, isRTL && { flexDirection: 'row-reverse' }]}
            disabled={saving}
            activeOpacity={0.88}
          >
            <View style={styles.primaryBtnIcon}>
              {saving ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                isEdit ? <Edit3 color="#fff" size={22} /> : <FilePlus color="#fff" size={22} />
              )}
            </View>
            <View style={[styles.primaryBtnCenter, isRTL && { alignItems: 'flex-end' }]}>
              <Text style={styles.primaryBtnTitle}>
                {saving ? (isEdit ? t('newRecord.updating') : t('newRecord.saving')) : (isEdit ? t('newRecord.edit') : t('newRecord.title'))}
              </Text>
              <Text style={styles.primaryBtnSub}>
                {isEdit ? t('common.saveChanges') : t('newRecord.uploadSec')}
              </Text>
            </View>
            <View style={[styles.primaryBtnArrow, isRTL && { transform: [{ rotate: '180deg' }] }]}>
              <ChevronRight color="rgba(255,255,255,0.7)" size={22} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  keyboardView: { flex: 1 },
  scrollContent: { paddingBottom: 60 },
  formContainer: { paddingHorizontal: 20, paddingTop: 10 },
  label: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 15
  },
  input: {
    padding: 16,
    borderRadius: 16,
    fontSize: 15,
    fontWeight: '600',
    borderWidth: 1,
    marginBottom: 10
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 30,
    marginTop: 5
  },
  typeChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1
  },
  typeChipText: { fontSize: 13, fontWeight: '700' },

  attachmentOptions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    marginTop: 5,
  },
  attachBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  attachText: {
    fontSize: 14,
    fontWeight: '700',
  },
  previewContainer: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    height: 200,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeImageBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  filePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    marginBottom: 20,
    gap: 12,
  },
  filePreviewIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filePreviewContent: {
    flex: 1,
    gap: 2,
  },
  filePreviewName: {
    fontSize: 15,
    fontWeight: '700',
  },
  filePreviewPill: {
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
  },
  removeFileBtn: {
    padding: 8,
  },

  primaryBtn: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 5,
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
});

export default NewRecordScreen;
