import { useEffect, useRef } from "react";
import { profile as p } from "../data/profile";
import { Button } from "./ui";
import ParticleField from "./ParticleField";
import { sections } from "../data/sections";
import { prefersReducedMotion } from "../hooks";

export default function Hero() {
  const { github, linkedin, email } = p.contact;
  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const chapter = sections.findIndex((s) => s.id === "home") + 1;

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const fine = window.matchMedia("(pointer:fine)").matches;
    let raf = null;

    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        if (bgRef.current) bgRef.current.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0) translateY(var(--scrollY,0px)) scale(var(--scrollScale,1))`;
        if (contentRef.current) contentRef.current.style.transform = `translate3d(${x * 4}px, ${y * 4}px, 0)`;
        raf = null;
      });
    };
    if (!reduced && fine) window.addEventListener("mousemove", onMove);

    const onScroll = () => {
      const root = rootRef.current;
      if (!root || reduced) return;
      const y = window.scrollY, vh = window.innerHeight || 1;
      const prog = Math.min(y / vh, 1);
      root.style.setProperty("--scrollY", `${y * 0.15}px`);
      root.style.setProperty("--scrollOpacity", `${1 - prog * 0.7}`);
      root.style.setProperty("--scrollScale", `${1 + prog * 0.05}`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="home" className="hero" ref={rootRef}>
      <div className="hero-bg" ref={bgRef}>
        <ParticleField />
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="shape s1" />
        <span className="shape s2" />
        <span className="shape s3" />
        <span className="shape s4" />
      </div>

      <div className="wrap hero-content" ref={contentRef}>
        <p className="hello reveal" style={{ "--d": "0s" }}>Hello, I'm</p>
        <h1 className="reveal" style={{ "--d": ".15s" }}>{p.name}</h1>
        <p className="headline reveal" style={{ "--d": ".3s" }}>{p.headline}</p>
        <p className="lead reveal" style={{ "--d": ".45s" }}>{p.intro}</p>
        <div className="actions reveal" style={{ "--d": ".6s" }}>
          <Button href="#projects">View My Projects</Button>
          <Button href="#contact" variant="ghost-dark">Contact Me</Button>
        </div>
        <div className="socials dark reveal" style={{ "--d": ".72s" }}>
          <a href={github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${email}`}>Email</a>
        </div>
      </div>

      <div className="hero-index" aria-hidden="true">
        <span>{String(chapter).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}</span>
        <strong>Home</strong>
      </div>
    </section>
  );
}
