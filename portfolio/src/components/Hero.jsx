import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const particles = [
  { size: 2, top: '8%', left: '10%', duration: 14, delay: 0.2, drift: 8, opacity: 0.45 },
  { size: 3, top: '14%', left: '28%', duration: 18, delay: 1.1, drift: 12, opacity: 0.38 },
  { size: 2, top: '20%', left: '46%', duration: 16, delay: 0.4, drift: 10, opacity: 0.4 },
  { size: 4, top: '18%', left: '64%', duration: 20, delay: 2.3, drift: 12, opacity: 0.32 },
  { size: 2, top: '10%', left: '82%', duration: 15, delay: 0.8, drift: 9, opacity: 0.4 },
  { size: 3, top: '30%', left: '14%', duration: 21, delay: 1.7, drift: 13, opacity: 0.35 },
  { size: 2, top: '34%', left: '36%', duration: 17, delay: 0.5, drift: 9, opacity: 0.42 },
  { size: 3, top: '26%', left: '56%', duration: 19, delay: 2.0, drift: 11, opacity: 0.34 },
  { size: 2, top: '38%', left: '74%', duration: 15, delay: 0.2, drift: 8, opacity: 0.45 },
  { size: 4, top: '44%', left: '90%', duration: 23, delay: 1.9, drift: 14, opacity: 0.28 },
  { size: 2, top: '56%', left: '20%', duration: 16, delay: 0.9, drift: 10, opacity: 0.4 },
  { size: 3, top: '50%', left: '42%', duration: 18, delay: 2.4, drift: 11, opacity: 0.36 },
  { size: 2, top: '62%', left: '58%', duration: 20, delay: 1.0, drift: 12, opacity: 0.34 },
  { size: 3, top: '60%', left: '76%', duration: 17, delay: 0.6, drift: 10, opacity: 0.4 },
  { size: 2, top: '72%', left: '8%', duration: 15, delay: 1.5, drift: 9, opacity: 0.42 },
  { size: 4, top: '78%', left: '30%', duration: 24, delay: 2.1, drift: 13, opacity: 0.26 },
  { size: 2, top: '84%', left: '54%', duration: 16, delay: 0.3, drift: 9, opacity: 0.43 },
  { size: 3, top: '88%', left: '86%', duration: 22, delay: 1.3, drift: 12, opacity: 0.31 },
]

