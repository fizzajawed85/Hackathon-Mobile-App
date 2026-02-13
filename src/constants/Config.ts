import { Platform } from 'react-native';

// UPDATE THIS for physical devices:
// Use your machine's IP address (e.g., 'http://192.168.1.5:5000')
const MACHINE_IP = '192.168.1.7'; // Your machine's IP (Local Wi-Fi)

export const BASE_URL = Platform.OS === 'android'
    ? `http://${MACHINE_IP}:5000`
    : 'http://localhost:5000';

export const API_URL = `${BASE_URL}/api/auth`;

export const API_TIMEOUT = 10000; // 10 seconds timeout for better stability
