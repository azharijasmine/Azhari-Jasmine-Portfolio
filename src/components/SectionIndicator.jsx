import { sections } from "../data/sections";
import { useActiveSection } from "../hooks";

export default function SectionIndicator() {
  const ids = sections.map((s) => s.id);
  const active = useActiveSection(ids);
  if (active === "home") return null;
  const i = ids.indexOf(active);
  if (i < 0) return null;
  return (
    <div className="section-indicator" aria-hidden="true">
      <span>{String(i + 1).padStart(2, "0")} / {String(ids.length).padStart(2, "0")}</span>
      <strong>{sections[i].label}</strong>
    </div>
  );
}