export default function Hero() {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const parallaxX = useSpring(pointerX, { stiffness: 28, damping: 18, mass: 0.7 })
  const parallaxY = useSpring(pointerY, { stiffness: 28, damping: 18, mass: 0.7 })
  const slowLayerX = useTransform(parallaxX, (v) => v * 0.28)
  const slowLayerY = useTransform(parallaxY, (v) => v * 0.2)

  const textItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5
    pointerX.set(relativeX * 16)
    pointerY.set(relativeY * 12)
  }

  const handlePointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.section
      id="home"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.14 }}
      className="scroll-mt-24 relative mx-auto grid max-w-6xl gap-6 px-4 pb-10 pt-4 md:grid-cols-[1.05fr_0.95fr] md:items-end md:gap-10 md:px-6 md:pb-16 md:pt-14"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ x: slowLayerX, y: slowLayerY }}>
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full bg-indigo-300 dark:bg-cyan-200"
            style={{
              top: particle.top,
              left: particle.left,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: '0 0 10px rgba(129, 140, 248, 0.35)',
            }}
            animate={{
              y: [0, -particle.drift, 0],
              x: [0, particle.drift * 0.25, 0],
              opacity: [particle.opacity * 0.65, particle.opacity, particle.opacity * 0.65],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-600/20"
        animate={{ scale: [1, 1.08, 1], x: [0, 12, 0], y: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-12 z-0 h-64 w-64 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-700/25"
        animate={{ scale: [1, 1.06, 1], x: [0, -10, 0], y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      <div className="relative z-10 max-w-3xl pt-1 md:pt-0">
        <motion.h1
          variants={textItem}
          transition={{ duration: 0.52, ease: 'easeOut' }}
          className="max-w-3xl text-2xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-7xl md:bg-gradient-to-r md:from-slate-900 md:to-indigo-800 md:bg-clip-text md:text-transparent dark:bg-gradient-to-r dark:from-cyan-200 dark:via-indigo-200 dark:to-violet-300 dark:bg-clip-text dark:text-transparent"
        >
          Sahil Sharma
        </motion.h1>

        <motion.h2
          variants={textItem}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-2 text-base font-semibold text-slate-700 sm:mt-4 sm:text-xl md:text-2xl dark:text-slate-300"
        >
          Full Stack Developer
        </motion.h2>

        <motion.p
          variants={textItem}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:mt-6 md:text-lg md:leading-8 dark:text-slate-400"
        >
          I build scalable web applications and modern user interfaces using technologies like React, Node.js, and JavaScript.
        </motion.p>

        <motion.p
          variants={textItem}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-4 text-sm font-medium leading-7 tracking-wide text-slate-700 sm:text-base dark:text-slate-300"
        >
          React • Node.js • JavaScript • MongoDB • Tailwind
        </motion.p>

        <motion.div
          variants={textItem}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4"
        >
          <a
            href="#projects"
            className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:scale-[1.015] hover:from-indigo-500 hover:to-violet-500 hover:shadow-md hover:shadow-indigo-200/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 sm:w-auto dark:from-indigo-500 dark:to-violet-500 dark:shadow-[0_0_20px_rgba(99,102,241,0.35)] dark:hover:from-indigo-400 dark:hover:to-violet-400 dark:hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] dark:focus-visible:ring-indigo-300"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl border border-indigo-200 bg-white/90 px-6 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:scale-[1.015] hover:border-indigo-300 hover:bg-indigo-50/90 hover:shadow-md hover:shadow-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 sm:w-auto dark:border-indigo-300/35 dark:bg-slate-900/55 dark:text-indigo-100 dark:backdrop-blur-md dark:hover:bg-indigo-500/15 dark:hover:shadow-[0_0_16px_rgba(79,70,229,0.28)] dark:focus-visible:ring-indigo-300"
          >
            Download Resume
          </a>
          <a
            href="https://github.com/Sahil9505"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:scale-[1.015] hover:border-slate-400 hover:bg-slate-100 hover:shadow-md hover:shadow-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 sm:w-auto dark:border-slate-600 dark:bg-slate-900/55 dark:text-slate-100 dark:backdrop-blur-md dark:hover:bg-slate-800/70 dark:hover:shadow-[0_0_16px_rgba(148,163,184,0.24)] dark:focus-visible:ring-slate-400"
          >
            GitHub
          </a>
        </motion.div>
      </div>

      <motion.aside
        variants={{ hidden: { opacity: 0, y: 24, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1 } }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 mx-auto w-full max-w-sm rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-100 px-4 pb-5 pt-5 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_16px_32px_rgba(99,102,241,0.18)] dark:border-indigo-300/20 dark:bg-slate-900/35 dark:backdrop-blur-xl dark:shadow-[0_10px_24px_rgba(2,6,23,0.45)] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.22)] sm:pt-16 md:px-5 md:pb-6 md:pt-16"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mx-auto h-32 w-32 rounded-full border-4 border-white/85 bg-white p-1 shadow-[0_10px_24px_rgba(99,102,241,0.24)] ring-1 ring-indigo-200/70 dark:border-slate-900 dark:bg-slate-900 dark:ring-indigo-300/35 sm:absolute sm:left-1/2 sm:top-0 sm:h-[164px] sm:w-[164px] sm:-translate-x-1/2 sm:-translate-y-[62%]"
        >
          <img
            src="/profile.jpeg"
            alt="Sahil Sharma profile"
            className="h-full w-full rounded-full object-cover object-center"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, 0.8, 0, -0.8, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-4 sm:mt-0"
        >
          <p className="mt-1 text-center text-sm font-medium text-slate-600 dark:text-slate-400">Developer Profile</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
              React
            </span>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
              Node.js
            </span>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
              JavaScript
            </span>
          </div>
        </motion.div>
      </motion.aside>
    </motion.section>
  )
}
