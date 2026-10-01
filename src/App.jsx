import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import Skills from "./components/Skills";
import Internship from "./components/Internship";
import { Certifications, Achievements } from "./components/Cards";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import SectionIndicator from "./components/SectionIndicator";
import { sections } from "./data/sections";

export default function App() {
  // Up/Down arrow keys step to the previous/next chapter, unless the user is
  // typing in a form field (e.g. the contact form).
  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const onKey = (e) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
      if (!els.length) return;
      let closest = 0, best = Infinity;
      els.forEach((el, i) => {
        const d = Math.abs(el.getBoundingClientRect().top);
        if (d < best) { best = d; closest = i; }
      });
      const next = e.key === "ArrowDown" ? Math.min(closest + 1, els.length - 1) : Math.max(closest - 1, 0);
      if (next !== closest) {
        e.preventDefault();
        els[next].scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Internship />
        <Achievements />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <SectionIndicator />
    </>
  );
}
