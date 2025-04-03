const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // ✅ Import bcrypt
const bodyParser = require("body-parser");

const app = express();
//app.use(cors({ origin: "http://localhost:5173" })); // ✅ Allow frontend requests
app.use(bodyParser.json());
//const cors = require("cors");

app.use(
    cors({
        origin: "http://localhost:5173", // ✅ Allow your frontend origin
        credentials: true, // ✅ Allow credentials (cookies, sessions, etc.)
        methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allow all necessary methods
        allowedHeaders: ["Content-Type", "Authorization"], // ✅ Ensure headers are allowed
    })
);


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
    console.log("✅ Connected to MySQL database.");
});

// ✅ Register User (Hash Password)
app.post("/register", async (req, res) => {
    const { name, phone, password, confirmPassword } = req.body;

    if (!name || !phone || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // ✅ Hash password

    const checkUserQuery = "SELECT * FROM users WHERE phone = ?";
    db.query(checkUserQuery, [phone], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) return res.status(400).json({ message: "User already exists!" });

        const sql = "INSERT INTO users (name, phone, password) VALUES (?, ?, ?)";
        db.query(sql, [name, phone, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "User registered successfully!" });
        });
    });
});

// ✅ Login User (Verify Hashed Password)
app.post("/login", async (req, res) => {
    const { phone, password } = req.body;

    const sql = "SELECT * FROM users WHERE phone = ?";
    db.query(sql, [phone], async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error!" });

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid phone number or password!" });
        }

        const user = results[0];

        // ✅ Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid phone number or password!" });
        }

        res.json({ message: "Login successful", user });
    });
});


// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
