// api/home.js
const express = require("express");
const router = express.Router();
const c = require("../controllers/single.controller");
const connectDB = require("../utils/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads/images");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'hero-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter
});

// DB connection middleware
router.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('DB connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Routes
router.get("/", c.getHome);

// Handle both JSON and multipart requests
router.post("/", (req, res, next) => {
  const contentType = req.headers['content-type'] || '';

  if (contentType.includes('multipart/form-data')) {
    // Handle file upload
    upload.single('heroImage')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      c.upsertHome(req, res, next);
    });
  } else {
    // Handle JSON request
    c.upsertHome(req, res, next);
  }
});

router.put("/", (req, res, next) => {
  const contentType = req.headers['content-type'] || '';

  if (contentType.includes('multipart/form-data')) {
    upload.single('heroImage')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      c.upsertHome(req, res, next);
    });
  } else {
    c.upsertHome(req, res, next);
  }
});

module.exports = router;