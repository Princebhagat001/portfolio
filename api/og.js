import sharp from 'sharp';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="greenGlow" cx="18%" cy="18%" r="42%">
      <stop offset="0" stop-color="#72b943" stop-opacity=".2" />
      <stop offset="1" stop-color="#72b943" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="cyanGlow" cx="82%" cy="18%" r="40%">
      <stop offset="0" stop-color="#45c9d8" stop-opacity=".14" />
      <stop offset="1" stop-color="#45c9d8" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#090b10" />
      <stop offset=".54" stop-color="#11141c" />
      <stop offset="1" stop-color="#071318" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#background)" />
  <rect width="1200" height="630" fill="url(#greenGlow)" />
  <rect width="1200" height="630" fill="url(#cyanGlow)" />
  <g font-family="Arial, Helvetica, sans-serif">
    <circle cx="92" cy="90" r="8" fill="#72b943" />
    <text x="118" y="100" fill="#b5c2c9" font-size="28" letter-spacing="4">PORTFOLIO</text>
    <text x="72" y="330" fill="#f7f8f6" font-size="78" font-weight="700" letter-spacing="-2">Prince Bhagat</text>
    <rect x="74" y="366" width="112" height="5" rx="3" fill="#72b943" />
    <text x="72" y="438" fill="#80dce5" font-size="38" font-weight="600">Security Researcher</text>
    <text x="72" y="492" fill="#ffffff" fill-opacity=".74" font-size="25">
      <tspan x="72" dy="0">Exploring cybersecurity, building for the web, and learning through</tspan>
      <tspan x="72" dy="36">hands-on projects.</tspan>
    </text>
    <path d="M72 556H1128" stroke="#ffffff" stroke-opacity=".18" />
    <text x="72" y="598" fill="#aab3ba" font-size="18" letter-spacing="2">KATHMANDU, NEPAL</text>
    <text x="1128" y="598" text-anchor="end" fill="#aab3ba" font-size="18" letter-spacing="2">PRINCEBHAGAT.COM.NP</text>
  </g>
</svg>`;

export default {
  async fetch() {
    const png = await sharp(new globalThis.TextEncoder().encode(svg)).png().toBuffer();

    return new globalThis.Response(png, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  },
};
