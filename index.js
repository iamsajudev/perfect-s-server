
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/api/home", require("./api/home.route"));
app.use("/api/about", require("./api/about.route"));
app.use("/api/privacy", require("./api/privacy.route"));
app.use("/api/terms", require("./api/terms.route"));

app.use("/api/projects", require("./api/projects.route"));
app.use("/api/experience", require("./api/experience.route"));
app.use("/api/blogs", require("./api/blogs.route"));
app.use("/api/skills", require("./api/skills.route"));
app.use("/api/contacts", require("./api/contact.route"));

module.exports = app;
