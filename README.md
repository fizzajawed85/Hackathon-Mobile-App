# 📱 Medical App Mobile (Full App Documentation)

A production-grade healthcare mobile application built with **React Native** and **Expo**. This is a feature-rich, multi-language, AI-powered app that manages appointments, medical records, and personal health — all wrapped in a premium glassmorphic UI.

---

## 🛠️ Core Technology Stack

| Technology | Purpose |
|---|---|
| **React Native (Expo)** | Cross-platform mobile framework |
| **TypeScript** | Type-safe development |
| **React Context API** | Global state (Auth, Language, Theme, Toast) |
| **Expo SecureStore** | Encrypted storage for tokens & language preference |
| **Axios** | HTTP client for all backend API calls |
| **Lucide React Native** | Professional icon library |
| **Expo Linear Gradient** | Glassmorphic gradient backgrounds |
| **Expo Blur** | Frosted glass UI effects |
| **Expo ImagePicker** | Camera & gallery access for profile/records |
| **Expo FileSystem** | File download support for prescriptions |
| **React Navigation** | Stack-based routing |
| **Expo Updates** | App reloads for RTL language switching |
| **I18nManager** | Right-to-Left (RTL) layout direction control |

---

## 🌎 Full Multi-Language & RTL Support

The app is **completely localized** in **7 languages** using a centralized `Translations.ts` system:

| Language | Code | Script Direction |
|---|---|---|
| 🇬🇧 English | `en` | LTR |
| 🇵🇰 Urdu | `ur` | RTL ✅ |
| 🇸🇦 Arabic | `ar` | RTL ✅ |
| 🇮🇳 Hindi | `hi` | LTR |
| 🇪🇸 Spanish | `es` | LTR |
| 🇫🇷 French | `fr` | LTR |
| 🇨🇳 Chinese | `zh` | LTR |

### Localization Details
- **Centralized Translations**: All strings are managed in `src/constants/Translations.ts`.
- **RTL Auto-Switching**: When Urdu or Arabic is selected, `I18nManager.forceRTL(true)` is called and the app is reloaded via `expo-updates` to fully flip the layout direction.
- **Persistent Preference**: Language selection is stored in `expo-secure-store` and restored on every app launch.
- **Instant Refresh**: All hooks use the `t` (translation) function in their `useMemo` / `useCallback` dependency arrays to instantly re-render on language change.
- **String Interpolation**: Dynamic strings (e.g., "Hello, {{name}}!") are supported with parameter substitution in `LanguageContext`.

---

## 🤖 MedBot AI Assistant

Powered by **Google Gemini** (via the backend), MedBot is a fully interactive AI health assistant:

### Dual Modes
- **🧠 AI Expert Mode**: General medical AI for:
  - Symptom analysis.
  - Specialist suggestions (e.g., "see a Cardiologist").
  - Drug interactions and medical terminology.
  - Professional disclaimers on every response.
- **👤 Personal Mode**: Your personal health assistant that:
  - Checks your upcoming appointments.
  - Looks up your medical history.
  - Provides health stat summaries.

### Image & Report Analysis
- Users can **attach images** (lab reports, prescriptions, scan results) directly in the MedBot chat.
- The AI reads and analyzes the image content and provides a clear, natural-language interpretation.
- Supports sending reports for a second opinion or simplification.

### Additional Details
- Fully localized responses in all 7 supported languages.
- Chat history maintained for the entire session.
- Premium chat UI with animated typing indicators.

---

## 📅 Appointment Management

### Book Appointment Screen
- Step-by-step wizard interface.
- Select **Specialist Type** (Cardiologist, Dermatologist, etc.).
- Browse **available doctors** with profile photos and ratings.
- Choose **Date** using a scroll calendar.
- Choose **Time Slot** (Morning / Afternoon / Evening — visually grouped).
- Add optional consultation notes.
- Fully localized labels, buttons, and feedback messages.

### Booking Confirmation Screen
- Summary of the confirmed appointment (Doctor, Date, Time, Specialist).
- Navigation to View Appointments or Dashboard.

### Upcoming Appointments Screen
- Lists all **Pending** and **Confirmed** appointments.
- Status badges are fully localized.
- **Cancel** option with confirmation dialog.
- Auto-triggers a backend notification on cancellation.

### Appointment History Screen
- Persistent log of all **completed and cancelled** appointments.
- Filter by status.

---

## 🗂️ Medical Records

### Medical Records Screen
- Secure list of all uploaded lab reports, prescriptions, and medical scans.
- **Download/Save** files directly to the device using `expo-file-system`.
- Filter by record category.

### Add New Record Screen
- Upload via **Camera** or **Gallery**.
- Add record title, type (Lab Report, Prescription, Scan), date, and notes.
- Image is encoded as Base64 and sent to the backend for secure storage.
- Fully localized form with RTL-aware layout.

