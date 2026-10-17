import { personal } from '../data/personal'

function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-t border-white/10 bg-[#090909] py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12">
        <header>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--portfolio-green)]">
            About
          </p>
          <h2 id="about-heading" className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Cybersecurity student and developer
          </h2>
        </header>

        <div>
          <p className="max-w-3xl text-sm leading-7 text-[var(--portfolio-grey)] sm:text-base">
            {personal.footerIntroduction}
          </p>
          <ul aria-label="Focus areas" className="mt-6 flex flex-wrap gap-2">
            {personal.focusAreas.map((area) => (
              <li
                key={area}
                className="rounded-md border border-[var(--portfolio-green)]/20 bg-[var(--portfolio-green)]/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--portfolio-green)]"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
