const r = require("express").Router();
const c = require("../controllers/single.controller");
r.get("/", c.getPrivacy);
r.post("/", c.upsertPrivacy);
r.put("/", c.upsertPrivacy);
module.exports = r;
