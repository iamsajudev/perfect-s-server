const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    // Basic Info
    title: { 
      type: String, 
      required: true 
    },
    slug: { 
      type: String, 
      unique: true,
      lowercase: true 
    },
    
    // Content
    excerpt: { 
      type: String, 
      required: true,
      maxlength: 300 
    },
    content: { 
      type: String, 
      required: true 
    },
    author: { 
      type: String, 
      default: "Admin" 
    },
    
    // Media
    coverImage: { 
      type: String, 
      required: true 
    },
    images: [String],
    
    // Categorization
    category: {
      type: String,
      enum: ['Technology', 'Design', 'Business', 'Lifestyle', 'Tutorial', 'News'],
      default: 'Technology'
    },
    tags: [String],
    
    // Readability
    readTime: { 
      type: String, 
      default: "5 min" 
    },
    wordCount: Number,
    
    // Publishing
    published: { 
      type: Boolean, 
      default: false 
    },
    publishedDate: Date,
    scheduledDate: Date,
    
    // SEO
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    
    // Social Sharing
    ogImage: String,
    twitterCard: String,
    
    // Engagement
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    
    // Series
    series: String,
    seriesOrder: Number,
    
    // Related Content
    relatedPosts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }],
    
    // Status
    status: {
      type: String,
      enum: ['Draft', 'Published', 'Archived', 'Scheduled'],
      default: 'Draft'
    }
  },
  { timestamps: true }
);

// Generate slug before saving
blogSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);