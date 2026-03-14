const educationItems = [
  {
    title: 'Bachelor of Technology - Computer Science and Engineering',
    organization: 'Lovely Professional University',
    year: '2023 - Present',
    description: 'Focused on software development, data structures, algorithms, and web technologies.',
  },
  {
    title: 'Higher Secondary (PCM)',
    organization: 'G.S.S.S. D.G. Pura, Rewari',
    year: '2021 - 2022',
    description: '',
  },
]

export default function ResumeTimeline() {
  return (
    <section
      id="education"
      className="scroll-mt-24 mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16"
    >
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl md:bg-gradient-to-r md:from-slate-900 md:to-indigo-800 md:bg-clip-text md:text-transparent dark:bg-gradient-to-r dark:from-cyan-200 dark:to-indigo-200 dark:bg-clip-text dark:text-transparent">Education</h2>
      <p className="mt-3 max-w-2xl text-slate-700 dark:text-slate-400">
        Academic journey and core learning areas.
      </p>

      <div className="mt-8 space-y-5 md:space-y-6">
        {educationItems.map((item) => (
          <article
            key={`${item.title}-${item.year}`}
            className="rounded-2xl border border-indigo-100 bg-white/90 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-indigo-100/70 dark:border-indigo-300/20 dark:bg-slate-900/35 dark:backdrop-blur-xl dark:shadow-sm dark:hover:shadow-[0_0_16px_rgba(99,102,241,0.2)] md:p-7"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 md:text-xl">{item.title}</h3>
            <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300 md:text-base">{item.organization}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{item.year}</p>
            {item.description && (
              <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-400">{item.description}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
