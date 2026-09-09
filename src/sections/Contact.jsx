import { useState } from 'react'
import { personal } from '../data/personal'
import { socials } from '../data/socials'

const socialHandles = {
  GitHub: 'github.com/Princebhagat001',
  LinkedIn: 'linkedin.com/in/prince-bhagat-247125407',
  TryHackMe: 'tryhackme.com/p/Princebhagat001',
  Instagram: 'instagram.com/p.rince10',
}

function TerminalDots() {
  return <span className="flex gap-2" aria-hidden="true"><i className="terminal-dot terminal-dot-red" /><i className="terminal-dot terminal-dot-yellow" /><i className="terminal-dot terminal-dot-green" /></span>
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const submitMessage = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
    globalThis.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
  }

  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  return (
    <section id="contact" className="terminal-section relative overflow-hidden border-t border-white/10 bg-black py-20 sm:py-28" aria-labelledby="contact-heading">
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <header className="mx-auto max-w-4xl text-center">
          <p className="terminal-prompt">./open_channel.sh</p>
          <h2 id="contact-heading" className="mt-5 font-display text-[clamp(2.35rem,5.7vw,4.75rem)] font-bold leading-none tracking-[-0.06em] text-[var(--portfolio-white)]">Start a <span className="text-[var(--portfolio-green)]">conversation.</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[var(--portfolio-grey)]">For security research, collaboration, or a focused project, choose a channel below or send a message directly.</p>
        </header>

        <div className="mt-14 grid gap-7 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="terminal-window" aria-labelledby="contact-info-heading">
            <div className="terminal-window-bar"><TerminalDots /><span className="text-[var(--portfolio-green)]">~/contact_info.sh</span></div>
            <div className="p-[1.42rem] sm:p-[1.9rem]">
              <h3 id="contact-info-heading" className="font-mono text-xl font-bold text-[var(--portfolio-white)]">$ cat contact_info</h3>
              <div className="mt-7 space-y-3">
                <a href={`mailto:${personal.email}`} className="contact-channel"><span className="channel-symbol">@</span><span><small>Email</small><strong>{personal.email}</strong></span></a>
                {socials.filter((social) => social.label !== 'Email').map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="contact-channel" aria-label={`${social.label}: ${socialHandles[social.label]} (opens in a new tab)`}><span className="channel-symbol">↗</span><span><small>{social.label}</small><strong>{socialHandles[social.label]}</strong></span></a>)}
              </div>
              <div className="mt-8 border-t border-[var(--portfolio-green)]/30 pt-5">
                <p className="font-display text-base font-semibold text-[var(--portfolio-white)]"><span className="mr-2 text-[var(--portfolio-green)]">✓</span>Secure communication</p>
                <p className="mt-2 text-sm leading-6 text-[var(--portfolio-grey)]">For sensitive information, use encrypted channels.</p>
              </div>
            </div>
          </section>

          <form className="terminal-window" onSubmit={submitMessage}>
            <div className="terminal-window-bar"><TerminalDots /><span className="text-[var(--portfolio-red)]">~/send_message.sh</span></div>
            <div className="space-y-5 p-[1.42rem] sm:p-[1.9rem]">
              <div>
                <label htmlFor="contact-name" className="terminal-label">Name</label>
                <input id="contact-name" name="name" value={form.name} onChange={updateField} autoComplete="name" placeholder="Your name" className="terminal-input" required />
              </div>
              <div>
                <label htmlFor="contact-email" className="terminal-label">Email</label>
                <input id="contact-email" name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" placeholder="you@example.com" className="terminal-input" required />
              </div>
              <div>
                <label htmlFor="contact-message" className="terminal-label">Message</label>
                <textarea id="contact-message" name="message" value={form.message} onChange={updateField} placeholder="Write your message..." className="terminal-input min-h-36 resize-y" required />
              </div>
              <button type="submit" className="terminal-submit">Send message <span aria-hidden="true">→</span></button>
              <p className="text-center text-[10px] uppercase tracking-[0.11em] text-[var(--portfolio-grey)]">Opens your email application · no data stored</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
