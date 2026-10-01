import { useState } from "react";
import { skills } from "../data/skills";
import { Section, Tags } from "./ui";

export default function Skills() {
  const [active, setActive] = useState("All");
  const cats = ["All", ...skills.map((s) => s.category)];
  const shown = active === "All" ? skills : skills.filter((s) => s.category === active);

  return (
    <Section id="skills" title="My Skills">
      <div className="filters">
        {cats.map((c) => (
          <button key={c} className={c === active ? "on" : ""} onClick={() => setActive(c)}>{c}</button>
        ))}
      </div>
      {/* key={active} remounts the grid so the stagger reveal replays on filter change */}
      <div className="grid three" key={active}>
        {shown.map((s, i) => (
          <div className="card skill stagger" style={{ "--i": i }} key={s.category}>
            <div className="skill-h"><span className="ico">{s.icon}</span><h3>{s.category}</h3></div>
            <Tags items={s.items} />
          </div>
        ))}
      </div>
    </Section>
  );
}
