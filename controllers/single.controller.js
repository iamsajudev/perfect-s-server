// controllers/single.controller.js
const Home = require("../models/Home");
const About = require("../models/About");
const Privacy = require("../models/Privacy");
const Terms = require("../models/Terms");
const fs = require("fs");
const path = require("path");

// Helper for single-document GET
const getSingle = (Model, def) => async (req, res) => {
  try {
    const data = await Model.findOne();
    res.json(data || def);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Helper for single-document UPSERT with file handling
const upsert = (Model) => async (req, res) => {
  try {
    let updateData = { ...req.body };

    console.log('Received update request');
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Has file:', !!req.file);

    // Remove MongoDB internal fields if they exist
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // Handle image upload if present
    if (req.file) {
      updateData.heroImage = `/uploads/images/${req.file.filename}`;
      console.log('Image uploaded:', updateData.heroImage);
    }

    // Parse JSON strings that might come from form-data
    const parseJSONFields = [
      'primaryButton', 'secondaryButton', 'socialLinks', 'aboutPreview',
      'contactInfo', 'theme', 'stats', 'services', 'techStack',
      'testimonials', 'clients', 'featuredProjects', 'featuredSkills',
      'keywords', 'animations', 'resume'
    ];

    parseJSONFields.forEach(field => {
      if (updateData[field] && typeof updateData[field] === 'string') {
        try {
          updateData[field] = JSON.parse(updateData[field]);
          console.log(`Parsed ${field}:`, updateData[field]);
        } catch (e) {
          console.error(`Error parsing ${field}:`, e);
        }
      }
    });

    // Find and update or create
    const doc = await Model.findOneAndUpdate(
      {},
      { ...updateData, updatedAt: new Date() },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );

    res.status(200).json({
      success: true,
      message: "Data saved successfully",
      data: doc
    });
  } catch (err) {
    console.error('Upsert error:', err);
    res.status(500).json({
      success: false,
      error: err.message || "Server Error",
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// Home Defaults
const homeDefaults = {
  // Hero Section
  heroTitle: "Welcome to My Portfolio",
  heroSubtitle: "I'm",
  heroName: "Saju",
  heroRole: "Full Stack Developer",
  heroDescription: "I build amazing web experiences",

  // Hero Media
  heroImage: "",
  heroVideo: "",
  heroBackground: "",

  // Call to Action Buttons
  primaryButton: {
    text: "View My Work",
    link: "/projects",
    icon: "🚀"
  },
  secondaryButton: {
    text: "Contact Me",
    link: "/contact",
    icon: "📧"
  },

  // Featured Stats/Counter
  stats: [
    { number: "100", label: "Projects Completed", suffix: "+" },
    { number: "50", label: "Happy Clients", suffix: "+" },
    { number: "3", label: "Years Experience", suffix: "+" }
  ],

  // Featured Skills/Tech Stack
  featuredSkills: ["JavaScript", "React js", "Next js", "Tailwind CSS", "Node js"],
  techStack: [
    { name: "React.js", icon: "⚛️", color: "#61DAFB" },
    { name: "Next.js", icon: "🌐", color: "#000000" },
    { name: "Node.js", icon: "🟢", color: "#339933" },
    { name: "Tailwind CSS", icon: "🌊", color: "#06B6D4" }
  ],

  // Social Links
  socialLinks: {
    github: "https://github.com/iamsajudev",
    linkedin: "https://www.linkedin.com/in/szamansaju/",
    twitter: "#",
    instagram: "https://www.instagram.com/iamsaju.99/",
    youtube: "#",
    codepen: "https://codepen.io/sazeduzzaman-saju-the-lessful",
    dribbble: "#",
    behance: "#"
  },

  // About Preview
  aboutPreview: {
    title: "About Me",
    content: "I'm a passionate web developer specializing in frontend development with React, and Next.js. I build scalable, responsive applications.",
    image: ""
  },

  // Services/What I Do
  services: [
    {
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces",
      icon: "🎨",
      color: "#3B82F6"
    },
    {
      title: "Backend Development",
      description: "Creating robust APIs and server-side applications",
      icon: "🚀",
      color: "#10B981"
    },
    {
      title: "Full Stack Solutions",
      description: "End-to-end web application development",
      icon: "💻",
      color: "#EF4444"
    }
  ],

  // Featured Projects
  featuredProjects: [],

  // Testimonials
  testimonials: [],

  // Clients/Companies Worked With
  clients: [],

  // Contact Info
  contactInfo: {
    email: "szamansaju@gmail.com",
    phone: "+8801576614451",
    location: "Dhaka, Bangladesh",
    availability: "Available for work"
  },

  // Resume/CV
  resume: {
    url: "",
    downloadText: "Download CV"
  },

  // SEO/Meta
  metaTitle: "Sazeduzzaman Saju | Full-Stack Developer",
  metaDescription: "Professional Full-Stack Developer specializing in React, Next.js, Node.js",
  keywords: ["Portfolio", "Developer", "React", "Next.js", "Full Stack"],

  // Theme/Styling
  theme: {
    primaryColor: "#EF4444",
    secondaryColor: "#DC2626",
    fontFamily: "Inter"
  },

  // Animation/Effects
  animations: {
    enabled: true,
    type: "fade"
  }
};

// About Defaults
const aboutDefaults = {
  name: "Sazeduzzaman Saju",
  title: "About Me",
  subtitle: "Full Stack Developer",
  intro: "Passionate developer with expertise in modern web technologies",
  description: "I create amazing web experiences with clean code and modern design.",
  mission: "To build innovative solutions that make a difference",
  profileImage: "",
  coverImage: "",
  resumeUrl: "",
  email: "szamansaju@gmail.com",
  phone: "+8801576614451",
  location: "Dhaka, Bangladesh",
  dateOfBirth: "1995-01-01",
  nationality: "Bangladeshi",
  currentRole: "Full Stack Developer",
  company: "Freelance",
  yearsOfExperience: 3,
  technicalSkills: ["JavaScript", "React", "Next.js", "Node.js", "MongoDB"],
  softSkills: ["Communication", "Problem Solving", "Team Work"],
  tools: ["VS Code", "Git", "Figma"],
  education: [],
  certifications: [],
  languages: [
    { name: "Bengali", proficiency: "Native" },
    { name: "English", proficiency: "Fluent" }
  ],
  socialLinks: {
    github: "https://github.com/iamsajudev",
    linkedin: "https://www.linkedin.com/in/szamansaju/",
    twitter: "#",
    instagram: "https://www.instagram.com/iamsaju.99/"
  },
  hobbies: ["Coding", "Reading", "Gaming"],
  favoriteQuote: {
    text: "Code is poetry",
    author: "Unknown"
  },
  funFacts: [],
  stats: [],
  cta: {
    text: "Let's Work Together",
    buttonText: "Contact Me",
    buttonLink: "/contact"
  },
  metaDescription: "Learn more about Sazeduzzaman Saju, a passionate Full Stack Developer",
  keywords: ["About", "Developer", "Portfolio"]
};

// Privacy Defaults
const privacyDefaults = {
  title: "Privacy Policy",
  effectiveDate: new Date().toISOString().split('T')[0],
  lastUpdated: new Date().toISOString().split('T')[0],
  introduction: "Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.",
  sections: [],
  informationCollected: {
    personalInfo: ["Name", "Email", "Phone"],
    usageData: ["IP address", "Browser type", "Pages visited"],
    cookiesData: ["Session cookies", "Analytics cookies"]
  },
  usagePurposes: ["To provide services", "To improve website", "To communicate with you"],
  dataSharing: {
    thirdParties: [],
    legalRequirements: [],
    businessTransfers: true
  },
  cookies: {
    enabled: true,
    description: "We use cookies to enhance your experience",
    types: ["Necessary", "Analytics", "Marketing"]
  },
  userRights: ["Access data", "Rectify data", "Delete data", "Opt out"],
  dataSecurity: {
    measures: ["Encryption", "Secure servers"],
    disclaimer: "No method of transmission is 100% secure"
  },
  childrensPrivacy: {
    applies: false,
    ageLimit: 13,
    description: "We do not knowingly collect data from children"
  },
  internationalTransfers: {
    applies: false,
    description: "",
    safeguards: []
  },
  policyChanges: {
    notificationMethod: "Website update",
    description: "We will notify users of any changes"
  },
  contactDetails: {
    email: "szamansaju@gmail.com",
    address: "Dhaka, Bangladesh",
    phone: "+8801576614451"
  },
  compliance: {
    gdpr: false,
    ccpa: false,
    otherLaws: []
  },
  definitions: [],
  faqs: [],
  metaDescription: "Privacy Policy for my portfolio website",
  keywords: ["Privacy", "Policy", "Data Protection"]
};

// Terms Defaults
const termsDefaults = {
  title: "Terms of Service",
  effectiveDate: new Date().toISOString().split('T')[0],
  lastUpdated: new Date().toISOString().split('T')[0],
  websiteName: "Saju's Portfolio",
  websiteUrl: "",
  introduction: "Welcome to my portfolio website. By accessing and using this website, you accept and agree to be bound by these terms.",
  acceptanceClause: "By using this website, you agree to these Terms of Service.",
  userAccounts: {
    registrationRequired: false,
    eligibilityAge: 18,
    responsibilities: [],
    termination: []
  },
  intellectualProperty: {
    ownership: "All content on this website is owned by me and protected by copyright laws.",
    licenses: [],
    restrictions: []
  },
  userContent: {
    ownership: "",
    licenseGranted: "",
    guidelines: [],
    moderation: ""
  },
  prohibitedActivities: ["Hacking", "Spamming", "Scraping data"],
  payments: {
    applies: false,
    currency: "USD",
    refundPolicy: "",
    subscriptionTerms: ""
  },
  liability: {
    disclaimer: "I am not liable for any damages resulting from use of this website.",
    limitations: [],
    jurisdiction: ""
  },
  termination: {
    byUser: "",
    byWebsite: "",
    effects: []
  },
  governingLaw: {
    country: "Bangladesh",
    state: "Dhaka",
    disputeResolution: ""
  },
  changesToTerms: {
    notification: "We will post changes on this page",
    acceptance: "Continued use constitutes acceptance"
  },
  contactInfo: {
    email: "szamansaju@gmail.com",
    address: "Dhaka, Bangladesh",
    phone: "+8801576614451"
  },
  miscellaneous: {
    severability: "",
    waiver: "",
    entireAgreement: ""
  },
  definitions: [],
  sections: [],
  faqs: [],
  metaDescription: "Terms of Service for my portfolio website",
  keywords: ["Terms", "Service", "Agreement"]
};

// Export all methods with complete defaults
exports.getHome = getSingle(Home, homeDefaults);
exports.upsertHome = upsert(Home);

exports.getAbout = getSingle(About, aboutDefaults);
exports.upsertAbout = upsert(About);

exports.getPrivacy = getSingle(Privacy, privacyDefaults);
exports.upsertPrivacy = upsert(Privacy);

exports.getTerms = getSingle(Terms, termsDefaults);
exports.upsertTerms = upsert(Terms);