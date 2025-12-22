const Project = require("../models/Project");
const Experience = require("../models/Experience");
const Blog = require("../models/Blog");
const Skill = require("../models/Skill");
const Contact = require("../models/Contact");

// Enhanced CRUD handler with search, filter, pagination
const handleCRUD = (Model) => ({
  // GET all with filtering, searching, pagination
  getAll: async (req, res) => {
    try {
      const { page = 1, limit = 10, search = "", sort = "-createdAt", ...filters } = req.query;
      
      // Build query
      let query = Model.find();
      
      // Search functionality
      if (search) {
        const searchFields = Model.schema.paths;
        const searchableFields = Object.keys(searchFields).filter(field => 
          searchFields[field].instance === 'String'
        );
        
        if (searchableFields.length > 0) {
          const searchConditions = searchableFields.map(field => ({
            [field]: { $regex: search, $options: 'i' }
          }));
          query = query.or(searchConditions);
        }
      }
      
      // Filtering
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          query = query.where(key).equals(filters[key]);
        }
      });
      
      // Sorting
      query = query.sort(sort);
      
      // Pagination
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(parseInt(limit));
      
      const data = await query.exec();
      const total = await Model.countDocuments(query.getFilter());
      
      res.json({
        success: true,
        data,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  },

  // GET single
  getOne: async (req, res) => {
    try {
      const data = await Model.findById(req.params.id);
      if (!data) return res.status(404).json({ error: "Not found" });
      res.json({ success: true, data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  },

  // CREATE
  create: async (req, res) => {
    try {
      const data = await Model.create(req.body);
      res.status(201).json({ 
        success: true, 
        message: "Created successfully", 
        data 
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  },

  // UPDATE
  update: async (req, res) => {
    try {
      const data = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!data) return res.status(404).json({ error: "Not found" });
      res.json({ 
        success: true, 
        message: "Updated successfully", 
        data 
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  },

  // DELETE
  remove: async (req, res) => {
    try {
      const data = await Model.findByIdAndDelete(req.params.id);
      if (!data) return res.status(404).json({ error: "Not found" });
      res.json({ 
        success: true, 
        message: "Deleted successfully" 
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  },

  // BULK DELETE
  bulkDelete: async (req, res) => {
    try {
      const { ids } = req.body;
      if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ error: "IDs array required" });
      }
      
      const result = await Model.deleteMany({ _id: { $in: ids } });
      res.json({ 
        success: true, 
        message: `${result.deletedCount} items deleted` 
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  },

  // GET STATS (e.g., count by category)
  getStats: async (req, res) => {
    try {
      const stats = await Model.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        }
      ]);
      res.json({ success: true, stats });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
});

// Create handlers for each model
const projectHandler = handleCRUD(Project);
const experienceHandler = handleCRUD(Experience);
const blogHandler = handleCRUD(Blog);
const skillHandler = handleCRUD(Skill);
const contactHandler = handleCRUD(Contact);

// Export all methods
module.exports = {
  // Projects
  getAllProjects: projectHandler.getAll,
  getProject: projectHandler.getOne,
  createProject: projectHandler.create,
  updateProject: projectHandler.update,
  deleteProject: projectHandler.remove,
  bulkDeleteProjects: projectHandler.bulkDelete,
  getProjectStats: projectHandler.getStats,
  
  // Experience
  getAllExperience: experienceHandler.getAll,
  getExperience: experienceHandler.getOne,
  createExperience: experienceHandler.create,
  updateExperience: experienceHandler.update,
  deleteExperience: experienceHandler.remove,
  bulkDeleteExperience: experienceHandler.bulkDelete,
  getExperienceStats: experienceHandler.getStats,
  
  // Blogs
  getAllBlogs: blogHandler.getAll,
  getBlog: blogHandler.getOne,
  createBlog: blogHandler.create,
  updateBlog: blogHandler.update,
  deleteBlog: blogHandler.remove,
  bulkDeleteBlogs: blogHandler.bulkDelete,
  getBlogStats: blogHandler.getStats,
  
  // Skills
  getAllSkills: skillHandler.getAll,
  getSkill: skillHandler.getOne,
  createSkill: skillHandler.create,
  updateSkill: skillHandler.update,
  deleteSkill: skillHandler.remove,
  bulkDeleteSkills: skillHandler.bulkDelete,
  getSkillStats: skillHandler.getStats,
  
  // Contacts
  getAllContacts: contactHandler.getAll,
  getContact: contactHandler.getOne,
  createContact: contactHandler.create,
  updateContact: contactHandler.update,
  deleteContact: contactHandler.remove,
  bulkDeleteContacts: contactHandler.bulkDelete,
  getContactStats: contactHandler.getStats,
};