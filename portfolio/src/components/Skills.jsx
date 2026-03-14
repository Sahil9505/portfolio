import { motion } from 'framer-motion'

export default function Skills() {
  const skills = [
    { name: 'HTML', level: 92 },
    { name: 'CSS', level: 88 },
    { name: 'JavaScript', level: 86 },
    { name: 'React', level: 82 },
    { name: 'Node.js', level: 76 },
    { name: 'MongoDB', level: 72 },
    { name: 'Tailwind CSS', level: 85 },
    { name: 'PHP', level: 70 },
  ]

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="scroll-mt-24 mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16"
    >
      <div className="grid gap-8 md:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl md:bg-gradient-to-r md:from-slate-900 md:to-indigo-800 md:bg-clip-text md:text-transparent dark:bg-gradient-to-r dark:from-cyan-200 dark:to-indigo-200 dark:bg-clip-text dark:text-transparent">Skills</h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-700 dark:text-slate-400">
            I build full-stack web products with a strong frontend foundation, practical backend development, and clean UI systems.
            These skills represent the technologies I use most for real-world projects.
          </p>
          <div className="mt-6 inline-flex rounded-full border border-indigo-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-700 shadow-sm dark:border-indigo-300/25 dark:bg-slate-900/45 dark:text-indigo-200">
            Frontend + Backend Workflow
          </div>
        </div>

        <div className="space-y-5 rounded-2xl border border-indigo-100 bg-white/90 p-5 shadow-sm transition duration-300 hover:shadow-md hover:shadow-indigo-100/70 dark:border-indigo-300/20 dark:bg-slate-900/35 dark:backdrop-blur-xl dark:shadow-sm dark:hover:shadow-[0_0_18px_rgba(99,102,241,0.2)] md:p-6">
          {skills.map((skill, index) => (
            <div key={skill.name}>
              <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
                <span>{skill.name}</span>
                <span className="rounded-full border border-indigo-200 bg-white/80 px-2 py-0.5 text-[11px] font-bold text-indigo-700 dark:border-indigo-300/30 dark:bg-slate-900/55 dark:text-indigo-200">
                  {skill.level}%
                </span>
              </div>

              <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200/90 dark:bg-slate-800/90">
                <motion.div
                  className="relative h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500"
                  initial={{ width: 0, opacity: 0.6 }}
                  whileInView={{ width: `${skill.level}%`, opacity: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.85, delay: index * 0.08, ease: 'easeOut' }}
                  style={{ boxShadow: '0 0 10px rgba(99,102,241,0.28), 0 0 16px rgba(59,130,246,0.16)' }}
                >
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/0 via-white/45 to-white/0"
                    initial={{ x: '-120%' }}
                    whileInView={{ x: '240%' }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 1.2, delay: index * 0.08 + 0.18, ease: 'easeOut' }}
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
