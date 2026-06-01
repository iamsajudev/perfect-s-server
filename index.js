const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// DNS FIX - একদম শুরুতে
const dns = require("node:dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]); // Cloudflare DNS

// IMPORTANT: Increase body limit for larger uploads
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for JSON
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // For form data

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure upload directories exist
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
const imagesDir = path.join(__dirname, 'uploads/images');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

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
      <li>PUT /api/home/:id</li>
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

// Import ALL routes dynamically
const routeConfig = [
  { path: '/api/home', file: 'home.js' },
  { path: '/api/about', file: 'about.js' },
  { path: '/api/privacy', file: 'privacy.js' },
  { path: '/api/terms', file: 'terms.js' },
  { path: '/api/projects', file: 'projects.js' },
  { path: '/api/experience', file: 'experience.js' },
  { path: '/api/blogs', file: 'blogs.js' },
  { path: '/api/skills', file: 'skills.js' },
  { path: '/api/contacts', file: 'contacts.js' },
];

// Dynamically load routes with error handling
routeConfig.forEach(route => {
  try {
    const routePath = path.join(__dirname, 'api', route.file);
    if (fs.existsSync(routePath)) {
      const routeHandler = require(routePath);
      app.use(route.path, routeHandler);
      console.log(`✅ Loaded route: ${route.path}`);
    } else {
      console.warn(`⚠️ Route file not found: ${route.file}`);
    }
  } catch (error) {
    console.error(`❌ Error loading route ${route.path}:`, error.message);
  }
});

// Health route
app.get("/api", (_, res) => {
  res.json({
    message: "API is running",
    endpoints: [
      "/api/home",
      "/api/about",
      "/api/privacy",
      "/api/terms",
      "/api/projects",
      "/api/experience",
      "/api/blogs",
      "/api/skills",
      "/api/contacts",
    ],
    timestamp: new Date().toISOString()
  });
});

// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    requested: req.originalUrl,
    available: "/api/[home|about|privacy|terms|projects|experience|blogs|skills|contacts]"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);

  // Handle payload too large error specifically
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      error: "Payload too large",
      message: "The uploaded file or data exceeds the size limit (50MB)",
      limit: "50MB"
    });
  }

  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;