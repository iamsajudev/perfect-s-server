const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    // Basic Info
    title: { 
      type: String, 
      required: true,
      trim: true 
    },
    slug: { 
      type: String, 
      unique: true,
      lowercase: true 
    },
    
    // Description
    shortDescription: { 
      type: String, 
      required: true,
      maxlength: 200 
    },
    description: { 
      type: String, 
      required: true 
    },
    
    // Media
    coverImage: { 
      type: String, 
      required: true 
    },
    images: [String],
    videoUrl: String,
    demoUrl: String,
    githubUrl: String,
    liveUrl: String,
    
    // Details
    client: String,
    company: String,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ['Planning', 'In Progress', 'Completed', 'On Hold'],
      default: 'Completed'
    },
    
    // Categorization
    category: {
      type: String,
      enum: ['Web Development', 'Mobile App', 'UI/UX Design', 'E-commerce', 'API', 'Other'],
      default: 'Web Development'
    },
    tags: [String],
    
    // Technologies Used
    technologies: [{
      name: String,
      icon: String,
      color: String
    }],
    
    // Features
    features: [String],
    
    // Challenges & Solutions
    challenges: String,
    solution: String,
    
    // Team
    teamSize: Number,
    teamMembers: [{
      name: String,
      role: String
    }],
    
    // Metrics
    duration: String,
    budget: String,
    
    // Testimonials
    testimonial: {
      text: String,
      author: String,
      role: String
    },
    
    // SEO
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    
    // Visibility
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    
    // Stats
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Generate slug before saving
projectSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model("Project", projectSchema);