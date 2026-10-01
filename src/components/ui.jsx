import { useEffect, useRef, useState } from "react";

export function Button({ href, onClick, variant = "primary", children, ...rest }) {
  const cls = `btn btn-${variant}`;
  const ext = href && href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};
  return href ? <a className={cls} href={href} {...ext} {...rest}>{children}</a>
              : <button className={cls} onClick={onClick} {...rest}>{children}</button>;
}

export function Modal({ onClose, children, wide }) {
  useEffect(() => {
    const key = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="overlay" onClick={onClose}>
      <div className={`modal ${wide ? "wide" : ""}`} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Close">×</button>
        {children}
      </div>
    </div>
  );
}

export function Section({ id, title, children, alt }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.05 });
    o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} className={`section ${alt ? "alt" : ""} ${seen ? "seen" : ""}`}>
      <div className="wrap">
        <header className="sec-head"><h2>{title}</h2><i className="rule" /></header>
        {children}
      </div>
    </section>
  );
}

export const InfoCard = ({ label, value }) => (
  <div className="card info"><span className="dot" /><h3>{label}</h3><p>{value}</p></div>
);
export const Tags = ({ items }) => <div className="tags">{items.map((t, i) => <span className="tag" key={i}>{t}</span>)}</div>;
