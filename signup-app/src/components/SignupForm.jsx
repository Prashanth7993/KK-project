import React, { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../components/SignupForm.css"; // Ensure CSS is linked

const SignupForm = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmResult, setConfirmResult] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "invisible",
                callback: () => {
                    console.log("Recaptcha solved!");
                },
            });
        }
    };

    const sendOtp = async () => {
        setError("");

        if (!phoneNumber.match(/^\+?\d{10,15}$/)) {
            setError("Invalid phone number format!");
            return;
        }

        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;

        try {
            const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setConfirmResult(confirmation);
            console.log("OTP Sent Successfully!");
        } catch (err) {
            setError("Failed to send OTP: " + err.message);
        }
    };

    const verifyOtp = async () => {
        if (!otp) {
            setError("Enter the OTP received.");
            return;
        }

        try {
            await confirmResult.confirm(otp);
            console.log("✅ OTP Verified! Navigating to Login...");
            navigate("/login");
        } catch (err) {
            setError("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <input
                type="tel"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div id="recaptcha-container"></div>

            {confirmResult && (
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
            )}

            <div className="button-container">
                <button onClick={sendOtp} className="send-otp-button">
                    Send OTP
                </button>

                {confirmResult && (
                    <button onClick={verifyOtp} className="verify-otp-button">
                        Verify OTP
                    </button>
                )}
            </div>

            <button onClick={() => navigate("/login")} className="signup-button">
                Already have an account? Login
            </button>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default SignupForm;
