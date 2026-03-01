# 🏥 Medical Appointment & Records Management System
### Full Project Documentation (MedicalApp) — Grand Hackathon Edition

---

## 📌 Project Overview

| Field | Value |
|---|---|
| **Project Name** | Medical Appointment & Records Management System |
| **Type** | Full-Stack Mobile Application |
| **Frontend** | React Native (TypeScript) |
| **Backend** | Node.js + Express.js |
| **Database** | Local JSON (Hackathon Mode) / MongoDB Ready |
| **Authentication** | JWT (JSON Web Tokens) |
| **Marking Split** | 60% Backend · 40% Frontend |

---

## 📁 Full Project Structure

```
MedicalApp/                          ← Root Directory
│
├── mobile/                          ← React Native Frontend (MedicalApp)
│   ├── docs/                        ← Project Documentation (This folder)
│   │   └── PROJECT_DOCUMENTATION.md
│   ├── src/
│   │   ├── assets/                  ← Images, fonts, icons
│   │   ├── components/              ← Reusable UI components
│   │   ├── constants/               ← App-wide constants (colors, config)
│   │   ├── context/
│   │   │   ├── AuthContext.tsx      ← Auth state, token management
│   │   │   └── (other contexts)
│   │   ├── hooks/                   ← Custom React hooks
│   │   ├── navigation/
│   │   │   ├── AppNavigator.tsx     ← Root stack navigator
│   │   │   └── TabNavigator.tsx     ← Bottom tab navigator
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   ├── RegisterScreen.tsx
│   │   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   │   ├── VerifyOtpScreen.tsx
│   │   │   │   └── ResetPasswordScreen.tsx
│   │   │   ├── WelcomeScreen.tsx            ← Splash/Welcome screen
│   │   │   ├── DashboardScreen.tsx          ← Home dashboard
│   │   │   ├── UpcomingAppointmentsScreen.tsx
│   │   │   ├── AppointmentHistoryScreen.tsx
│   │   │   ├── BookAppointmentScreen.tsx
│   │   │   ├── BookingConfirmationScreen.tsx
│   │   │   ├── MedicalRecordsScreen.tsx
│   │   │   ├── ProfileScreen.tsx
│   │   │   ├── NotificationScreen.tsx
│   │   │   ├── HelpSupportScreen.tsx
│   │   │   └── ConsultationBotScreen.tsx
│   │   ├── services/                ← API call functions (axios)
│   │   ├── styles/                  ← Global stylesheet
│   │   └── types/                   ← TypeScript type definitions
│   └── package.json
│
└── backend/                         ← Node.js + Express Backend
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── appointment.controller.js
    │   ├── user.controller.js
    │   ├── records.controller.js
    │   ├── dashboard.controller.js
    │   └── notification.controller.js
    ├── routes/
    │   ├── auth.routes.js
    │   ├── appointment.routes.js
    │   ├── user.routes.js
    │   ├── records.routes.js
    │   ├── dashboard.routes.js
    │   └── notification.routes.js
    ├── middleware/
    │   └── auth.middleware.js        ← JWT token verification
    ├── models/                       ← MongoDB/Mongoose schemas
    │   ├── User.js
    │   ├── Appointment.js
    │   ├── Doctor.js
    │   ├── MedicalRecord.js
    │   └── Notification.js
    ├── data/                         ← Local JSON database (hackathon mode)
    ├── utils/                        ← Helper utilities
    └── server.js                     ← Express app entry point
```

---

## 🖥️ Screen Documentation

### 1. Welcome Screen (Splash) — `WelcomeScreen.tsx`
- **Purpose:** App entry point with branding
- **Behavior:** Auto-navigates to Login after 2–3 seconds
- **No API call needed**

---

### 2. Login Screen — `auth/LoginScreen.tsx`
- **Purpose:** Authenticate existing users
- **Fields:** Email, Password
- **On Success:** Receives JWT token + user profile → navigates to Dashboard
- **On Error:** Displays error message from API
- **API:** `POST /api/auth/login`

