// src/components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";


const LoginForm = () => {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login Successful!");
        navigate("/dashboard"); // Redirect to Dashboard or Home
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="tel" placeholder="Phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
