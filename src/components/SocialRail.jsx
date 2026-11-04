import { personal } from '../data/personal'
import { socials } from '../data/socials'

const railLinks = [
  ...socials.filter(({ label }) => label !== 'TryHackMe').map((social) => ({
    ...social,
    external: social.label !== 'Email' && social.external,
    icon: `/icons/${social.label.toLowerCase()}.svg`,
  })),
  { label: 'Resume', href: personal.resumePath, icon: '/icons/resume.svg', external: true },
]

function SocialRail() {
  return (
    <nav className="social-rail" aria-label="Quick contact links">
      {railLinks.map((link, index) => (
        <a 
          key={link.label} 
          href={link.href} 
          {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} 
          className="social-rail-link animate-[slideInLeftItem_0.6s_ease-out_forwards]" 
          aria-label={link.external ? `${link.label} (opens in a new tab)` : link.label}
          style={{ opacity: 0, animationDelay: `${200 + (index * 150)}ms` }}
        >
          <span className="social-rail-mark" aria-hidden="true"><img src={link.icon} alt="" /></span>
          <span className="social-rail-label">{link.label}</span>
        </a>
      ))}
    </nav>
  )
}

export default SocialRail