**Request Body:**
```json
{ "email": "user@example.com", "password": "yourpassword" }
```

**Success Response:**
```json
{ "token": "jwt_token_here", "user": { "id": "...", "name": "...", "email": "..." } }
```

---

### 3. Register Screen — `auth/RegisterScreen.tsx`
- **Purpose:** Create a new user account
- **Fields:** Name, Email, Password, Phone (optional)
- **On Success:** Redirects to Login screen
- **API:** `POST /api/auth/register`

**Request Body:**
```json
{ "name": "Ali Hassan", "email": "ali@example.com", "password": "pass123", "phone": "03001234567" }
```

---

### 4. Forgot Password Flow
| Screen | File | API |
|---|---|---|
| Forgot Password | `ForgotPasswordScreen.tsx` | `POST /api/auth/forgot-password` |
| Verify OTP | `VerifyOtpScreen.tsx` | `POST /api/auth/verify-otp` |
| Reset Password | `ResetPasswordScreen.tsx` | `POST /api/auth/reset-password/:token` |

---

### 5. Dashboard Screen — `DashboardScreen.tsx`
- **Purpose:** Main home screen after login
- **Shows:** Welcome text with user name, quick action cards
- **Quick Access:** Upcoming Appointments, History, Book Appointment, Medical Records, Profile
- **API:** `GET /api/dashboard` (fetches summary stats)
- **Auth:** Requires Bearer token in header

---

### 6. Upcoming Appointments Screen — `UpcomingAppointmentsScreen.tsx`
- **Purpose:** Show all future appointments
- **Displays:** Doctor Name, Specialty, Date, Time, Status (Confirmed/Pending)
- **Sort:** Ascending by date (earliest first)
- **Filter:** `date >= today` + status ≠ Cancelled
- **API:** `GET /api/appointments/upcoming`

**Response:**
```json
{
  "appointments": [
    {
      "_id": "...",
      "doctorName": "Dr. Ahmed Raza",
      "specialty": "Cardiologist",
      "date": "2026-03-01",
      "time": "09:00",
      "status": "Confirmed",
      "doctorImageUrl": "https://..."
    }
  ]
}
```

---

### 7. Appointment History Screen — `AppointmentHistoryScreen.tsx`
- **Purpose:** Show past and cancelled appointments
- **Displays:** Doctor Name, Date, Time, Status (Completed/Cancelled)
- **Sort:** Descending by date (latest first)
- **Filter:** `date < today` OR `status === 'Cancelled'`
- **API:** `GET /api/appointments/history`

---

### 8. Book Appointment Screen — `BookAppointmentScreen.tsx`
- **Purpose:** Book a new doctor appointment
- **User Actions:**
  1. Select a doctor from list
  2. Choose available date
  3. Select available time slot
  4. Submit booking

- **Clash Detection:** Backend prevents double-booking (same slot + same user)
- **API Flow:**
  1. `GET /api/appointments/doctors` → load doctor list
  2. `POST /api/appointments/book` → submit booking

**Booking Request Body:**
```json
{
  "doctorName": "Dr. Sara Khan",
  "specialty": "Dermatologist",
  "date": "2026-03-05",
  "time": "11:00",
  "doctorImageUrl": "https://..."
}
```

**Clash Error Response (HTTP 409):**
```json
{ "message": "Slot unavailable. This time slot is already booked." }
```

---

### 9. Booking Confirmation Screen — `BookingConfirmationScreen.tsx`
- **Purpose:** Confirm successful booking with summary
- **Shows:** Doctor name, date, time, specialty
- **Bonus screen beyond requirements**

---

### 10. Medical Records Screen — `MedicalRecordsScreen.tsx`
- **Purpose:** View and upload medical documents
- **Features:** List uploaded records, document preview, upload new record
- **APIs:**
  - `GET /api/records` → fetch records
  - `POST /api/records/add` → add new record
  - `DELETE /api/records/:id` → delete record

