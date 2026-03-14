import { Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ theme, onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#education', label: 'Education' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]

  function handleNavClick() {
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/80 shadow-sm backdrop-blur dark:border-indigo-300/20 dark:bg-slate-900/55">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-2">
        <a href="#home" className="shrink-0 text-base font-bold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
          <span className="sm:hidden">Sahil</span>
          <span className="hidden sm:inline">Sahil Sharma</span>
        </a>
        <div className="flex items-center gap-2">
          <div className="hidden min-w-0 items-center gap-2 text-sm font-medium text-slate-600 md:flex md:gap-3 dark:text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 transition duration-100 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:hover:bg-indigo-500/15 dark:hover:text-indigo-100 dark:hover:shadow-[0_0_14px_rgba(99,102,241,0.32)] dark:focus-visible:ring-indigo-400"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={onToggleTheme}
            className="group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition duration-100 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-indigo-300/30 dark:bg-gradient-to-br dark:from-indigo-500 dark:to-violet-500 dark:text-white dark:shadow-[0_0_14px_rgba(99,102,241,0.4)] dark:hover:brightness-110 dark:focus-visible:ring-indigo-300"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="flex items-center justify-center">
              {theme === 'dark' ? <Sun size={14} strokeWidth={2.2} /> : <Moon size={14} strokeWidth={2.2} />}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition duration-100 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 md:hidden dark:border-indigo-300/30 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:ring-indigo-300"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? <X size={18} strokeWidth={2.3} /> : <Menu size={18} strokeWidth={2.3} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`${isMenuOpen ? 'max-h-80 border-t border-slate-200/80 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-200 md:hidden dark:border-indigo-300/20`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition duration-100 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:text-slate-200 dark:hover:bg-indigo-500/15 dark:hover:text-indigo-100 dark:focus-visible:ring-indigo-400"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
