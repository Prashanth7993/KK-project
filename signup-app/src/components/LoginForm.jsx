import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./LoginForm.css"; // Import CSS for styling

const LoginForm = () => {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.phone || !formData.password) {
      setError("All fields are mandatory!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setLoginSuccess(true); // Show success popup

        // Redirect after 2.5s
        setTimeout(() => {
          navigate("/dashboard");
        }, 2500);
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <>
      {/* ✅ Popup Overlay for Login Success */}
      {loginSuccess && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>
            Login Successful!
            <br />
            Redirecting to Dashboard
            <span className="dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </div>
        </div>
      )}

      <div className="login-container">
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <input type="tel" placeholder="Phone (10 digits)" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
          <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />

          {/* ✅ Buttons placed side by side */}
          <div className="button-container">
            <button type="submit" className="login-button">Login</button>
            <button type="button" className="signup-button" onClick={() => navigate("/signup")}>Signup</button>
          </div>

          {/* ✅ Error message below buttons */}
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </>
  );
};

export default LoginForm;
