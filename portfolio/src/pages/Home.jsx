import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import ResumeTimeline from '../components/ResumeTimeline'
import Projects from '../components/Projects'
import EngineeringHighlights from '../components/EngineeringHighlights'
import Achievements from '../components/Achievements'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function FlowDivider({ flip = false }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 ${flip ? 'bottom-0 rotate-180' : 'top-0'} z-10`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-10 w-full md:h-14"
        aria-hidden="true"
      >
        <path
          d="M0,64 C160,20 320,16 480,40 C640,64 800,78 960,60 C1120,42 1280,12 1440,28 L1440,0 L0,0 Z"
          className="fill-indigo-100/55 dark:fill-indigo-900/25"
        />
      </svg>
    </div>
  )
}

function SectionBand({ children, tone = 'base', withTopDivider = false, withBottomDivider = false }) {
  const toneClass = {
    base: 'bg-transparent',
    soft: 'bg-gradient-to-b from-white/55 via-indigo-50/35 to-white/45 dark:from-slate-900/18 dark:via-indigo-950/22 dark:to-slate-900/14',
    glow: 'bg-gradient-to-b from-cyan-50/45 via-indigo-50/35 to-violet-50/40 dark:from-cyan-950/18 dark:via-indigo-950/28 dark:to-violet-950/18',
    deep: 'bg-gradient-to-b from-indigo-100/35 via-white/40 to-sky-50/35 dark:from-indigo-950/32 dark:via-slate-950/22 dark:to-cyan-950/16',
  }

  return (
    <section className={`relative py-0 ${toneClass[tone]}`}>
      {withTopDivider ? <FlowDivider /> : null}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/30 to-transparent dark:from-white/5" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-indigo-100/25 to-transparent dark:from-indigo-900/10" />
      <div className="relative z-20">{children}</div>
      {withBottomDivider ? <FlowDivider flip /> : null}
    </section>
  )
}

export default function Home({ adminProjects, theme, onToggleTheme, performanceMode }) {
  return (
    <main className="relative overflow-x-clip pt-20 md:pt-16">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <SectionBand tone="base">
        <Hero performanceMode={performanceMode} />
      </SectionBand>

      <SectionBand tone="soft" withTopDivider withBottomDivider>
        <About />
      </SectionBand>

      <SectionBand tone="glow" withTopDivider withBottomDivider>
        <ResumeTimeline />
      </SectionBand>

      <SectionBand tone="soft" withTopDivider withBottomDivider>
        <Projects adminProjects={adminProjects} />
      </SectionBand>

      <SectionBand tone="deep" withTopDivider withBottomDivider>
        <EngineeringHighlights />
      </SectionBand>

      <SectionBand tone="soft" withTopDivider withBottomDivider>
        <Achievements />
      </SectionBand>

      <SectionBand tone="glow" withTopDivider>
        <Contact />
      </SectionBand>

      <Footer />
    </main>
  )
}
