import React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Gradients (Blobs) */}
      <View style={styles.blob1}>
        <LinearGradient
          colors={['rgba(79, 70, 229, 0.4)', 'transparent']}
          style={styles.gradientBlob}
        />
      </View>
      
      <View style={styles.blob2}>
        <LinearGradient
          colors={['rgba(30, 41, 59, 0.4)', 'transparent']}
          style={styles.gradientBlob}
        />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // slate-900
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  blob1: {
    position: 'absolute',
    top: -height * 0.1,
    left: -width * 0.2,
    width: width,
    height: width,
    borderRadius: width / 2,
    opacity: 0.6,
  },
  blob2: {
    position: 'absolute',
    bottom: -height * 0.1,
    right: -width * 0.2,
    width: width,
    height: width,
    borderRadius: width / 2,
    opacity: 0.6,
  },
  gradientBlob: {
    flex: 1,
    borderRadius: width / 2,
  },
});

export default Layout;
