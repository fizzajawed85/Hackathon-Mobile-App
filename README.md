# 📱 Medical App Mobile (React Native)

A premium medical management mobile application built with **React Native** and **Expo**. This app provides a seamless healthcare experience with advanced AI integration and global accessibility.

## ✨ Premium Features

### 🌎 Global Accessibility & RTL
- **7-Language Support**: Fully localized in English, Urdu, Arabic, Hindi, Spanish, French, and Chinese.
- **Dynamic RTL Support**: Auto-adjusting layout for Right-to-Left languages (Urdu/Arabic) for an authentic user experience.
- **Instant Language Switching**: Real-time UI refresh when changing languages via the Profile settings.

### 🤖 MedBot AI Assistant
- **Dual Modes**: 
  - **Personal Mode**: Checks your upcoming appointments, medical records, and health stats.
  - **Medical Expert Mode**: Suggests specialists based on symptoms and provides drug information.
- **Dynamic Responses**: Uses localized string interpolation for personalized assistance.

### 🏥 Healthcare Management
- **Appointment Booking**: Select specialists, view availability, and book slots with a modern calendar interface.
- **Persistent History**: All past visits and consultations are saved and accessible in the 'Visits' tab.
- **Medical Records**: 
    - Upload lab reports or prescriptions with camera/gallery attachments.
    - **Download Support**: Save medical documents and prescriptions directly to your device.
- **Health Dashboard**: Real-time tracking of:
    - 👣 **Step Counter**: Monitor your daily activity.
    - 🌙 **Sleep Tracking**: Keep track of your rest cycles.
    - 💓 **Vital Signs**: BPM and BP snapshot summaries.

### 💓 Health Scanners (Tech Demo)
- **Heart Rate Monitor**: Pulse analysis using camera and flash.
- **BP Scanner**: Blood pressure estimation demo.

## 🎨 UI/UX Excellence
- **Glassmorphism Design**: High-end translucent cards and vibrant background blobs.
- **Modern Typography**: Inter/Outfit style fonts with high readability.
- **Social Connect**: Premium UI for Google, Facebook, LinkedIn, and GitHub integration.

## 🚀 Technical Stack
- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Icons**: Lucide React Native
- **Storage**: Expo SecureStore (Encrypted Auth)
- **State**: React Context API

## 📦 Setup & Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Backend**:
   Edit `src/constants/Config.ts` and update `MACHINE_IP` with your local IP address.

3. **Run the App**:
   ```bash
   npx expo start
   ```

---
Built for the **Healthcare Innovation Hackathon**. 🚀
