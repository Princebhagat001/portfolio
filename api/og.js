import { readFile } from 'node:fs/promises';
import { createElement as h } from 'react';
import sharp from 'sharp';
import satori from 'satori';

const fontPromise = readFile(new globalThis.URL('./fonts/OpenSans.ttf', import.meta.url));

const backgroundSvg = `
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
  <circle cx="92" cy="90" r="8" fill="#72b943" />
  <rect x="74" y="366" width="112" height="5" rx="3" fill="#72b943" />
  <path d="M72 556H1128" stroke="#ffffff" stroke-opacity=".18" />
</svg>`;

async function createTextSvg() {
  const font = await fontPromise;

  return satori(
    h(
      'div',
      {
        style: {
          position: 'relative',
          display: 'flex',
          width: '1200px',
          height: '630px',
          fontFamily: 'Open Sans',
          color: '#f7f8f6',
        },
      },
      h(
        'div',
        {
          style: {
            position: 'absolute',
            left: 118,
            top: 72,
            fontSize: 28,
            fontWeight: 400,
            letterSpacing: 4,
            color: '#b5c2c9',
          },
        },
        'PORTFOLIO',
      ),
      h(
        'div',
        {
          style: {
            position: 'absolute',
            left: 72,
            top: 232,
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -2,
          },
        },
        'Prince Bhagat',
      ),
      h(
        'div',
        {
          style: {
            position: 'absolute',
            left: 72,
            top: 382,
            fontSize: 38,
            fontWeight: 600,
            color: '#80dce5',
          },
        },
        'Security Researcher',
      ),
      h(
        'div',
        {
          style: {
            position: 'absolute',
            left: 72,
            top: 452,
            width: 1000,
            display: 'flex',
            flexDirection: 'column',
            fontSize: 25,
            lineHeight: 1.45,
            color: 'rgba(255,255,255,.74)',
          },
        },
        h('div', null, 'Exploring cybersecurity, building for the web, and learning through'),
        h('div', null, 'hands-on projects.'),
      ),
      h(
        'div',
        {
          style: {
            position: 'absolute',
            left: 72,
            top: 572,
            fontSize: 18,
            letterSpacing: 2,
            color: '#aab3ba',
          },
        },
        'KATHMANDU, NEPAL',
      ),
      h(
        'div',
        {
          style: {
            position: 'absolute',
            right: 72,
            top: 572,
            fontSize: 18,
            letterSpacing: 2,
            color: '#aab3ba',
          },
        },
        'PRINCEBHAGAT.COM.NP',
      ),
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Open Sans', data: font, weight: 400, style: 'normal' }],
    },
  );
}

export default {
  async fetch() {
    const textSvg = await createTextSvg();
    const png = await sharp(globalThis.Buffer.from(backgroundSvg))
      .composite([{ input: globalThis.Buffer.from(textSvg) }])
      .png()
      .toBuffer();

    return new globalThis.Response(png, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  },
};
