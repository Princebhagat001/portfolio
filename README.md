# Prince Bhagat Portfolio

A responsive, single-page cybersecurity portfolio built with React, Vite, Tailwind CSS, and daisyUI.

## Included sections

- Fixed responsive navigation and mobile menu
- Hero with professional focus controls
- Education timeline with expandable details
- Terminal-inspired contact section
- Closing footer with navigation and verified social links
- Fixed desktop social/resume rail

The contact form opens the visitor's default email application; no form data is stored by the site.

## Tech stack

- React 19
- Vite 8
- Tailwind CSS 4
- daisyUI 5
- JavaScript and JSX

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
```

`npm run build` creates a temporary production bundle in `dist/`. It is ignored by Git and should not be edited manually.

## Content configuration

Keep personal information centralized rather than duplicating it in components:

- `src/data/personal.js` - identity, title, location, resume path, and professional focus
- `src/data/socials.js` - external profiles and email link
- `src/data/education.js` - education records, dates, locations, grades, and expandable details

Static assets belong in `public/`:

- `public/resume.pdf` - downloadable CV/resume
- `public/icons/` - social and resume rail icons
- `public/images/` - portfolio images reserved for future sections

## SEO

Site metadata lives in `index.html`, including a canonical URL, search description, robots directive, Open Graph tags, Twitter tags, theme color, and JSON-LD person schema.
