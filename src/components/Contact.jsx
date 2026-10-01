import { useState } from "react";
import { profile } from "../data/profile";
import { Section, Button } from "./ui";

const fields = [["name", "Name", "text", "Enter your name"], ["email", "Email", "email", "Enter your email"], ["subject", "Subject", "text", "Enter subject"], ["message", "Message", "textarea", "Enter your message"]];
const empty = { name: "", email: "", subject: "", message: "" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Enter your name (at least 2 characters).";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email address, like name@example.com.";
  if (v.subject.trim().length < 3) e.subject = "Add a subject (at least 3 characters).";
  if (v.message.trim().length < 10) e.message = "Write a message of at least 10 characters.";
  return e;
}

export function ContactForm({ to }) {
  const [v, setV] = useState(empty);
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  const change = (k) => (e) => { setV({ ...v, [k]: e.target.value }); setSent(false); };
  const submit = (e) => {
    e.preventDefault();
    const er = validate(v);
    setErr(er);
    if (Object.keys(er).length) return;
    // Opens the visitor's email app. Replace with Formspree / EmailJS to send directly.
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(`${v.message}\n\n${v.name} (${v.email})`)}`;
    setSent(true);
    setV(empty);
  };
  return (
    <form className="card form" onSubmit={submit} noValidate>
      {fields.map(([k, label, type, ph]) => (
        <label key={k}>
          <span>{label}</span>
          {type === "textarea"
            ? <textarea rows="5" value={v[k]} placeholder={ph} onChange={change(k)} aria-invalid={!!err[k]} />
            : <input type={type} value={v[k]} placeholder={ph} onChange={change(k)} aria-invalid={!!err[k]} />}
          {err[k] && <small className="err">{err[k]}</small>}
        </label>
      ))}
      <Button type="submit">Send Message</Button>
      {sent && <p className="ok" role="status">Your email app should open with the message ready to send.</p>}
    </form>
  );
}

export default function Contact() {
  const c = profile.contact;
  const rows = [["Email", c.email, `mailto:${c.email}`], ["LinkedIn", c.linkedin, c.linkedin], ["GitHub", c.github, c.github], ["Location", c.location]];
  return (
    <Section id="contact" title="Let's Connect">
      <div className="contact-grid">
        <div className="card list">
          {rows.map(([l, val, href]) => (
            <div key={l}><h3>{l}</h3>{href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{val}</a> : <p>{val}</p>}</div>
          ))}
        </div>
        <ContactForm to={c.email} />
      </div>
    </Section>
  );
}
