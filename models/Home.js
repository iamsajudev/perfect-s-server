const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    // Hero Section
    heroTitle: { type: String, default: "Welcome to My Portfolio" },
    heroSubtitle: { type: String, default: "I'm" },
    heroName: { type: String, default: "Your Name" },
    heroRole: { type: String, default: "Full Stack Developer" },
    heroDescription: {
      type: String,
      default: "I build amazing web experiences",
    },

    // Hero Media
    heroImage: { type: String, default: "" },
    heroVideo: { type: String, default: "" },
    heroBackground: { type: String, default: "" },

    // Call to Action Buttons
    primaryButton: {
      text: { type: String, default: "View My Work" },
      link: { type: String, default: "/projects" },
      icon: { type: String, default: "" },
    },
    secondaryButton: {
      text: { type: String, default: "Contact Me" },
      link: { type: String, default: "/contact" },
      icon: { type: String, default: "" },
    },

    // Featured Stats/Counter
    stats: [
      {
        number: { type: String, default: "0" },
        label: { type: String, default: "Projects" },
        suffix: { type: String, default: "+" },
      },
    ],

    // Featured Skills/Tech Stack
    featuredSkills: [String],
    techStack: [
      {
        name: String,
        icon: String,
        color: String,
      },
    ],

    // Social Links
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      youtube: { type: String, default: "" },
      codepen: { type: String, default: "" },
      dribbble: { type: String, default: "" },
      behance: { type: String, default: "" },
    },

    // About Preview
    aboutPreview: {
      title: { type: String, default: "About Me" },
      content: { type: String, default: "" },
      image: { type: String, default: "" },
    },

    // Services/What I Do
    services: [
      {
        title: String,
        description: String,
        icon: String,
        color: String,
      },
    ],

    // Featured Projects
    featuredProjects: [
      {
        title: String,
        description: String,
        image: String,
        link: String,
        tags: [String],
      },
    ],

    // Testimonials
    testimonials: [
      {
        name: String,
        role: String,
        company: String,
        content: String,
        image: String,
        rating: { type: Number, min: 1, max: 5 },
      },
    ],

    // Clients/Companies Worked With
    clients: [
      {
        name: String,
        logo: String,
        link: String,
      },
    ],

    // Contact Info
    contactInfo: {
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      availability: { type: String, default: "Available for work" },
    },

    // Resume/CV
    resume: {
      url: { type: String, default: "" },
      downloadText: { type: String, default: "Download CV" },
    },

    // SEO/Meta
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: [String],

    // Theme/Styling
    theme: {
      primaryColor: { type: String, default: "#3B82F6" },
      secondaryColor: { type: String, default: "#10B981" },
      fontFamily: { type: String, default: "Inter" },
    },

    // Animation/Effects
    animations: {
      enabled: { type: Boolean, default: true },
      type: { type: String, default: "fade" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Home", homeSchema);
