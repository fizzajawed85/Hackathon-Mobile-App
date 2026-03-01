import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import Header from '../components/Header';
import {
  ChevronLeft,
  Send,
  Bot,
  User,
  MessageSquare,
  Stethoscope,
  Calendar,
  ClipboardList,
  Info,
  Zap,
  Sparkles,
  Search,
  FileText,
  Activity as ActivityIcon,
  Plus,
  MoreVertical,
  Camera,
  Image as ImageIcon,
  File as FileIcon,
  X
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import axios from 'axios';
import { BASE_API_URL } from '../constants/Config';
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ConsultationBotScreen = () => {
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme();
  const { user, token } = useAuth();
  const { showToast } = useToast();
  const { t, language } = useLanguage();
  const isRTL = language === 'ur' || language === 'ar';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('medbot.greeting').replace('${user}', user?.username || ''),
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [botMode, setBotMode] = useState<'personal' | 'medical'>('personal');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [localStats, setLocalStats] = useState<any>({ steps: 0, hr: '--', sleep: '--' });

  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<{
    uri: string;
    type: 'image' | 'file';
    base64: string;
    name: string;
  } | null>(null);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    fetchAppData();
    syncLocalData();
  }, []);

  const syncLocalData = async () => {
    try {
      const lastHR = await SecureStore.getItemAsync('last_scanned_hr');
      const lastActive = await SecureStore.getItemAsync('last_active_time');
      const lastSteps = await SecureStore.getItemAsync('last_steps');

      let sleepStr = '--';
      if (lastActive) {
        const hours = (Date.now() - parseInt(lastActive)) / (1000 * 60 * 60);
        if (hours >= 4) {
          const h = Math.floor(hours);
          const m = Math.round((hours % 1) * 60);
          sleepStr = `${h}h ${m}m`;
        }
      }

      setLocalStats({
        hr: lastHR || '--',
        sleep: sleepStr,
        steps: lastSteps ? parseInt(lastSteps) : 0
      });
    } catch (e) {
      console.log('Local sync error:', e);
    }
  };

  const fetchAppData = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(response.data);
    } catch (error) {
      console.log('Bot data fetch error:', error);
    }
  };

  const pickImage = async (useCamera: boolean) => {
    setShowAttachmentMenu(false);
    let result;
    if (useCamera) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') return showToast({ message: t('newRecord.error.camDeny'), type: 'error' });
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
      setSelectedAttachment({
        uri: result.assets[0].uri,
        type: 'image',
        base64: base64Img,
        name: 'Image Attachment'
      });
      showToast({ message: t('newRecord.attached'), type: 'success' });
    }
  };

  const pickDocument = async () => {
    setShowAttachmentMenu(false);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        const base64File = await FileSystem.readAsStringAsync(file.uri, { encoding: 'base64' });
        const fullBase64 = `data:${file.mimeType || 'application/octet-stream'};base64,${base64File}`;

        setSelectedAttachment({
          uri: file.uri,
          type: 'file',
          base64: fullBase64,
          name: file.name
        });
        showToast({ message: t('newRecord.attached'), type: 'success' });
      }
    } catch (err) {
      showToast({ message: t('newRecord.error.pickErr'), type: 'error' });
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() && !selectedAttachment) return;

    const messageText = selectedAttachment
      ? `${inputText.trim()}\n\n[Attached Report: ${selectedAttachment.name}]`
      : inputText.trim();

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    const currentAttachment = selectedAttachment;
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setSelectedAttachment(null);
    setIsTyping(true);

    try {
      let botResponse = "";

      if (botMode === 'personal') {
        // Personal Mode: Local Logic
        botResponse = generateResponse(userMessage.text.toLowerCase());
      } else {
        // Medical Expert Mode: Real Gemini AI
        const response = await axios.post(`${BASE_API_URL}/ai/chat`, {
          message: userMessage.text,
          attachment: currentAttachment ? currentAttachment.base64 : null
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          botResponse = response.data.reply;
        } else {
          botResponse = t('medbot.responses.error');
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.log('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t('medbot.responses.sysError'),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateResponse = (input: string): string => {
    const i = input.toLowerCase();
    const meds = dashboardData?.medication;
    const upcomingAppointment = dashboardData?.upcomingAppointment;
    const doctorsCount = dashboardData?.doctorsCount || 0;
    const stats = dashboardData?.statistics || [];

    // Helper for multi-keyword match
    const matches = (keywords: string[]) => keywords.some(k => i.includes(k));

    // --- 1. MEDICAL EXPERT MODE LOGIC ---
    if (botMode === 'medical') {
      // A. Symptoms & Specialty Suggestions
      if (matches(['headache', 'pain', 'fever', 'cold', 'migraine'])) {
        return t('medbot.responses.symptoms');
      }
      if (matches(['heart', 'pulse', 'chest', 'palpitation'])) {
        return t('medbot.responses.heart');
      }
      if (matches(['skin', 'itch', 'rash', 'allergy'])) {
        return t('medbot.responses.skin');
      }

      // B. Drug/Medicine Knowledge
      if (matches(['paracetamol', 'panadol', 'acetaminophen'])) {
        return t('medbot.responses.drugs.paracetamol');
      }
      if (matches(['aspirin'])) {
        return t('medbot.responses.drugs.aspirin');
      }
      if (matches(['what is', 'used for', 'medicine info', 'drug'])) {
        return t('medbot.responses.drugs.general');
      }

      // C. Report Analysis (Mock)
      if (matches(['scan report', 'analyze file', 'result', 'test'])) {
        return t('medbot.responses.analyzeReport');
      }

      // D. Fallback for Medical Mode
      if (matches(['how to', 'guide', 'suggest', 'help'])) {
        return t('medbot.responses.help');
      }

      return t('medbot.responses.medicalFallback');
    }

    // --- 2. PERSONAL MODE LOGIC ---
    // 0. Booking Instructions
    if (matches(['how to book', 'book an appointment', 'procedure', 'how can i book'])) {
      return t('medbot.responses.personal.bookingHow');
    }

    // 1. My Appointments Status
    if (matches(['appointment', 'visit', 'booking', 'scheduled'])) {
      if (upcomingAppointment) {
        return t('medbot.responses.personal.appointmentInfo', {
          doctor: upcomingAppointment.doctorName,
          date: upcomingAppointment.date,
          time: upcomingAppointment.time,
          status: upcomingAppointment.status
        });
      }
      return t('medbot.responses.personal.appointmentNone');
    }

    // 2. My Medications
    if (matches(['medication', 'medicine', 'meds', 'tablet', 'take', 'pill'])) {
      if (meds && meds.name) {
        return t('medbot.responses.personal.medicationInfo', {
          name: meds.name,
          dosage: meds.dosage,
          instruction: meds.instruction,
          time: meds.time
        });
      }
      return t('medbot.responses.personal.medicationNone');
    }

    // 3. My Health Stats
    if (matches(['health', 'status', 'how am i', 'current data', 'summary', 'heart', 'step', 'sleep', 'bp', 'blood pressure'])) {
      const apiHR = stats.find((s: any) => s.id === 'heart_rate')?.value || '--';
      const apiSteps = stats.find((s: any) => s.id === 'steps')?.value || '0';
      const bp = stats.find((s: any) => s.id === 'bp')?.value || '--';
      const apiSleep = stats.find((s: any) => s.id === 'sleep')?.value || '--';

      const hr = localStats.hr !== '--' ? localStats.hr : apiHR;
      const sleepVal = localStats.sleep !== '--' ? localStats.sleep : apiSleep;
      const steps = localStats.steps > 0 ? localStats.steps.toLocaleString() : apiSteps;

      return t('medbot.responses.personal.healthSummary', {
        hr: hr,
        steps: steps,
        bp: bp,
        sleep: sleepVal
      });
    }

    // 4. Doctor Info
    if (matches(['doctor', 'specialist', 'facility', 'how many'])) {
      return t('medbot.responses.personal.doctorsInfo', {
        count: doctorsCount.toString()
      });
    }

    // 5. General Info
    if (matches(['hello', 'hi', 'hey', 'start'])) {
      return t('medbot.initialMsg').replace('${user}', user?.username || '');
    }

    if (matches(['thanks', 'thank you', 'ok', 'good'])) {
      return t('medbot.responses.personal.thanks');
    }

    return t('medbot.responses.personal.fallback');
  };

  const PERSONAL_CHIPS = [
    { label: t('medbot.chips.nextAppt'), query: 'When is my next appointment?' },
    { label: t('tabs.records'), query: 'What are my medications?' },
    { label: t('dashboard.statsTitle'), query: 'How is my health status?' },
  ];

  const MEDICAL_CHIPS = [
    { label: t('medbot.responses.details'), query: 'Help me find a specialist for my headache' },
    { label: t('medbot.chips.medInfo'), query: 'What is Paracetamol used for?' },
    { label: t('medbot.chips.symptoms'), query: 'Analyze my medical report' },
  ];

  const ACTIVE_CHIPS = botMode === 'personal' ? PERSONAL_CHIPS : MEDICAL_CHIPS;

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[
        styles.messageWrapper,
        isUser ? styles.userMessageWrapper : styles.botMessageWrapper
      ]}>
        {!isUser && (
          <View style={[styles.avatarMarker, { backgroundColor: colors.primary }]}>
            <Bot color="#fff" size={14} />
          </View>
        )}
        <View style={[
          styles.messageBubble,
          isUser
            ? [styles.userBubble, { backgroundColor: colors.primary }]
            : [styles.botBubble, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#f3f4f6' }]
        ]}>
          <Text style={[
            styles.messageText,
            isUser ? { color: '#fff' } : { color: colors.text }
          ]}>
            {item.text}
          </Text>
          <Text style={[
            styles.timestamp,
            isUser ? { color: 'rgba(255,255,255,0.6)' } : { color: colors.muted }
          ]}>
            {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
        {isUser && (
          <View style={[styles.avatarMarker, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }, isRTL ? { marginRight: 8 } : { marginLeft: 8 }]}>
            <User color={colors.text} size={14} />
          </View>
        )}
      </View>
    );
  };

  return (
    <Layout avoidKeyboard={false} includeBottomSafeArea={true}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 30}
      >
        <Header
          title={
            <View style={styles.headerInfo}>
              <Text style={[styles.headerTitle, { color: colors.text }]}>{t('medbot.title')}</Text>
              <View style={[styles.statusRow, isRTL && { flexDirection: 'row-reverse' }]}>
                <View style={[styles.statusDot, { backgroundColor: botMode === 'personal' ? '#10b981' : '#6366f1' }]} />
                <Text style={[styles.statusText, { color: colors.secondaryText }]}>
                  {botMode === 'personal' ? t('medbot.modes.personal') : t('medbot.modes.medical')}
                </Text>
              </View>
            </View>
          }
          rightElement={
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: (botMode === 'personal' ? colors.primary : '#6366f1') + '20' }]}
              onPress={() => {
                const nextMode = botMode === 'personal' ? 'medical' : 'personal';
                setBotMode(nextMode);
                showToast({
                  message: t('medbot.modes.switched').replace('${mode}', nextMode === 'personal' ? t('medbot.modes.personal') : t('medbot.modes.medical')),
                  type: 'info'
                });
              }}
            >
              {botMode === 'personal' ? <Sparkles color={colors.primary} size={20} /> : <Bot color="#6366f1" size={20} />}
            </TouchableOpacity>
          }
        />

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatContainer}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {isTyping && (
          <View style={[styles.typingContainer, isRTL && { flexDirection: 'row-reverse' }]}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={[styles.typingText, { color: colors.secondaryText }]}>{t('medbot.thinking')}</Text>
          </View>
        )}

        <View style={styles.chipsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
            {ACTIVE_CHIPS.map((chip, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.chip,
                  {
                    backgroundColor: (botMode === 'personal' ? colors.primary : '#6366f1') + '15',
                    borderColor: (botMode === 'personal' ? colors.primary : '#6366f1') + '25'
                  }
                ]}
                onPress={() => {
                  setInputText(chip.query);
                  setTimeout(handleSend, 100);
                }}
              >
                <Text style={[styles.chipText, { color: botMode === 'personal' ? colors.primary : '#6366f1' }]}>{chip.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {showAttachmentMenu && (
          <View style={[styles.attachmentMenu, { backgroundColor: isDark ? 'rgba(30,30,40,0.95)' : '#fff' }]}>
            <TouchableOpacity style={[styles.menuItem, isRTL && { flexDirection: 'row-reverse' }]} onPress={() => pickImage(true)}>
              <View style={[styles.menuIcon, { backgroundColor: '#6366f1' }, isRTL ? { marginLeft: 12, marginRight: 0 } : { marginRight: 12 }]}>
                <Camera color="#fff" size={20} />
              </View>
              <Text style={[styles.menuText, { color: colors.text }]}>{t('newRecord.actions.camera')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuItem, isRTL && { flexDirection: 'row-reverse' }]} onPress={() => pickImage(false)}>
              <View style={[styles.menuIcon, { backgroundColor: '#10b981' }, isRTL ? { marginLeft: 12, marginRight: 0 } : { marginRight: 12 }]}>
                <ImageIcon color="#fff" size={20} />
              </View>
              <Text style={[styles.menuText, { color: colors.text }]}>{t('newRecord.actions.gallery')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuItem, isRTL && { flexDirection: 'row-reverse' }]} onPress={pickDocument}>
              <View style={[styles.menuIcon, { backgroundColor: '#f59e0b' }, isRTL ? { marginLeft: 12, marginRight: 0 } : { marginRight: 12 }]}>
                <FileIcon color="#fff" size={20} />
              </View>
              <Text style={[styles.menuText, { color: colors.text }]}>{t('newRecord.actions.files')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedAttachment && (
          <View style={[styles.previewWrapper, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}>
            {selectedAttachment.type === 'image' ? (
              <Image source={{ uri: selectedAttachment.uri }} style={styles.previewImage} />
            ) : (
              <View style={styles.filePreview}>
                <FileIcon color={colors.primary} size={24} />
                <Text style={[styles.fileName, { color: colors.text }]} numberOfLines={1}>{selectedAttachment.name}</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.closePreview}
              onPress={() => setSelectedAttachment(null)}
            >
              <X color="#fff" size={16} />
            </TouchableOpacity>
          </View>
        )}

        <GlassCard style={styles.inputGlassCard} intensity={20}>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={[styles.attachBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#f3f4f6' }]}
              onPress={() => setShowAttachmentMenu(!showAttachmentMenu)}
            >
              <Plus color={colors.primary} size={22} />
            </TouchableOpacity>
            <TextInput
              style={[styles.input, { color: colors.text }, isRTL && { textAlign: 'right' }]}
              placeholder={t('medbot.askAnything')}
              placeholderTextColor={colors.muted}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity
              style={[
                styles.sendBtn,
                { backgroundColor: colors.primary },
                (!inputText.trim() && !selectedAttachment) && { opacity: 0.6 }
              ]}
              onPress={handleSend}
              disabled={(!inputText.trim() && !selectedAttachment) || isTyping}
            >
              <Send color="#fff" size={20} />
            </TouchableOpacity>
          </View>
        </GlassCard>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  backBtn: { padding: 5, marginRight: 10 },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  headerInfo: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', letterSpacing: -0.5 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 12, fontWeight: '600' },
  infoBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },

  chatContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    maxWidth: '85%',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
  },
  botMessageWrapper: {
    alignSelf: 'flex-start',
  },
  avatarMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  messageBubble: {
    padding: 14,
    borderRadius: 20,
    marginHorizontal: 8,
    flexShrink: 1,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  botBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 6,
    textAlign: 'right',
    fontWeight: '600',
  },

  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  typingText: {
    fontSize: 13,
    fontWeight: '600',
    fontStyle: 'italic',
  },

  chipsWrapper: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  chipsScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
  },

  inputGlassCard: {
    marginHorizontal: 15,
    marginBottom: Platform.OS === 'ios' ? 10 : 5,
    marginTop: 5,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    fontSize: 15,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: '500',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  attachmentMenu: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    width: 180,
    borderRadius: 24,
    padding: 12,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    zIndex: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '700',
  },

  previewWrapper: {
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  previewImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  filePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    paddingRight: 30,
  },
  fileName: {
    fontSize: 13,
    fontWeight: '700',
  },
  closePreview: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ef4444',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default ConsultationBotScreen;
