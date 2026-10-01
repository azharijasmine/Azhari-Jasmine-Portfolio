import { profile as p } from "../data/profile";

export default function Footer() {
  const c = p.contact;
  return (
    <footer className="footer">
      <div className="wrap">
        <h3>{p.name}</h3>
        <p>{p.tagline}</p>
        <div className="socials">
          <a href={c.github} target="_blank" rel="noreferrer">GitHub</a><span>|</span>
          <a href={c.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><span>|</span>
          <a href={`mailto:${c.email}`}>Email</a>
        </div>
        <small>© 2026 {p.name}. All Rights Reserved.</small>
      </div>
    </footer>
  );
}
