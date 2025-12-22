const r = require("express").Router();
const c = require("../controllers/multi.controller");
r.get("/", c.getAll("Blog"));
r.post("/", c.create("Blog"));
module.exports = r;
