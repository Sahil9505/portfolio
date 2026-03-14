import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, GitFork, Github, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import projects from '../data/projects'

const GITHUB_USERNAME = 'Sahil9505'

const CUSTOM_PROJECT_MEDIA = [
  {
    keywords: ['portfolio'],
    image: '/portfolio.png',
    screenshots: ['/portfolio.png'],
  },
  {
    keywords: ['ielts'],
    image: '/ielts.png',
    screenshots: ['/ielts.png'],
  },
  {
    keywords: ['eventplanning', 'event-planning', 'event planning'],
    image: '/Eventplanning%20dashboard.png',
    screenshots: ['/Eventplanning%20dashboard.png'],
  },
  {
    keywords: ['tictactoe', 'tic-tac-toe', 'tic tac toe'],
    image: '/tictactoe.png',
    screenshots: ['/tictactoe.png'],
  },
  {
    keywords: ['jobfinder', 'job-finder', 'job finder'],
    image: '/job%20finder.png',
    screenshots: ['/job%20finder.png'],
  },
]

function getCustomProjectMedia(repoName) {
  if (typeof repoName !== 'string' || repoName.trim() === '') return null

  const normalizedRepoName = repoName.toLowerCase()

  const matchedMedia = CUSTOM_PROJECT_MEDIA.find(({ keywords }) =>
    keywords.some((keyword) => normalizedRepoName.includes(keyword))
  )

  return matchedMedia
    ? {
        image: matchedMedia.image,
        screenshots: matchedMedia.screenshots,
      }
    : null
}

