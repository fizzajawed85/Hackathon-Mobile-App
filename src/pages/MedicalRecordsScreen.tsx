import React, { useState, memo, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl,
  TextInput, Alert, ScrollView, Modal, Image, StatusBar, Dimensions, Platform
} from 'react-native';

const RECORD_TYPES = ['Lab Report', 'Prescription', 'X-Ray', 'Scan', 'Other'];
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getMedicalRecords, deleteMedicalRecord } from '../services/medicalService';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import Header from '../components/Header';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import {
  Plus,
  FileText,
  X,
  Search,
  Trash2,
  Calendar as CalendarIcon,
  FileCheck2,
  Edit3,
  Download,
  Eye
} from 'lucide-react-native';

const MedicalRecordsScreen = () => {
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewImage, setViewImage] = useState<string | null>(null);

  const fetchRecords = async () => {
    try {
      setError('');
      const data = await getMedicalRecords();
      setRecords(data.records || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to fetch records');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDownload = async (item: any) => {
    try {
      const fileName = `${item.title.replace(/\s+/g, '_')}_${Date.now()}`;
      let fileUri = '';
      let base64Data = '';

      if (item.fileUrl) {
        // Handle existing file (Image/PDF)
        const extension = item.fileUrl.split(';')[0].split('/')[1] || 'pdf';
        const dir = FileSystem.documentDirectory || FileSystem.cacheDirectory;
        fileUri = `${dir}${fileName}.${extension}`;
        base64Data = item.fileUrl.split('base64,')[1];
      } else {
        // Handle text-only record (Prescription/Report)
        const dir = FileSystem.documentDirectory || FileSystem.cacheDirectory;
        fileUri = `${dir}${fileName}.txt`;
        const content = `MEDICAL RECORD REPORT\n\nTitle: ${item.title}\nType: ${item.recordType || 'Other'}\nDate: ${new Date(item.createdAt).toLocaleDateString()}\n\nDescription:\n${item.description || 'No description provided.'}`;

        // Use writeAsStringAsync directly with UTF-8 for text
        await FileSystem.writeAsStringAsync(fileUri, content, {
          encoding: 'utf8',
        });
      }

      if (base64Data) {
        await FileSystem.writeAsStringAsync(fileUri, base64Data, {
          encoding: 'base64',
        });
      }

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        showToast({ message: 'Sharing is not available on this device', type: 'error' });
      }
    } catch (err) {
      console.error('Download error:', err);
      showToast({ message: 'Failed to save document', type: 'error' });
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRecords();
    }, [])
  );

  const handleDelete = (id: string) => {
    Alert.alert(t('records.deleteTitle'), t('records.deleteConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'), style: 'destructive', onPress: async () => {
          try {
            await deleteMedicalRecord(id);
            showToast({ message: t('records.deleted'), type: 'success' });
            fetchRecords();
          } catch { showToast({ message: t('common.error'), type: 'error' }); }
        }
      },
    ]);
  };

  const CategoryBar = memo(({ selectedCategory, onSelect, colors, isDark }: any) => (
    <View style={styles.categoryContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {['All', ...RECORD_TYPES].map((cat) => {
          const isSelected = selectedCategory === cat;
          const displayCat = cat === 'All' ? t('records.all') : (
            cat === 'Lab Report' ? t('records.labReport') :
              cat === 'Prescription' ? t('records.prescription') :
                cat === 'X-Ray' ? t('records.xray') :
                  cat === 'Scan' ? t('records.scan') : t('records.other')
          );
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => onSelect(cat)}
              style={[
                styles.catBtn,
                { backgroundColor: isSelected ? colors.primary : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)') }
              ]}
            >
              <Text style={[styles.catText, { color: isSelected ? '#fff' : colors.secondaryText }]}>
                {displayCat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  ));

  const ImageModal = memo(({ visible, image, onClose }: any) => (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <TouchableOpacity style={styles.modalClose} onPress={onClose}>
          <X color="#fff" size={28} />
        </TouchableOpacity>
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        )}
      </View>
    </Modal>
  ));

  const RecordItem = memo(({ item, colors, isDark, onDelete, onDownload, onView, onEdit, t }: any) => {
    const date = new Date(item.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    return (
      <GlassCard style={styles.recordGlassCard}>
        <View style={styles.cardContent}>
          {/* Header row: Badge and Delete */}
          <View style={styles.cardHeader}>
            <View style={[styles.typeBadge, { backgroundColor: colors.primary + '15' }]}>
              <Text style={[styles.typeBadgeText, { color: colors.primary }]}>{
                item.recordType === 'Lab Report' ? t('records.labReport') :
                  item.recordType === 'Prescription' ? t('records.prescription') :
                    item.recordType === 'X-Ray' ? t('records.xray') :
                      item.recordType === 'Scan' ? t('records.scan') : t('records.other')
              }</Text>
            </View>
            <TouchableOpacity
              style={[styles.deleteBtn, { backgroundColor: colors.danger + '10' }]}
              onPress={() => onDelete(item._id)}
            >
              <Trash2 color={colors.danger} size={16} />
            </TouchableOpacity>
          </View>

          <View style={styles.bodySection}>
            <View style={[styles.fileIconContainer, { backgroundColor: colors.primary + '10' }]}>
              <FileText color={colors.primary} size={22} />
            </View>
            <View style={styles.textInfo}>
              <Text style={[styles.recordTitle, { color: colors.text }]} numberOfLines={1}>{item.title}</Text>
              {item.description ? (
                <Text style={[styles.recordDescription, { color: colors.secondaryText }]} numberOfLines={2}>
                  {item.description}
                </Text>
              ) : (
                <Text style={[styles.recordDescription, { color: colors.muted, fontStyle: 'italic' }]}>
                  No description provided.
                </Text>
              )}
            </View>
          </View>

          <View style={[styles.cardFooter, { borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}>
            <View style={styles.footerMeta}>
              <CalendarIcon color={colors.muted} size={13} />
              <Text style={[styles.footerDate, { color: colors.secondaryText }]} numberOfLines={1}>{date}</Text>
              {item.fileUrl && (
                <View style={styles.attachmentMarker}>
                  <FileCheck2 color={colors.primary} size={13} />
                  <Text style={[styles.attachmentText, { color: colors.primary }]} numberOfLines={1}>{t('records.attached')}</Text>
                </View>
              )}
            </View>
            <View style={styles.footerAction}>
              {item.fileUrl && (
                <TouchableOpacity
                  style={[styles.iconBtn, { backgroundColor: colors.success + '15' }]}
                  onPress={() => item.fileUrl.startsWith('data:image') ? onView(item.fileUrl) : onDownload(item)}
                >
                  <Eye color={colors.success} size={16} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.iconBtn, { backgroundColor: '#36454F' + '15' }]}
                onPress={() => onDownload(item)}
              >
                <Download color="#36454F" size={16} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iconBtn, { backgroundColor: colors.primary + '15' }]}
                onPress={() => onEdit(item)}
              >
                <Edit3 color={colors.primary} size={16} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </GlassCard>
    );
  });

  const onDelete = useCallback((id: string) => handleDelete(id), []);
  const onDownload = useCallback((item: any) => handleDownload(item), []);
  const onView = useCallback((url: string) => setViewImage(url), []);
  const onEdit = useCallback((item: any) => {
    navigation.navigate('NewRecord', {
      id: item._id,
      record: {
        title: item.title,
        description: item.description,
        recordType: item.recordType,
        fileUrl: item.fileUrl
      }
    });
  }, [navigation]);

  const renderItem = useCallback(({ item }: any) => (
    <RecordItem
      item={item}
      colors={colors}
      isDark={isDark}
      onDelete={onDelete}
      onDownload={onDownload}
      onView={onView}
      onEdit={onEdit}
      t={t}
    />
  ), [colors, isDark, onDelete, onDownload, onView, onEdit, t]);

  const filteredRecords = records.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.recordType && r.recordType.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || r.recordType === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout includeBottomSafeArea={false}>
      <Header
        title={t('records.title')}
        rightElement={
          <TouchableOpacity
            style={[styles.addBtnHeader, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('NewRecord')}
          >
            <Plus color="#fff" size={24} />
          </TouchableOpacity>
        }
      />

      <GlassCard style={styles.searchGlassCard}>
        <View style={styles.searchContainer}>
          <Search color={colors.primary} size={18} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={t('records.searchPlaceholder')}
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </GlassCard>

      <CategoryBar
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
        colors={colors}
        isDark={isDark}
      />
      <ImageModal
        visible={!!viewImage}
        image={viewImage}
        onClose={() => setViewImage(null)}
      />

      {loading && !refreshing ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={[styles.errorText, { color: colors.text }]}>{error}</Text>
          <TouchableOpacity onPress={fetchRecords} style={[styles.retryBtn, { backgroundColor: colors.primary }]}>
            <Text style={styles.retryText}>{t('common.retry')}</Text>
          </TouchableOpacity>
        </View>
      ) : filteredRecords.length === 0 ? (
        <View style={styles.center}>
          <View style={[styles.emptyIconContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
            <FileCheck2 color={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} size={48} />
          </View>
          <Text style={[styles.emptyText, { color: colors.text }]}>{t('records.noRecords')}</Text>
          <Text style={[styles.emptyDesc, { color: colors.secondaryText }]}>
            {searchQuery ? t('common.noResults') : t('records.noRecordsDesc')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredRecords}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => { setRefreshing(true); fetchRecords(); }}
              tintColor={colors.primary}
            />
          }
          showsVerticalScrollIndicator={false}
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={Platform.OS === 'android'}
        />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  addBtnHeader: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8
  },
  searchGlassCard: {
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 14,
    height: 48,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    height: '100%',
    paddingVertical: 0,
  },
  categoryContainer: {
    height: 44,
    marginBottom: 16,
  },
  categoryScroll: {
    paddingHorizontal: 20,
    gap: 10,
    alignItems: 'center',
  },
  catBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  catText: {
    fontSize: 13,
    fontWeight: '700',
  },
  list: { paddingHorizontal: 20, paddingBottom: 40 },
  recordGlassCard: {
    borderRadius: 24,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardContent: { padding: 16 },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  deleteBtn: {
    padding: 8,
    borderRadius: 10
  },
  bodySection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16
  },
  fileIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInfo: {
    flex: 1,
    marginLeft: 14
  },
  recordTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4
  },
  recordDescription: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18
  },
  cardFooter: {
    paddingTop: 12,
    marginTop: 4,
    borderTopWidth: 1,
  },
  footerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    marginBottom: 10,
  },
  footerDate: {
    fontSize: 12,
    fontWeight: '600'
  },
  footerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: '700'
  },
  attachmentMarker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 10,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(0,0,0,0.1)',
  },
  attachmentText: {
    fontSize: 11,
    fontWeight: '700',
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: (StatusBar.currentHeight || 0) + 20,
    right: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
  },
  fullImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  emptyIconContainer: { width: 110, height: 110, borderRadius: 55, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  emptyText: { fontSize: 20, fontWeight: '800', marginBottom: 12 },
  emptyDesc: { fontSize: 14, fontWeight: '500', textAlign: 'center', lineHeight: 22 },
  errorText: { fontSize: 15, fontWeight: '800', marginBottom: 20, textAlign: 'center' },
  retryBtn: { paddingHorizontal: 30, paddingVertical: 12, borderRadius: 12 },
  retryText: { color: '#fff', fontSize: 15, fontWeight: '800' },
});

export default MedicalRecordsScreen;
