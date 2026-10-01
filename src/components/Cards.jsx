import { useState } from "react";
import { certifications } from "../data/certifications";
import { achievements } from "../data/achievements";
import { Section, Modal, Button } from "./ui";
import { useInView } from "../hooks";

function Preview({ item, title, sub, onClose }) {
  return (
    <Modal wide onClose={onClose}>
      <img className="preview" src={item.image} alt={title} />
      <h3>{title}</h3>
      <p className="meta">{sub}</p>
      <p>{item.description}</p>
      {item.link && <div className="actions"><Button href={item.link}>Open Link</Button></div>}
    </Modal>
  );
}

export function CertificationCard({ cert, onView, i }) {
  const [ref, seen] = useInView(0.15);
  return (
    <article ref={ref} className={`card media tilt ${seen ? "seen" : ""}`} style={{ "--i": i }}>
      <button className="thumb" onClick={onView} aria-label={`Preview ${cert.name}`}>
        <img src={cert.image} alt={cert.name} loading="lazy" />
      </button>
      <div className="body">
        <h3>{cert.name}</h3>
        <p className="meta">{cert.organization} · {cert.date}</p>
        <p>{cert.description}</p>
        <Button variant="ghost" onClick={onView}>View Certificate</Button>
      </div>
    </article>
  );
}

export function Certifications() {
  const [sel, setSel] = useState(null);
  return (
    <Section id="certifications" title="Certifications" alt>
      <div className="grid three">
        {certifications.map((c, i) => <CertificationCard key={i} cert={c} i={i} onView={() => setSel(c)} />)}
      </div>
      {sel && <Preview item={sel} title={sel.name} sub={`${sel.organization} · ${sel.date}`} onClose={() => setSel(null)} />}
    </Section>
  );
}

function TimelineItem({ item, i, onView }) {
  const [ref, seen] = useInView(0.25);
  const openFromKeyboard = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onView(); } };
  return (
    <div
      ref={ref}
      className={`tl-item ${seen ? "seen" : ""}`}
      style={{ "--i": i }}
      role="button"
      tabIndex={0}
      onClick={onView}
      onKeyDown={openFromKeyboard}
      aria-label={`Preview ${item.title}`}
    >
      <span className="tl-dot" />
      {item.image && (
        <div className="tl-thumb">
          <img src={item.image} alt="" loading="lazy" />
        </div>
      )}
      <div className="tl-body">
        <span className="tl-date">{item.date}</span>
        <h3>{item.title}</h3>
        <p className="meta">{item.organization}</p>
        <p>{item.description}</p>
        {item.link && (
          <a href={item.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
            Learn more
          </a>
        )}
      </div>
    </div>
  );
}

export function Achievements() {
  const [sel, setSel] = useState(null);
  return (
    <Section id="achievements" title="Achievements">
      <div className="timeline">
        <span className="tl-line" aria-hidden="true" />
        {achievements.map((a, i) => (
          <TimelineItem key={i} item={a} i={i} onView={() => setSel(a)} />
        ))}
      </div>
      {sel && <Preview item={sel} title={sel.title} sub={`${sel.organization} · ${sel.date}`} onClose={() => setSel(null)} />}
    </Section>
  );
}
