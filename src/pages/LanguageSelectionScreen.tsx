import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Globe, Check } from 'lucide-react-native';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';

const languages = [
    { code: 'en', label: 'English', native: 'English', flag: '🇺🇸' },
    { code: 'ur', label: 'Urdu', native: 'اردو', flag: '🇵🇰' },
    { code: 'ar', label: 'Arabic', native: 'العربية', flag: '🇸🇦' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
    { code: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'French', native: 'Français', flag: '🇫🇷' },
    { code: 'zh', label: 'Chinese', native: '中文', flag: '🇨🇳' },
];

const LanguageSelectionScreen = () => {
    const navigation = useNavigation<any>();
    const { language, setLanguage, t } = useLanguage();
    const { colors, isDark } = useTheme();

    return (
        <Layout>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.backBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}
                >
                    <ChevronLeft color={colors.text} size={24} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>{t('profile.language')}</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.infoSection}>
                    <View style={[styles.iconCircle, { backgroundColor: colors.primary + '15' }]}>
                        <Globe color={colors.primary} size={32} />
                    </View>
                    <Text style={[styles.title, { color: colors.text }]}>{t('language.title')}</Text>
                    <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
                        {t('language.description')}
                    </Text>
                </View>

                <GlassCard style={styles.listCard} intensity={20}>
                    {languages.map((item, index) => {
                        const isSelected = language === item.code;
                        return (
                            <TouchableOpacity
                                key={item.code}
                                activeOpacity={0.7}
                                style={[
                                    styles.languageItem,
                                    index !== languages.length - 1 && {
                                        borderBottomWidth: 1,
                                        borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                                    },
                                    isSelected && { backgroundColor: colors.primary + '10' }
                                ]}
                                onPress={() => {
                                    setLanguage(item.code as any);
                                }}
                            >
                                <View style={styles.itemLeft}>
                                    <View style={[styles.flagWrapper, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#fff' }]}>
                                        <Text style={styles.flagText}>{item.flag}</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.nativeText, { color: colors.text }]}>{item.native}</Text>
                                        <Text style={[styles.labelText, { color: colors.secondaryText }]}>{item.label}</Text>
                                    </View>
                                </View>

                                <View style={[
                                    styles.indicator,
                                    { borderColor: isSelected ? colors.primary : colors.secondaryText + '30' },
                                    isSelected && { backgroundColor: colors.primary }
                                ]}>
                                    {isSelected && <Check color="#fff" size={12} />}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </GlassCard>

                <Text style={[styles.footerText, { color: colors.muted }]}>
                    {t('language.footer')}
                </Text>
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
        marginTop: Platform.OS === 'ios' ? 10 : 20,
        marginBottom: 10,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    infoSection: {
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 22,
        fontWeight: '500',
    },
    listCard: {
        borderRadius: 30,
        overflow: 'hidden',
        padding: 0,
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        paddingHorizontal: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    flagWrapper: {
        width: 48,
        height: 48,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    flagText: {
        fontSize: 24,
    },
    nativeText: {
        fontSize: 17,
        fontWeight: '700',
    },
    labelText: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 2,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    indicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 25,
        paddingHorizontal: 40,
        lineHeight: 18,
        fontWeight: '500',
    },
});

export default LanguageSelectionScreen;
