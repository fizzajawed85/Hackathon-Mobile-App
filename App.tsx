import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/context/ThemeContext';
import { ToastProvider } from './src/context/ToastContext';
import { LanguageProvider } from './src/context/LanguageContext';
import Toast from './src/components/Toast';
import './src/styles/global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <ToastProvider>
            <NavigationContainer>
              <AuthProvider>
                <AppNavigator />
              </AuthProvider>
            </NavigationContainer>
            <Toast />
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
