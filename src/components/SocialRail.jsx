import { personal } from '../data/personal'

const railLinks = [
  { label: 'Email', href: `mailto:${personal.email}`, icon: '/icons/email.svg', external: false },
  { label: 'GitHub', href: 'https://github.com/Princebhagat001', icon: '/icons/github.svg', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prince-bhagat-247125407/', icon: '/icons/linkedin.svg', external: true },
  { label: 'Instagram', href: 'https://www.instagram.com/p.rince10/', icon: '/icons/instagram.svg', external: true },
  { label: 'Resume', href: personal.resumePath, icon: '/icons/resume.svg', external: true },
]

function SocialRail() {
  return (
    <nav className="social-rail" aria-label="Quick contact links">
      {railLinks.map((link) => <a key={link.label} href={link.href} {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="social-rail-link" aria-label={link.external ? `${link.label} (opens in a new tab)` : link.label}><span className="social-rail-mark" aria-hidden="true"><img src={link.icon} alt="" /></span><span className="social-rail-label">{link.label}</span></a>)}
    </nav>
  )
}

export default SocialRail
