import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import { Section, Button, Tags } from "./ui";
import CaseStudy from "./CaseStudy";

// An interactive horizontal showcase: one project centered, neighbours
// partially visible at the sides. Works for any number of projects — add
// more entries to src/data/projects.js and they slot in automatically.
export default function Projects() {
  const [i, setI] = useState(0);
  const [openIdx, setOpenIdx] = useState(null);
  const total = projects.length;
  const touchX = useRef(0);

  const go = (dir) => setI((v) => (v + dir + total) % total);

  useEffect(() => {
    const onKey = (e) => {
      const el = document.getElementById("projects");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5;
      if (!inView) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const posClass = (idx) => {
    let offset = idx - i;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    if (offset === 0) return "active";
    if (offset === 1) return "next1";
    if (offset === -1) return "prev1";
    return "hide";
  };

  return (
    <Section id="projects" title="My Projects" alt>
      <div className="carousel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {total > 1 && <button className="car-nav prev" onClick={() => go(-1)} aria-label="Previous project">‹</button>}
        <div className="car-track">
          {projects.map((p, idx) => {
            const cls = posClass(idx);
            if (cls === "hide") return null;
            return (
              <article key={p.title + idx} className={`car-card ${cls}`} aria-hidden={cls !== "active"}>
                <span className="car-tag">Project {String(idx + 1).padStart(2, "0")}</span>
                <div className="car-thumb"><img src={p.image} alt={`${p.title} preview`} loading="lazy" /></div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <Tags items={p.technologies} />
                <div className="links">
                  {p.github && <a href={p.github} target="_blank" rel="noreferrer">GitHub</a>}
                  {p.liveDemo && <a href={p.liveDemo} target="_blank" rel="noreferrer">Live Demo</a>}
                </div>
                <Button variant="ghost" onClick={() => setOpenIdx(idx)} tabIndex={cls === "active" ? 0 : -1}>View Details</Button>
              </article>
            );
          })}
        </div>
        {total > 1 && <button className="car-nav next" onClick={() => go(1)} aria-label="Next project">›</button>}
      </div>
      {total > 1 && (
        <div className="car-count">{String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
      )}
      {openIdx !== null && <CaseStudy project={projects[openIdx]} onClose={() => setOpenIdx(null)} />}
    </Section>
  );
}
