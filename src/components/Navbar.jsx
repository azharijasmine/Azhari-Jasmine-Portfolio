import { useState } from "react";
import { profile } from "../data/profile";
import { sections } from "../data/sections";
import { useActiveSection } from "../hooks";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const ids = sections.map((s) => s.id);
  const active = useActiveSection(ids);

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a href="#home" className="brand">{profile.brand}</a>
        <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <nav className={open ? "open" : ""}>
          {sections.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={active === id ? "on" : ""} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
