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

router.get("/", c.getAllSkills);
router.post("/", c.createSkill);
router.get("/:id", c.getSkill);
router.put("/:id", c.updateSkill);
router.delete("/:id", c.deleteSkill);

module.exports = router;