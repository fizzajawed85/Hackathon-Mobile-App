import * as RN from 'react-native';
import { View, StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import React, { memo } from 'react';

const { width, height } = Dimensions.get('window');

interface LayoutProps {
  children: React.ReactNode;
  includeBottomSafeArea?: boolean;
  avoidKeyboard?: boolean;
}

const BackgroundBlobs = memo(({ isDark, colors }: { isDark: boolean, colors: any }) => (
  <>
    {/* Background Gradients (Blobs) */}
    <View style={[styles.blob1, { opacity: isDark ? 0.75 : 0.45 }]}>
      <LinearGradient
        colors={[isDark ? '#4338ca' + '80' : '#6366f1' + '50', 'transparent']}
        style={styles.gradientBlob}
      />
    </View>

    <View style={[styles.blob2, { opacity: isDark ? 0.75 : 0.45 }]}>
      <LinearGradient
        colors={[isDark ? '#3730a3' + '70' : '#4f46e5' + '40', 'transparent']}
        style={styles.gradientBlob}
      />
    </View>
  </>
));

const Layout: React.FC<LayoutProps> = ({
  children,
  includeBottomSafeArea = true,
  avoidKeyboard = true
}) => {
  const { colors, isDark } = useTheme();

  const content = (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: 'transparent' }]}
      edges={includeBottomSafeArea ? ['top', 'bottom'] : ['top']}
    >
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        translucent
        backgroundColor="transparent"
      />

      <BackgroundBlobs isDark={isDark} colors={colors} />

      {avoidKeyboard ? (
        <RN.KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
        >
          {content}
        </RN.KeyboardAvoidingView>
      ) : (
        content
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 0,
    zIndex: 10,
  },
  blob1: {
    position: 'absolute',
    top: -height * 0.1,
    left: -width * 0.2,
    width: width,
    height: width,
    borderRadius: width / 2,
  },
  blob2: {
    position: 'absolute',
    bottom: -height * 0.1,
    right: -width * 0.2,
    width: width,
    height: width,
    borderRadius: width / 2,
  },
  gradientBlob: {
    flex: 1,
    borderRadius: width / 2,
  },
});

export default Layout;
