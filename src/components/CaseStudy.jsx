import { useEffect } from "react";
import { Button, Tags } from "./ui";

export default function CaseStudy({ project: p, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const d = p.details;
  const block = (heading, text) =>
    text && (
      <div key={heading}>
        <h4>{heading}</h4>
        <p>{text}</p>
      </div>
    );

  return (
    <div className="case-study" role="dialog" aria-modal="true" aria-label={`${p.title} case study`}>
      <button className="case-close" onClick={onClose} aria-label="Close case study">×</button>
      <div className="case-hero">
        <img src={p.image} alt="" />
        <div className="case-hero-text">
          <span className="car-tag">{p.category}</span>
          <h2>{p.title}</h2>
        </div>
      </div>
      <div className="case-body wrap">
        {block("Overview", d.overview)}
        {block("Problem Statement", d.problem)}
        {block("Solution", d.solution)}
        {d.features?.length > 0 && (
          <>
            <h4>Features</h4>
            <ul>{d.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
          </>
        )}
        <h4>Technologies Used</h4>
        <Tags items={p.technologies} />
        {block("My Contribution", d.contribution)}
        {block("Implementation", d.implementation)}
        {block("Results / Outcome", d.results)}
        {d.screenshots?.length > 0 && (
          <>
            <h4>Project Screenshots</h4>
            <div className="shots">{d.screenshots.map((s, i) => <img key={i} src={s} alt="" loading="lazy" />)}</div>
          </>
        )}
        <div className="actions">
          {p.github && <Button href={p.github}>GitHub Repository</Button>}
          {p.liveDemo && <Button href={p.liveDemo} variant="ghost">Live Demo</Button>}
        </div>
      </div>
    </div>
  );
}
