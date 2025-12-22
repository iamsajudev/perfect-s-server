const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    // Basic Info
    name: { 
      type: String, 
      required: true,
      unique: true 
    },
    displayName: String,
    
    // Categorization
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Design', 'Mobile', 'Other'],
      required: true
    },
    subcategory: String,
    
    // Proficiency
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate'
    },
    percentage: { 
      type: Number, 
      min: 0, 
      max: 100,
      default: 70 
    },
    
    // Experience
    yearsOfExperience: Number,
    startedYear: Number,
    
    // Details
    description: String,
    icon: String,
    color: String,
    iconType: {
      type: String,
      enum: ['iconify', 'fontawesome', 'custom'],
      default: 'iconify'
    },
    
    // Projects
    projectsCount: { type: Number, default: 0 },
    featuredProjects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }],
    
    // Certifications
    certifications: [{
      name: String,
      issuer: String,
      year: Number
    }],
    
    // Priority & Order
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    priority: { 
      type: Number, 
      min: 1, 
      max: 10,
      default: 5 
    },
    
    // Last Used
    lastUsed: Date,
    currentlyUsing: { type: Boolean, default: true },
    
    // Resources
    documentationUrl: String,
    tutorials: [{
      title: String,
      url: String
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);