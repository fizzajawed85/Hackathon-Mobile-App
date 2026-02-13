# 📱 React Native Mobile Boilerplate

A production-ready React Native mobile application built with Expo, featuring a complete authentication system, premium UI components, and seamless backend integration.

## 🌟 Features

### Authentication System
- ✅ **User Registration** - Create new accounts with username, email, and password
- ✅ **User Login** - Secure authentication with JWT tokens
- ✅ **Forgot Password** - Email-based password reset with OTP verification
- ✅ **Social Login UI** - Ready-to-integrate social login buttons (Google, Facebook, LinkedIn, GitHub)
- ✅ **Secure Token Storage** - Uses Expo SecureStore for encrypted token management
- ✅ **Auto-login** - Persistent authentication across app restarts

### UI/UX Design
- 🎨 **Glassmorphism Design** - Modern glass-card effects with blur backgrounds
- 🌈 **Premium Gradients** - Beautiful gradient blobs and color schemes
- 🔒 **Interactive Elements** - Focus states, hover effects, and smooth animations
- 📱 **Responsive Layout** - Optimized for all screen sizes
- 🎯 **Custom Components** - Reusable Input, Button, and Layout components
- 🔐 **Password Visibility Toggle** - User-friendly password input fields
- ✨ **Lucide Icons** - Professional icon set throughout the app

### Technical Features
- ⚡ **TypeScript** - Full type safety and better developer experience
- 🧭 **React Navigation** - Stack-based navigation with type-safe routing
- 🔄 **Context API** - Global state management for authentication
- 📡 **Axios Integration** - HTTP client for API communication
- 🎭 **Error Handling** - Comprehensive error messages and validation
- 🔧 **Environment Configuration** - Easy backend URL configuration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Expo CLI** - Install globally: `npm install -g expo-cli`
- **Expo Go App** - Install on your mobile device from App Store/Play Store
- **Backend Server** - The backend must be running (see Backend Setup section)

### For Physical Device Testing
- **Mobile Device** with Expo Go app installed
- **Same WiFi Network** - Both your computer and mobile device must be on the same network

## 🚀 Installation

### 1. Clone the Repository
```bash
cd boilerplate/mobile
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Backend URL

**For Emulator/Simulator:**
- Edit `src/constants/Config.ts`
- Set `MACHINE_IP` to `localhost` or `127.0.0.1`

**For Physical Device:**
- Find your computer's local IP address:
  - **Windows**: Run `ipconfig` in Command Prompt, look for IPv4 Address
  - **Mac/Linux**: Run `ifconfig` or `ip addr show`
- Edit `src/constants/Config.ts`
- Set `MACHINE_IP` to your computer's IP (e.g., `192.168.1.7`)

```typescript
// src/constants/Config.ts
export const MACHINE_IP = '192.168.1.7'; // Replace with your IP
export const API_BASE_URL = `http://${MACHINE_IP}:5000/api`;
```

### 4. Start the Backend Server

Navigate to the backend directory and start the server:
```bash
cd ../backend
npm install
npx nodemon server.js
```

The backend should be running on `http://localhost:5000`

### 5. Start the Mobile App
```bash
npm start
```

### 6. Run on Device/Emulator

**Option A: Physical Device**
1. Open Expo Go app on your phone
2. Scan the QR code from the terminal
3. Wait for the app to load

**Option B: Android Emulator**
```bash
npm run android
```

**Option C: iOS Simulator** (Mac only)
```bash
npm run ios
```

## 📁 Project Structure

```
mobile/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx       # Custom button component
│   │   ├── Input.tsx        # Custom input with focus states
│   │   ├── GlassCard.tsx    # Glassmorphism card container
│   │   ├── Layout.tsx       # Main layout with gradients
│   │   └── SocialLogins.tsx # Social login buttons
│   │
│   ├── pages/               # Screen components
│   │   ├── auth/            # Authentication screens
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   └── VerifyOtpScreen.tsx
│   │   └── HomeScreen.tsx   # Main app screen
│   │
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.tsx # Stack navigator setup
│   │
│   ├── context/             # React Context
│   │   └── AuthContext.tsx  # Authentication state management
│   │
│   ├── services/            # API services
│   │   └── authService.ts   # Authentication API calls
│   │
│   ├── types/               # TypeScript definitions
│   │   ├── auth.ts          # Auth-related types
│   │   └── navigation.ts    # Navigation types
│   │
│   ├── constants/           # App constants
│   │   └── Config.ts        # API URLs and configuration
│   │
│   └── styles/              # Global styles
│       └── colors.ts        # Color palette
│
├── assets/                  # Images, fonts, icons
├── App.tsx                  # Root component
├── app.json                 # Expo configuration
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript configuration
```

