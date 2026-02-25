require("dotenv").config(); // Load .env secrets

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const adminRoutes = require("./routes/admin");

const app = express();

// Parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session config
app.use(session({
  secret: process.env.SESSION_SECRET || "quizsecret",
  resave: false,
  saveUninitialized: true
}));

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", authRoutes);
app.use("/api", quizRoutes);
app.use("/api", adminRoutes);

// Redirect /register to register.html
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

// Redirect /login to login.html (optional)
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

// Start server (works locally + deployment)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});