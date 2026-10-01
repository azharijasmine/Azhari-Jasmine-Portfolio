import { useState } from "react";
import { internships } from "../data/internship";
import { useInView } from "../hooks";
import { Button, Modal, Section } from "./ui";

function InternshipPreview({ internship, onClose }) {
  return (
    <Modal wide onClose={onClose}>
      <img className="preview" src={internship.image} alt={`${internship.role} certificate`} />
      <h3>{internship.role}</h3>
      <p className="meta">{internship.organization} · {internship.date}</p>
      <p>{internship.description}</p>
      {internship.link && <div className="actions"><Button href={internship.link}>Open Link</Button></div>}
    </Modal>
  );
}

function InternshipCard({ internship, index, onView }) {
  const [ref, seen] = useInView(0.15);

  return (
    <article ref={ref} className={`card media tilt ${seen ? "seen" : ""}`} style={{ "--i": index }}>
      {internship.image && (
        <button className="thumb" onClick={onView} aria-label={`Preview ${internship.role} certificate`}>
          <img src={internship.image} alt={`${internship.organization} internship`} loading="lazy" />
        </button>
      )}
      <div className="body">
        <h3>{internship.role}</h3>
        <p className="meta">{internship.organization} · {internship.date}</p>
        <p>{internship.description}</p>
        {internship.image && <Button variant="ghost" onClick={onView}>View Certificate</Button>}
        {internship.link && (
          <a className="btn btn-ghost" href={internship.link} target="_blank" rel="noreferrer">
            View Details
          </a>
        )}
      </div>
    </article>
  );
}

export default function Internship() {
  const [selected, setSelected] = useState(null);

  return (
    <Section id="internship" title="Internship" alt>
      {internships.length ? (
        <div className="grid three">
          {internships.map((internship, index) => (
            <InternshipCard
              key={`${internship.organization}-${index}`}
              internship={internship}
              index={index}
              onView={() => setSelected(internship)}
            />
          ))}
        </div>
      ) : (
        <p>No internship experience added yet.</p>
      )}
      {selected && <InternshipPreview internship={selected} onClose={() => setSelected(null)} />}
    </Section>
  );
}