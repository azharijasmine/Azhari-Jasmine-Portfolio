import { useState } from "react";
import { profile } from "../data/profile";
import { Section, Button, Modal } from "./ui";

export default function Resume() {
  const [open, setOpen] = useState(false);
  const r = profile.resume;
  const file = import.meta.env.BASE_URL + r.file;
  return (
    <Section id="resume" title="My Resume" alt>
      <p className="lead narrow">{r.description}</p>
      <div className="actions">
        <Button onClick={() => setOpen(true)}>View Full Resume</Button>
        <Button href={file} variant="ghost" download>Download Resume</Button>
      </div>
      <div className="grid two summary">
        {r.summary.map((s) => (
          <div className="card" key={s.title}>
            <h3>{s.title}</h3>
            <ul>{s.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
          </div>
        ))}
      </div>
      {open && (
        <Modal wide onClose={() => setOpen(false)}>
          <iframe className="pdf" src={file} title="Resume PDF" />
          <p className="fallback">Can't see the PDF? <a href={file} target="_blank" rel="noreferrer">Open it in a new tab</a>.</p>
        </Modal>
      )}
    </Section>
  );
}
