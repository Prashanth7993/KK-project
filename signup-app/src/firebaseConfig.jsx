import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// 🔹 Replace with your Firebase project credentials
const firebaseConfig = {
    apiKey: "AIzaSyBh-gaS_wfYTMDbs5Eed0jqC3e8mJe4F7U",
    authDomain: "otp-auth-project-5db2f.firebaseapp.com",
    projectId: "otp-auth-project-5db2f",
    storageBucket: "otp-auth-project-5db2f.appspot.com", // Fixed typo
    messagingSenderId: "591796428268",
    appId: "1:591796428268:web:05d788e759fe2381bfb4c9"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage(); // Auto-detect language

// ✅ Export named modules correctly
export { auth, RecaptchaVerifier, signInWithPhoneNumber };
