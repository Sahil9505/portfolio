import { motion } from 'framer-motion'
import { Code2, Trophy } from 'lucide-react'

const achievements = [
  {
    icon: Trophy,
    title: '1st Position - Hack-IoT',
    description:
      'Secured 1st position at Hack-IoT by developing a functional LMS, demonstrating strong problem-solving and system design skills.',
  },
  {
    icon: Code2,
    title: '100+ Coding Problems Solved',
    description:
      'Solved 100+ coding problems on LeetCode and HackerRank, strengthening data structures and algorithm skills.',
  },
]

export default function Achievements() {
  return (
    <motion.section
      id="achievements"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="scroll-mt-24 mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16"
    >
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl md:bg-gradient-to-r md:from-slate-900 md:to-indigo-800 md:bg-clip-text md:text-transparent dark:bg-gradient-to-r dark:from-cyan-200 dark:to-indigo-200 dark:bg-clip-text dark:text-transparent">
        Achievements
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-5">
        {achievements.map((item) => {
          const Icon = item.icon

          return (
            <article
              key={item.title}
              className="rounded-2xl border border-white/45 bg-gradient-to-br from-white/65 via-white/45 to-indigo-100/35 p-5 shadow-[0_10px_26px_rgba(15,23,42,0.16)] backdrop-blur-xl ring-1 ring-inset ring-white/30 transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(15,23,42,0.2),0_0_18px_rgba(99,102,241,0.2)] dark:border-indigo-200/15 dark:bg-gradient-to-br dark:from-slate-900/55 dark:via-slate-900/38 dark:to-indigo-950/34 dark:shadow-[0_10px_30px_rgba(0,0,0,0.42)] dark:ring-indigo-100/10 dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.48),0_0_20px_rgba(99,102,241,0.22)] md:p-6"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-200 bg-white/85 text-indigo-700 shadow-sm dark:border-indigo-300/30 dark:bg-slate-900/55 dark:text-indigo-200">
                  <Icon size={18} />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 md:text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300 md:text-base">{item.description}</p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </motion.section>
  )
}