---

### 11. Profile Screen — `ProfileScreen.tsx`
- **Purpose:** View and edit user personal information
- **Fields:** Name, Email, Phone
- **APIs:**
  - `GET /api/user/profile` → fetch profile
  - `PUT /api/user/update` → save changes

---

### 12. Notification Screen — `NotificationScreen.tsx` *(Bonus)*
- **Purpose:** In-app notification center
- **Shows:** Appointment booking confirmations, cancellations, reminders
- **API:** `GET /api/notifications`

---

### 13. Help & Support Screen — `HelpSupportScreen.tsx` *(Bonus)*
- **Purpose:** FAQ and contact support

---

### 14. Consultation Bot Screen — `ConsultationBotScreen.tsx` *(Bonus)*
- **Purpose:** AI-style symptom checker / Q&A

---

## 🔌 Complete API Reference

### Base URL
```
http://localhost:5000/api
```

### Authentication Header (for protected routes)
```
Authorization: Bearer <jwt_token>
```

---

### 🔐 Auth APIs

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | Login and get token | ❌ |
| POST | `/auth/forgot-password` | Send OTP to email | ❌ |
| POST | `/auth/verify-otp` | Verify OTP code | ❌ |
| POST | `/auth/reset-password/:token` | Reset password | ❌ |
| POST | `/auth/social-login` | Google/Social login | ❌ |

---

### 📅 Appointment APIs

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | `/appointments/doctors` | Get all available doctors | ✅ |
| POST | `/appointments/book` | Book a new appointment | ✅ |
| GET | `/appointments/upcoming` | Get upcoming appointments | ✅ |
| GET | `/appointments/history` | Get past appointments | ✅ |
| GET | `/appointments/all` | Get all appointments | ✅ |
| PUT | `/appointments/:id/cancel` | Cancel an appointment | ✅ |

---

### 👤 User APIs

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | `/user/profile` | Get user profile | ✅ |
| PUT | `/user/update` | Update profile info | ✅ |

---

### 📋 Records APIs

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | `/records` | Get all medical records | ✅ |
| POST | `/records/add` | Add new record | ✅ |
| DELETE | `/records/:id` | Delete a record | ✅ |

---

### 🔔 Notification APIs

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | `/notifications` | Get notifications | ✅ |
| POST | `/notifications` | Create notification | ✅ |

---

### 📊 Dashboard API

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| GET | `/dashboard` | Get dashboard summary stats | ✅ |

---

## 🧠 Backend Logic

### JWT Authentication Flow
```
Client ──POST /login──► Server
Server validates password using bcrypt
Server generates JWT: sign({ userId }, SECRET, { expiresIn: '7d' })
Server ──returns { token, user }──► Client
Client stores token in AsyncStorage
Client sends token via: Authorization: Bearer <token>
auth.middleware.js verifies token on every protected route
```

### Appointment Clash Detection Logic
```javascript
// 1. Check if doctor slot is already booked by anyone
const clash = await Appointment.findOne({
  doctorName, date, time, status: { $nin: ['Cancelled'] }
});
if (clash) return 409 "Slot unavailable"

// 2. Check if user already has an appointment at same time
const userClash = await Appointment.findOne({
  userId, date, time, status: { $nin: ['Cancelled'] }
});
if (userClash) return 409 "You already have an appointment at this time"

// 3. If both clear → create appointment
```

### Auto Status Resolution
- Upcoming: `date >= today` AND `status !== Cancelled` → shows as **Confirmed**
- History: `date < today` AND `status === Confirmed` → auto-marked as **Completed**
- Cancelled appointments always appear in History

---

