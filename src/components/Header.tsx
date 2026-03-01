import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
    title?: string | React.ReactNode;
    showBack?: boolean;
    rightElement?: React.ReactNode;
    onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBack = true, rightElement, onBackPress }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
        } else if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    const renderTitle = () => {
        if (typeof title === 'string') {
            return (
                <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                    {title}
                </Text>
            );
        }
        return title;
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                {showBack && (
                    <TouchableOpacity 
                        onPress={handleBack} 
                        style={[styles.backButton, { backgroundColor: colors.card + '50' }]}
                    >
                        <ChevronLeft color={colors.text} size={24} />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.titleSection}>
                {renderTitle()}
            </View>

            <View style={styles.rightSection}>
                {rightElement || <View style={{ width: 40 }} />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        height: 70,
        zIndex: 100,
    },
    leftSection: {
        width: 50,
        alignItems: 'flex-start',
    },
    titleSection: {
        flex: 1,
        alignItems: 'center',
    },
    rightSection: {
        width: 50,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
});

export default Header;
