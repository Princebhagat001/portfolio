# Prince Bhagat Portfolio

A responsive, single-page portfolio built with React and Vite. It presents cybersecurity learning, skills, projects and platform activity, education, certificates, and contact links.

## Features

- Responsive navigation and mobile menu
- Hero section with the GeometricArt graphic
- Skills, experience, projects, education, and certificates sections
- Contact form that opens the visitor's email application; the site does not submit or store form data
- Social links and resume links
- Device-aware graphics quality and reduced-motion handling
- SEO metadata and Person JSON-LD in `index.html`
- Sitemap and crawler rules in `public/sitemap.xml` and `public/robots.txt`
- Generated Open Graph image served by the Vercel function at `/api/og`

## Tech stack

- React 19 and Vite 8
- Tailwind CSS 4 and daisyUI 5
- Satori and Sharp for the Open Graph image function
- JavaScript and JSX

## Run locally

```bash
npm install
npm run dev
```

Vite's development server runs the portfolio frontend. The `/api/og` serverless function is configured for Vercel; to run that function locally, use the Vercel CLI with `vercel dev`.

## Checks and production build

```bash
npm run lint
npm run build
```

The build creates `dist/`. It is generated output, ignored by Git, and should not be edited manually.

## Project structure

- `src/components/` - reusable interface components
- `src/sections/` - the page's content sections
- `src/data/` - personal, social, certificate, and education content
- `src/hooks/` - device graphics-quality and motion preference handling
- `src/utilis/` - route validation, motion values, and graphics-quality selection
- `api/og.js` - Vercel Open Graph image endpoint
- `api/fonts/` - Open Sans font and its SIL Open Font License, used by the image endpoint
- `public/` - static images, icons, resume, sitemap, and robots file

Personal details are in `src/data/personal.js`, social profiles in `src/data/socials.js`, education in `src/data/education.js`, and certificate information in `src/data/certifications.js`.

## Deployment notes

Vercel serves the Vite app and the `/api/og` function. `vercel.json` includes the Open Sans font file in that function's deployment bundle. The OG image response is cached by shared caches for one day, with stale content allowed while it refreshes.
