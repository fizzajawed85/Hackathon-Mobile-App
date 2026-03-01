import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18nManager } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { translations } from '../constants/Translations';
import * as Updates from 'expo-updates';

type Language = 'en' | 'ur' | 'ar' | 'es' | 'fr' | 'hi' | 'zh';

interface LanguageContextType {
    language: Language;
    isRTL: boolean;
    setLanguage: (lang: Language) => void;
    t: (path: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        const loadLanguage = async () => {
            const storedLang = await SecureStore.getItemAsync('app_language');
            const validLangs = ['en', 'ur', 'ar', 'es', 'fr', 'hi', 'zh'];
            if (storedLang && validLangs.includes(storedLang)) {
                setLanguageState(storedLang as Language);

                // Robust boot check: ensure native direction matches stored language
                const shouldBeRTL = storedLang === 'ur' || storedLang === 'ar';
                if (I18nManager.isRTL !== shouldBeRTL) {
                    I18nManager.allowRTL(shouldBeRTL);
                    I18nManager.forceRTL(shouldBeRTL);
                    Updates.reloadAsync();
                }
            }
        };
        loadLanguage();
    }, []);

    const setLanguage = async (lang: Language) => {
        const isRTL = lang === 'ur' || lang === 'ar';
        const wasRTL = language === 'ur' || language === 'ar';

        setLanguageState(lang);
        await SecureStore.setItemAsync('app_language', lang);

        // Always update native manager to be safe
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);

        // If the direction actually changed, we MUST reload the app
        if (wasRTL !== isRTL || I18nManager.isRTL !== isRTL) {
            setTimeout(() => {
                Updates.reloadAsync();
            }, 300);
        }
    };

    const t = (path: string, params?: Record<string, string>): string => {
        const keys = path.split('.');
        let result = translations[language];

        for (const key of keys) {
            if (result && result[key]) {
                result = result[key];
            } else {
                return path; // Fallback to path if not found
            }
        }

        if (typeof result !== 'string') return path;

        // Perform interpolation if params are provided
        if (params) {
            let interpolated = result;
            Object.keys(params).forEach(key => {
                const value = params[key];
                const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
                interpolated = interpolated.replace(regex, value);
            });
            return interpolated;
        }

        return result;
    };

    const isRTL = language === 'ur' || language === 'ar';

    return (
        <LanguageContext.Provider value={{ language, isRTL, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
