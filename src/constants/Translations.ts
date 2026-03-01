export const translations: any = {
    en: {
        common: { save: "Save Changes", cancel: "Cancel", loading: "Loading...", success: "Success", error: "Error", comingSoon: "Coming soon!", back: "Back", next: "Next", delete: "Delete", edit: "Edit", retry: "Retry", searching: "Searching...", noResults: "No results found", notSet: "Not set" },
        auth: {
            welcomeBack: "Welcome Back", signInDesc: "Sign in to access your medical dashboard.", email: "Email Address", password: "Password", forgotPassword: "Forgot Password?", signInBtn: "Sign In", signingIn: "Signing In...", newHere: "New here? ", createAccount: "Create Account",
            createAccountTitle: "Create Account", joinCommunity: "Join the medical community today.", fullName: "Full Name", signUpBtn: "Sign Up", creatingAccount: "Creating Account...", alreadyHaveAccount: "Already have an account? ", loginLink: "Login",
            forgotPasswordTitle: "Reset Password", forgotPasswordSub: "Enter your email to receive a verification code.", sendResetCode: "Send Reset Code", sending: "Sending...", backToLogin: "Back to Login",
            verificationTitle: "Verification", verificationSub: "Enter the 6-digit code sent to ", verificationCode: "VERIFICATION CODE", verifyCode: "Verify Code", verifying: "Verifying...", resendCode: "Resend Verification Code",
            newPasswordTitle: "New Password", newPasswordSub: "Create a strong password to secure your account.", newPassword: "New Password", confirmPassword: "Confirm Password", updatePassword: "Update Password", updating: "Updating...",
            fillFields: "Please fill in all fields", passwordsNotMatch: "Passwords do not match"
        },
        welcome: { titlePart1: "Your Health,", titlePart2: "In Your Hands", subtitle: "The simplest way to manage your appointments and medical records.", getStarted: "Get Started" },
        tabs: { home: "Home", visits: "Visits", records: "Records", profile: "Profile" },
        dashboard: { welcome: "Welcome back,", healthStats: "Your Health Stats", upcoming: "Upcoming Appointment", viewAll: "View All", searchDoctor: "Search for doctors...", consultation: "MedBot AI", bookVisit: "Book Visit", findDoctor: "Find Doctor", myRecords: "My Records", steps: "Steps", sleep: "Sleep", water: "Water", bpm: "BPM", noAppointments: "No Appointments Yet", bookFirstVisit: "Book your first visit with a specialist", history: "History", bookNow: "Book Now", nextVisit: "Next Visit", allVisits: "All Visits", dailyMedication: "Daily Medication", nextDose: "NEXT DOSE", done: "Done" },
        profile: { title: "Profile & Settings", personalInfo: "Personal Information", appPreferences: "App Preferences", fullName: "Full Name", email: "Email", phone: "Phone Number", address: "Address", about: "About", patientId: "Patient ID", helpSupport: "Help & Support", language: "Language", logout: "Logout", editProfile: "Edit Profile", backToProfile: "Back to Profile", updateProfileSub: "Update your profile info", patientIdLabel: "Patient ID", phonePlaceholder: "+1 234 567 890", addressPlaceholder: "City, Country", aboutPlaceholder: "Tell us about yourself..." },
        language: { title: "Select Language", description: "Choose your preferred language to customize your experience within the app.", footer: "App will restart to apply changes for Right-to-Left languages." },
        records: { title: "Medical Records", searchPlaceholder: "Search records...", all: "All", labReport: "Lab Report", prescription: "Prescription", xray: "X-Ray", scan: "Scan", other: "Other", noRecords: "No Records Found", noRecordsDesc: "Upload your medical records securely.", deleteTitle: "Delete Record", deleteConfirm: "Are you sure you want to remove this record?", deleted: "Record deleted", attached: "Attached" },
        appointments: { title: "Upcoming Visits", upcoming: "Upcoming", past: "Past Visits", new: "New", noUpcoming: "No upcoming appointments", noPast: "No past appointments", cancel: "Cancel", reschedule: "Reschedule", cancelConfirmTitle: "Cancel Appointment", cancelConfirmDesc: "Are you sure you want to cancel this appointment?", cancelled: "Appointment cancelled", status: { confirmed: "Confirmed", pending: "Pending", cancelled: "Cancelled", completed: "Completed" } },
        medbot: {
            title: "MedBot AI", greeting: "Hello ${user}! I'm MedBot, your intelligent healthcare assistant. How can I help you today?", thinking: "MedBot is thinking...", askAnything: "Ask anything...", chips: { nextAppt: "Next Appointment", medInfo: "Medicine Info", symptoms: "Check Symptoms" }, initialMsg: "I can help with appointments, medical records, or basic health info.", modes: { personal: "Personal Mode", medical: "Smart AI Expert", switched: "Switched to ${mode} mode" },
            responses: {
                consultation: "Based on your symptoms, I recommend a consultation. Would you like to book one?",
                details: "Can you provide more details?",
                okay: "I understand. Let me help you with that.",
                error: "I'm having trouble connecting to my medical brain. Please try again.",
                sysError: "System error: Unable to reach MedBot. Please check your internet connection.",
                symptoms: "Based on your symptoms, I recommend consulting a General Physician or Neurologist. You can find top specialists in our 'Book Visit' section. Always seek professional advice for persistent pain.",
                heart: "Cardiac symptoms require attention. We have expert Cardiologists available. If this is an emergency, please contact 1122 immediately.",
                skin: "For skin-related issues, a Dermatologist is the best person to consult. We have expert specialists in our network who can help.",
                drugs: {
                    paracetamol: "Paracetamol is used to treat mild to moderate pain (such as headache, toothache, or muscle aches) and to reduce fever. Max dose for adults is typically 4000mg per 24 hours.",
                    aspirin: "Aspirin is used to reduce fever and relieve mild to moderate pain. It also helps prevent blood clots. Avoid giving it to children with viral infections due to Reye's syndrome risk.",
                    general: "I can provide information on common medications like Panadol, Aspirin, or Antibiotics. Please note: I am an AI assistant and this is not a prescription."
                },
                analyzeReport: "Scanning your medical report... [AI ANALYSIS: Blood Glucose is slightly elevated]. We recommend seeing an Endocrinologist.",
                help: "In Medical Expert Mode, I can:\n1. Suggest specialists based on symptoms.\n2. Explain what a medicine is used for.\n3. Analyze your medical reports.\n\nWhat can I help you with?",
                medicalFallback: "I'm currently in 'Medical Expert Mode'. You can ask me about symptoms, medicines, or reports. Switch to 'Personal Mode' for your appointment data.",
                personal: {
                    bookingHow: "To book a new appointment:\n1. Go to the 'Dashboard'\n2. Click on 'Book Visit' in Quick Actions\n3. Select your preferred doctor and time slot.",
                    appointmentInfo: "You have an upcoming appointment with Dr. ${doctor} on ${date} at ${time}. Status: ${status}.",
                    appointmentNone: "I don't see any upcoming appointments in your records. You can book one by clicking 'Book Visit' on the Dashboard.",
                    medicationInfo: "Your current medication is ${name} (${dosage}).\nInstruction: ${instruction}\nTime: ${time}",
                    medicationNone: "No active medications found in your profile. You can add them in the Profile section.",
                    healthSummary: "Health Sync Summary:\n💓 Pulse: ${hr} BPM\n👣 Steps: ${steps}\n🩸 BP: ${bp}\n🌙 Sleep: ${sleep}",
                    doctorsInfo: "We currently have ${count} expert specialists in our network. You can view the full list in the 'Book Visit' section.",
                    fallback: "I didn't quite catch that. You can ask me about your 'appointments', 'medications', or 'health status'. I'm here to help!",
                    thanks: "You're welcome! I'm here if you need anything else."
                }
            }
        },
        booking: { title: "Book Appointment", steps: { details: "Details", doc: "Doctor", time: "Time" }, labels: { date: "Date", dateSub: "Select appointment date", spec: "Specialist", specSub: "Choose your doctor", time: "Time Slot", timeSub: "Pick your preferred time", location: "Location" }, times: { morning: "Morning", afternoon: "Afternoon", evening: "Evening", night: "Night" }, confirm: "Confirm Appointment", confirming: "Confirming...", reserved: "Your slot will be reserved", toast: { selectDoc: "Please select a doctor", selectTime: "Please select a time slot", failed: "Booking failed" } },
        confirm: { placed: "Appointment Confirmed", subtitle: "Your appointment has been successfully booked.", details: "Appointment Details", addCalendar: "Add to Calendar", viewHistory: "View All Appointments" },
        newRecord: { title: "New Record", edit: "Edit Record", labels: { title: "Title", attachments: "Attachments (Optional)", description: "Description (Optional)", category: "Category" }, placeholders: { title: "e.g., Blood Test Result", description: "Add details...", search: "Search records..." }, actions: { camera: "Camera", gallery: "Gallery", files: "Files" }, attached: "Document Attached", saving: "Saving...", updating: "Updating...", saved: "Record added!", updated: "Record updated!", uploadSec: "Upload your records securely", error: { titleReq: "Title is required", camDeny: "Camera permission denied", pickErr: "Error picking document", saveErr: "Failed to save record" } },
        history: { title: "Past Visits", noRecords: "No Records Yet", noRecordsDesc: "Your past checkups will appear here.", filter: "Filter", retry: "Retry", loadErr: "Failed to load history" },
        scanner: { heartRate: "Pulse Scanner", bp: "BP Scanner", permission: { title: "Camera Access Needed", desc: "To analyze your ${type}, we use the camera and flash to detect blood flow variations in your finger.", grant: "Enable Camera", denied: "Please enable camera access to scan." }, instruction: "Place your finger over the camera lens", steady: "Hold your finger steady...", analysis: "Analyzed", update: "Update Dashboard", scanAgain: "Scan Again", disclaimer: "Disclaimer: Not for medical use. This is a technology demonstration for educational purposes." },
        notifications: { title: "Notifications", markRead: "Mark all read", empty: "All Caught Up!", emptyDesc: "You have no new notifications." },
        help: { title: "Help & Support", faq: "FAQs", faqSub: "Find solutions to common medical portal queries below.", contact: "Still Need Support? Reach us at", emailUs: "concierge@medpoint.com", questions: { q1: "How do I schedule an appointment?", a1: "Go to the Home or Appointments tab and tap 'Schedule New'. Select your preferred doctor, date, and time slot to confirm.", q2: "Can I view my medical records?", a2: "Yes, you can upload and view your medical reports in the 'Records' tab. All data is encrypted and secure.", q3: "How do I contact my doctor?", a3: "After booking an appointment, doctor contact details will be available in the appointment details screen.", q4: "What if I need to cancel?", a4: "You can cancel any upcoming appointment from the Appointments tab up to 24 hours before the scheduled time.", q5: "Is my data secure?", a5: "We use hospital-grade encryption and secure private storage to ensure your medical history remains private." } }
    },
    ur: {
        common: { save: "تبدیلیاں محفوظ کریں", cancel: "منسوخ کریں", loading: "لوڈ ہو رہا ہے...", success: "کامیابی", error: "غلطی", comingSoon: "جلد آ رہا ہے!", back: "پیچھے", next: "آگے", delete: "حذف کریں", edit: "ترمیم کریں", retry: "دوبارہ کوشش کریں", searching: "تلاش ہو رہا ہے...", noResults: "کوئی نتیجہ نہیں ملا", notSet: "سیٹ نہیں ہے" },
        auth: {
            welcomeBack: "خوش آمدید", signInDesc: "اپنے میڈیکل ڈیش بورڈ تک رسائی کے لیے سائن ان کریں۔", email: "ای میل ایڈریس", password: "پاس ورڈ", forgotPassword: "پاس ورڈ بھول گئے؟", signInBtn: "سائن ان کریں", signingIn: "سائن ان ہو رہا ہے...", newHere: "یہاں نئے ہیں؟ ", createAccount: "اکاؤنٹ بنائیں",
            createAccountTitle: "اکاؤنٹ بنائیں", joinCommunity: "آج ہی میڈیکل کمیونٹی میں شامل ہوں۔", fullName: "پورا نام", signUpBtn: "سائن اپ کریں", creatingAccount: "اکاؤنٹ بن رہا ہے...", alreadyHaveAccount: "پہلے سے اکاؤنٹ ہے؟ ", loginLink: "لاگ ان کریں",
            forgotPasswordTitle: "پاس ورڈ تبدیل کریں", forgotPasswordSub: "تصدیقی کوڈ حاصل کرنے کے لیے اپنا ای میل درج کریں۔", sendResetCode: "کوڈ بھیجیں", sending: "بھیجا جا رہا ہے...", backToLogin: "لاگ ان پر واپس جائیں",
            verificationTitle: "تصدیق", verificationSub: "اس ای میل پر بھیجا گیا 6 ہندسوں کا کوڈ درج کریں: ", verificationCode: "تصدیقی کوڈ", verifyCode: "کوڈ کی تصدیق کریں", verifying: "تصدیق ہو رہی ہے...", resendCode: "کوڈ دوبارہ بھیجیں",
            newPasswordTitle: "نیا پاس ورڈ", newPasswordSub: "اپنے اکاؤنٹ کو محفوظ بنانے کے لیے ایک مضبوط پاس ورڈ بنائیں۔", newPassword: "نیا پاس ورڈ", confirmPassword: "پاس ورڈ کی تصدیق کریں", updatePassword: "پاس ورڈ اپ ڈیٹ کریں", updating: "اپ ڈیٹ ہو رہا ہے...",
            fillFields: "تمام جگہوں کو پر کریں", passwordsNotMatch: "پاس ورڈ مطابقت نہیں رکھتے"
        },
        welcome: { titlePart1: "آپ کی صحت،", titlePart2: "آپ کے ہاتھوں میں", subtitle: "اپنے اپوائنٹمنٹس اور میڈیکل ریکارڈز کا انتظام کرنے کا آسان ترین طریقہ۔", getStarted: "شروع کریں" },
        tabs: { home: "ہوم", visits: "ملاقاتیں", records: "ریکارڈز", profile: "پروفائل" },
        dashboard: { welcome: "خوش آمدید،", healthStats: "آپ کی صحت کے اعداد و شمار", upcoming: "اگلی ملاقات", viewAll: "سب دیکھیں", searchDoctor: "ڈاکٹر تلاش کریں...", consultation: "میڈبوٹ AI", bookVisit: "ملاقات بک کریں", findDoctor: "ڈاکٹر تلاش کریں", myRecords: "میرے ریکارڈز", steps: "قدم", sleep: "نیند", water: "پانی", bpm: "بی پی ایم", noAppointments: "ابھی تک کوئی ملاقات نہیں ہے", bookFirstVisit: "ماہر ڈاکٹر کے ساتھ اپنی پہلی ملاقات بک کریں", history: "ہسٹری", bookNow: "ابھی بک کریں", nextVisit: "اگلی ملاقات", allVisits: "تمام ملاقاتیں", dailyMedication: "روزانہ کی ادویات", nextDose: "اگلی خوراک", done: "مکمل" },
        profile: { title: "پروفائل اور سیٹنگز", personalInfo: "ذاتی معلومات", appPreferences: "ایپ کی ترجیحات", fullName: "پورا نام", email: "ای میل", phone: "فون نمبر", address: "پتہ", about: "ہمارے بارے میں", patientId: "مریض کی آئی ڈی", helpSupport: "مدد اور تعاون", language: "زبان", logout: "لاگ آؤٹ", editProfile: "پروفائل ایڈیٹ کریں", backToProfile: "پروفائل پر واپس جائیں", updateProfileSub: "اپنی پروفائل کی معلومات اپ ڈیٹ کریں", patientIdLabel: "مریض کی آئی ڈی", phonePlaceholder: "+92 300 0000000", addressPlaceholder: "شہر، ملک", aboutPlaceholder: "اپنے بارے میں بتائیں..." },
        language: { title: "زبان منتخب کریں", description: "ایپ کے اندر اپنے تجربے کو ذاتی نوعیت دینے کے لیے اپنی پسندیدہ زبان منتخب کریں۔", footer: "دائیں سے بائیں زبانوں کے لیے تبدیلیاں لاگو کرنے کے لیے ایپ دوبارہ شروع ہوگی۔" },
        records: { title: "میڈیکل ریکارڈز", searchPlaceholder: "ریکارڈز تلاش کریں...", all: "تمام", labReport: "لیب رپورٹ", prescription: "نسخہ", xray: "ایکسرے", scan: "اسکین", other: "دیگر", noRecords: "کوئی ریکارڈ نہیں ملا", noRecordsDesc: "اپنے میڈیکل ریکارڈز محفوظ طریقے سے اپ لوڈ کریں۔", deleteTitle: "ریکارڈ حذف کریں", deleteConfirm: "کیا آپ واقعی اس ریکارڈ کو ہٹانا چاہتے ہیں؟", deleted: "ریکارڈ حذف کر دیا گیا", attached: "منسلک" },
        appointments: { title: "اگلی ملاقاتیں", upcoming: "آنیوالی", past: "پرانی ملاقاتیں", new: "نیا", noUpcoming: "कोई آنیوالی ملاقات نہیں ہے", noPast: "کوئی پرانی ملاقات نہیں ہے", cancel: "منسوخ کریں", reschedule: "دوبارہ وقت طے کریں", cancelConfirmTitle: "ملاقات منسوخ کریں", cancelConfirmDesc: "کیا آپ واقعی اس ملاقات کو منسوخ کرنا چاہتے ہیں؟", cancelled: "ملاقات منسوخ کر دی گئی", status: { confirmed: "تصدیق شدہ", pending: "التواء میں", cancelled: "منسوخ", completed: "مکمل" } },
        medbot: {
            title: "میڈبوٹ AI", greeting: "ہیلو ${user}! میں میڈبوٹ ہوں، آپ کا ذہین ہیلتھ اسسٹنٹ۔ میں آج آپ کی کیا مدد کر سکتا ہوں؟", thinking: "میڈبوٹ سوچ رہا ہے...", askAnything: "کچھ بھی پوچھیں...", chips: { nextAppt: "اگلی ملاقات", medInfo: "ادویات کی معلومات", symptoms: "علامات چیک کریں" }, initialMsg: "میں ملاقاتوں، میڈیکل ریکارڈز، یا بنیادی صحت کی معلومات میں مدد کر سکتا ہوں۔", modes: { personal: "پرسنل موڈ", medical: "اسمارٹ AI ماہر", switched: "موڈ ${mode} پر تبدیل ہو گیا" },
            responses: {
                consultation: "آپ کی علامات کی بنیاد پر، میں مشورے کی سفارش کرتا ہوں۔ کیا آپ ایک بک کرنا چاہیں گے؟",
                details: "کیا آپ مزید تفصیلات فراہم کر سکتے ہیں؟",
                okay: "میں سمجھ گیا ہوں۔ مجھے اس میں آپ کی مدد کرنے دیں۔",
                error: "مجھے اپنے میڈیکل دماغ سے منسلک ہونے میں دشواری ہو رہی ہے۔ براہ کرم دوبارہ کوشش کریں۔",
                sysError: "سسٹم کی خرابی: میڈبوٹ تک پہنچنے میں ناکام۔ براہ کرم اپنا انٹرنیٹ کنکشن چیک کریں۔",
                symptoms: "آپ کی علامات کی بنیاد پر، میں جنرل فزیشن یا نیورولوجسٹ سے مشورہ کرنے کا مشورہ دیتا ہوں۔ آپ ہمارے 'ملاقات بک کریں' سیکشن میں ماہرین تلاش کر سکتے ہیں۔",
                heart: "دل کی علامات پر توجہ کی ضرورت ہے۔ ہمارے پاس ماہر امراض قلب دستیاب ہیں۔ اگر یہ ہنگامی صورتحال ہے تو براہ کرم فوری طور پر 1122 پر رابطہ کریں۔",
                skin: "جلد کے مسائل کے لیے، ماہر امراض جلد بہترین شخص ہے۔ ہمارے پاس ہمارے نیٹ ورک میں ماہر ڈاکٹر موجود ہیں۔",
                drugs: {
                    paracetamol: "پیراسیٹامول ہلکے سے درمیانے درجے کے درد (جیسے سر درد، دانت کا درد) اور بخار کے علاج کے لیے استعمال ہوتی ہے۔",
                    aspirin: "ایسپرین بخار کو کم کرنے اور درد سے نجات کے لیے استعمال ہوتی ہے۔ یہ خون کے لوتھڑے بننے سے روکنے میں بھی مددگار ہے۔",
                    general: "میں عام ادویات جیسے پیناڈول، ایسپرین یا اینٹی بائیوٹکس کے بارے میں معلومات فراہم کر سکتا ہوں۔ نوٹ: یہ نسخہ نہیں ہے۔"
                },
                analyzeReport: "آپ کی میڈیکل رپورٹ اسکین ہو رہی ہے... [تجزیہ: شوگر کی سطح قدرے زیادہ ہے]۔ ہم اینڈوکرائنولوجسٹ کو دکھانے کی سفارش کرتے ہیں۔",
                help: "میڈیکل ایکسپرٹ موڈ میں، میں:\n1. علامات کی بنیاد پر ماہرین کا مشورہ دے سکتا ہوں۔\n2. دوا کے استعمال کی وضاحت کر سکتا ہوں۔\n3. آپ کی میڈیکل رپورٹس کا تجزیہ کر سکتا ہوں۔",
                medicalFallback: "میں اس وقت 'میڈیکل ایکسپرٹ موڈ' میں ہوں۔ آپ مجھ سے علامات، ادویات یا رپورٹس کے بارے میں پوچھ سکتے ہیں۔",
                personal: {
                    bookingHow: "نئی ملاقات بک کرنے کے لیے:\n1. 'ڈیش بورڈ' پر جائیں\n2. 'ملاقات بک کریں' پر کلک کریں\n3. اپنا پسندیدہ ڈاکٹر اور وقت منتخب کریں۔",
                    appointmentInfo: "آپ کی ڈاکٹر ${doctor} کے ساتھ ${date} کو ${time} پر ملاقات ہے۔ اسٹیٹس: ${status}۔",
                    appointmentNone: "مجھے آپ کے ریکارڈ میں کوئی آنے والی ملاقات نظر نہیں آ رہی۔ آپ ڈیش بورڈ سے بک کر سکتے ہیں۔",
                    medicationInfo: "آپ کی موجودہ دوا ${name} (${dosage}) ہے۔\nہدایات: ${instruction}\nوقت: ${time}",
                    medicationNone: "آپ کی پروفائل میں کوئی فعال دوا نہیں ملی۔ آپ انہیں پروفائل سیکشن میں شامل کر سکتے ہیں۔",
                    healthSummary: "صحت کی سمری:\n💓 پلس: ${hr} BPM\n👣 قدم: ${steps}\n🩸 بی پی: ${bp}\n🌙 نیند: ${sleep}",
                    doctorsInfo: "ہمارے نیٹ ورک میں اس وقت ${count} ماہر ڈاکٹر موجود ہیں۔ آپ مکمل فہرست 'ملاقات بک کریں' میں دیکھ سکتے ہیں۔",
                    fallback: "میں سمجھ نہیں سکا۔ آپ مجھ سے اپنی 'ملاقاتوں'، 'ادویات' یا 'صحت کی صورتحال' کے بارے میں پوچھ سکتے ہیں۔",
                    thanks: "آپ کا شکریہ! اگر آپ کو کسی اور چیز کی ضرورت ہو تو میں یہاں ہوں۔"
                }
            }
        },
        booking: { title: "ملاقات بک کریں", steps: { details: "تفصیلات", doc: "ڈاکٹر", time: "وقت" }, labels: { date: "تاریخ", dateSub: "ملاقات کی تاریخ منتخب کریں", spec: "ماہر", specSub: "اپنے ڈاکٹر کا انتخاب کریں", time: "ٹائم سلاٹ", timeSub: "اپنا پسندیدہ وقت منتخب کریں", location: "جگہ" }, times: { morning: "صبح", afternoon: "دوپہر", evening: "شام", night: "رات" }, confirm: "ملاقات کی تصدیق کریں", confirming: "تصدیق ہو رہی ہے...", reserved: "آپ کا سلاٹ محفوظ کر لیا جائے گا", toast: { selectDoc: "براہ کرم ڈاکٹر منتخب کریں", selectTime: "براہ کرم ٹائم سلاٹ منتخب کریں", failed: "بکنگ ناکام ہوگئی" } },
        confirm: { placed: "ملاقات کی تصدیق ہو گئی!", subtitle: "آپ کی ملاقات کامیابی سے بک کر لی گئی ہے۔", details: "ملاقات کی تفصیلات", addCalendar: "کیلنڈر میں شامل کریں", viewHistory: "تمام ملاقاتیں دیکھیں" },
        newRecord: { title: "نیا ریکارڈ", edit: "ریکارڈ ایڈٹ کریں", labels: { title: "عنوان", attachments: "منسلکات (اختیاری)", description: "تفصیل (اختیاری)", category: "زمرہ" }, placeholders: { title: "مثال کے طور پر، خون کے ٹیسٹ کا نتیجہ", description: "تفصیلات شامل کریں...", search: "ریکارڈز تلاش کریں..." }, actions: { camera: "کیمرہ", gallery: "گیلری", files: "فائلیں" }, attached: "دستاویز منسلک ہے", saving: "محفوظ ہو رہا ہے...", updating: "اپ ڈیٹ ہو رہا ہے...", saved: "ریکارڈ شامل کر دیا گیا!", updated: "ریکارڈ اپ ڈیٹ کر دیا گیا!", uploadSec: "اپنے ریکارڈز محفوظ طریقے سے اپ لوڈ کریں", error: { titleReq: "عنوان درکار ہے", camDeny: "کیمرہ کی اجازت نہیں دی گئی", pickErr: "دستاویز منتخب کرنے میں غلطی", saveErr: "ریکارڈ محفوظ کرنے میں ناکامی" } },
        history: { title: "پرانی ملاقاتیں", noRecords: "ابھی تک کوئی ریکارڈ نہیں ہے", noRecordsDesc: "آپ کے پرانے چیک اپ یہاں نظر آئیں گے۔", filter: "فلٹر", retry: "دوبارہ کوشش کریں", loadErr: "ہسٹری لوڈ کرنے میں ناکامی" },
        scanner: { heartRate: "پلس اسکینر", bp: "بی پی اسکینر", permission: { title: "کیمرہ تک رسائی درکار ہے", desc: "آپ کی ${type} کا تجزیہ کرنے کے لیے، ہم انگلی میں خون کے بہاؤ کی تبدیلیوں کو محسوس کرنے کے لیے کیمرہ اور فلیش کا استعمال کرتے ہیں۔", grant: "کیمرہ فعال کریں", denied: "اسکین کرنے کے لیے براہ کرم کیمرہ تک رسائی دیں۔" }, instruction: "اپنی انگلی کیمرے کے لینس پر رکھیں", steady: "اپنی انگلی ساکت رکھیں...", analysis: "تجزیہ مکمل", update: "ڈیش بورڈ اپ ڈیٹ کریں", scanAgain: "دوبارہ اسکین کریں", disclaimer: "اعلان دستبرداری: طبی استعمال کے لیے نہیں۔ یہ تعلیمی مقاصد کے لیے ایک ٹیکنالوجی مظاہرہ ہے۔" },
        notifications: { title: "اطلاعات", markRead: "تمام پڑھے ہوئے نشان زد کریں", empty: "سب ٹھیک ہے!", emptyDesc: "آپ کے پاس کوئی نئی اطلاع نہیں ہے۔" },
        help: { title: "مدد اور تعاون", faq: "اکثر پوچھے گئے سوالات", faqSub: "عام طبی پورٹل سوالات کے حل نیچے تلاش کریں۔", contact: "مزید مدد کی ضرورت ہے؟ ہم سے رابطہ کریں", emailUs: "concierge@medpoint.com", questions: { q1: "میں ملاقات کا وقت کیسے طے کروں؟", a1: "ہوم یا اپوائنٹمنٹس ٹیب پر جائیں اور 'نیا شیڈول کریں' پر ٹیپ کریں۔ تصدیق کے لیے اپنے پسندیدہ ڈاکٹر، تاریخ اور ٹائم سلاٹ کا انتخاب کریں۔", q2: "کیا میں اپنے میڈیکل ریکارڈ دیکھ سکتا ہوں؟", a2: "جی ہاں، آپ 'ریکارڈز' ٹیب میں اپنی میڈیکل رپورٹس اپ لوڈ اور دیکھ سکتے ہیں۔ تمام ڈیٹا انکرپٹڈ اور محفوظ ہے۔", q3: "میں اپنے ڈاکٹر سے کیسے رابطہ کروں؟", a3: "ملاقات بک کرنے کے بعد، ڈاکٹر کے رابطے کی تفصیلات ملاقات کی تفصیلات کی اسکرین پر دستیاب ہوں گی۔", q4: "اگر مجھے منسوخ کرنے کی ضرورت ہو تو کیا ہوگا؟", a4: "آپ مقررہ وقت سے 24 گھنٹے پہلے تک اپوائنٹمنٹس ٹیب سے کسی بھی آنے والی ملاقات کو منسوخ کر سکتے ہیں۔", q5: "کیا میرا ڈیٹا محفوظ ہے؟", a5: "ہم آپ کی طبی ہسٹری کو نجی رکھنے کے لیے ہسپتال گریڈ انکرپشن اور محفوظ نجی اسٹوریج کا استعمال کرتے ہیں۔" } }
    },
    ar: {
        common: { save: "حفظ التغييرات", cancel: "إلغاء", loading: "جار التحميل...", success: "نجاح", error: "خطأ", comingSoon: "قريبا!", back: "رجوع", next: "التالي", delete: "حذف", edit: "تعديل", retry: "إعادة المحاولة", searching: "جاري البحث...", noResults: "لم يتم العثور على نتائج", notSet: "لم يتم التعيين" },
        auth: {
            welcomeBack: "مرحباً بعودتك", signInDesc: "سجل الدخول للوصول إلى لوحة التحكم الطبية الخاصة بك.", email: "عنوان البريد الإلكتروني", password: "كلمة المرور", forgotPassword: "هل نسيت كلمة المرور؟", signInBtn: "تسجيل الدخول", signingIn: "جاري تسجيل الدخول...", newHere: "جديد هنا؟ ", createAccount: "إنشاء حساب",
            createAccountTitle: "إنشاء حساب", joinCommunity: "انضم إلى المجتمع الطبي اليوم.", fullName: "الاسم الكامل", signUpBtn: "تسجيل", creatingAccount: "جاري إنشاء الحساب...", alreadyHaveAccount: "هل لديك حساب بالفعل؟ ", loginLink: "تسجيل الدخول",
            forgotPasswordTitle: "إعادة تعيين كلمة المرور", forgotPasswordSub: "أدخل بريدك الإلكتروني لتلقي رمز التحقق.", sendResetCode: "إرسال رمز إعادة التعيين", sending: "جاري الإرسال...", backToLogin: "العودة إلى تسجيل الدخول",
            verificationTitle: "التحقق", verificationSub: "أدخل الرمز المكون من 6 أرقام المرسل إلى ", verificationCode: "رمز التحقق", verifyCode: "التحقق من الرمز", verifying: "جاري التحقق...", resendCode: "إعادة إرسال رمز التحقق",
            newPasswordTitle: "كلمة مرور جديدة", newPasswordSub: "أنشئ كلمة مرور قوية لتأمين حسابك.", newPassword: "كلمة مرور جديدة", confirmPassword: "تأكيد كلمة المرور", updatePassword: "تحديث كلمة المرور", updating: "جاري التحديث...",
            fillFields: "يرجى ملء جميع الحقول", passwordsNotMatch: "كلمات المرور غير متطابقة"
        },
        welcome: { titlePart1: "صحتك،", titlePart2: "بين يديك", subtitle: "أسهل طريقة لإدارة مواعيدك وسجلاتك الطبية.", getStarted: "ابدأ الآن" },
        tabs: { home: "الرئيسية", visits: "الزيارات", records: "السجلات", profile: "الملف الشخصي" },
        dashboard: { welcome: "مرحباً بعودتك،", healthStats: "إحصائياتك الصحية", upcoming: "الموعد القادم", viewAll: "عرض الكل", searchDoctor: "ابحث عن أطباء...", consultation: "ميدبوت AI", bookVisit: "حجز موعد", findDoctor: "البحث عن طبيب", myRecords: "سجلاتي", steps: "خطوات", sleep: "نوم", water: "ماء", bpm: "نبض", noAppointments: "لا توجد مواعيد بعد", bookFirstVisit: "احجز زيارتك الأولى مع أخصائي", history: "سجل", bookNow: "احجز الآن", nextVisit: "الزيارة القادمة", allVisits: "كل الزيارات", dailyMedication: "الأدوية اليومية", nextDose: "الجرعة القادمة", done: "تم" },
        profile: { title: "الملف الشخصي والإعدادات", personalInfo: "معلومات شخصية", appPreferences: "تفضيلات التطبيق", fullName: "الاسم الكامل", email: "البريد الإلكتروني", phone: "رقم الهاتف", address: "عنوان", about: "عن", patientId: "معرف المريض", helpSupport: "المساعدة والدعم", language: "لغة", logout: "تسجيل الخروج", editProfile: "تعديل الملف الشخصي", backToProfile: "العودة إلى الملف الشخصي", updateProfileSub: "تحديث معلومات ملفك الشخصي", patientIdLabel: "معرف المريض", phonePlaceholder: "+966 50 000 0000", addressPlaceholder: "المدينة، الدولة", aboutPlaceholder: "حدثنا عن نفسك..." },
        language: { title: "اختر اللغة", description: "اختر لغتك المفضلة لتخصيص تجربتك داخل التطبيق.", footer: "سيعاد تشغيل التطبيق لتطبيق التغييرات للغات من اليمين إلى اليسار." },
        records: { title: "السجلات الطبية", searchPlaceholder: "البحث في السجلات...", all: "الكل", labReport: "تقرير مختبر", prescription: "وصفة طبية", xray: "أشعة سينية", scan: "فحص", other: "آخر", noRecords: "لم يتم العثور على سجلات", noRecordsDesc: "قم بتحميل سجلاتك الطبية بشكل آمن.", deleteTitle: "حذف السجل", deleteConfirm: "هل أنت متأكد أنك تريد حذف هذا السجل؟", deleted: "تم حذف السجل", attached: "مرفق" },
        appointments: { title: "الزيارات القادمة", upcoming: "قادمة", past: "الزيارات السابقة", new: "جديد", noUpcoming: "لا توجد مواعيد قادمة", noPast: "لا توجد مواعيد سابقة", cancel: "إلغاء", reschedule: "إعادة جدولة", cancelConfirmTitle: "إلغاء الموعد", cancelConfirmDesc: "هل أنت متأكد أنك تريد إلغاء هذا الموعد؟", cancelled: "تم إلغاء الموعد", status: { confirmed: "مؤكد", pending: "قيد الانتظار", cancelled: "ملغي", completed: "مكتمل" } },
        medbot: {
            title: "ميدبوت AI", greeting: "مرحباً ${user}! أنا ميدبوت، مساعدك الصحي الذكي. كيف يمكنني مساعدتك اليوم؟", thinking: "ميدبوت يفكر...", askAnything: "اسأل عن أي شيء...", chips: { nextAppt: "الموعد القادم", medInfo: "معلومات الدواء", symptoms: "فحص الأعراض" }, initialMsg: "يمكنني المساعدة في المواعيد أو السجلات الطبية أو المعلومات الصحية الأساسية.",
            modes: { personal: "الوضع الشخصي", medical: "خبير AI ذكي", switched: "تم التبديل إلى وضع ${mode}" },
            responses: {
                consultation: "بناءً على أعراضك، أوصي باستشارة طبية. هل ترغب في حجز موعد؟",
                details: "هل يمكنك تقديم مزيد من التفاصيل؟",
                okay: "أنا أفهم ذلك. دعني أساعدك في ذلك.",
                error: "أواجه مشكلة في الاتصال بدماغي الطبي. يرجى المحاولة مرة أخرى.",
                sysError: "خطأ في النظام: تعذر الوصول إلى ميدبوت. يرجى التحقق من اتصالك بالإنترنت.",
                symptoms: "بناءً على أعراضك، أوصي باستشارة طبيب عام أو طبيب أعصاب. يمكنك العثور على أفضل الأخصائيين في قسم 'حجز زيارة'.",
                heart: "الأعراض القلبية تتطلب اهتماماً. لدينا أطباء قلب خبراء متاحون. إذا كانت هذه حالة طارئة، يرجى الاتصال بـ 997 فوراً.",
                skin: "بالنسبة للمشاكل المتعلقة بالجلد، فإن طبيب الأمراض الجلدية هو الأفضل للاستشارة. لدينا خبراء في شبكتنا يمكنهم المساعدة.",
                drugs: {
                    paracetamol: "يستخدم الباراسيتامول لعلاج الآلام الخفيفة والمتوسطة (مثل الصداع وألم الأسنان) ولخفض الحمى.",
                    aspirin: "يستخدم الأسبرين لتقليل الحمى وتسكين الآلام. كما يساعد في منع تجلط الدم.",
                    general: "يمكنني تقديم معلومات عن الأدوية الشائعة مثل بانادول، أسبرين، أو المضادات الحيوية. ملاحظة: أنا مساعد ذكاء اصطناعي وهذه ليست وصفة طبية."
                },
                analyzeReport: "جاري فحص تقريرك الطبي... [تحليل الذكاء الاصطناعي: مستوى السكر في الدم مرتفع قليلاً]. نوصي بمراجعة طبيب الغدد الصم.",
                help: "في وضع الخبير الطبي، يمكنني:\n1. اقتراح أخصائيين بناءً على الأعراض.\n2. شرح استخدامات الأدوية.\n3. تحليل تقاريرك الطبية.",
                medicalFallback: "أنا حالياً في 'وضع الخبير الطبي'. يمكنك سؤالي عن الأعراض أو الأدوية أو التقارير.",
                personal: {
                    bookingHow: "لحجز موعد جديد:\n1. اذهب إلى 'لوحة التحكم'\n2. اضغط على 'حجز زيارة'\n3. اختر طبيبك المفضل والوقت.",
                    appointmentInfo: "لديك موعد قادم مع د. ${doctor} بتاريخ ${date} الساعة ${time}. الحالة: ${status}.",
                    appointmentNone: "لا أرى أي مواعيد قادمة في سجلاتك. يمكنك الحجز من لوحة التحكم.",
                    medicationInfo: "دواؤك الحالي هو ${name} (${dosage}).\nالتعليمات: ${instruction}\nالوقت: ${time}",
                    medicationNone: "لم يتم العثور على أدوية نشطة في ملفك الشخصي. يمكنك إضافتها في قسم الملف الشخصي.",
                    healthSummary: "ملخص الصحة:\n💓 النبض: ${hr} BPM\n👣 الخطوات: ${steps}\n🩸 الضغط: ${bp}\n🌙 النوم: ${sleep}",
                    doctorsInfo: "لدينا حالياً ${count} من الأخصائيين الخبراء في شبكتنا. يمكنك عرض القائمة الكاملة في قسم 'حجز زيارة'.",
                    fallback: "لم أفهم ذلك تماماً. يمكنك سؤالي عن 'مواعيدك' أو 'أدويتك' أو 'حالتك الصحية'.",
                    thanks: "العفو! أنا هنا إذا كنت بحاجة إلى أي شيء آخر."
                }
            }
        },
        booking: { title: "حجز موعد", steps: { details: "تفاصيل", doc: "طبيب", time: "وقت" }, labels: { date: "تاريخ", dateSub: "اختر تاريخ الموعد", spec: "أخصائي", specSub: "اختر طبيبك", time: "فترة زمنية", timeSub: "اختر وقتك المفضل", location: "الموقع" }, times: { morning: "صباحاً", afternoon: "بعد الظهر", evening: "مساءً", night: "ليلاً" }, confirm: "تأكيد الموعد", confirming: "جاري التأكيد...", reserved: "سيتم حجز موعدك", toast: { selectDoc: "يرجى اختيار طبيب", selectTime: "يرجى اختيار فترة زمنية", failed: "فشل الحجز" } },
        confirm: { placed: "تم تأكيد الموعد", subtitle: "لقد تم حجز موعدك بنجاح.", details: "تفاصيل الموعد", addCalendar: "إضافة إلى التقويم", viewHistory: "عرض جميع المواعيد" },
        newRecord: { title: "سجل جديد", edit: "تعديل السجل", labels: { title: "عنوان", attachments: "مرفقات (اختياري)", description: "وصف (اختياري)", category: "فئة" }, placeholders: { title: "مثال: نتيجة فحص الدم", description: "أضف تفاصيل...", search: "البحث في السجلات..." }, actions: { camera: "كاميرا", gallery: "معرض الصور", files: "ملفات" }, attached: "تم إرفاق المستند", saving: "جاري الحفظ...", updating: "جاري التحديث...", saved: "تم إضافة السجل!", updated: "تم تحديث السجل!", uploadSec: "قم بتحميل سجلاتك بشكل آمن", error: { titleReq: "العنوان مطلوب", camDeny: "تم رفض الوصول للكاميرا", pickErr: "خطأ في اختيار المستند", saveErr: "فشل في حفظ السجل" } },
        history: { title: "الزيارات السابقة", noRecords: "لا توجد سجلات بعد", noRecordsDesc: "ستظهر فحوصاتك السابقة هنا.", filter: "تصفية", retry: "إعادة المحاولة", loadErr: "فشل تحميل السجل" },
        scanner: { heartRate: "ماسح النبض", bp: "ماسح ضغط الدم", permission: { title: "الوصول للكاميرا مطلوب", desc: "لتحليل ${type} الخاص بك، نستخدم الكاميرا والفلاش لاكتشاف تغيرات تدفق الدم في إصبعك.", grant: "تمكين الكاميرا", denied: "يرجى تمكين الوصول للكاميرا للمسح." }, instruction: "ضع إصبعك فوق عدسة الكاميرا", steady: "ابقَ إصبعك ثابتاً...", analysis: "تم التحليل", update: "تحديث لوحة التحكم", scanAgain: "المسح مرة أخرى", disclaimer: "تنبيه: ليس للاستخدام الطبي. هذا عرض تقني لأغراض تعليمية فقط." },
        notifications: { title: "الإشعارات", markRead: "تحديد الكل كمقروء", empty: "أنت مواكب لكل شيء!", emptyDesc: "ليس لديك إشعارات جديدة." },
        help: { title: "المساعدة والدعم", faq: "الأسئلة الشائعة", faqSub: "ابحث عن حلول للاستفسارات الشائعة حول البوابة الطبية أدناه.", contact: "هل مازلت بحاجة إلى دعم؟ تواصل معنا على", emailUs: "concierge@medpoint.com", questions: { q1: "كيف يمكنني تحديد موعد؟", a1: "انتقل إلى علامة تبويب الصفحة الرئيسية أو المواعيد واضغط على 'جدولة جديدة'. اختر طبيبك المفضل والتاريخ والوقت للتأكيد.", q2: "هل يمكنني عرض سجلي الطبي؟", a2: "نعم، يمكنك تحميل وعرض تقاريرك الطبية في علامة تبويب 'السجلات'. جميع البيانات مشفرة وآمنة.", q3: "كيف أتواصل مع طبيبي؟", a3: "بعد حجز الموعد، ستكون تفاصيل الاتصال بالطبيب متاحة في شاشة تفاصيل الموعد.", q4: "ماذا لو كنت بحاجة للإلغاء؟", a4: "يمكنكي إلغاء أي موعد قادم من علامة تبويب المواعيد قبل ما يصل إلى 24 ساعة من الوقت المحدد.", q5: "هل بياناتي آمنة؟", a5: "نحن نستخدم تشفيرًا بمستوى المستشفيات وتخزينًا خاصًا آمنًا لضمان بقاء تاريخك الطبي خاصًا." } }
    },
    es: {
        common: { save: "Guardar cambios", cancel: "Cancelar", loading: "Cargando...", success: "Éxito", error: "Error", comingSoon: "¡Próximamente!", back: "Atrás", next: "Siguiente", delete: "Eliminar", edit: "Editar", retry: "Reintentar", searching: "Buscando...", noResults: "No se encontraron resultados", notSet: "No establecido" },
        auth: {
            welcomeBack: "Bienvenido de nuevo", signInDesc: "Inicie sesión para acceder a su panel médico.", email: "Correo electrónico", password: "Contraseña", forgotPassword: "¿Olvidó su contraseña?", signInBtn: "Iniciar sesión", signingIn: "Iniciando sesión...", newHere: "¿Nuevo aquí? ", createAccount: "Crear cuenta",
            createAccountTitle: "Crear cuenta", joinCommunity: "Únase a la comunidad médica hoy.", fullName: "Nombre completo", signUpBtn: "Registrarse", creatingAccount: "Creando cuenta...", alreadyHaveAccount: "¿Ya tiene una cuenta? ", loginLink: "Iniciar sesión",
            forgotPasswordTitle: "Restablecer contraseña", forgotPasswordSub: "Ingrese su correo para recibir un código de verificación.", sendResetCode: "Enviar código", sending: "Enviando...", backToLogin: "Volver al inicio",
            verificationTitle: "Verificación", verificationSub: "Ingrese el código de 6 dígitos enviado a ", verificationCode: "CÓDIGO DE VERIFICACIÓN", verifyCode: "Verificar código", verifying: "Verificando...", resendCode: "Reenviar código de verificación",
            newPasswordTitle: "Nueva contraseña", newPasswordSub: "Cree una contraseña segura para su cuenta.", newPassword: "Nueva contraseña", confirmPassword: "Confirmar contraseña", updatePassword: "Actualizar contraseña", updating: "Actualizando...",
            fillFields: "Por favor complete todos los campos", passwordsNotMatch: "Las contraseñas no coinciden"
        },
        welcome: { titlePart1: "Tu salud,", titlePart2: "en tus manos", subtitle: "La forma más sencilla de gestionar tus citas y registros médicos.", getStarted: "Comenzar" },
        tabs: { home: "Inicio", visits: "Visitas", records: "Registros", profile: "Perfil" },
        dashboard: { welcome: "Bienvenido de nuevo,", healthStats: "Tus estadísticas de salud", upcoming: "Próxima cita", viewAll: "Ver todo", searchDoctor: "Buscar doctores...", consultation: "MedBot IA", bookVisit: "Reservar cita", findDoctor: "Buscar doctor", myRecords: "Mis registros", steps: "Pasos", sleep: "Sueño", water: "Agua", bpm: "LPM", noAppointments: "Aún no hay citas", bookFirstVisit: "Reserva tu primera visita con un especialista", history: "Historial", bookNow: "Reservar ahora", nextVisit: "Próxima visita", allVisits: "Todas las visitas", dailyMedication: "Medicamento diario", nextDose: "PRÓXIMA DOSIS", done: "Hecho" },
        profile: { title: "Perfil y configuración", personalInfo: "Información personal", appPreferences: "Preferencias de la aplicación", fullName: "Nombre completo", email: "Correo electrónico", phone: "Número de teléfono", address: "Dirección", about: "Sobre mí", patientId: "ID del paciente", helpSupport: "Ayuda y soporte", language: "Idioma", logout: "Cerrar sesión", editProfile: "Editar perfil", backToProfile: "Volver al perfil", updateProfileSub: "Actualiza tu información de perfil", patientIdLabel: "ID del paciente", phonePlaceholder: "+34 600 000 000", addressPlaceholder: "Ciudad, País", aboutPlaceholder: "Cuéntanos sobre ti..." },
        language: { title: "Seleccionar idioma", description: "Elija su idioma preferido para personalizar su experiencia dentro de la aplicación.", footer: "La aplicación se reiniciará para aplicar los cambios en los idiomas de derecha a izquierda." },
        records: { title: "Registros médicos", searchPlaceholder: "Buscar registros...", all: "Todos", labReport: "Informe de laboratorio", prescription: "Receta", xray: "Radiografía", scan: "Escaneo", other: "Otro", noRecords: "No se encontraron registros", noRecordsDesc: "Sube tus registros médicos de forma segura.", deleteTitle: "Eliminar registro", deleteConfirm: "¿Estás seguro de que deseas eliminar este registro?", deleted: "Registro eliminado", attached: "Adjunto" },
        appointments: { title: "Próximas visitas", upcoming: "Próximas", past: "Visitas pasadas", new: "Nueva", noUpcoming: "No hay citas próximas", noPast: "No hay citas pasadas", cancel: "Cancelar", reschedule: "Reprogramar", cancelConfirmTitle: "Cancelar cita", cancelConfirmDesc: "¿Estás seguro de que deseas cancelar esta cita?", cancelled: "Cita cancelada", status: { confirmed: "Confirmada", pending: "Pendiente", cancelled: "Cancelada", completed: "Completada" } },
        medbot: {
            title: "MedBot IA", greeting: "¡Hola ${user}! Soy MedBot, tu asistente de salud inteligente. ¿Cómo puedo ayudarte hoy?", thinking: "MedBot está pensando...", askAnything: "Pregunta cualquier cosa...", chips: { nextAppt: "Próxima cita", medInfo: "Información de medicina", symptoms: "Verificar síntomas" }, initialMsg: "Puedo ayudarte con citas, registros médicos o información básica de salud.", modes: { personal: "Modo Personal", medical: "Asistente Inteligente", switched: "Cambiado al modo ${mode}" },
            responses: {
                consultation: "Según tus síntomas, recomiendo una consulta. ¿Te gustaría reservar una?",
                details: "¿Puedes proporcionar más detalles?",
                okay: "Entiendo. Déjame ayudarte con eso.",
                error: "Tengo problemas para conectar con mi cerebro médico. Por favor, inténtalo de nuevo.",
                sysError: "Error del sistema: No se puede contactar a MedBot. Comprueba tu conexión.",
                symptoms: "Según tus síntomas, recomiendo consultar a un médico general o neurólogo. Puedes encontrar especialistas en 'Reservar cita'.",
                heart: "Los síntomas cardíacos requieren atención. Tenemos cardiólogos expertos. Si es una emergencia, llama al 112 inmediatamente.",
                skin: "Para problemas de piel, un dermatólogo es el mejor. Tenemos especialistas en nuestra red.",
                drugs: {
                    paracetamol: "El paracetamol se usa para tratar el dolor leve a moderado y reducir la fiebre.",
                    aspirin: "La aspirina se usa para reducir la fiebre y aliviar el dolor moderado. También ayuda a prevenir coágulos.",
                    general: "Puedo darte info sobre medicinas comunes como Panadol, Aspirina o Antibióticos. Nota: Soy un asistente IA, no una receta."
                },
                analyzeReport: "Escaneando tu informe médico... [ANÁLISIS IA: La glucosa está algo elevada]. Recomendamos ver a un endocrinólogo.",
                help: "En Modo Experto Médico, puedo:\n1. Sugerir especialistas.\n2. Explicar medicinas.\n3. Analizar informes.",
                medicalFallback: "Estoy en 'Modo Experto Médico'. Pregunta sobre síntomas, medicinas o informes.",
                personal: {
                    bookingHow: "Para reservar cita:\n1. Ve al 'Dashboard'\n2. Clic en 'Reservar cita'\n3. Elige doctor y horario.",
                    appointmentInfo: "Tienes una cita con el Dr. ${doctor} el ${date} a las ${time}. Estado: ${status}.",
                    appointmentNone: "No veo citas próximas. Puedes reservar una desde el Dashboard.",
                    medicationInfo: "Tu medicina actual es ${name} (${dosage}).\nInstrucción: ${instruction}\nHora: ${time}",
                    medicationNone: "No se encontraron medicinas activas. Añádelas en la sección Perfil.",
                    healthSummary: "Resumen de Salud:\n💓 Pulso: ${hr} BPM\n👣 Pasos: ${steps}\n🩸 PA: ${bp}\n🌙 Sueño: ${sleep}",
                    doctorsInfo: "Tenemos ${count} especialistas expertos en nuestra red. Ver lista completa en 'Reservar cita'.",
                    fallback: "No te entendí bien. Pregunta sobre tus 'citas', 'medicamentos' o 'salud'.",
                    thanks: "¡De nada! Estoy aquí si necesitas algo más."
                }
            }
        },
        booking: { title: "Reservar cita", steps: { details: "Detalles", doc: "Doctor", time: "Hora" }, labels: { date: "Fecha", dateSub: "Selecciona la fecha de la cita", spec: "Especialista", specSub: "Elige tu doctor", time: "Horario", timeSub: "Elige tu horario preferido", location: "Ubicación" }, times: { morning: "Mañana", afternoon: "Tarde", evening: "Noche", night: "Madrugada" }, confirm: "Confirmar cita", confirming: "Confirmando...", reserved: "Tu espacio será reservado", toast: { selectDoc: "Por favor selecciona un doctor", selectTime: "Por favor selecciona un horario", failed: "Error en la reserva" } },
        confirm: { placed: "Cita Confirmada", subtitle: "Su cita se ha reservado con éxito.", details: "Detalles de la cita", addCalendar: "Agregar al calendario", viewHistory: "Ver todas las citas" },
        newRecord: { title: "Nuevo registro", edit: "Editar registro", labels: { title: "Título", attachments: "Adjuntos (Opcional)", description: "Descripción (Opcional)", category: "Categoría" }, placeholders: { title: "ej., Resultado de análisis de sangre", description: "Añadir detalles...", search: "Buscar registros..." }, actions: { camera: "Cámara", gallery: "Galería", files: "Archivos" }, attached: "Documento adjunto", saving: "Guardando...", updating: "Actualizando...", saved: "¡Registro añadido!", updated: "¡Registro actualizado!", uploadSec: "Sube tus registros de forma segura", error: { titleReq: "El título es obligatorio", camDeny: "Permiso de cámara denegado", pickErr: "Error al elegir el documento", saveErr: "Error al guardar el registro" } },
        history: { title: "Visitas pasadas", noRecords: "Aún no hay registros", noRecordsDesc: "Tus chequeos pasados aparecerán aquí.", filter: "Filtrar", retry: "Reintentar", loadErr: "Error al cargar el historial" },
        scanner: { heartRate: "Escáner de pulso", bp: "Escáner de PA", permission: { title: "Acceso a la cámara necesario", desc: "Para analizar su ${type}, usamos la cámara y el flash para detectar variaciones del flujo sanguíneo en su dedo.", grant: "Activar cámara", denied: "Por favor active el acceso a la cámara para escanear." }, instruction: "Coloque su dedo sobre el lente de la cámara", steady: "Mantenga su dedo firme...", analysis: "Analizado", update: "Actualizar panel", scanAgain: "Escanear de nuevo", disclaimer: "Descargo de responsabilidad: No apto para uso médico. Esta es una demostración tecnológica con fines educativos." },
        notifications: { title: "Notificaciones", markRead: "Marcar todo como leído", empty: "¡Todo al día!", emptyDesc: "No tienes notificaciones nuevas." },
        help: { title: "Ayuda y soporte", faq: "Preguntas frecuentes", faqSub: "Encuentre soluciones a las consultas comunes del portal médico a continuación.", contact: "¿Aún necesitas soporte? Contáctanos en", emailUs: "concierge@medpoint.com", questions: { q1: "¿Cómo programo una cita?", a1: "Vaya a la pestaña Inicio o Citas y toque 'Programar nueva'. Seleccione su médico preferido, fecha y horario para confirmar.", q2: "¿Puedo ver mis registros médicos?", a2: "Sí, puede cargar y ver sus informes médicos en la pestaña 'Registros'. Todos los datos están cifrados y son seguros.", q3: "¿Cómo contacto a mi médico?", a3: "Después de reservar una cita, los detalles de contacto del médico estarán disponibles en la pantalla de detalles de la cita.", q4: "¿Qué pasa si necesito cancelar?", a4: "Puede cancelar cualquier cita próxima desde la pestaña Citas hasta 24 horas antes de la hora programada.", q5: "¿Son seguros mis datos?", a5: "Utilizamos cifrado de grado hospitalario y almacenamiento privado seguro para garantizar que su historial médico permanezca privado." } }
    },
    fr: {
        common: { save: "Enregistrer", cancel: "Annuler", loading: "Chargement...", success: "Succès", error: "Erreur", comingSoon: "Bientôt disponible !", back: "Retour", next: "Suivant", delete: "Supprimer", edit: "Modifier", retry: "Réessayer", searching: "Recherche...", noResults: "Aucun résultat trouvé", notSet: "Non défini" },
        auth: {
            welcomeBack: "Bon retour", signInDesc: "Connectez-vous pour accéder à votre tableau de bord médical.", email: "Adresse e-mail", password: "Mot de passe", forgotPassword: "Mot de passe oublié ?", signInBtn: "Se connecter", signingIn: "Connexion...", newHere: "Nouveau ici ? ", createAccount: "Créer un compte",
            createAccountTitle: "Créer un compte", joinCommunity: "Rejoignez la communauté médicale dès aujourd'hui.", fullName: "Nom complet", signUpBtn: "S'inscrire", creatingAccount: "Création du compte...", alreadyHaveAccount: "Vous avez déjà un compte ? ", loginLink: "Se connecter",
            forgotPasswordTitle: "Réinitialiser le mot de passe", forgotPasswordSub: "Entrez votre e-mail pour recevoir un code de vérification.", sendResetCode: "Envoyer le code", sending: "Envoi...", backToLogin: "Retour à la connexion",
            verificationTitle: "Vérification", verificationSub: "Entrez le code à 6 chiffres envoyé à ", verificationCode: "CODE DE VÉRIFICATION", verifyCode: "Vérifier le code", verifying: "Vérification...", resendCode: "Renvoyer le code",
            newPasswordTitle: "Nouveau mot de passe", newPasswordSub: "Créez un mot de passe fort pour sécuriser votre compte.", newPassword: "Nouveau mot de passe", confirmPassword: "Confirmer le mot de passe", updatePassword: "Mettre à jour", updating: "Mise à jour...",
            fillFields: "Veuillez remplir tous les champs", passwordsNotMatch: "Les mots de passe ne correspondent pas"
        },
        welcome: { titlePart1: "Votre santé,", titlePart2: "entre vos mains", subtitle: "Le moyen le plus simple de gérer vos rendez-vous et vos dossiers médicaux.", getStarted: "Commencer" },
        tabs: { home: "Accueil", visits: "Visites", records: "Dossiers", profile: "Profil" },
        dashboard: { welcome: "Bon retour,", healthStats: "Vos stats de santé", upcoming: "Prochain rendez-vous", viewAll: "Voir tout", searchDoctor: "Chercher des doctores...", consultation: "MedBot IA", bookVisit: "Prendre RDV", findDoctor: "Trouver docteur", myRecords: "Mes dossiers", steps: "Pas", sleep: "Sommeil", water: "Eau", bpm: "BPM", noAppointments: "Pas encore de rendez-vous", bookFirstVisit: "Prenez votre premier rendez-vous avec un spécialiste", history: "Historique", bookNow: "Réserver", nextVisit: "Prochaine visite", allVisits: "Toutes les visites", dailyMedication: "Médicaments quotidiens", nextDose: "PROCHAINE DOSE", done: "Fait" },
        profile: { title: "Profil et paramètres", personalInfo: "Informations personnelles", appPreferences: "Préférences de l'application", fullName: "Nom complet", email: "E-mail", phone: "Numéro de téléphone", address: "Adresse", about: "À propos", patientId: "ID du patient", helpSupport: "Aide et support", language: "Langue", logout: "Se déconnecter", editProfile: "Modifier le profil", backToProfile: "Retour au profil", updateProfileSub: "Mettez à jour vos informations", patientIdLabel: "ID du patient", phonePlaceholder: "+33 6 00 00 00 00", addressPlaceholder: "Ville, Pays", aboutPlaceholder: "Parlez-nous de vous..." },
        language: { title: "Choisir la langue", description: "Choisissez votre langue préférée pour personnaliser votre expérience dans l'application.", footer: "L'application redémarrera pour appliquer les changements pour les langues de droite à gauche." },
        records: { title: "Dossiers médicaux", searchPlaceholder: "Chercher des dossiers...", all: "Tous", labReport: "Rapport de labo", prescription: "Ordonnance", xray: "Radiographie", scan: "Scanner", other: "Autre", noRecords: "Aucun dossier trouvé", noRecordsDesc: "Téléchargez vos dossiers médicaux en toute sécurité.", deleteTitle: "Supprimer le dossier", deleteConfirm: "Êtes-vous sûr de vouloir supprimer ce dossier ?", deleted: "Dossier supprimé", attached: "Joint" },
        appointments: { title: "Prochaines visites", upcoming: "À venir", past: "Visites passées", new: "Nouveau", noUpcoming: "Aucun rendez-vous à venir", noPast: "Aucun rendez-vous passé", cancel: "Annuler", reschedule: "Reporter", cancelConfirmTitle: "Annuler le rendez-vous", cancelConfirmDesc: "Êtes-vous sûr de vouloir annuler ce rendez-vous ?", cancelled: "Rendez-vous annulé", status: { confirmed: "Confirmé", pending: "En attente", cancelled: "Annulé", completed: "Terminé" } },
        medbot: {
            title: "MedBot IA", greeting: "Bonjour ${user} ! Je suis MedBot, votre assistant santé intelligent. Comment puis-je vous aider aujourd'hui ?", thinking: "MedBot réfléchit...", askAnything: "Demandez n'importe quoi...", chips: { nextAppt: "Prochain RDV", medInfo: "Infos médicaments", symptoms: "Vérifier symptômes" }, initialMsg: "Je peux vous aider avec les rendez-vous, les dossiers médicaux ou les infos santé de base.", modes: { personal: "Mode Personnel", medical: "Expert Intelligent", switched: "Passé en mode ${mode}" },
            responses: {
                consultation: "Selon vos symptômes, je recommande une consultation. Souhaitez-vous en réserver une ?",
                details: "Pouvez-vous fournir plus de détails ?",
                okay: "Je comprends. Laissez-moi vous aider avec ça.",
                error: "J'ai du mal à me connecter à mon cerveau médical. Veuillez réessayer.",
                sysError: "Erreur système : Impossible de joindre MedBot. Vérifiez votre connexion.",
                symptoms: "Selon vos symptômes, je recommande de consulter un médecin généraliste ou un neurologue. Vous trouverez des experts dans 'Prendre RDV'.",
                heart: "Les symptômes cardiaques nécessitent une attention. Nous avons des cardiologues experts. En cas d'urgence, appelez le 15.",
                skin: "Pour les problèmes de peau, un dermatologue est le meilleur. Nous avons des experts dans notre réseau.",
                drugs: {
                    paracetamol: "Le paracétamol est utilisé pour traiter la douleur légère à modérée et réduire la fièvre.",
                    aspirin: "L'aspirine est utilisée pour réduire la fièvre et soulager la douleur. Elle aide aussi à prévenir les caillots.",
                    general: "Je peux donner des infos sur les médicaments courants comme Panadol, Aspirine ou Antibiotiques. Note : Je suis une IA, pas une ordonnance."
                },
                analyzeReport: "Analyse de votre rapport médical... [ANALYSE IA : Glycémie légèrement élevée]. Nous recommandons de voir un endocrinologue.",
                help: "En Mode Expert Médical, je peux :\n1. Suggérer des spécialistes.\n2. Expliquer les médicaments.\n3. Analyser les rapports.",
                medicalFallback: "Je suis en 'Mode Expert Médical'. Posez des questions sur symptômes, médicaments ou rapports.",
                personal: {
                    bookingHow: "Pour réserver :\n1. Allez au 'Tableau de bord'\n2. Cliquez sur 'Prendre RDV'\n3. Choisissez docteur et créneau.",
                    appointmentInfo: "Vous avez RDV avec le Dr ${doctor} le ${date} à ${time}. Statut : ${status}.",
                    appointmentNone: "Aucun RDV à venir. Vous pouvez en réserver un depuis le Tableau de bord.",
                    medicationInfo: "Médicament actuel : ${name} (${dosage}).\nInstruction : ${instruction}\nHeure : ${time}",
                    medicationNone: "Aucun médicament actif trouvé. Ajoutez-les dans le Profil.",
                    healthSummary: "Résumé de Santé :\n💓 Pouls : ${hr} BPM\n👣 Pas : ${steps}\n🩸 TA : ${bp}\n🌙 Sommeil : ${sleep}",
                    doctorsInfo: "Nous avons ${count} experts dans notre réseau. Voir la liste dans 'Prendre RDV'.",
                    fallback: "Je n'ai pas bien compris. Demandez sur vos 'rendez-vous', 'médicaments' ou 'santé'.",
                    thanks: "De rien ! Je suis là si besoin."
                }
            }
        },
        booking: { title: "Prendre RDV", steps: { details: "Détails", doc: "Docteur", time: "Heure" }, labels: { date: "Date", dateSub: "Choisir la date du RDV", spec: "Spécialiste", specSub: "Choisissez votre docteur", time: "Créneau", timeSub: "Choisissez votre créneau préféré", location: "Emplacement" }, times: { morning: "Matin", afternoon: "Après-midi", evening: "Soir", night: "Nuit" }, confirm: "Confirmer le RDV", confirming: "Confirmation...", reserved: "Votre créneau sera réservé", toast: { selectDoc: "Veuillez choisir un docteur", selectTime: "Veuillez choisir un créneau", failed: "Échec de la réservation" } },
        confirm: { placed: "Rendez-vous Confirmé", subtitle: "Votre rendez-vous a été réservé avec succès.", details: "Détails du rendez-vous", addCalendar: "Ajouter au calendrier", viewHistory: "Voir tous les rendez-vous" },
        newRecord: { title: "Nouveau dossier", edit: "Modifier le dossier", labels: { title: "Titre", attachments: "Pièces jointes (Optionnel)", description: "Description (Optionnel)", category: "Catégorie" }, placeholders: { title: "ex: Résultat d'analyse de sang", description: "Ajouter des détails...", search: "Chercher des dossiers..." }, actions: { camera: "Appareil photo", gallery: "Galerie", files: "Fichiers" }, attached: "Document joint", saving: "Enregistrement...", updating: "Mise à jour...", saved: "Dossier ajouté !", updated: "Dossier mis à jour !", uploadSec: "Téléchargez vos dossiers en sécurité", error: { titleReq: "Le titre est requis", camDeny: "Accès caméra refusé", pickErr: "Erreur lors du choix du document", saveErr: "Échec de l'enregistrement" } },
        history: { title: "Visites passées", noRecords: "Aucun dossier pour le moment", noRecordsDesc: "Vos examens passés apparaîtront ici.", filter: "Filtrer", retry: "Réessayer", loadErr: "Échec du chargement de l'historique" },
        scanner: { heartRate: "Scanner de pouls", bp: "Scanner de tension", permission: { title: "Accès caméra nécessaire", desc: "Pour analyser votre ${type}, nous utilisons la caméra et le flash pour détecter les variations de flux sanguin dans votre doigt.", grant: "Activer la caméra", denied: "Veuillez activer l'accès caméra pour scanner." }, instruction: "Placez votre doigt sur l'objectif de la caméra", steady: "Maintenez votre doigt stable...", analysis: "Analysé", update: "Mettre à jour", scanAgain: "Scanner à nouveau", disclaimer: "Avertissement : Pas à usage médical. Ceci est une démonstration technologique à des fins éducatives." },
        notifications: { title: "Notifications", markRead: "Tout marquer comme lu", empty: "Tout est à jour !", emptyDesc: "Vous n'avez pas de nouvelles notifications." },
        help: { title: "Aide & Support", faq: "FAQ", faqSub: "Trouvez des solutions aux questions courantes sur le portail médical ci-dessous.", contact: "Encore besoin d'aide ? Contactez-nous à", emailUs: "concierge@medpoint.com", questions: { q1: "Comment prendre rendez-vous ?", a1: "Allez dans l'onglet Accueil ou Rendez-vous et appuyez sur 'Nouveau'. Sélectionnez votre médecin, date et créneau pour confirmer.", q2: "Puis-je voir mes dossiers médicaux ?", a2: "Oui, vous pouvez charger et voir vos rapports médicaux dans l'onglet 'Dossiers'. Toutes les données sont cryptées.", q3: "Comment contacter mon docteur ?", a3: "Après avoir pris rendez-vous, les coordonnées du médecin seront disponibles dans les détails du rendez-vous.", q4: "Et si je dois annuler ?", a4: "Vous pouvez annuler tout rendez-vous à venir depuis l'onglet Rendez-vous jusqu'à 24 heures avant l'heure prévue.", q5: "Mes données sont-elles sécurisées ?", a5: "Nous utilisons un cryptage de qualité hospitalière et un stockage privé sécurisé pour garantir la confidentialité." } }
    },
    hi: {
        common: { save: "बदलाव सहेजें", cancel: "रद्द करें", loading: "लोड हो रहा है...", success: "सफलता", error: "त्रुटि", comingSoon: "जल्द आ रहा है!", back: "पीछे", next: "आगे", delete: "हटाएं", edit: "संपादित करें", retry: "पुनः प्रयास करें", searching: "खोज रहे हैं...", noResults: "कोई परिणाम नहीं मिला", notSet: "निर्धारित नहीं" },
        auth: {
            welcomeBack: "स्वागत है", signInDesc: "अपने मेडिकल डैशबोर्ड तक पहुंचने के लिए साइन इन करें।", email: "ईमेल पता", password: "पासवर्ड", forgotPassword: "पासवर्ड भूल गए?", signInBtn: "साइन इन करें", signingIn: "साइन इन हो रहा है...", newHere: "यहाँ नए हैं? ", createAccount: "अकाउंट बनाएं",
            createAccountTitle: "अकाउंट बनाएं", joinCommunity: "आज ही मेडिकल समुदाय में शामिल हों।", fullName: "पूरा नाम", signUpBtn: "साइन अप करें", creatingAccount: "अकाउंट बन रहा है...", alreadyHaveAccount: "पहले से अकाउंट है? ", loginLink: "लॉगिन करें",
            forgotPasswordTitle: "पासवर्ड रीसेट करें", forgotPasswordSub: "सत्यापन कोड प्राप्त करने के लिए अपना ईमेल दर्ज करें।", sendResetCode: "रीसेट कोड भेजें", sending: "भेजा जा रहा है...", backToLogin: "लॉगिन पर वापस जाएं",
            verificationTitle: "सत्यापन", verificationSub: "भेजा गया 6-अंकीय कोड दर्ज करें: ", verificationCode: "सत्यापन कोड", verifyCode: "कोड सत्यापित करें", verifying: "सत्यापित हो रहा है...", resendCode: "कोड दोबारा भेजें",
            newPasswordTitle: "नया पासवर्ड", newPasswordSub: "अपने अकाउंट को सुरक्षित करने के लिए एक मजबूत पासवर्ड बनाएं।", newPassword: "नया पासवर्ड", confirmPassword: "पासवर्ड की पुष्टि करें", updatePassword: "पासवर्ड अपडेट करें", updating: "अपडेट हो रहा है...",
            fillFields: "कृपया सभी फ़ील्ड भरें", passwordsNotMatch: "पासवर्ड मेल नहीं खाते"
        },
        welcome: { titlePart1: "आपका स्वास्थ्य,", titlePart2: "आपके हाथों में", subtitle: "अपने अपॉइंटमेंट और मेडिकल रिकॉर्ड प्रबंधित करने का सबसे सरल तरीका।", getStarted: "शुरू करें" },
        tabs: { home: "होम", visits: "मुलाकातें", records: "रिकॉर्ड", profile: "प्रोफ़ाइल" },
        dashboard: { welcome: "स्वागत है,", healthStats: "आपके स्वास्थ्य आँकड़े", upcoming: "अगली मुलाकात", viewAll: "सभी देखें", searchDoctor: "डॉक्टर खोजें...", consultation: "मेडबॉट AI", bookVisit: "अपॉइंटमेंट बुक करें", findDoctor: "डॉक्टर खोजें", myRecords: "मेरे रिकॉर्ड", steps: "कदम", sleep: "नींद", water: "पानी", bpm: "बीपीएम", noAppointments: "अभी कोई अपॉइंटमेंट नहीं है", bookFirstVisit: "विशेषज्ञ के साथ अपनी पहली मुलाकात बुक करें", history: "इतिहास", bookNow: "अभी बुक करें", nextVisit: "अगली मुलाकात", allVisits: "सभी मुलाकातें", dailyMedication: "दैनिक दवा", nextDose: "अगली खुराक", done: "हो गया" },
        profile: { title: "प्रोफ़ाइल और सेटिंग्स", personalInfo: "व्यक्तिगत जानकारी", appPreferences: "ऐप प्राथमिकताएं", fullName: "पूरा नाम", email: "ईमेल", phone: "फ़ोन नंबर", address: "पता", about: "मेरे बारे में", patientId: "रोगी आईडी", helpSupport: "सहायता और समर्थन", language: "भाषा", logout: "लॉग आउट", editProfile: "प्रोफ़ाइल संपादित करें", backToProfile: "प्रोफ़ाइल पर वापस जाएं", updateProfileSub: "अपनी प्रोफ़ाइल जानकारी अपडेट करें", patientIdLabel: "रोगी आईडी", phonePlaceholder: "+91 90000 00000", addressPlaceholder: "शहर, देश", aboutPlaceholder: "अपने बारे में बताएं..." },
        language: { title: "भाषा चुनें", description: "ऐप के भीतर अपने अनुभव को अनुकूलित करने के लिए अपनी पसंदीदा भाषा चुनें।", footer: "दाएं-से-बाएं भाषाओं के लिए बदलाव लागू करने के लिए ऐप पुनरारंभ होगा।" },
        records: { title: "मेडिकल रिकॉर्ड", searchPlaceholder: "रिकॉर्ड खोजें...", all: "सभी", labReport: "लैब रिपोर्ट", prescription: "पर्चा", xray: "एक्सरे", scan: "स्कैन", other: "अन्य", noRecords: "कोई रिकॉर्ड नहीं मिला", noRecordsDesc: "अपने मेडिकल रिकॉर्ड सुरक्षित रूप से अपलोड करें।", deleteTitle: "रिकॉर्ड हटाएं", deleteConfirm: "क्या आप वाकई इस रिकॉर्ड को हटाना चाहते हैं?", deleted: "रिकॉर्ड हटा दिया गया", attached: "संलग्न" },
        appointments: { title: "आने वाली मुलाकातें", upcoming: "आने वाली", past: "पुरानी मुलाकातें", new: "नया", noUpcoming: "कोई आने वाली मुलाकात नहीं है", noPast: "कोई पुरानी मुलाकात नहीं है", cancel: "रद्द करें", reschedule: "दोबारा शेड्यूल करें", cancelConfirmTitle: "मुलाकात रद्द करें", cancelConfirmDesc: "क्या आप वाकई इस मुलाकात को रद्द करना चाहते हैं?", cancelled: "मुलाकात रद्द कर दी गई", status: { confirmed: "पुष्ट", pending: "लंबित", cancelled: "रद्द", completed: "पूरा हुआ" } },
        medbot: {
            title: "मेडबॉट AI", greeting: "नमस्ते ${user}! मैं मेडबॉट हूँ, आपका बुद्धिमान स्वास्थ्य सहायक। मैं आपकी क्या मदद कर सकता हूँ?", thinking: "मेडबॉट सोच रहा है...", askAnything: "कुछ भी पूछें...", chips: { nextAppt: "अगली मुलाकात", medInfo: "दवा की जानकारी", symptoms: "लक्षणों की जाँच" }, initialMsg: "मैं अपॉइंटमेंट, मेडिकल रिकॉर्ड या बुनियादी स्वास्थ्य जानकारी में मदद कर सकता हूँ।", modes: { personal: "व्यक्तिगत मोड", medical: "स्मार्ट AI विशेषज्ञ", switched: "${mode} मोड में बदल दिया गया" },
            responses: {
                consultation: "आपके लक्षणों के आधार पर, मैं परामर्श की सलाह देता हूँ। क्या आप एक बुक करना चाहेंगे?",
                details: "क्या आप अधिक विवरण प्रदान कर सकते हैं?",
                okay: "मैं समझ गया। मुझे इसमें आपकी मदद करने दें।",
                error: "मुझे अपने मेडिकल दिमाग से जुड़ने में समस्या हो रही है। कृपया पुनः प्रयास करें।",
                sysError: "सिस्टम त्रुटि: मेडबॉट तक पहुँचने में असमर्थ। कृपया अपना इंटरनेट कनेक्शन जाँचें।",
                symptoms: "आपके लक्षणों के आधार पर, मैं जनरल फिजिशियन या न्यूरोलॉजिस्ट से परामर्श की सलाह देता हूँ।",
                heart: "हृदय संबंधी लक्षणों पर ध्यान देने की आवश्यकता है। हमारे पास विशेषज्ञ हृदय रोग विशेषज्ञ उपलब्ध हैं। आपात स्थिति में 102 डायल करें।",
                skin: "त्वचा की समस्याओं के लिए त्वचा विशेषज्ञ सबसे अच्छे होते हैं। हमारे नेटवर्क में विशेषज्ञ उपलब्ध हैं।",
                drugs: {
                    paracetamol: "पैरासिटामोल का उपयोग हल्का से मध्यम दर्द और बुखार के इलाज के लिए किया जाता है।",
                    aspirin: "एस्पिरिन का उपयोग बुखार कम करने और दर्द से राहत के लिए किया जाता है।",
                    general: "मैं पैनाडोल, एस्पिरिन जैसी दवाओं की जानकारी दे सकता हूँ। ध्यान दें: मैं AI सहायक हूँ, डॉक्टर नहीं।"
                },
                analyzeReport: "रिपोर्ट स्कैन हो रही है... [AI विश्लेषण: ब्लड शुगर थोड़ा बढ़ा हुआ है]। विशेषज्ञ को दिखाने की सलाह दी जाती है।",
                help: "मेडिकल मोड में, मैं:\n1. विशेषज्ञों का सुझाव दे सकता हूँ।\n2. दवाओं की व्याख्या कर सकता हूँ।\n3. रिपोर्ट का विश्लेषण कर सकता हूँ।",
                medicalFallback: "मैं 'मेडिकल एक्सपर्ट मोड' में हूँ। लक्षण, दवाओं या रिपोर्ट के बारे में पूछें।",
                personal: {
                    bookingHow: "अपॉइंटमेंट बुक करने के लिए:\n1. 'डैशबोर्ड' पर जाएँ\n2. 'अपॉइंटमेंट बुक करें' पर क्लिक करें\n3. डॉक्टर और समय चुनें।",
                    appointmentInfo: "आपकी डॉ. ${doctor} के साथ ${date} को ${time} बजे मुलाकात है। स्थिति: ${status}।",
                    appointmentNone: "आने वाली कोई मुलाकात नहीं मिली। आप डैशबोर्ड से बुक कर सकते हैं।",
                    medicationInfo: "आपकी वर्तमान दवा ${name} (${dosage}) है।\nनिर्देश: ${instruction}\nसमय: ${time}",
                    medicationNone: "कोई सक्रिय दवा नहीं मिली। प्रोफ़ाइल में जोड़ें।",
                    healthSummary: "स्वास्थ्य सारांश:\n💓 नब्ज: ${hr} BPM\n👣 कदम: ${steps}\n🩸 बीपी: ${bp}\n🌙 नींद: ${sleep}",
                    doctorsInfo: "हमारे नेटवर्क में ${count} विशेषज्ञ हैं। सूची 'अपॉइंटमेंट बुक करें' में देखें।",
                    fallback: "मैं समझ नहीं पाया। 'मुलाकात', 'दवा' या 'स्वास्थ्य' के बारे में पूछें।",
                    thanks: "आपका स्वागत है! कुछ और चाहिए तो बताएँ।"
                }
            }
        },
        booking: { title: "अपॉइंटमेंट बुक करें", steps: { details: "विवरण", doc: "डॉक्टर", time: "समय" }, labels: { date: "तारीख", dateSub: "अपॉइंटमेंट की तारीख चुनें", spec: "विशेषज्ञ", specSub: "अपना डॉक्टर चुनें", time: "टाइम स्लॉट", timeSub: "अपना पसंदीदा समय चुनें", location: "स्थान" }, times: { morning: "सुबह", afternoon: "दोपहर", evening: "शाम", night: "रात" }, confirm: "अपॉइंटमेंट की पुष्टि करें", confirming: "पुष्टि हो रही है...", reserved: "आपका स्लॉट सुरक्षित कर लिया जाएगा", toast: { selectDoc: "कृपया एक डॉक्टर चुनें", selectTime: "कृपया एक टाइम स्लॉट चुनें", failed: "बुकिंग विफल रही" } },
        confirm: { placed: "अपॉइंटमेंट की पुष्टि हो गई", subtitle: "आपका अपॉइंटमेंट सफलतापूर्वक बुक कर लिया गया है।", details: "अपॉइंटमेंट विवरण", addCalendar: "कैलेंडर में जोड़ें", viewHistory: "सभी अपॉइंटमेंट देखें" },
        newRecord: { title: "नया रिकॉर्ड", edit: "रिकॉर्ड संपादित करें", labels: { title: "शीर्षक", attachments: "संलग्नक (वैकल्पिक)", description: "विवरण (वैकल्पिक)", category: "श्रेणी" }, placeholders: { title: "जैसे, ब्लड टेस्ट रिपोर्ट", description: "विवरण जोड़ें...", search: "रिकॉर्ड खोजें..." }, actions: { camera: "कैमरा", gallery: "गैलरी", files: "फ़ाइलें" }, attached: "दस्तावेज़ संलग्न है", saving: "सहेज रहा है...", updating: "अपडेट कर रहा है...", saved: "रिकॉर्ड जुड़ गया!", updated: "रिकॉर्ड अपडेट हो गया!", uploadSec: "अपने रिकॉर्ड सुरक्षित रूप से अपलोड करें", error: { titleReq: "शीर्षक आवश्यक है", camDeny: "कैमरा अनुमति अस्वीकृत", pickErr: "दस्तावेज़ चुनने में त्रुटि", saveErr: "रिकॉर्ड सहेजने में विफल" } },
        history: { title: "पुरानी मुलाकातें", noRecords: "अभी कोई रिकॉर्ड नहीं है", noRecordsDesc: "आपके पुराने चेकअप यहाँ दिखाई देंगे।", filter: "फ़िल्टर", retry: "पुनः प्रयास करें", loadErr: "इतिहास लोड करने में विफल" },
        scanner: { heartRate: "पल्स स्कैनर", bp: "बीपी स्कैनर", permission: { title: "कैमरा एक्सेस आवश्यक", desc: "आपकी ${type} का विश्लेषण करने के लिए, हम आपकी उंगली में रक्त प्रवाह की विविधताओं का पता लगाने के लिए कैमरे और फ्लैश का उपयोग करते हैं।", grant: "कैमरा सक्षम करें", denied: "स्कैन करने के लिए कृपया कैमरा एक्सेस सक्षम करें।" }, instruction: "अपनी उंगली कैमरे के लेंस पर रखें", steady: "अपनी उंगली स्थिर रखें...", analysis: "विश्लेषण पूर्ण", update: "डैशबोर्ड अपडेट करें", scanAgain: "दोबारा स्कैन करें", disclaimer: "डिस्क्लेमर: चिकित्सा उपयोग के लिए नहीं। यह शैक्षिक उद्देश्यों के लिए एक तकनीकी प्रदर्शन है।" },
        notifications: { title: "सूचनाएं", markRead: "सभी को पढ़ा हुआ चिह्नित करें", empty: "सब कुछ अप-टू-डेट है!", emptyDesc: "आपके पास कोई नई सूचना नहीं है।" },
        help: { title: "सहायता और समर्थन", faq: "सामान्य प्रश्न", faqSub: "नीचे सामान्य चिकित्सा पोर्टल प्रश्नों के समाधान खोजें।", contact: "अभी भी सहायता चाहिए? हमसे संपर्क करें", emailUs: "concierge@medpoint.com", questions: { q1: "मैं अपॉइंटमेंट कैसे शेड्यूल करूं?", a1: "होम या अपॉइंटमेंट टैब पर जाएं और 'नया शेड्यूल करें' पर टैप करें। पुष्टि करने के लिए अपने पसंदीदा डॉक्टर, तिथि और टाइम स्लॉट का चयन करें।", q2: "क्या मैं अपने मेडिकल रिकॉर्ड देख सकता हूं?", a2: "हाँ, आप 'रिकॉर्ड' टैब में अपनी मेडिकल रिपोर्ट अपलोड और देख सकते हैं। सभी डेटा एन्क्रिप्टेड और सुरक्षित है।", q3: "मैं अपने डॉक्टर से कैसे संपर्क करूं?", a3: "अपॉइंटमेंट बुक करने के बाद, डॉक्टर के संपर्क विवरण अपॉइंटमेंट विवरण स्क्रीन में उपलब्ध होंगे।", q4: "अगर मुझे रद्द करने की आवश्यकता हो तो क्या होगा?", a4: "आप निर्धारित समय से 24 घंटे पहले तक अपॉइंटमेंट टैब से किसी भी आगामी अपॉइंटमेंट को रद्द कर सकते हैं।", q5: "क्या मेरा डेटा सुरक्षित है?", a5: "हम आपकी चिकित्सा इतिहास को निजी रखने के लिए अस्पताल-ग्रेड एन्क्रिप्शन और सुरक्षित निजी स्टोरेज का उपयोग करते हैं।" } }
    },
    zh: {
        common: { save: "保存更改", cancel: "取消", loading: "加载中...", success: "成功", error: "错误", comingSoon: "即将推出！", back: "返回", next: "下一步", delete: "删除", edit: "编辑", retry: "重试", searching: "搜索中...", noResults: "未找到结果", notSet: "未设置" },
        auth: {
            welcomeBack: "欢迎回来", signInDesc: "登录以访问您的医疗仪表板。", email: "电子邮件地址", password: "密码", forgotPassword: "忘记密码？", signInBtn: "登录", signingIn: "登录中...", newHere: "新用户？ ", createAccount: "创建账号",
            createAccountTitle: "创建账号", joinCommunity: "立即加入医疗社区。", fullName: "全名", signUpBtn: "注册", creatingAccount: "正在创建账号...", alreadyHaveAccount: "已有账号？ ", loginLink: "登录",
            forgotPasswordTitle: "重置密码", forgotPasswordSub: "输入您的电子邮件以接收验证码。", sendResetCode: "发送重置码", sending: "发送中...", backToLogin: "返回登录",
            verificationTitle: "验证", verificationSub: "输入发送至的6位验证码 ", verificationCode: "验证码", verifyCode: "验证代码", verifying: "验证中...", resendCode: "重新发送验证码",
            newPasswordTitle: "新密码", newPasswordSub: "创建一个强密码以保护您的账户。", newPassword: "新密码", confirmPassword: "确认密码", updatePassword: "更新密码", updating: "更新中...",
            fillFields: "请填写所有字段", passwordsNotMatch: "密码不匹配"
        },
        welcome: { titlePart1: "您的健康,", titlePart2: "尽在掌握", subtitle: "管理预约和医疗记录的最简单方法。", getStarted: "开始使用" },
        tabs: { home: "首页", visits: "门诊", records: "病例", profile: "个人" },
        dashboard: { welcome: "欢迎回来,", healthStats: "您的健康统计", upcoming: "下次预约", viewAll: "查看全部", searchDoctor: "寻找医生...", consultation: "智能助手 AI", bookVisit: "预约挂号", findDoctor: "寻找医生", myRecords: "我的病例", steps: "步数", sleep: "睡眠", water: "饮水", bpm: "心率", noAppointments: "暂无预约", bookFirstVisit: "预约您的第一次专家门诊", history: "历史记录", bookNow: "立即预约", nextVisit: "下次门诊", allVisits: "全部门诊", dailyMedication: "每日用药", nextDose: "下一次剂量", done: "完成" },
        profile: { title: "个人资料与设置", personalInfo: "个人信息", appPreferences: "应用偏好", fullName: "姓名", email: "电子邮件", phone: "电话号码", address: "地址", about: "关于", patientId: "患者 ID", helpSupport: "帮助与支持", language: "语言", logout: "退出登录", editProfile: "编辑资料", backToProfile: "返回资料", updateProfileSub: "更新您的个人资料", patientIdLabel: "患者 ID", phonePlaceholder: "+86 130 0000 0000", addressPlaceholder: "城市, 国家", aboutPlaceholder: "向我们介绍一下您自己..." },
        language: { title: "选择语言", description: "选择您偏好的语言以自定义应用体验。", footer: "应用将重新启动以应用从右至左语言的更改。" },
        records: { title: "医疗病例", searchPlaceholder: "搜索病例...", all: "全部", labReport: "化验单", prescription: "处方", xray: "X光", scan: "扫描", other: "其他", noRecords: "未找到病例", noRecordsDesc: "安全地上传您的医疗病例。", deleteTitle: "删除病例", deleteConfirm: "您确定要删除此病例吗？", deleted: "病例已删除", attached: "已附件" },
        appointments: { title: "预约门诊", upcoming: "即将到来", past: "历史记录", new: "新建", noUpcoming: "没有即将到来的预约", noPast: "没有历史预约记录", cancel: "取消", reschedule: "重新预约", cancelConfirmTitle: "取消预约", cancelConfirmDesc: "您确定要取消此预约吗？", cancelled: "预约已取消", status: { confirmed: "已确认", pending: "进行中", cancelled: "已取消", completed: "已完成" } },
        medbot: {
            title: "MedBot AI", greeting: "您好 ${user}！我是 MedBot，您的智能健康助手。今天我能为您做些什么？", thinking: "MedBot 正在思考...", askAnything: "问我任何问题...", chips: { nextAppt: "下次预约", medInfo: "药物信息", symptoms: "检查症状" }, initialMsg: "我可以帮您处理预约、医疗记录或基础健康信息。", modes: { personal: "个人模式", medical: "智能专家", switched: "已切换到${mode}模式" },
            responses: {
                consultation: "根据您的症状，我建议您进行咨询。您想预约一个吗？",
                details: "您能提供更多细节吗？",
                okay: "我明白了。让我来帮您处理。",
                error: "连接医疗大脑出错。请再试一次。",
                sysError: "系统错误：无法连接 MedBot。请检查网络。",
                symptoms: "根据症状，建议咨询全科医生或神经内科医生。您可以在“预约挂号”中找到专家。",
                heart: "心脏症状需要关注。我们有资深心脏病专家。如果是紧急情况，请立即拨打 120。",
                skin: "皮肤问题建议咨询皮肤科医生。我们网络中有专家可以提供帮助。",
                drugs: {
                    paracetamol: "扑热息痛用于治疗轻至中度疼痛（如头痛、牙痛）并退烧。",
                    aspirin: "阿司匹林用于退烧和缓解疼痛，也有助于预防血栓。",
                    general: "我可以提供必理痛、阿司匹林等常见药物信息。注意：我是 AI 助手，非处方。"
                },
                analyzeReport: "正在扫描医疗报告... [AI 分析：血糖略高]。建议咨询内分泌科医生。",
                help: "在专家模式下，我可以：\n1. 根据症状推荐专家。\n2. 解释药物用途。\n3. 分析医疗报告。",
                medicalFallback: "目前处于“专家模式”。您可以询问症状、药物或报告。",
                personal: {
                    bookingHow: "预约新挂号：\n1. 进入“首页”\n2. 点击“预约挂号”\n3. 选择医生和时段。",
                    appointmentInfo: "您预约了 ${doctor} 医生，时间为 ${date} ${time}。状态：${status}。",
                    appointmentNone: "未发现即将进行的预约。您可以从首页预约。",
                    medicationInfo: "您当前的药物是 ${name} (${dosage})。\n用法：${instruction}\n时间：${time}",
                    medicationNone: "个人资料中未发现活动药物。您可以在个人中心添加。",
                    healthSummary: "健康摘要：\n💓 心率：${hr} BPM\n👣 步数：${steps}\n🩸 血压：${bp}\n🌙 睡眠：${sleep}",
                    doctorsInfo: "我们网络中目前有 ${count} 位专家。可在“预约挂号”中查看。",
                    fallback: "没听懂。您可以询问“预约”、“用药”或“健康状态”。",
                    thanks: "不客气！如有需要随时找我。"
                }
            }
        },
        booking: { title: "预约挂号", steps: { details: "详情", doc: "医生", time: "时间" }, labels: { date: "日期", dateSub: "选择预约日期", spec: "专家", specSub: "选择您的医生", time: "时间段", timeSub: "选择您偏好的时间", location: "位置" }, times: { morning: "上午", afternoon: "下午", evening: "晚上", night: "夜间" }, confirm: "确认预约", confirming: "确认中...", reserved: "您的时段将被保留", toast: { selectDoc: "请选择医生", selectTime: "请选择时间段", failed: "预约失败" } },
        confirm: { placed: "预约已确认", subtitle: "您的预约已成功预订。", details: "预约详情", addCalendar: "添加到日历", viewHistory: "查看所有预约" },
        newRecord: { title: "新建记录", edit: "编辑记录", labels: { title: "标题", attachments: "附件 (可选)", description: "描述 (可选)", category: "类别" }, placeholders: { title: "例如：验血结果", description: "添加详细信息...", search: "搜索记录..." }, actions: { camera: "相机", gallery: "相册", files: "文件" }, attached: "已附件文档", saving: "保存中...", updating: "更新中...", saved: "记录已添加！", updated: "记录已更新！", uploadSec: "安全地上传您的记录", error: { titleReq: "标题是必填项", camDeny: "相机权限被拒绝", pickErr: "选取文档出错", saveErr: "保存记录失败" } },
        history: { title: "历史门诊", noRecords: "暂无记录", noRecordsDesc: "您的历史检查记录将显示在这里。", filter: "筛选", retry: "重试", loadErr: "加载历史记录失败" },
        scanner: { heartRate: "心率扫描", bp: "血压扫描", permission: { title: "需要相机权限", desc: "为了分析您的 ${type}，我们使用相机和闪光灯探测指尖血流变化。", grant: "开启相机", denied: "请开启相机权限进行扫描。" }, instruction: "请将手指放在相机镜头上", steady: "请保持手指稳定...", analysis: "分析完成", update: "更新仪表板", scanAgain: "重新扫描", disclaimer: "免责声明：不用于医疗用途。这仅是一个用于教育目的的技术演示。" },
        notifications: { title: "通知中心", markRead: "全部标记为已读", empty: "全部读完了！", emptyDesc: "您没有新的通知。" },
        help: { title: "帮助与支持", faq: "常见问题", faqSub: "请在下方查找医疗门户常见问题的解决方案。", contact: "仍需要支持？联系我们：", emailUs: "concierge@medpoint.com", questions: { q1: "我该如何预约？", a1: "前往首页或预约选项卡，点击“新建预约”。选择您偏好的医生、日期和时间段以确认。", q2: "我可以查看我的医疗记录吗？", a2: "是的，您可以在“病例”选项卡中上传和查看您的医疗报告。所有数据均已加密且安全。", q3: "我该如何联系我的医生？", a3: "预约成功后，医生的联系详情将在预约详情屏幕中显示。", q4: "如果我需要取消预约怎么办？", a4: "您可以在预定时间前 24 小时内通过“预约”选项卡取消任何即将进行的预约。", q5: "我的数据安全吗？", a5: "我们使用医院级加密和安全的私有存储，以确保您的医疗史保持私密。" } }
    }
};
