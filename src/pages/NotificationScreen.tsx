import React, { useState, useEffect, useCallback, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Platform
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import Header from '../components/Header';
import { useLanguage } from '../context/LanguageContext';
import {
  ChevronLeft,
  Bell,
  Calendar,
  ClipboardList,
  Info,
  CheckCircle2,
  Trash2,
  MailOpen
} from 'lucide-react-native';
import { getNotifications, markNotificationsRead, markNotificationRead } from '../services/medicalService';

interface Notification {
  _id: string;
  id?: string;
  title: string;
  message: string;
  type: 'appointment' | 'record' | 'general';
  isRead: boolean;
  createdAt: string;
}

const NotificationItem = memo(({ item, colors, isDark, onPress, t, isRTL }: any) => {
  const getIcon = (type: string, isRead: boolean) => {
    const iconSize = 22;
    const color = isRead ? colors.secondaryText : colors.primary;
    switch (type) {
      case 'appointment': return <Calendar color={color} size={iconSize} />;
      case 'record': return <ClipboardList color={color} size={iconSize} />;
      default: return <Info color={color} size={iconSize} />;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(item)}
      style={styles.notificationWrapper}
    >
      <GlassCard
        style={[
          styles.notificationCard,
          !item.isRead && { borderColor: colors.primary + '30', borderWidth: 1 },
          { flexDirection: isRTL ? 'row-reverse' : 'row' }
        ]}
        intensity={item.isRead ? 20 : 40}
      >
        <View style={[
          styles.iconContainer,
          { backgroundColor: item.isRead ? (isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6') : colors.primary + '15' },
          { [isRTL ? 'marginLeft' : 'marginRight']: 16 }
        ]}>
          {getIcon(item.type, item.isRead)}
        </View>
        <View style={[styles.content, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
          <View style={[styles.topRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Text style={[styles.title, { color: colors.text, textAlign: isRTL ? 'right' : 'left' }, !item.isRead && { fontWeight: '800' }]}>{item.title}</Text>
            {!item.isRead && <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />}
          </View>
          <Text style={[styles.message, { color: colors.secondaryText, textAlign: isRTL ? 'right' : 'left' }]} numberOfLines={2}>
            {item.message}
          </Text>
          <Text style={[styles.date, { color: colors.muted, textAlign: isRTL ? 'right' : 'left' }]}>
            {new Date(item.createdAt).toLocaleDateString()} • {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
});

const NotificationScreen = () => {
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme();
  const { t, isRTL } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  const handleMarkAllRead = async () => {
    try {
      await markNotificationsRead();
      fetchNotifications();
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const handleNotificationPress = async (item: Notification) => {
    if (!item.isRead) {
      try {
        await markNotificationRead(item._id);
        setNotifications(prev =>
          prev.map(n => n._id === item._id ? { ...n, isRead: true } : n)
        );
      } catch (err) {
        console.error('Error marking read:', err);
      }
    }

    // Optional: Navigate based on type
    if (item.type === 'appointment') {
      navigation.navigate('MainTabs', { screen: 'Visits' });
    } else if (item.type === 'record') {
      navigation.navigate('MainTabs', { screen: 'Records' });
    }
  };


  const onPressNotification = useCallback((item: Notification) => handleNotificationPress(item), []);

  const renderItem = useCallback(({ item }: { item: Notification }) => (
    <NotificationItem
      item={item}
      colors={colors}
      isDark={isDark}
      onPress={onPressNotification}
      t={t}
      isRTL={isRTL}
    />
  ), [colors, isDark, onPressNotification, t, isRTL]);

  return (
    <Layout>
      <Header
        title={t('notifications.title')}
        rightElement={
          <TouchableOpacity onPress={handleMarkAllRead} style={[styles.backButton, { backgroundColor: colors.card + '50' }]}>
            <MailOpen color={colors.primary} size={22} />
          </TouchableOpacity>
        }
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : notifications.length === 0 ? (
        <View style={styles.center}>
          <View style={[styles.emptyIconContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }]}>
            <Bell color={colors.muted} size={40} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text, textAlign: 'center' }]}>{t('notifications.empty')}</Text>
          <Text style={[styles.emptyText, { color: colors.secondaryText, textAlign: 'center' }]}>{t('notifications.emptyDesc')}</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={colors.primary} />
          }
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
    paddingBottom: 20,
    paddingTop: 10,
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
  headerTitle: { fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  actionBtn: { padding: 5 },

  list: { paddingHorizontal: 20, paddingBottom: 30 },
  notificationWrapper: { marginBottom: 12 },
  notificationCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: { flex: 1 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  title: { fontSize: 16, fontWeight: '600' },
  unreadDot: { width: 8, height: 8, borderRadius: 4 },
  message: { fontSize: 13, lineHeight: 18, marginBottom: 8 },
  date: { fontSize: 11, fontWeight: '600' },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  emptyIconContainer: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  emptyTitle: { fontSize: 18, fontWeight: '800', marginBottom: 8 },
  emptyText: { fontSize: 14, textAlign: 'center' },
});

export default NotificationScreen;
