import { motion } from 'framer-motion'

export default function About() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      items: [
        { name: 'JavaScript', symbol: 'JS' },
        { name: 'Python', symbol: 'PY' },
        { name: 'Java', symbol: 'JV' },
        { name: 'C++', symbol: 'C++' },
        { name: 'C', symbol: 'C' },
      ],
    },
    {
      title: 'Frontend',
      items: [
        { name: 'React.js', symbol: 'RE' },
        { name: 'HTML', symbol: 'H5' },
        { name: 'CSS', symbol: 'C3' },
        { name: 'Tailwind CSS', symbol: 'TW' },
      ],
    },
    {
      title: 'Backend',
      items: [
        { name: 'Node.js', symbol: 'ND' },
        { name: 'PHP', symbol: 'PHP' },
      ],
    },
    {
      title: 'Databases',
      items: [
        { name: 'MongoDB', symbol: 'MG' },
        { name: 'MySQL', symbol: 'MY' },
      ],
    },
    {
      title: 'Tools and Platforms',
      items: [
        { name: 'Git', symbol: 'GT' },
        { name: 'GitHub', symbol: 'GH' },
      ],
    },
  ]

  const skills = [
    { name: 'JavaScript', level: 88 },
    { name: 'Python', level: 82 },
    { name: 'Java', level: 78 },
    { name: 'C++', level: 74 },
    { name: 'C', level: 72 },
    { name: 'React.js', level: 84 },
    { name: 'Node.js', level: 78 },
    { name: 'PHP', level: 74 },
  ]

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="scroll-mt-24 mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-8">
        <article className="rounded-2xl border border-white/45 bg-gradient-to-br from-white/65 via-white/45 to-indigo-100/35 p-6 shadow-[0_10px_26px_rgba(15,23,42,0.16)] backdrop-blur-xl ring-1 ring-inset ring-white/30 transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(15,23,42,0.2),0_0_16px_rgba(99,102,241,0.18)] dark:border-indigo-200/15 dark:bg-gradient-to-br dark:from-slate-900/55 dark:via-slate-900/38 dark:to-indigo-950/34 dark:shadow-[0_10px_30px_rgba(0,0,0,0.42)] dark:ring-indigo-100/10 dark:hover:shadow-[0_16px_34px_rgba(0,0,0,0.48),0_0_20px_rgba(99,102,241,0.22)] md:p-7">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl md:bg-gradient-to-r md:from-slate-900 md:to-indigo-800 md:bg-clip-text md:text-transparent dark:bg-gradient-to-r dark:from-cyan-200 dark:to-indigo-200 dark:bg-clip-text dark:text-transparent">
            About Me
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-700 dark:text-slate-400">
            Hello! I&apos;m Sahil Sharma, a passionate Full Stack Developer currently pursuing a B.Tech in Computer Science and Engineering.
          </p>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-700 dark:text-slate-400">
            I enjoy building modern, responsive, and scalable web applications using technologies such as React, Node.js, JavaScript, and MongoDB.
          </p>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-700 dark:text-slate-400">
            My goal is to create efficient and user-friendly digital solutions while continuously improving my problem-solving and development skills.
          </p>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Skill Categories</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {skillCategories.map((category) => (
                <div
                  key={category.title}
                  className={`rounded-xl border border-indigo-100/80 bg-white/55 p-3 dark:border-indigo-300/20 dark:bg-slate-900/35 ${category.title === 'Tools and Platforms' ? 'sm:col-span-2' : ''}`}
                >
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{category.title}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={`${category.title}-${item.name}`}
                        className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-indigo-200 bg-white/85 px-2.5 py-1 text-xs font-semibold text-indigo-700 shadow-sm whitespace-normal break-words dark:border-indigo-300/30 dark:bg-slate-900/55 dark:text-indigo-200"
                      >
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-100 px-1 text-[10px] font-bold tracking-wide text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
                          {item.symbol}
                        </span>
                        <span>{item.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article id="skills" className="scroll-mt-24 space-y-5 self-start rounded-2xl border border-white/45 bg-gradient-to-br from-white/62 via-white/42 to-indigo-100/30 p-5 shadow-[0_10px_26px_rgba(15,23,42,0.16)] backdrop-blur-xl ring-1 ring-inset ring-white/30 transition duration-300 hover:shadow-[0_14px_34px_rgba(15,23,42,0.2),0_0_16px_rgba(99,102,241,0.18)] dark:border-indigo-200/15 dark:bg-gradient-to-br dark:from-slate-900/55 dark:via-slate-900/38 dark:to-indigo-950/34 dark:shadow-[0_10px_30px_rgba(0,0,0,0.42)] dark:ring-indigo-100/10 dark:hover:shadow-[0_16px_34px_rgba(0,0,0,0.48),0_0_20px_rgba(99,102,241,0.22)] md:p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Core Technology and Language Proficiency</h3>
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={index !== skills.length - 1 ? 'border-b border-indigo-200/45 pb-4 dark:border-indigo-300/15' : ''}
            >
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
        </article>
      </div>
    </motion.section>
  )
}
