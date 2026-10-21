import { createElement as h } from 'react';
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const styles = {
  page: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 72,
    color: '#f7f8f6',
    background:
      'radial-gradient(circle at 18% 18%, rgba(114,185,67,.2), transparent 30%), radial-gradient(circle at 82% 18%, rgba(69,201,216,.14), transparent 28%), linear-gradient(135deg, #090b10 0%, #11141c 54%, #071318 100%)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    fontSize: 28,
    color: '#b5c2c9',
    letterSpacing: 4,
  },
  brandMark: { width: 14, height: 14, borderRadius: 3, background: '#72b943' },
  content: { display: 'flex', flexDirection: 'column' },
  name: { fontSize: 78, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 },
  accent: { width: 112, height: 5, marginTop: 28, borderRadius: 3, background: '#72b943' },
  role: { marginTop: 24, fontSize: 38, color: '#80dce5', fontWeight: 600 },
  description: {
    marginTop: 24,
    maxWidth: 900,
    fontSize: 25,
    lineHeight: 1.45,
    color: 'rgba(255,255,255,.74)',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid rgba(255,255,255,.18)',
    paddingTop: 24,
    color: '#aab3ba',
    fontSize: 18,
    letterSpacing: 2,
  },
};

const image = h(
  'div',
  { style: styles.page },
  h(
    'div',
    { style: styles.brand },
    h('div', { style: styles.brandMark }),
    'PORTFOLIO',
  ),
  h(
    'div',
    { style: styles.content },
    h('div', { style: styles.name }, 'Prince Bhagat'),
    h('div', { style: styles.accent }),
    h('div', { style: styles.role }, 'Security Researcher'),
    h(
      'div',
      { style: styles.description },
      'Exploring cybersecurity, building for the web, and learning through hands-on projects.',
    ),
  ),
  h(
    'div',
    { style: styles.footer },
    h('div', null, 'KATHMANDU, NEPAL'),
    h('div', null, 'PRINCEBHAGAT.COM.NP'),
  ),
);

export default function handler() {
  return new ImageResponse(image, {
    width: 1200,
    height: 630,
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