## 🎨 UI Components

### Button Component
```tsx
<Button 
  title="Sign In" 
  icon={<ArrowRight color="#fff" size={18} />}
  onPress={handleLogin}
  disabled={loading}
/>
```

### Input Component
```tsx
<Input 
  label="Email Address"
  placeholder="name@company.com"
  keyboardType="email-address"
  value={email}
  onChangeText={setEmail}
/>
```

### GlassCard Component
```tsx
<GlassCard>
  {/* Your content here */}
</GlassCard>
```

## 🔐 Authentication Flow

### Registration
1. User enters username, email, and password
2. App validates input fields
3. Sends POST request to `/api/auth/register`
4. Receives JWT token and user data
5. Stores token in SecureStore
6. Redirects to Home screen

### Login
1. User enters email and password
2. App validates credentials
3. Sends POST request to `/api/auth/login`
4. Receives JWT token
5. Updates AuthContext
6. Navigates to Home screen

### Forgot Password
1. User enters email address
2. Backend sends OTP to email
3. User enters 6-digit OTP
4. User sets new password
5. Password updated successfully

## 🛠️ Configuration

### API Endpoints
All API endpoints are defined in `src/constants/Config.ts`:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/verify-otp` - Verify OTP code
- `POST /api/auth/reset-password` - Reset password

### Environment Variables
The app uses a configuration file instead of `.env`:
```typescript
// src/constants/Config.ts
export const MACHINE_IP = 'YOUR_IP_HERE';
export const API_BASE_URL = `http://${MACHINE_IP}:5000/api`;
```

## 🎯 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `expo` | ~54.0.33 | Expo framework |
| `react-native` | 0.81.5 | React Native core |
| `@react-navigation/native` | ^7.1.28 | Navigation |
| `axios` | ^1.13.5 | HTTP client |
| `expo-secure-store` | ~15.0.8 | Secure token storage |
| `expo-blur` | ~15.0.8 | Blur effects |
| `expo-linear-gradient` | ~15.0.8 | Gradient backgrounds |
| `lucide-react-native` | ^0.564.0 | Icon library |
| `typescript` | ~5.9.2 | Type safety |

## 🐛 Troubleshooting

### Common Issues

**1. "Cannot connect to server" Error**
- ✅ Ensure backend is running on port 5000
- ✅ Check `MACHINE_IP` in `Config.ts` matches your computer's IP
- ✅ Verify both devices are on the same WiFi network
- ✅ Disable firewall temporarily to test

**2. "Network request failed"**
- ✅ Check if backend URL is correct
- ✅ Test backend with `curl http://YOUR_IP:5000/test`
- ✅ Ensure no VPN is blocking local network

**3. App crashes on startup**
- ✅ Clear Metro bundler cache: `expo start -c`
- ✅ Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- ✅ Check for TypeScript errors: `npx tsc --noEmit`

**4. "Token expired" Error**
- ✅ Tokens expire after 7 days
- ✅ User needs to login again
- ✅ Check backend JWT_SECRET is set correctly

**5. Social Login Icons Not Showing**
- ✅ Ensure `react-native-svg` is installed
- ✅ Clear cache and restart: `expo start -c`

## 📱 Testing

### Test Accounts
You can create test accounts with any valid email format:
```
Username: testuser
Email: test@example.com
Password: Test@123
```

### Testing Forgot Password
1. Ensure email configuration is set in backend `.env`
2. Use a real email address for testing
3. Check spam folder for OTP email
4. OTP expires after 10 minutes

## 🚢 Building for Production

### Android APK
```bash
expo build:android
```

### iOS IPA
```bash
expo build:ios
```

### Using EAS Build (Recommended)
```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

## 🎨 Customization

### Colors
Edit `src/styles/colors.ts` to customize the color scheme:
```typescript
export const colors = {
  primary: '#4f46e5',    // Indigo
  secondary: '#818cf8',  // Indigo-400
  background: '#0f172a', // Slate-900
  // ... more colors
};
```

### Fonts
Add custom fonts in `assets/fonts/` and load them in `App.tsx`

### Logo
Replace `assets/icon.png` with your app logo

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Built with ❤️ using React Native and Expo

## 🔗 Related Documentation

- [Backend API Documentation](../backend/README.md)
- [Web App Documentation](../frontend/README.md)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)

## 📞 Support

For issues and questions:
1. Check the Troubleshooting section above
2. Review backend logs for API errors
3. Check network connectivity between devices

---

**Happy Coding! 🚀**
