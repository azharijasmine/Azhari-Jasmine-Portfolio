import { useEffect, useState } from "react";

// Tracks which section id is currently centered in the viewport.
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids.join(",")]);
  return active;
}

// Reveals an element once it scrolls into view (used for stagger/timeline reveals).
export function useInView(threshold = 0.2) {
  const [ref, setRef] = useState(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref) return;
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold });
    o.observe(ref);
    return () => o.disconnect();
  }, [ref, threshold]);
  return [setRef, seen];
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
