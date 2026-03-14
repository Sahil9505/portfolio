import { motion } from 'framer-motion'
import { BrainCircuit, Code2, Database, Server } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    text: 'Built responsive web interfaces using React and Tailwind CSS.',
  },
  {
    icon: Server,
    text: 'Developed backend APIs using Node.js and PHP.',
  },
  {
    icon: Database,
    text: 'Integrated databases such as MySQL and MongoDB.',
  },
  {
    icon: BrainCircuit,
    text: 'Solved 100+ problems on LeetCode and HackerRank.',
  },
]

export default function EngineeringHighlights() {
  return (
    <motion.section
      id="engineering-highlights"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="scroll-mt-24 mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16"
    >
      <article className="rounded-2xl border border-white/45 bg-gradient-to-br from-white/65 via-white/45 to-indigo-100/35 p-6 shadow-[0_10px_26px_rgba(15,23,42,0.16)] backdrop-blur-xl ring-1 ring-inset ring-white/30 transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(15,23,42,0.2),0_0_18px_rgba(99,102,241,0.2)] dark:border-indigo-200/15 dark:bg-gradient-to-br dark:from-slate-900/55 dark:via-slate-900/38 dark:to-indigo-950/34 dark:shadow-[0_10px_30px_rgba(0,0,0,0.42)] dark:ring-indigo-100/10 dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.48),0_0_20px_rgba(99,102,241,0.22)] md:p-7">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl md:bg-gradient-to-r md:from-slate-900 md:to-indigo-800 md:bg-clip-text md:text-transparent dark:bg-gradient-to-r dark:from-cyan-200 dark:to-indigo-200 dark:bg-clip-text dark:text-transparent">
          Engineering Highlights
        </h2>

        <ul className="mt-6 space-y-3 text-base leading-7 text-slate-700 dark:text-slate-300">
          {highlights.map((highlight) => (
            <li key={highlight.text} className="flex items-start gap-3 rounded-xl border border-transparent p-2 transition duration-200 hover:border-indigo-200/60 hover:bg-indigo-50/45 dark:hover:border-indigo-300/25 dark:hover:bg-indigo-500/8">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-200 bg-white/85 text-indigo-700 shadow-sm dark:border-indigo-300/30 dark:bg-slate-900/55 dark:text-indigo-200">
                <highlight.icon size={17} />
              </span>
              <span>{highlight.text}</span>
            </li>
          ))}
        </ul>
      </article>
    </motion.section>
  )
}
