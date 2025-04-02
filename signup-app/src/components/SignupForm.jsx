import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./SignupForm.css"; // Import CSS

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Validation: All fields required & passwords must match
    if (!formData.name || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError("All fields are mandatory!");
      return;
    }

    if (formData.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setShowPopup(true); // ✅ Show popup

        // ✅ Auto-redirect after 2 seconds
        setTimeout(() => {
          setShowPopup(false);
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Error signing up");
      }
    } catch (error) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <input type="tel" placeholder="Phone (10 digits)" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <input type="password" placeholder="Confirm Password" onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required />

        {/* ✅ Buttons placed side by side */}
        <div className="button-container">
          <button type="submit" className="signup-button">Signup</button>
          <button type="button" className="login-button" onClick={() => navigate("/login")}>Login</button>
        </div>

        {/* ✅ Error message below buttons */}
        {error && <div className="error-message">{error}</div>}
      </form>

      {/* ✅ Animated Popup Overlay */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>
            <p>Signup Successful!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
