const mongoose = require("mongoose");

const termsSchema = new mongoose.Schema(
  {
    // Basic Info
    title: { type: String, default: "Terms of Service" },
    effectiveDate: { type: String, default: new Date().toISOString().split('T')[0] },
    lastUpdated: { type: String, default: new Date().toISOString().split('T')[0] },
    websiteName: { type: String, default: "My Portfolio" },
    websiteUrl: { type: String, default: "" },
    
    // Introduction
    introduction: { type: String, default: "Welcome to our website..." },
    
    // Acceptance of Terms
    acceptanceClause: { type: String, default: "" },
    
    // User Accounts
    userAccounts: {
      registrationRequired: { type: Boolean, default: false },
      eligibilityAge: { type: Number, default: 18 },
      responsibilities: [String],
      termination: [String]
    },
    
    // Intellectual Property
    intellectualProperty: {
      ownership: { type: String, default: "" },
      licenses: [
        {
          type: String,
          description: String
        }
      ],
      restrictions: [String]
    },
    
    // User Content
    userContent: {
      ownership: { type: String, default: "" },
      licenseGranted: { type: String, default: "" },
      guidelines: [String],
      moderation: { type: String, default: "" }
    },
    
    // Prohibited Activities
    prohibitedActivities: [String],
    
    // Payments & Fees
    payments: {
      applies: { type: Boolean, default: false },
      currency: { type: String, default: "USD" },
      refundPolicy: { type: String, default: "" },
      subscriptionTerms: { type: String, default: "" }
    },
    
    // Limitation of Liability
    liability: {
      disclaimer: { type: String, default: "" },
      limitations: [String],
      jurisdiction: { type: String, default: "" }
    },
    
    // Termination
    termination: {
      byUser: { type: String, default: "" },
      byWebsite: { type: String, default: "" },
      effects: [String]
    },
    
    // Governing Law
    governingLaw: {
      country: { type: String, default: "" },
      state: { type: String, default: "" },
      disputeResolution: { type: String, default: "" }
    },
    
    // Changes to Terms
    changesToTerms: {
      notification: { type: String, default: "" },
      acceptance: { type: String, default: "" }
    },
    
    // Contact Information
    contactInfo: {
      email: { type: String, default: "" },
      address: { type: String, default: "" },
      phone: { type: String, default: "" }
    },
    
    // Miscellaneous
    miscellaneous: {
      severability: { type: String, default: "" },
      waiver: { type: String, default: "" },
      entireAgreement: { type: String, default: "" }
    },
    
    // Definitions
    definitions: [
      {
        term: String,
        definition: String
      }
    ],
    
    // Sections (for structured display)
    sections: [
      {
        title: String,
        content: String,
        order: Number
      }
    ],
    
    // FAQ
    faqs: [
      {
        question: String,
        answer: String
      }
    ],
    
    // SEO/Meta
    metaDescription: { type: String, default: "" },
    keywords: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Terms", termsSchema);