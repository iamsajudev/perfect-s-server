const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    // Basic Info
    title: { 
      type: String, 
      required: true 
    },
    company: { 
      type: String, 
      required: true 
    },
    location: String,
    
    // Dates
    startDate: { 
      type: Date, 
      required: true 
    },
    endDate: Date,
    current: { 
      type: Boolean, 
      default: false 
    },
    
    // Type
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
      default: 'Full-time'
    },
    
    // Description
    summary: String,
    description: { 
      type: String, 
      required: true 
    },
    
    // Responsibilities
    responsibilities: [String],
    achievements: [String],
    
    // Technologies
    technologies: [String],
    tools: [String],
    
    // Company Info
    companyLogo: String,
    companyUrl: String,
    industry: String,
    
    // Skills Gained
    skills: [String],
    
    // References
    supervisor: String,
    supervisorContact: String,
    
    // Verification
    verified: { type: Boolean, default: false },
    certificateUrl: String,
    
    // Visibility
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);