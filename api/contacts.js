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

router.get("/", c.getAllContacts);
router.post("/", c.createContact);
router.get("/:id", c.getContact);
router.put("/:id", c.updateContact);
router.delete("/:id", c.deleteContact);

module.exports = router;