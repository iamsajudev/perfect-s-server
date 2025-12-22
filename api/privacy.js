const express = require("express");
const router = express.Router();
const c = require("../controllers/single.controller");
const connectDB = require("../utils/db");

router.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('DB connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

router.get("/", c.getPrivacy);
router.post("/", c.upsertPrivacy);
router.put("/", c.upsertPrivacy);

module.exports = router;