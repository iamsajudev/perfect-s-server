const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    // Personal Info
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true,
      lowercase: true 
    },
    phone: String,
    
    // Professional Info
    company: String,
    position: String,
    website: String,
    
    // Message
    subject: { 
      type: String, 
      required: true 
    },
    message: { 
      type: String, 
      required: true 
    },
    
    // Source & Metadata
    source: {
      type: String,
      enum: ['Website Form', 'Email', 'LinkedIn', 'Referral', 'Other'],
      default: 'Website Form'
    },
    ipAddress: String,
    userAgent: String,
    
    // Status
    status: {
      type: String,
      enum: ['New', 'Read', 'Replied', 'Spam', 'Archived'],
      default: 'New'
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium'
    },
    
    // Response
    replied: { type: Boolean, default: false },
    repliedAt: Date,
    replyMessage: String,
    repliedBy: String,
    
    // Follow-up
    followUpDate: Date,
    followUpNotes: String,
    
    // Tags
    tags: [String],
    
    // Attachments
    attachments: [String],
    
    // Consent
    consentGiven: { type: Boolean, default: true },
    subscribeNewsletter: { type: Boolean, default: false },
    
    // GDPR
    gdprCompliant: { type: Boolean, default: true },
    dataRetentionDate: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);