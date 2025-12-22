const express = require("express");
const router = express.Router();
const c = require("../controllers/multi.controller");
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

router.get("/", c.getAllExperience);
router.post("/", c.createExperience);
router.get("/:id", c.getExperience);
router.put("/:id", c.updateExperience);
router.delete("/:id", c.deleteExperience);

module.exports = router;