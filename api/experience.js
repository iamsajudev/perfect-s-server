const r = require("express").Router();
const c = require("../controllers/multi.controller");
r.get("/", c.getAll("Experience"));
r.post("/", c.create("Experience"));
module.exports = r;
