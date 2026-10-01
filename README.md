# Personal Portfolio (React + Vite) — Interactive Edition

    npm install
    npm run dev        # local preview
    npm run build      # production build in /dist

## What changed in this upgrade
Presentation, motion and interactivity were upgraded; your content system,
data files and section structure were kept as-is.

- **Home** is now an immersive dark indigo/plum hero: a canvas particle field
  with a sparse constellation network, a couple of soft floating blobs and
  geometric shapes, staggered text entrance, subtle mouse parallax (desktop
  only) and a slow scroll-parallax as you leave it. No illustration or
  avatar - your name and details are the visual focus, pulled straight from
  `src/data/profile.js` as before.
- **Projects** is now a horizontal carousel (prev/next, swipe on mobile,
  arrow keys when the section is in view) that automatically fits however
  many projects are in `src/data/projects.js`. "View Details" opens a
  full-screen case study instead of a small popup.
- **Skills** categories are filterable, with cards staggering in on change.
- **Certifications** get a subtle lift-and-tilt hover and reveal as you
  scroll to them.
- **Achievements** are shown as an interactive timeline; click any entry for
  a larger preview.
- A thin scroll-progress bar sits at the very top, and a small chapter
  indicator (e.g. "03 / 08 Projects") floats at the bottom-right once you
  scroll past Home (Home has its own, dark-themed version).
- Up/Down arrow keys step between chapters (skipped while typing in the
  contact form). This is a smooth `scrollIntoView`, not scroll-hijacking, so
  normal trackpad/wheel/touch scrolling still behaves exactly as expected -
  it felt safer than fully replacing native scroll for an accessible,
  recruiter-facing site.
- Everything respects `prefers-reduced-motion`: particles stop animating,
  parallax is disabled, and reveal/stagger/tilt effects show their final
  state immediately.

## Replace the sample content (still no UI changes needed)
All content lives in `src/data/`:
- `profile.js` - brand, name, headline, intro, About text + cards, contact links, tagline, resume summary
- `sections.js` - the ordered chapter list (id + label) used by the nav, the Home chapter index and the floating indicator
- `projects.js` - add as many objects as you like; the carousel, count and case study are generated automatically
- `skills.js`, `certifications.js`, `achievements.js` - same idea
- `public/resume.pdf` - replace with your own PDF (keep the file name, or change `resume.file` in profile.js)
- Images: put files in `public/images/` and use `"images/your-file.png"` as the image path (the sample data uses generated placeholders)

Colours are CSS variables at the top of `src/styles.css`; the hero's dark
palette is defined right in the `.hero` rule if you want to tune it.
The contact form validates input and opens the visitor's email app; to send
directly, swap the `submit` handler in `ContactForm` for a Formspree/EmailJS
call.
