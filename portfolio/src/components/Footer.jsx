import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/Sahil9505',
      icon: Github,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sahilsharma65/',
      icon: Linkedin,
    },
    {
      label: 'Email',
      href: 'mailto:sahilsharma9505@gmail.com',
      icon: Mail,
    },
  ]

  return (
    <footer className="border-t border-indigo-100 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-10 md:px-6">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <p className="text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100">Sahil Sharma</p>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Full Stack Developer</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
          {socialLinks.map((link) => {
            const Icon = link.icon

            return (
              <a
                key={link.label}
                href={link.href}
                target={link.label === 'Email' ? undefined : '_blank'}
                rel={link.label === 'Email' ? undefined : 'noreferrer'}
                className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-white/90 px-3 py-1.5 text-sm font-medium text-indigo-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md hover:shadow-indigo-100/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:border-indigo-300/30 dark:bg-slate-900/55 dark:text-indigo-100 dark:hover:bg-indigo-500/15 dark:hover:shadow-[0_0_14px_rgba(99,102,241,0.22)]"
              >
                <Icon size={15} />
                <span>{link.label}</span>
              </a>
            )
          })}
        </div>

        <p className="text-center text-sm text-slate-500 md:text-left dark:text-slate-400">© {currentYear} Sahil Sharma</p>
      </div>
    </footer>
  )
}
