const Home = require("../models/Home");
const About = require("../models/About");
const Privacy = require("../models/Privacy");
const Terms = require("../models/Terms");

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

// Helper for single-document UPSERT
const upsert = (Model) => async (req, res) => {
  try {
    const doc = await Model.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Home Defaults
const homeDefaults = {
  // Hero Section
  heroTitle: "Welcome to My Portfolio",
  heroSubtitle: "I'm",
  heroName: "Your Name",
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
    icon: ""
  },
  secondaryButton: {
    text: "Contact Me",
    link: "/contact",
    icon: ""
  },
  
  // Featured Stats/Counter
  stats: [
    {
      number: "0",
      label: "Projects",
      suffix: "+"
    }
  ],
  
  // Featured Skills/Tech Stack
  featuredSkills: [],
  techStack: [],
  
  // Social Links
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    youtube: "",
    codepen: "",
    dribbble: "",
    behance: ""
  },
  
  // About Preview
  aboutPreview: {
    title: "About Me",
    content: "",
    image: ""
  },
  
  // Services/What I Do
  services: [],
  
  // Featured Projects
  featuredProjects: [],
  
  // Testimonials
  testimonials: [],
  
  // Clients/Companies Worked With
  clients: [],
  
  // Contact Info
  contactInfo: {
    email: "",
    phone: "",
    location: "",
    availability: "Available for work"
  },
  
  // Resume/CV
  resume: {
    url: "",
    downloadText: "Download CV"
  },
  
  // SEO/Meta
  metaTitle: "",
  metaDescription: "",
  keywords: [],
  
  // Theme/Styling
  theme: {
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
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
  // Basic Information
  name: "Your Name",
  title: "About Me",
  subtitle: "Professional Summary",
  
  // Content Sections
  intro: "",
  description: "",
  mission: "",
  
  // Media
  profileImage: "",
  coverImage: "",
  resumeUrl: "",
  
  // Personal Details
  email: "",
  phone: "",
  location: "",
  dateOfBirth: "",
  nationality: "",
  
  // Professional Info
  currentRole: "",
  company: "",
  yearsOfExperience: 0,
  
  // Skills & Expertise (arrays)
  technicalSkills: [],
  softSkills: [],
  tools: [],
  
  // Education
  education: [],
  
  // Certifications
  certifications: [],
  
  // Languages
  languages: [],
  
  // Social Links
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
    youtube: "",
    dribbble: "",
    behance: ""
  },
  
  // Fun Facts / Personal
  hobbies: [],
  favoriteQuote: {
    text: "",
    author: ""
  },
  funFacts: [],
  
  // Statistics / Metrics
  stats: [],
  
  // Call to Action
  cta: {
    text: "Let's Work Together",
    buttonText: "Contact Me",
    buttonLink: "/contact"
  },
  
  // SEO/Meta
  metaDescription: "",
  keywords: []
};

// Privacy Defaults
const privacyDefaults = {
  // Basic Info
  title: "Privacy Policy",
  effectiveDate: new Date().toISOString().split('T')[0],
  lastUpdated: new Date().toISOString().split('T')[0],
  
  // Introduction
  introduction: "Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.",
  
  // Sections
  sections: [],
  
  // Information We Collect
  informationCollected: {
    personalInfo: [],
    usageData: [],
    cookiesData: []
  },
  
  // How We Use Information
  usagePurposes: [],
  
  // Data Sharing
  dataSharing: {
    thirdParties: [],
    legalRequirements: [],
    businessTransfers: true
  },
  
  // Cookies
  cookies: {
    enabled: true,
    description: "",
    types: []
  },
  
  // User Rights
  userRights: [],
  
  // Data Security
  dataSecurity: {
    measures: [],
    disclaimer: ""
  },
  
  // Children's Privacy
  childrensPrivacy: {
    applies: false,
    ageLimit: 13,
    description: ""
  },
  
  // International Transfers
  internationalTransfers: {
    applies: false,
    description: "",
    safeguards: []
  },
  
  // Changes to Policy
  policyChanges: {
    notificationMethod: "Website update",
    description: ""
  },
  
  // Contact Information
  contactDetails: {
    email: "",
    address: "",
    phone: ""
  },
  
  // Compliance
  compliance: {
    gdpr: false,
    ccpa: false,
    otherLaws: []
  },
  
  // Additional Content
  definitions: [],
  
  // FAQ Section
  faqs: [],
  
  // SEO/Meta
  metaDescription: "",
  keywords: []
};

// Terms Defaults
const termsDefaults = {
  // Basic Info
  title: "Terms of Service",
  effectiveDate: new Date().toISOString().split('T')[0],
  lastUpdated: new Date().toISOString().split('T')[0],
  websiteName: "My Portfolio",
  websiteUrl: "",
  
  // Introduction
  introduction: "Welcome to our website. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
  
  // Acceptance of Terms
  acceptanceClause: "By accessing this website, you are agreeing to be bound by these Terms of Service and agree that you are responsible for compliance with any applicable local laws.",
  
  // User Accounts
  userAccounts: {
    registrationRequired: false,
    eligibilityAge: 18,
    responsibilities: [],
    termination: []
  },
  
  // Intellectual Property
  intellectualProperty: {
    ownership: "All content, features, and functionality of this website are owned by us and are protected by international copyright, trademark, and other intellectual property laws.",
    licenses: [],
    restrictions: []
  },
  
  // User Content
  userContent: {
    ownership: "",
    licenseGranted: "",
    guidelines: [],
    moderation: ""
  },
  
  // Prohibited Activities
  prohibitedActivities: [],
  
  // Payments & Fees
  payments: {
    applies: false,
    currency: "USD",
    refundPolicy: "",
    subscriptionTerms: ""
  },
  
  // Limitation of Liability
  liability: {
    disclaimer: "We shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your access to or use of the website.",
    limitations: [],
    jurisdiction: ""
  },
  
  // Termination
  termination: {
    byUser: "",
    byWebsite: "",
    effects: []
  },
  
  // Governing Law
  governingLaw: {
    country: "",
    state: "",
    disputeResolution: ""
  },
  
  // Changes to Terms
  changesToTerms: {
    notification: "",
    acceptance: ""
  },
  
  // Contact Information
  contactInfo: {
    email: "",
    address: "",
    phone: ""
  },
  
  // Miscellaneous
  miscellaneous: {
    severability: "",
    waiver: "",
    entireAgreement: ""
  },
  
  // Definitions
  definitions: [],
  
  // Sections (for structured display)
  sections: [],
  
  // FAQ
  faqs: [],
  
  // SEO/Meta
  metaDescription: "",
  keywords: []
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