async function fetchAllGithubRepos(username) {
  const allRepos = []
  let page = 1

  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${page}&sort=updated`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch repositories')
    }

    const pageData = await response.json()

    if (!Array.isArray(pageData) || pageData.length === 0) {
      break
    }

    allRepos.push(...pageData)

    if (pageData.length < 100) {
      break
    }

    page += 1
  }

  return allRepos
}

const projectGridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

const projectCardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

function FeaturedProjectCard({ project }) {
  const fallbackImage = `https://dummyimage.com/1400x800/e2e8f0/334155&text=${encodeURIComponent(project.title)}`
  const previewImage = Array.isArray(project.screenshots) && project.screenshots.length > 0
    ? project.screenshots[0]
    : (project.image || fallbackImage)
  const techStack = Array.isArray(project.technologies) ? project.technologies.slice(0, 3) : []
  const normalizedLiveLink = typeof project.liveLink === 'string' ? project.liveLink.trim() : ''
  const normalizedGithubLink = typeof project.githubLink === 'string' ? project.githubLink.trim() : ''
  const hasLiveDemo = /^https?:\/\//i.test(normalizedLiveLink)
  const hasGithubRepo = /^https?:\/\//i.test(normalizedGithubLink)
  const summary = typeof project.description === 'string' ? project.description.trim() : ''

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/45 bg-gradient-to-br from-white/70 via-white/48 to-indigo-100/30 shadow-[0_12px_32px_rgba(15,23,42,0.16)] backdrop-blur-xl ring-1 ring-inset ring-white/35 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(15,23,42,0.22),0_0_24px_rgba(99,102,241,0.2)] dark:border-indigo-200/15 dark:bg-gradient-to-br dark:from-slate-900/60 dark:via-slate-900/40 dark:to-indigo-950/32 dark:shadow-[0_12px_34px_rgba(0,0,0,0.46)] dark:ring-indigo-100/10 dark:hover:shadow-[0_18px_42px_rgba(0,0,0,0.54),0_0_24px_rgba(99,102,241,0.24)]">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
          <img
            src={previewImage}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
        <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 md:text-2xl">{project.title}</h4>
        <p className="mt-3 line-clamp-2 min-h-[3rem] text-sm leading-6 text-slate-700 dark:text-slate-300 md:text-base">
            {summary.length > 150 ? `${summary.slice(0, 147).trim()}...` : summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={`${project.title}-featured-${tech}`}
              className="inline-flex max-w-full items-center rounded-full border border-indigo-200 bg-white/85 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm whitespace-normal break-words dark:border-indigo-300/30 dark:bg-slate-900/55 dark:text-indigo-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-0">
          <div className="flex flex-wrap items-center gap-1.5">
            {hasGithubRepo ? (
              <a
                href={normalizedGithubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} GitHub repository`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200 bg-white p-0 text-indigo-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-100 hover:text-indigo-800 hover:shadow-[0_0_16px_rgba(99,102,241,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:border-indigo-300/35 dark:bg-slate-900/45 dark:text-indigo-100 dark:hover:border-indigo-300/45 dark:hover:bg-indigo-500/15 dark:hover:text-indigo-50 dark:hover:shadow-[0_0_16px_rgba(99,102,241,0.34)]"
              >
                <Github size={14} />
              </a>
            ) : null}

            {hasLiveDemo ? (
              <a
                href={normalizedLiveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} live demo`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 p-0 text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-[0_0_18px_rgba(99,102,241,0.34)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-400 dark:hover:to-violet-400 dark:hover:shadow-[0_0_18px_rgba(99,102,241,0.38)]"
              >
                <ExternalLink size={14} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}

function formatRepoName(repoName) {
  if (typeof repoName !== 'string' || repoName.trim() === '') return 'Untitled Project'

  return repoName
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function ProjectCard({ project }) {
  const fallbackImage = `https://dummyimage.com/1200x700/e2e8f0/334155&text=${encodeURIComponent(project.title)}`
  const screenshots = Array.isArray(project.screenshots) && project.screenshots.length > 0
    ? project.screenshots
    : [project.image || fallbackImage]
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const hasMultipleImages = screenshots.length > 1

  function showPrevImage() {
    setActiveImageIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1))
  }

  function showNextImage() {
    setActiveImageIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1))
  }

  const normalizedLiveLink = typeof project.liveLink === 'string' ? project.liveLink.trim() : ''
  const hasLiveDemo = /^https?:\/\//i.test(normalizedLiveLink)
  const normalizedGithubLink = typeof project.githubLink === 'string' ? project.githubLink.trim() : ''
  const hasGithubRepo = /^https?:\/\//i.test(normalizedGithubLink)
  const visibleTechnologies = Array.isArray(project.technologies) ? project.technologies.slice(0, 3) : []
  const primaryTech = visibleTechnologies[0] || 'modern web technologies'
  const rawSummary =
    typeof project.description === 'string' && project.description.trim() !== '' && project.description !== 'No description provided.'
      ? project.description
      : `${project.category || 'Full Stack'} project focused on practical features, built with ${primaryTech}.`
  const projectSummary = rawSummary
    .replace(/\s+/g, ' ')
    .replace(/\.{2,}/g, '.')
    .trim()

  return (
    <motion.article
      variants={projectCardVariants}
      className="group relative flex h-full min-h-[25.5rem] w-full flex-col overflow-hidden rounded-2xl border border-white/45 bg-gradient-to-br from-white/65 via-white/45 to-indigo-100/35 shadow-[0_10px_26px_rgba(15,23,42,0.16)] backdrop-blur-xl ring-1 ring-inset ring-white/30 transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(15,23,42,0.2),0_0_18px_rgba(99,102,241,0.2)] sm:min-h-[26.5rem] dark:border-indigo-200/15 dark:bg-gradient-to-br dark:from-slate-900/55 dark:via-slate-900/38 dark:to-indigo-950/34 dark:shadow-[0_10px_30px_rgba(0,0,0,0.42)] dark:ring-indigo-100/10 dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_22px_rgba(99,102,241,0.24)]"
    >
      <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={`${project.title}-image-${activeImageIndex}`}
            src={screenshots[activeImageIndex]}
            alt={`${project.title} screenshot ${activeImageIndex + 1}`}
            className="absolute inset-0 h-full w-full p-2 object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            initial={{ opacity: 0, x: 18, scale: 1.05 }}
            animate={{ opacity: 1, x: 0, scale: 1.02 }}
            exit={{ opacity: 0, x: -18, scale: 1.05 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </AnimatePresence>

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={showPrevImage}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/35 bg-black/35 px-2.5 py-1.5 text-sm font-bold text-white/95 backdrop-blur-sm transition duration-200 hover:scale-105 hover:bg-black/55 dark:border-indigo-300/30 dark:bg-indigo-500/28 dark:hover:bg-indigo-500/45"
              aria-label="Previous screenshot"
            >
              {'<'}
            </button>
            <button
              type="button"
              onClick={showNextImage}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/35 bg-black/35 px-2.5 py-1.5 text-sm font-bold text-white/95 backdrop-blur-sm transition duration-200 hover:scale-105 hover:bg-black/55 dark:border-indigo-300/30 dark:bg-indigo-500/28 dark:hover:bg-indigo-500/45"
              aria-label="Next screenshot"
            >
              {'>'}
            </button>

            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/30 px-2 py-1 backdrop-blur-sm dark:bg-slate-900/45">
              {screenshots.map((_, index) => (
                <button
                  key={`${project.title}-dot-${index}`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`h-2 w-2 rounded-full transition ${
                    activeImageIndex === index
                      ? 'scale-110 bg-indigo-200 dark:bg-indigo-300'
                      : 'bg-white/60 hover:bg-white/90 dark:bg-slate-300/60 dark:hover:bg-slate-200/90'
                  }`}
                  aria-label={`Go to screenshot ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col bg-gradient-to-b from-white/45 via-indigo-50/35 to-white/30 px-4 pb-4 pt-4 dark:bg-gradient-to-b dark:from-[#172554]/62 dark:via-[#1e1b4b]/58 dark:to-[#0f172a]/56">
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-[1.05rem] font-semibold leading-snug text-slate-900 dark:text-slate-100">{project.title}</h3>
            <div className="flex shrink-0 items-center gap-3 pt-0.5 text-xs font-semibold text-slate-500 dark:text-slate-300">
              <span className="inline-flex items-center gap-1">
                <Star size={13} className="text-amber-400" />
                {project.stars ?? 0}
              </span>
              <span className="inline-flex items-center gap-1">
                <GitFork size={13} className="text-indigo-400 dark:text-cyan-300" />
                {project.forks ?? 0}
              </span>
            </div>
          </div>

          <p className="mt-2 line-clamp-2 min-h-[3rem] overflow-hidden text-sm leading-6 text-slate-700 dark:text-slate-200/90">
            {projectSummary.length > 140 ? `${projectSummary.slice(0, 137).trim()}...` : projectSummary}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {visibleTechnologies.map((tech) => (
              <span
                key={`${project.title}-${tech}`}
                className="inline-flex max-w-full items-center rounded-full border border-indigo-200 bg-white/85 px-3 py-1 text-[11px] font-semibold leading-none text-indigo-700 shadow-sm whitespace-normal break-words dark:border-indigo-300/30 dark:bg-slate-900/55 dark:text-indigo-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-3 mb-0 pt-0">
          <div className="flex items-center gap-1.5">
            {hasGithubRepo ? (
              <a
                href={normalizedGithubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-indigo-200 bg-white p-0 text-indigo-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-100 hover:text-indigo-800 hover:shadow-[0_0_16px_rgba(99,102,241,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:border-indigo-300/35 dark:bg-slate-900/45 dark:text-indigo-100 dark:hover:border-indigo-300/45 dark:hover:bg-indigo-500/15 dark:hover:text-indigo-50 dark:hover:shadow-[0_0_16px_rgba(99,102,241,0.32)]"
                aria-label={`Open ${project.title} GitHub repository`}
              >
                <Github size={14} />
              </a>
            ) : null}

            {hasLiveDemo ? (
              <a
                href={normalizedLiveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 p-0 text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-[0_0_18px_rgba(99,102,241,0.34)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:from-indigo-500 dark:to-violet-500 dark:shadow-sm dark:hover:from-indigo-400 dark:hover:to-violet-400 dark:hover:shadow-[0_0_18px_rgba(99,102,241,0.38)] dark:focus-visible:ring-indigo-300"
                aria-label={`Open ${project.title} live demo`}
              >
                <ExternalLink size={14} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects({ adminProjects = [], performanceMode = {} }) {
  const [githubRepos, setGithubRepos] = useState([])
  const [readmeDescriptions, setReadmeDescriptions] = useState({})
  const [useFallback, setUseFallback] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [isFetchingRepos, setIsFetchingRepos] = useState(false)
  const [isFetchingReadmes, setIsFetchingReadmes] = useState(false)
  const shouldReduceMotion = Boolean(performanceMode?.lowPerformanceMode)
  const isLoadingGithub = !useFallback && (isFetchingRepos || isFetchingReadmes)

  const fallbackProjects = [...adminProjects, ...projects]
  const filters = ['All', 'Frontend', 'Backend', 'Full Stack']

  function getCategoryByLanguage(language) {
    const frontendLanguages = ['JavaScript', 'TypeScript', 'HTML', 'CSS']
    const backendLanguages = ['Python', 'Java', 'PHP', 'Go', 'Rust', 'C#', 'C++']

    if (frontendLanguages.includes(language)) return 'Frontend'
    if (backendLanguages.includes(language)) return 'Backend'
    return 'Full Stack'
  }

  function normalizeProject(project) {
    return {
      ...project,
      featured: Boolean(project.featured),
      category: project.category || 'Full Stack',
      technologies: Array.isArray(project.technologies) ? project.technologies : [],
      keyFeatures: Array.isArray(project.keyFeatures) ? project.keyFeatures : [],
      stars: typeof project.stars === 'number' ? project.stars : 0,
      forks: typeof project.forks === 'number' ? project.forks : 0,
    }
  }

  function extractReadmeSummary(base64Content) {
    if (!base64Content) return ''

    try {
      const decoded = atob(base64Content)
      const cleaned = decoded
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/^#{1,6}\s.*$/gm, ' ')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\r/g, ' ')

      const lines = cleaned
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 35)

      const summary = lines[0] || ''
      const firstSentence = summary.split(/(?<=[.!?])\s+/)[0] || summary
      return firstSentence.length > 150 ? `${firstSentence.slice(0, 147).trim()}...` : firstSentence
    } catch {
      return ''
    }
  }

  useEffect(() => {
    async function fetchRepos() {
      if (shouldReduceMotion) {
        setUseFallback(true)
        setIsFetchingRepos(false)
        return
      }

      setIsFetchingRepos(true)

      try {
        const data = await fetchAllGithubRepos(GITHUB_USERNAME)

        if (Array.isArray(data) && data.length > 0) {
          setGithubRepos(data)
          setUseFallback(false)
        } else {
          setUseFallback(true)
        }
      } catch {
        setUseFallback(true)
      } finally {
        setIsFetchingRepos(false)
      }
    }

    fetchRepos()
  }, [shouldReduceMotion])

  useEffect(() => {
    async function fetchReadmes() {
      if (useFallback || githubRepos.length === 0) {
        setIsFetchingReadmes(false)
        return
      }

      setIsFetchingReadmes(true)

      try {
        const entries = await Promise.all(
          githubRepos.map(async (repo) => {
            try {
              const response = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`)

              if (!response.ok) {
                return [repo.full_name, '']
              }

              const data = await response.json()
              return [repo.full_name, extractReadmeSummary(data.content)]
            } catch {
              return [repo.full_name, '']
            }
          })
        )

        setReadmeDescriptions(Object.fromEntries(entries))
      } catch {
        setReadmeDescriptions({})
      } finally {
        setIsFetchingReadmes(false)
      }
    }

    fetchReadmes()
  }, [githubRepos, useFallback])

  const normalizedFallbackProjects = fallbackProjects.map(normalizeProject)

  const featuredProjects = normalizedFallbackProjects
    .filter((project) => project.featured)
    .slice(0, 2)

  const githubProjects = !useFallback && githubRepos.length > 0
    ? githubRepos.map((repo) => {
        const customMedia = getCustomProjectMedia(repo.name)

        return {
          title: formatRepoName(repo.name),
          description: readmeDescriptions[repo.full_name] || repo.description || 'No description provided.',
          category: getCategoryByLanguage(repo.language),
          technologies: repo.language ? [repo.language] : ['General'],
          keyFeatures: [
            'Repository includes structured source code and modular components.',
            'Implements practical features with version-controlled collaboration workflow.',
            'Built and maintained with focus on readability and iterative improvement.',
          ],
          stars: repo.stargazers_count ?? 0,
          forks: repo.forks_count ?? 0,
          githubLink: repo.html_url,
          liveLink: typeof repo.homepage === 'string' ? repo.homepage.trim() : '',
          image: customMedia?.image ||
            (
              repo.owner?.login && repo.name
                ? `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`
                : ''
            ),
          screenshots: customMedia?.screenshots ||
            (
              repo.owner?.login && repo.name
                ? [
                    `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
                    `https://dummyimage.com/1200x700/e2e8f0/334155&text=${encodeURIComponent(repo.name)}+Preview+2`,
                    `https://dummyimage.com/1200x700/e2e8f0/334155&text=${encodeURIComponent(repo.name)}+Preview+3`,
                  ]
                : []
            ),
          key: repo.id,
        }
      })
    : []

  const mergedProjects = [...normalizedFallbackProjects, ...githubProjects]
  const seenProjects = new Set()
  const uniqueProjects = mergedProjects.filter((project) => {
    const identity = (typeof project.githubLink === 'string' && project.githubLink.trim() !== '')
      ? project.githubLink.trim().toLowerCase()
      : `${project.title}-${project.category}`.toLowerCase()

    if (seenProjects.has(identity)) {
      return false
    }

    seenProjects.add(identity)
    return true
  })

  const allProjects = uniqueProjects.filter((project) => activeFilter === 'All' || project.category === activeFilter)

  return (
    <motion.section
      id="projects"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      animate={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="scroll-mt-24 mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16"
    >
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl md:bg-gradient-to-r md:from-slate-900 md:to-indigo-800 md:bg-clip-text md:text-transparent dark:bg-gradient-to-r dark:from-cyan-200 dark:to-indigo-200 dark:bg-clip-text dark:text-transparent">Projects</h2>
      <p className="mt-3 max-w-2xl text-slate-700 dark:text-slate-400">Selected projects and experiments from my development journey.</p>
      {isLoadingGithub ? (
        <p className="mt-2 hidden text-sm font-medium text-indigo-700/90 md:block dark:text-indigo-300/90">
          Loading GitHub projects...
        </p>
      ) : null}

      {featuredProjects.length > 0 ? (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 md:text-2xl">Featured Projects</h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">Highlighted work that best represents my full-stack development strengths.</p>
          <div className="mt-5 grid auto-rows-fr grid-cols-1 items-stretch justify-items-stretch gap-6 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard key={`${project.title}-featured-${index}`} project={project} />
            ))}
          </div>
        </div>
      ) : null}

      <h3 className="mt-10 text-xl font-semibold text-slate-900 dark:text-slate-100 md:text-2xl">All Projects</h3>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition duration-300 ${
              activeFilter === filter
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 dark:from-indigo-500 dark:to-violet-500 dark:shadow-[0_0_18px_rgba(99,102,241,0.35)]'
                : 'bg-indigo-50 text-indigo-700 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-indigo-100 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-indigo-500/20'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {allProjects.length > 0 ? (
        <motion.div
          variants={projectGridVariants}
          initial="visible"
          animate="visible"
          className="mx-auto mt-8 grid auto-rows-fr max-w-6xl grid-cols-1 content-start items-stretch justify-items-stretch gap-x-6 gap-y-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {allProjects.map((project, index) => (
            <ProjectCard key={project.key || `${project.title}-${index}`} project={project} />
          ))}
        </motion.div>
      ) : (
        <div className="mt-8 rounded-2xl border border-indigo-200/45 bg-white/55 px-5 py-6 text-center text-sm font-medium text-slate-700 shadow-sm dark:border-indigo-300/20 dark:bg-slate-900/30 dark:text-slate-300">
          No projects found for {activeFilter}. Try another filter.
        </div>
      )}
    </motion.section>
  )
}
