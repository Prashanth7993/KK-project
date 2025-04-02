import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Log the formData before sending to the server
    console.log("Form Data: ", formData);

    // ✅ Ensure passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Server Response: ", data); // ✅ Log response for debugging

      if (response.ok) {
        alert("Signup Successful! Redirecting to Login...");
        navigate("/login");
      } else {
        setError(data.message || "Error signing up");
      }
    } catch (error) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div>
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignupForm;