---

## 👤 User Profile & Health Dashboard

### Profile Screen
- Edit personal details: **Name, Phone Number, Location, About/Bio**.
- Upload a **Profile Photo** via camera or gallery.
- View the dynamically generated **Patient ID**.
- Logout with session clearing.
- All success/error messages are localized.

### Health Dashboard (Dashboard Screen)
- Central hub of the app with:
  - **Hero Card**: Nearest upcoming appointment, doctor photo, and status.
  - **Health Stats Cards**:
    - 👣 **Daily Steps** with trend.
    - 🌙 **Sleep Quality** (hours) with trend.
    - 💓 **Heart Rate (BPM)** — Demo Vitals.
    - 🩸 **Blood Pressure (mmHg)** — Demo Vitals.
  - **Medication Card**: Current medication name, dosage, and schedule.
  - **Quick Actions**: Shortcuts to Book Appointment and Medical Records.

---

## 💓 Health Scanners (Technology Demo)

### Heart Rate Scanner
- Uses the device **camera + flash** to measure pulse via photoplethysmography (PPG).
- Animated BPM display with live feedback.

### Blood Pressure Scanner
- Technology demonstration for BP monitoring.
- Educational UI explaining how it works.

---

## 🔔 Smart Notification System

### Notification Screen
- Dedicated screen showing all account activity notifications.
- Types: `appointment`, `record`, `general`.
- **Unread indicator** (badge count on tab icon).
- **Mark individual** or **Mark All as Read**.
- Sorted by date, most recent first.
- Context-aware: Notifications are automatically created by the backend when appointments are booked or cancelled.

---

## 🎨 UI/UX Design System

- **Glassmorphism**: Translucent cards with `expo-blur` and gradient blobs.
- **Dark Theme**: Deep Midnight Slate background with Vibrant Indigo accents.
- **Micro-animations**: Smooth press effects, transitions, and loading states.
- **Gradient Blobs**: Animated background orbs for a premium feel.
- **RTL-aware Layouts**: All flexbox directions invert automatically for RTL.
- **Toast Notifications**: Non-intrusive in-app feedback messages.
- **Responsive**: Optimized for all screen sizes and orientations.

---

## 🔐 Authentication System (Auth Module)

All 5 authentication screens are in `src/pages/auth/`:

1. **WelcomeScreen**: Animated splash with Login/Register navigation.
2. **LoginScreen**: Email & password with validation.
3. **RegisterScreen**: Username, email, and password with duplicate check.
4. **ForgotPasswordScreen**: Email submission to trigger OTP.
5. **VerifyOtpScreen**: 6-digit OTP entry with auto-advance, backspace navigation, and paste support.
6. **ResetPasswordScreen**: New password entry with server-side token validation.

---

## 📁 Project Structure

```
mobile/
├── src/
│   ├── components/          # Reusable UI components (Button, Input, GlassCard, etc.)
│   ├── constants/
│   │   ├── Config.ts        # API base URL configuration
│   │   └── Translations.ts  # All localized strings for 7 languages
│   ├── context/
│   │   ├── AuthContext.tsx      # Authentication state & JWT token
│   │   ├── LanguageContext.tsx  # Language selection, RTL, & t() function
│   │   └── ThemeContext.tsx     # Theme management
│   ├── navigation/
│   │   └── AppNavigator.tsx # Stack navigator with auth-gated routes
│   ├── pages/
│   │   ├── auth/            # 5 Authentication screens
│   │   ├── DashboardScreen.tsx
│   │   ├── BookAppointmentScreen.tsx
│   │   ├── BookingConfirmationScreen.tsx
│   │   ├── UpcomingAppointmentsScreen.tsx
│   │   ├── AppointmentHistoryScreen.tsx
│   │   ├── MedicalRecordsScreen.tsx
│   │   ├── NewRecordScreen.tsx
│   │   ├── ConsultationBotScreen.tsx   # MedBot AI
│   │   ├── HealthScannerScreen.tsx
│   │   ├── NotificationScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── LanguageSelectionScreen.tsx
│   │   ├── HelpSupportScreen.tsx
│   │   └── WelcomeScreen.tsx
│   └── services/            # API service functions
```

---

## 📦 Setup & Installation

1. **Install Dependencies**:
   ```bash
   cd mobile
   npm install
   ```

2. **Configure Backend URL**:
   Edit `src/constants/Config.ts`:
   ```typescript
   export const MACHINE_IP = '---.---.x.x'; // Your PC's local IP
   export const API_BASE_URL = `http://${MACHINE_IP}:5000/api`;
   ```

3. **Run the App**:
   ```bash
   npx expo start
   ```
   Scan the QR code with **Expo Go** on your device, or press `a` for Android emulator.

---
Built for the **Healthcare Innovation Hackathon**. 🚀
