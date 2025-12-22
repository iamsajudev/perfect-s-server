const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    // Basic Information
    name: { type: String, default: "Your Name" },
    title: { type: String, default: "About Me" },
    subtitle: { type: String, default: "Professional Summary" },

    // Content Sections
    intro: { type: String, default: "" },
    description: { type: String, default: "" },
    mission: { type: String, default: "" },

    // Media
    profileImage: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },

    // Personal Details
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    dateOfBirth: { type: String, default: "" },
    nationality: { type: String, default: "" },

    // Professional Info
    currentRole: { type: String, default: "" },
    company: { type: String, default: "" },
    yearsOfExperience: { type: Number, default: 0 },

    // Skills & Expertise (arrays)
    technicalSkills: [
      {
        category: String,
        skills: [String],
      },
    ],
    softSkills: [String],
    tools: [String],

    // Education
    education: [
      {
        degree: String,
        institution: String,
        year: String,
        description: String,
      },
    ],

    // Certifications
    certifications: [
      {
        name: String,
        issuer: String,
        year: String,
        credentialUrl: String,
      },
    ],

    // Languages
    languages: [
      {
        language: String,
        proficiency: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced", "Native"],
        },
      },
    ],

    // Social Links
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      youtube: { type: String, default: "" },
      dribbble: { type: String, default: "" },
      behance: { type: String, default: "" },
    },

    // Fun Facts / Personal
    hobbies: [String],
    favoriteQuote: {
      text: String,
      author: String,
    },
    funFacts: [String],

    // Statistics / Metrics
    stats: [
      {
        label: String,
        value: String,
        prefix: String,
        suffix: String,
      },
    ],

    // Call to Action
    cta: {
      text: { type: String, default: "Let's Work Together" },
      buttonText: { type: String, default: "Contact Me" },
      buttonLink: { type: String, default: "/contact" },
    },

    // SEO/Meta
    metaDescription: { type: String, default: "" },
    keywords: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
