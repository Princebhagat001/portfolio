const validSections = new Set([
  '',
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'education',
  'certificates',
  'contact',
  'closing',
])

/**
 * Returns the invalid path or hash section, or null when the URL is valid.
 * Accepts URL parts as arguments so it can be reused without reading browser
 * globals at module load time.
 */
export function getInvalidRoute(pathname, hash) {
  if (pathname !== '/' && pathname !== '/index.html') {
    return pathname.replace(/^\/+/, '')
  }

  const section = hash.replace(/^#/, '')
  return section && !validSections.has(section) ? section : null
}
