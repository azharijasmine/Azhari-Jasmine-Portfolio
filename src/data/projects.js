import { ph } from "./placeholder";

const details = () => ({
  overview: "[Project overview]",
  problem: "[Problem statement]",
  solution: "[Solution]",
  features: ["[Feature 1]", "[Feature 2]", "[Feature 3]"],
  contribution: "[My contribution]",
  implementation: "[Implementation details]",
  results: "[Results / outcome]",
  screenshots: [ph("Screenshot 1"), ph("Screenshot 2")],
});

// Add as many projects as you like. Each object becomes a card automatically.
export const projects = [
  { title: "AI-Powered Smart Water Management Digital Twin", description: "AI-powered Smart Water Management System with a real-time Digital Twin of a water tank and motor. Uses IoT sensors, AI forecasting, and Gemini API to analyze consumption patterns, predict water demand for the next 24 hours, detect anomalies, and recommend optimized actions for efficient water distribution and energy management.", technologies: ["Python", "React", "IoT & Digital Twin","FastAPI","ML","MongoDB","Gemini API"], category: "AI / IoT / Digital Twin", image: ph("Project 1"), github: "https://github.com/azharijasmine/AI-Powered-Smart-Water-Management-Digital-Twin.git", liveDemo: "https://example.com", details: details() },
  { title: "[Sample Project Name 2]", description: "[Sample Project Description]", technologies: ["[Technology 1]", "[Technology 2]"], category: "Category B", image: ph("Project 2"), github: "https://github.com/your-handle/project-2", liveDemo: "", details: details() },
  { title: "[Sample Project Name 3]", description: "[Sample Project Description]", technologies: ["[Technology 1]", "[Technology 2]", "[Technology 3]"], category: "Category A", image: ph("Project 3"), github: "https://github.com/your-handle/project-3", liveDemo: "", details: details() },
  
  { title: "[Sample Project Name 4]", description: "[Sample Project Description]", technologies: ["[Technology 1]", "[Technology 2]", "[Technology 3]"], category: "Category A", image: ph("Project 4"), github: "https://github.com/your-handle/project-4", liveDemo: "https://example.com", details: details() },
  { title: "[Sample Project Name 5]", description: "[Sample Project Description]", technologies: ["[Technology 1]", "[Technology 2]"], category: "Category B", image: ph("Project 5"), github: "https://github.com/your-handle/project-5", liveDemo: "", details: details() },
  { title: "[Sample Project Name 6]", description: "[Sample Project Description]", technologies: ["[Technology 1]", "[Technology 2]", "[Technology 3]"], category: "Category A", image: ph("Project 6"), github: "https://github.com/your-handle/project-6", liveDemo: "", details: details() },
];
