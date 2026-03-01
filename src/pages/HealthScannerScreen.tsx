import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import { useLanguage } from '../context/LanguageContext';
import {
  Heart,
  ChevronLeft,
  Activity,
  Zap,
  ShieldCheck,
  Info
} from 'lucide-react-native';
import axios from 'axios';
import { BASE_API_URL } from '../constants/Config';
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('window');

const HealthScannerScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { colors, isDark } = useTheme();
  const { token } = useAuth();
  const { showToast } = useToast();
  const { t, isRTL } = useLanguage();

  // Params
  const { scanType = 'heart_rate' } = route.params || {};
  const isBP = scanType === 'bp';

  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [complete, setComplete] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scanInterval = useRef<any>(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  const startScan = () => {
    if (!permission?.granted) {
      showToast({ message: t('scanner.permission.denied'), type: 'warning' });
      return;
    }

    setIsScanning(true);
    setIsFlashOn(true);
    setScanProgress(0);
    setScanResult(null);
    setComplete(false);

    // Pulse Animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Scan Progress Simulation
    let progress = 0;
    scanInterval.current = setInterval(() => {
      progress += 2.5;
      setScanProgress(progress);

      if (progress >= 100) {
        finishScan();
      }
    }, 100);
  };

  const finishScan = () => {
    clearInterval(scanInterval.current);
    setIsFlashOn(false);
    setIsScanning(false);

    if (isBP) {
      const sys = 115 + Math.floor(Math.random() * 15);
      const dia = 75 + Math.floor(Math.random() * 10);
      setScanResult(`${sys}/${dia}`);
    } else {
      const randomHR = Math.floor(Math.random() * (95 - 65 + 1)) + 65;
      setScanResult(randomHR.toString());
    }

    setComplete(true);
    pulseAnim.stopAnimation();
  };

  const saveResults = async () => {
    if (!scanResult) return;

    try {
      const updateData: any = { healthStats: {} };

      if (isBP) {
        updateData.healthStats.bp = scanResult;
      } else {
        updateData.healthStats.heartRate = scanResult;
        // Save locally for offline sleep tracking
        await SecureStore.setItemAsync('last_scanned_hr', scanResult);
      }

      await axios.put(`${BASE_API_URL}/user/update`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast({
        message: t('common.success'),
        type: 'success'
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error saving scan results:', error);
      showToast({ message: t('common.error'), type: 'error' });
    }
  };

  if (!permission) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <Layout>
        <View style={styles.permissionContainer}>
          <View style={[styles.infoIconBox, { backgroundColor: colors.primary + '15' }]}>
            <ShieldCheck color={colors.primary} size={40} />
          </View>
          <Text style={[styles.permissionTitle, { color: colors.text }]}>{t('scanner.permission.title')}</Text>
          <Text style={[styles.permissionText, { color: colors.secondaryText }]}>
            {t('scanner.permission.desc').replace('${type}', isBP ? t('scanner.bp') : t('scanner.heartRate'))}
          </Text>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            onPress={requestPermission}
          >
            <Text style={styles.primaryBtnText}>{t('scanner.permission.grant')}</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, isRTL && { transform: [{ rotate: '180deg' }] }]}>
          <ChevronLeft color={colors.text} size={28} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {isBP ? t('scanner.bp') : t('scanner.heartRate')}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        <GlassCard style={styles.scannerCard} intensity={isDark ? 30 : 50}>
          <Text style={[styles.instruction, { color: colors.secondaryText }]}>
            {isScanning ? t('scanner.steady') : t('scanner.instruction')}
          </Text>

          <View style={styles.cameraContainer}>
            <View style={[styles.cameraRing, { borderColor: (isBP ? '#6366f1' : colors.primary) + '30' }]}>
              <View style={[styles.cameraInnerRing, { borderColor: isBP ? '#6366f1' : colors.primary }]}>
                <CameraView
                  style={styles.camera}
                  facing="back"
                  enableTorch={isFlashOn}
                />

                {isScanning && (
                  <View style={styles.overlay}>
                    <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }], backgroundColor: (isBP ? '#6366f1' : colors.primary) + '40' }]} />
                    {isBP ? <Activity color="#fff" size={40} /> : <Heart color="#fff" size={40} />}
                  </View>
                )}

                {complete && (
                  <View style={[styles.completeOverlay, { backgroundColor: (isBP ? '#6366f1' : colors.primary) + '95' }]}>
                    <Text style={styles.resultValue}>{scanResult}</Text>
                    <Text style={styles.resultUnit}>{isBP ? 'mmHg' : 'BPM'}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {isScanning && (
            <View style={styles.progressContainer}>
              <View style={[styles.progressBarBg, { backgroundColor: (isBP ? '#6366f1' : colors.primary) + '15' }]}>
                <View style={[styles.progressBar, { width: `${scanProgress}%`, backgroundColor: isBP ? '#6366f1' : colors.primary }]} />
              </View>
              <Text style={[styles.progressText, { color: isBP ? '#6366f1' : colors.primary }]}>{Math.round(scanProgress)}% {t('scanner.analysis')}</Text>
            </View>
          )}

          {!isScanning && !complete && (
            <TouchableOpacity
              style={[styles.startBtn, { backgroundColor: isBP ? '#6366f1' : colors.primary, flexDirection: isRTL ? 'row-reverse' : 'row' }]}
              onPress={startScan}
            >
              <Zap color="#fff" size={20} />
              <Text style={styles.startBtnText}>{t('common.comingSoon')}</Text>
            </TouchableOpacity>
          )}

          {complete && (
            <View style={styles.resultDetails}>
              <View style={[styles.resultRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <View style={[styles.resultIcon, { backgroundColor: (isBP ? '#6366f1' : '#f43f5e') + '20' }]}>
                  {isBP ? <Activity color="#6366f1" size={20} /> : <Heart color="#f43f5e" size={20} />}
                </View>
                <View style={{ alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                  <Text style={[styles.resultLabel, { color: colors.secondaryText }]}>
                    {isBP ? t('scanner.bp') : t('scanner.heartRate')}
                  </Text>
                  <Text style={[styles.resultValueText, { color: colors.text }]}>
                    {scanResult} {isBP ? 'mmHg' : 'BPM'}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: isBP ? '#6366f1' : colors.primary }]}
                onPress={saveResults}
              >
                <Text style={styles.saveBtnText}>{t('scanner.update')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.retryBtn}
                onPress={() => setComplete(false)}
              >
                <Text style={[styles.retryBtnText, { color: colors.secondaryText }]}>{t('scanner.scanAgain')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </GlassCard>

        <View style={[styles.disclaimerBox, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <Info color={colors.secondaryText} size={16} />
          <Text style={[styles.disclaimerText, { color: colors.secondaryText, textAlign: isRTL ? 'right' : 'left' }]}>
            {t('scanner.disclaimer')}
          </Text>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 20,
  },
  backBtn: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  container: { flex: 1, paddingHorizontal: 20 },
  permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  infoIconBox: { width: 80, height: 80, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  permissionTitle: { fontSize: 24, fontWeight: '900', marginBottom: 12, textAlign: 'center' },
  permissionText: { fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 30 },
  primaryBtn: { paddingVertical: 16, paddingHorizontal: 32, borderRadius: 16, width: '100%', alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },

  scannerCard: { borderRadius: 32, padding: 30, alignItems: 'center' },
  instruction: { fontSize: 15, fontWeight: '600', textAlign: 'center', marginBottom: 30 },
  cameraContainer: { marginBottom: 30 },
  cameraRing: { width: 200, height: 200, borderRadius: 100, borderWidth: 10, padding: 8 },
  cameraInnerRing: { flex: 1, borderRadius: 90, borderWidth: 4, overflow: 'hidden', position: 'relative' },
  camera: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pulseCircle: { width: 100, height: 100, borderRadius: 50, position: 'absolute' },
  completeOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultValue: { fontSize: 40, fontWeight: '900', color: '#fff' },
  resultUnit: { fontSize: 16, fontWeight: '800', color: '#fff', marginTop: -5 },

  progressContainer: { width: '100%', marginTop: 10 },
  progressBarBg: { height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 10 },
  progressBar: { height: '100%', borderRadius: 4 },
  progressText: { fontSize: 13, fontWeight: '800', textAlign: 'center' },

  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 10
  },
  startBtnText: { color: '#fff', fontSize: 16, fontWeight: '900' },

  resultDetails: { width: '100%', marginTop: 10 },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20
  },
  resultIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  resultLabel: { fontSize: 12, fontWeight: '700' },
  resultValueText: { fontSize: 18, fontWeight: '800' },
  saveBtn: { paddingVertical: 18, borderRadius: 20, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '900' },
  retryBtn: { paddingVertical: 15, alignItems: 'center' },
  retryBtnText: { fontSize: 14, fontWeight: '700' },

  disclaimerBox: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 15,
    borderRadius: 16
  },
  disclaimerText: { flex: 1, fontSize: 11, lineHeight: 16, fontWeight: '500' }
});

export default HealthScannerScreen;
