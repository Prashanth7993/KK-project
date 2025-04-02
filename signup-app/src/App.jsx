import React from "react";  // Ensure React is imported
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
