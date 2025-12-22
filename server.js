const app = require("./index");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1); // exit if DB fails
});

// Start Express server
app.listen(PORT, () => {
  console.log("====================================");
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log("🌐 Available API routes:");
  console.log("  GET    /api/home");
  console.log("  POST   /api/home");
  console.log("  GET    /api/about");
  console.log("  POST   /api/about");
  console.log("  GET    /api/privacy");
  console.log("  POST   /api/privacy");
  console.log("  GET    /api/terms");
  console.log("  POST   /api/terms");
  console.log("  GET    /api/projects");
  console.log("  POST   /api/projects");
  console.log("  GET    /api/experience");
  console.log("  POST   /api/experience");
  console.log("  GET    /api/blogs");
  console.log("  POST   /api/blogs");
  console.log("  GET    /api/skills");
  console.log("  POST   /api/skills");
  console.log("  GET    /api/contacts");
  console.log("  POST   /api/contacts");
  console.log("====================================");
});
