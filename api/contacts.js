const r = require("express").Router();
const c = require("../controllers/multi.controller");
r.get("/", c.getAll("Contact"));
r.post("/", c.create("Contact"));
module.exports = r;
