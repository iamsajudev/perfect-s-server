const Project = require("../models/Project");

exports.getAll = async (_, res) => res.json(await Project.find());
exports.create = async (req, res) =>
  res.status(201).json(await Project.create(req.body));
exports.remove = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
