import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Portfolio Data
  const developerData = {
    name: "Asad Rasheed",
    role: "Backend Architect",
    location: "Pakistan",
    about: "I build the systems that power products. Clean APIs. Solid architecture. Code that ships.",
    tagline: "Backend Developer. API Architect. Problem Solver.",
    availability: "Available for internships",
  };

  const projects = [
    {
      id: "job-board",
      title: "Job Board API",
      accent: "#00D4FF",
      type: "Backend / REST API",
      description: "Production-grade job board REST API built with Node.js and Express. Features JWT authentication with role-based access control, application tracking system, and advanced search.",
      tech: ["Node.js", "Express", "MongoDB", "JWT", "Helmet"],
      links: { github: "#", live: "#" },
      featured: true
    },
    {
      id: "gumnam-momina",
      title: "Gumnam Momina",
      accent: "#FF6B35",
      type: "Full E-Commerce Platform",
      description: "Complete hijab retail store with Stripe integration, AI-powered chatbot, and automated SEO. A live business serving real customers.",
      tech: ["Node.js", "Express", "Stripe", "AI", "SEO"],
      links: { shop: "#", live: "https://gumnammomina.com" },
      featured: true,
      badge: "Live Business"
    },
    {
      id: "healthcare-ai",
      title: "Healthcare AI FYP",
      accent: "#00FF88",
      type: "Final Year Project / AI",
      description: "AI-powered healthcare document processing system using Azure Form Recognizer for intelligent medical document extraction and analysis.",
      tech: ["FastAPI", "Python", "Azure", "AI/ML"],
      links: { github: "#" },
      featured: true
    }
  ];

  const skills = {
    languages: ["JavaScript", "TypeScript", "Python", "SQL"],
    frameworks: ["Node.js", "Express", "FastAPI", "React"],
    databases: ["MongoDB", "PostgreSQL", "Redis"],
    cloud: ["DigitalOcean", "Azure", "AWS"],
    tools: ["Docker", "Git", "Postman", "Linux"]
  };

  const timeline = [
    { year: "2024", event: "Healthcare AI FYP completed" },
    { year: "2023", event: "Gumnam Momina launch & scaling" },
    { year: "2023", event: "Backend specialization focus" },
    { year: "2022", event: "Started professional development journey" }
  ];

  const aiTools = [
    {
      name: "OpenAI / GPT",
      usage: "AI chatbot in Gumnam Momina retail store, generating product recommendations.",
      status: "In Production",
      icon: "Cpu"
    },
    {
      name: "Azure Form Recognizer",
      usage: "Medical document extraction in FYP for automated data processing pipelines.",
      status: "In Production",
      icon: "Activity"
    },
    {
      name: "Groq",
      usage: "Leveraging LPUs for ultra-fast inference experimentation and real-time responses.",
      status: "Experimenting",
      icon: "Zap"
    },
    {
      name: "LangChain",
      usage: "Building agentic workflows and multi-step reasoning chains for complex tasks.",
      status: "Actively Learning",
      icon: "Link"
    },
    {
      name: "Hugging Face",
      usage: "Exploration of open-source models, datasets, and fine-tuning research.",
      status: "Experimenting",
      icon: "BrainCircuit"
    },
    {
      name: "GitHub Copilot",
      usage: "Integrated into daily workflow for rapid prototyping and code optimization.",
      status: "Actively Learning",
      icon: "Bot"
    },
    {
      name: "Gemini",
      usage: "Prompt engineering and multimodal exploration with Google's latest models.",
      status: "Experimenting",
      icon: "Sparkles"
    },
    {
      name: "Vercel AI SDK",
      usage: "Implementing streaming AI responses and hook-based integrations in web apps.",
      status: "Actively Learning",
      icon: "Terminal"
    }
  ];

  // API Routes
  app.get("/api/about", (req, res) => res.json(developerData));
  app.get("/api/projects", (req, res) => res.json(projects));
  app.get("/api/skills", (req, res) => res.json(skills));
  app.get("/api/ai-arsenal", (req, res) => res.json(aiTools));
  app.get("/api/timeline", (req, res) => res.json(timeline));
  app.get("/api/contact", (req, res) => res.json({
    email: "asadrasheeddev@gmail.com",
    github: "https://github.com/asadrasheed",
    linkedin: "https://linkedin.com/in/asadrasheed",
    available: true
  }));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
