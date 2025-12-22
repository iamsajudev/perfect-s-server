const r = require("express").Router();
const c = require("../controllers/single.controller");
r.get("/", c.getAbout);
r.post("/", c.upsertAbout);
r.put("/", c.upsertAbout);
module.exports = r;
