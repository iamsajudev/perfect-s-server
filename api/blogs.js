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

router.get("/", c.getAllBlogs);
router.post("/", c.createBlog);
router.get("/:id", c.getBlog);
router.put("/:id", c.updateBlog);
router.delete("/:id", c.deleteBlog);

module.exports = router;