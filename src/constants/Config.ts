import { Platform } from 'react-native';

// 🚨 IMPORTANT FOR PHYSICAL DEVICE TESTING:
// 1. Run 'ipconfig' (Windows) or 'ifconfig' (Mac/Linux) in your terminal.
// 2. Find your IPv4 Address (usually starts with 192.168.x.x).
// 3. Update 'MACHINE_IP' below with that address.
// 4. Ensure your phone and PC are on the SAME Wi-Fi network.

const MACHINE_IP = '192.168.1.5'; // <-- CHANGE THIS to your PC's actual local IP

export const BASE_URL = `http://${MACHINE_IP}:5000`;

export const BASE_API_URL = `${BASE_URL}/api`;
export const API_URL = `${BASE_API_URL}/auth`;

export const API_TIMEOUT = 10000;
