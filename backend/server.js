const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tiger",  // Use your MySQL password
    database: "signup_db"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database.");
});

// ✅ Signup Route with Confirm Password Check
app.post("/register", (req, res) => {
    const { name, phone, password, confirmPassword } = req.body;

    console.log("Received Data:", req.body); // ✅ Log request data for debugging

    // ✅ Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    const checkUserQuery = "SELECT * FROM users WHERE phone = ?";
    db.query(checkUserQuery, [phone], (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "User already exists. Please sign in." });
        }

        const sql = "INSERT INTO users (name, phone, password) VALUES (?, ?, ?)";
        db.query(sql, [name, phone, password], (err, result) => {
            if (err) {
                console.error("Insert Error:", err);
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "User registered successfully" });
        });
    });
});

// ✅ Login Route
app.post("/login", (req, res) => {
    const { phone, password } = req.body;

    console.log("Login Attempt:", req.body); // ✅ Log login request for debugging

    const sql = "SELECT * FROM users WHERE phone = ? AND password = ?";
    db.query(sql, [phone, password], (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length > 0) {
            res.json({ message: "Login successful", user: results[0] });
        } else {
            res.status(401).json({ message: "Invalid phone number or password" });
        }
    });
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
