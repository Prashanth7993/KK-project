import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/verify-otp", { phone, otp });
      if (response.data.success) {
        navigate("/success");
      } else {
        setError("Invalid OTP, try again.");
      }
    } catch (error) {
      setError("Error verifying OTP");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" required />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default OTPVerification;
