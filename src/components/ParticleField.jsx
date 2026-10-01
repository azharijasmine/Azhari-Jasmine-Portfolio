import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks";

// Lightweight canvas particle field: a couple dozen slow-drifting dots with a
// sparse constellation network near the edges. One canvas, one RAF loop —
// far cheaper than animating dozens of DOM nodes.
export default function ParticleField() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = prefersReducedMotion();
    let raf = null;
    let particles = [];
    let w = 0, h = 0;

    const countFor = (width) => (width < 640 ? 14 : width < 1024 ? 24 : 38);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();
      particles = Array.from({ length: countFor(window.innerWidth) }, () => {
        const front = Math.random() < 0.45;
        const palette = Math.random() < 0.55 ? "139,92,246" : Math.random() < 0.85 ? "216,199,245" : "255,255,255";
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: front ? 1.6 + Math.random() * 1.7 : 0.8 + Math.random() * 1.1,
          baseAlpha: front ? 0.4 + Math.random() * 0.3 : 0.16 + Math.random() * 0.18,
          speed: front ? 0.1 + Math.random() * 0.12 : 0.04 + Math.random() * 0.06,
          angle: Math.random() * Math.PI * 2,
          drift: (Math.random() - 0.5) * 0.0025,
          twinkle: Math.random() * Math.PI * 2,
          color: palette,
          front,
        };
      });
    }

    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      const mx = (mouse.current.x - 0.5) * 2;
      const my = (mouse.current.y - 0.5) * 2;

      // sparse constellation lines, mostly near the edges so the center text stays clean
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const edgeA = Math.min(a.x, w - a.x, a.y, h - a.y) < w * 0.24;
        if (!edgeA) continue;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(216,199,245,${0.14 * (1 - dist / 110)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.angle += p.drift;
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle * 0.7) * p.speed;
        if (p.x < -8) p.x = w + 8; else if (p.x > w + 8) p.x = -8;
        if (p.y < -8) p.y = h + 8; else if (p.y > h + 8) p.y = -8;
        const tw = reduced ? 1 : 0.78 + 0.22 * Math.sin(t / 1400 + p.twinkle);
        const px = p.x + mx * (p.front ? 6 : 3);
        const py = p.y + my * (p.front ? 6 : 3);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${p.baseAlpha * tw})`;
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    init();
    if (reduced) frame(0);
    else raf = requestAnimationFrame(frame);

    const onResize = () => init();
    const onMove = (e) => { mouse.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }; };
    window.addEventListener("resize", onResize);
    const fine = window.matchMedia("(pointer:fine)").matches;
    if (!reduced && fine) window.addEventListener("mousemove", onMove);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}
