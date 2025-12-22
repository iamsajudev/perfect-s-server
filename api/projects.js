const express = require("express");
const router = express.Router();
const c = require("../controllers/multi.controller");
const connectDB = require("../utils/db");

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
router.get("/", c.getAllProjects);
router.get("/stats", c.getProjectStats);
router.post("/", c.createProject);
router.get("/:id", c.getProject);
router.put("/:id", c.updateProject);
router.delete("/:id", c.deleteProject);
router.delete("/", c.bulkDeleteProjects);

module.exports = router;