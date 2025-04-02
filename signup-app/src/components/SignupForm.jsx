import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ⬅️ Hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup Successful! Redirecting to Login...");
        navigate("/login"); // ⬅️ Redirect to Login
      } else {
        setError(data.message || "Error signing up");
      }
    } catch (error) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
      <input type="tel" placeholder="Phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
      <button type="submit">Signup</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignupForm;
