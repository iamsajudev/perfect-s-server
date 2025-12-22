require("dotenv").config();
const app = require("./index");
const connectDB = require("./utils/db"); // Use your cached connection

const PORT = process.env.PORT || 3000;

// Connect to MongoDB using your cached connection
connectDB()
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    
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
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });