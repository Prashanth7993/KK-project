import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "../components/SignupForm.css"; // Ensure CSS is linked

const SignupForm = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmResult, setConfirmResult] = useState(null);
    const [otpVerified, setOtpVerified] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const sendOtp = async () => {
        setError("");

        if (!username) {
            setError("Please enter a username.");
            return;
        }

        if (!phoneNumber.match(/^\+?\d{10,15}$/)) {
            setError("Invalid phone number format!");
            return;
        }

        setLoading(true);

        try {
            // Simulating OTP sending
            setConfirmResult(true); // Normally, this would be an API call response
            console.log("✅ OTP Sent Successfully!");
        } catch (err) {
            setError("Failed to send OTP: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        if (!otp) {
            setError("Enter the OTP received.");
            return;
        }

        try {
            // Simulating OTP verification
            if (otp === "123478") { // Replace with real OTP check
                console.log("✅ OTP Verified!");
                setOtpVerified(true);
            } else {
                throw new Error("Invalid OTP");
            }
        } catch (err) {
            setError("Invalid OTP. Please try again.");
        }
    };

    const handleSignup = async () => {
        setError("");

        if (password !== confirmPassword) {
            setError("Password and Confirm Password must match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/register", {
                name: username,
                phone: phoneNumber,
                password: password,
                confirmPassword: confirmPassword
            });

            console.log(response.data.message);
            alert("✅ Signup successful! Redirecting to login...");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Try again.");
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>

            <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={otpVerified} />
            <input type="tel" placeholder="Enter Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={otpVerified} />

            {confirmResult && !otpVerified && (
                <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            )}

            <div className="button-container">
                {!otpVerified && <button onClick={sendOtp} className="send-otp-button" disabled={loading}>{loading ? "Sending OTP..." : "Send OTP"}</button>}
                {confirmResult && !otpVerified && <button onClick={verifyOtp} className="verify-otp-button">Verify OTP</button>}
            </div>

            {otpVerified && (
                <>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <div className="button-container">
                        <button onClick={handleSignup} className="signup-final-button">Signup</button>
                    </div>
                </>
            )}

            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default SignupForm;
