import { personal } from '../data/personal'
import { socials } from '../data/socials'

const exploreLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer id="closing" className="closing-field relative isolate min-h-[780px] overflow-hidden bg-black pt-12 sm:pt-16" aria-label="Site footer">
      <div className="relative z-10 mx-auto max-w-[1380px] border-t border-white/10 px-5 pt-14 sm:px-8 sm:pt-18 lg:px-12 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.55fr_0.7fr_0.7fr] lg:gap-20">
          <section className="max-w-md" aria-label={`About ${personal.fullName}`}>
            <p className="font-display text-2xl font-bold tracking-[-0.04em] text-[var(--portfolio-white)]">{personal.fullName}</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--portfolio-grey)]">{personal.footerIntroduction}</p>
            <p className="mt-7 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[var(--portfolio-grey)]"><span className="h-1.5 w-1.5 rounded-full animate-[dual-blink_2s_infinite]" aria-hidden="true" />{personal.status}</p>
          </section>
          <nav aria-label="Explore portfolio sections">
            <p className="mb-5 text-[10px] uppercase tracking-[0.18em] text-[var(--portfolio-grey)]">Explore</p>
            <ul className="space-y-3">{exploreLinks.map((link) => <li key={link.label}><a href={link.href} className="text-sm text-[var(--portfolio-white)] transition-colors hover:text-[var(--portfolio-green)]">{link.label}</a></li>)}</ul>
          </nav>
          <nav aria-label="Connect with Prince Bhagat">
            <p className="mb-5 text-[10px] uppercase tracking-[0.18em] text-[var(--portfolio-grey)]">Elsewhere</p>
            <ul className="space-y-3">{socials.map((social) => <li key={social.label}><a href={social.href} {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} aria-label={social.external ? `${social.label} (opens in a new tab)` : `Email ${personal.fullName}`} className="text-sm text-[var(--portfolio-white)] transition-colors hover:text-[var(--portfolio-red)]">{social.label}{social.external && <span aria-hidden="true"> ↗</span>}</a></li>)}</ul>
          </nav>
        </div>
      </div>
      <div className="wordmark name-display footer-wordmark pointer-events-none relative z-0 mt-36 select-none whitespace-nowrap text-center text-[clamp(3.15rem,11.5vw,13rem)] sm:mt-52"><span>{personal.footerDisplayName}</span></div>
      <div className="relative z-10 mx-auto mt-12 flex max-w-[1380px] flex-col gap-5 border-t border-white/10 px-5 py-7 text-[9px] uppercase tracking-[0.13em] text-[var(--portfolio-grey)] sm:mt-16 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:px-8 lg:px-12">
        <p>© {year} {personal.fullName} — All Rights Reserved</p>
        <p className="inline-flex items-center gap-3 sm:text-center">{personal.location}<span className="h-1 w-1 rounded-full bg-[var(--portfolio-grey)]" aria-hidden="true" /><span className="inline-flex items-center gap-2 text-[var(--portfolio-green)]"><span className="h-1.5 w-1.5 rounded-full bg-current animate-[pulse-glow_2.5s_ease-in-out_infinite]" aria-hidden="true" />Secured</span></p>
        <div className="flex items-center justify-between gap-5 sm:justify-self-end">
          <a href="#home" className="text-[var(--portfolio-white)] transition-colors hover:text-[var(--portfolio-green)]">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
