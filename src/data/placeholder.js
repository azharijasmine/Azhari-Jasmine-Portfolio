// Generates a simple lavender placeholder image. Replace with real paths like "images/my-photo.png".
export const ph = (label = "Image", w = 800, h = 500) =>
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#F1EAFB"/><g fill="none" stroke="#D8C7F5" stroke-width="2"><circle cx="${w * 0.78}" cy="${h * 0.3}" r="${h * 0.22}"/><path d="M0 ${h * 0.8}H${w}M0 ${h * 0.86}H${w}"/></g><rect x="${w * 0.08}" y="${h * 0.14}" width="${h * 0.14}" height="${h * 0.14}" fill="#8B5CF6" opacity=".25"/><text x="50%" y="52%" text-anchor="middle" font-family="Inter,Arial" font-size="${h * 0.055}" fill="#33233F">${label}</text></svg>`
  );
