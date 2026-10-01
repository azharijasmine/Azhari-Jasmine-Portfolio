import { profile } from "../data/profile";
import { Section, InfoCard } from "./ui";

export default function About() {
  return (
    <Section id="about" title="About Me">
      <div className="about-grid">
        <div className="prose">{profile.about.map((t, i) => <p key={i}>{t}</p>)}</div>
        <div className="grid two">{profile.infoCards.map((c) => <InfoCard key={c.label} {...c} />)}</div>
      </div>
    </Section>
  );
}
