import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  // Simple SVG OG image as PNG placeholder
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(262, 88%, 57%);stop-opacity:1" />
          <stop offset="100%" style="stop-color:hsl(220, 85%, 60%);stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <text x="600" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="bold" text-anchor="middle" fill="white">
        Devon Hills
      </text>
      <text x="600" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="32" text-anchor="middle" fill="rgba(255,255,255,0.9)">
        Software Engineer
      </text>
      <text x="600" y="420" font-family="system-ui, -apple-system, sans-serif" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.8)">
        Building digital products that make a difference
      </text>
    </svg>
  `;

  // Convert SVG to PNG would require additional dependencies
  // For now, return the SVG as PNG content type
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000', // 1 year
    },
  });
};
