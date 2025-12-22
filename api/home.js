const express = require("express");
const router = express.Router();
const c = require("../controllers/single.controller");
const connectDB = require("../utils/db");

// Add DB connection middleware
router.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('DB connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

router.get("/", c.getHome);
router.post("/", c.upsertHome);
router.put("/", c.upsertHome);

// Export the router directly
module.exports = router;