const express = require("express");
const connectDB = require("./utils/db"); // cached connection
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (cached for serverless)
connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// Root route for quick info
app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 Portfolio Serverless API</h1>
    <p>Welcome! This server is running successfully.</p>
    <p>🌐 Base API URL: <strong>/api</strong></p>
    <h2>Available API endpoints:</h2>
    <ul>
      <li>GET /api/home</li>
      <li>POST /api/home</li>
      <li>GET /api/about</li>
      <li>POST /api/about</li>
      <li>GET /api/privacy</li>
      <li>POST /api/privacy</li>
      <li>GET /api/terms</li>
      <li>POST /api/terms</li>
      <li>GET /api/projects</li>
      <li>POST /api/projects</li>
      <li>GET /api/experience</li>
      <li>POST /api/experience</li>
      <li>GET /api/blogs</li>
      <li>POST /api/blogs</li>
      <li>GET /api/skills</li>
      <li>POST /api/skills</li>
      <li>GET /api/contacts</li>
      <li>POST /api/contacts</li>
    </ul>
    <p>📌 Use Postman or your frontend to test these endpoints.</p>
  `);
});

// Single-document routes
app.use("/api/home", require("./api/home.route"));
app.use("/api/about", require("./api/about.route"));
app.use("/api/privacy", require("./api/privacy.route"));
app.use("/api/terms", require("./api/terms.route"));

// Multi-document routes
app.use("/api/projects", require("./api/projects.route"));
app.use("/api/experience", require("./api/experience.route"));
app.use("/api/blogs", require("./api/blogs.route"));
app.use("/api/skills", require("./api/skills.route"));
app.use("/api/contacts", require("./api/contact.route"));

// Health route (optional)
app.get("/api", (_, res) => {
  res.json({
    message: "API is running",
    endpoints: [
      "/home",
      "/about",
      "/privacy",
      "/terms",
      "/projects",
      "/experience",
      "/blogs",
      "/skills",
      "/contacts",
    ],
  });
});

module.exports = app; // Export for Vercel serverless
