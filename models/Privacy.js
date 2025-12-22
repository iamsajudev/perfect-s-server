const mongoose = require("mongoose");

const privacySchema = new mongoose.Schema(
  {
    // Basic Info
    title: { type: String, default: "Privacy Policy" },
    effectiveDate: { type: String, default: new Date().toISOString().split('T')[0] },
    lastUpdated: { type: String, default: new Date().toISOString().split('T')[0] },
    
    // Introduction
    introduction: { type: String, default: "Your privacy is important to us..." },
    
    // Sections
    sections: [
      {
        title: String,
        content: String,
        order: Number
      }
    ],
    
    // Information We Collect
    informationCollected: {
      personalInfo: [String],
      usageData: [String],
      cookiesData: [String]
    },
    
    // How We Use Information
    usagePurposes: [String],
    
    // Data Sharing
    dataSharing: {
      thirdParties: [String],
      legalRequirements: [String],
      businessTransfers: { type: Boolean, default: true }
    },
    
    // Cookies
    cookies: {
      enabled: { type: Boolean, default: true },
      description: { type: String, default: "" },
      types: [
        {
          name: String,
          purpose: String,
          duration: String
        }
      ]
    },
    
    // User Rights
    userRights: [
      {
        right: String,
        description: String
      }
    ],
    
    // Data Security
    dataSecurity: {
      measures: [String],
      disclaimer: { type: String, default: "" }
    },
    
    // Children's Privacy
    childrensPrivacy: {
      applies: { type: Boolean, default: false },
      ageLimit: { type: Number, default: 13 },
      description: { type: String, default: "" }
    },
    
    // International Transfers
    internationalTransfers: {
      applies: { type: Boolean, default: false },
      description: { type: String, default: "" },
      safeguards: [String]
    },
    
    // Changes to Policy
    policyChanges: {
      notificationMethod: { type: String, default: "Website update" },
      description: { type: String, default: "" }
    },
    
    // Contact Information
    contactDetails: {
      email: { type: String, default: "" },
      address: { type: String, default: "" },
      phone: { type: String, default: "" }
    },
    
    // Compliance
    compliance: {
      gdpr: { type: Boolean, default: false },
      ccpa: { type: Boolean, default: false },
      otherLaws: [String]
    },
    
    // Additional Content
    definitions: [
      {
        term: String,
        meaning: String
      }
    ],
    
    // FAQ Section
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

module.exports = mongoose.model("Privacy", privacySchema);