## 🗄️ Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (bcrypt hashed),
  phone: String,
  createdAt: Date
}
```

### Appointment Model
```javascript
{
  userId: String,
  doctorName: String,
  specialty: String,
  doctorImageUrl: String,
  date: String,   // "YYYY-MM-DD"
  time: String,   // "HH:MM"
  status: String  // "Confirmed" | "Cancelled"
}
```

### Doctor Model
```javascript
{
  _id: String,
  name: String,
  specialty: String,
  imageUrl: String,
  availableSlots: [{ day: String, time: String }]
}
```

### Medical Record Model
```javascript
{
  userId: String,
  title: String,
  description: String,
  fileUrl: String,
  createdAt: Date
}
```

### Notification Model
```javascript
{
  userId: String,
  title: String,
  message: String,
  type: String,   // "appointment" | "general"
  read: Boolean,
  createdAt: Date
}
```

---

## 🩺 Seeded Doctors List

| # | Name | Specialty |
|---|---|---|
| 1 | Dr. Ahmed Raza | Cardiologist |
| 2 | Dr. Sara Khan | Dermatologist |
| 3 | Dr. Usman Ali | Neurologist |
| 4 | Dr. Nadia Siddiqui | Gynecologist |
| 5 | Dr. Bilal Hassan | Orthopedic |
| 6 | Dr. Hina Malik | Pediatrician |
| 7 | Dr. Faisal Qureshi | General Physician |
| 8 | Dr. Zainab Abidi | Optometrist |
| 9 | Dr. Kamran Akmal | Dentist |
| 10 | Dr. Maria B | Psychiatrist |
| 11 | Dr. Omer Saeed | Radiologist |
| 12 | Dr. Fatima Jinnah | Oncologist |

---

## 🧭 Navigation Flow

```
App Start
    └─► WelcomeScreen (Splash)
            │
            ├─► [Not Logged In]
            │       ├─► LoginScreen
            │       ├─► RegisterScreen
            │       ├─► ForgotPasswordScreen
            │       ├─► VerifyOtpScreen
            │       └─► ResetPasswordScreen
            │
            └─► [Logged In]
                    └─► MainTabs (Bottom Tab Navigator)
                            ├─► DashboardScreen
                            ├─► UpcomingAppointmentsScreen
                            ├─► ProfileScreen
                            └─► (other tabs)
                    
                    Stack Screens (Full Screen):
                            ├─► AppointmentHistoryScreen
                            ├─► BookAppointmentScreen
                            ├─► BookingConfirmationScreen
                            ├─► MedicalRecordsScreen
                            ├─► NotificationScreen
                            ├─► HelpSupportScreen
                            └─► ConsultationBotScreen
```

---

## ⚙️ Running the Project

### Backend
```bash
cd backend
npm install
npm start        # Runs on http://localhost:5000
```

### Mobile (Frontend)
```bash
cd mobile
npm install
npx expo start   # Scan QR with Expo Go app
```

### Environment Variables (backend/.env)
```
PORT=5000
JWT_SECRET=your_jwt_secret_here
MONGO_URI=your_mongodb_uri_here   # Optional for hackathon
```

---

## ✅ Requirements Coverage Summary

| Requirement | Status |
|---|---|
| Splash Screen | ✅ Done |
| Login / Signup | ✅ Done |
| Home Dashboard | ✅ Done |
| Upcoming Appointments | ✅ Done |
| Appointment History | ✅ Done |
| Book New Appointment | ✅ Done |
| Medical Records | ✅ Done |
| Profile Screen | ✅ Done |
| Logout | ✅ Done (via AuthContext) |
| JWT Authentication | ✅ Done |
| Appointment Clash Detection | ✅ Done |
| Password Encryption | ✅ Done (bcrypt) |
| Form Validations | ✅ Done |
| Doctor Availability System | ✅ Done |
| All Required APIs | ✅ Done (9/9) |

### Bonus Features
| Feature | Status |
|---|---|
| Notification System | ✅ Bonus |
| Forgot → OTP → Reset Password | ✅ Bonus |
| Consultation Bot | ✅ Bonus |
| Cancel Appointment | ✅ Bonus |
| Booking Confirmation Screen | ✅ Bonus |

---

*Documentation generated for Grand Hackathon — Medical Appointment & Records Management System*
