import { Moon, Sun } from 'lucide-react'

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/80 shadow-sm backdrop-blur dark:border-indigo-300/20 dark:bg-slate-900/55">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 md:px-6 md:py-2">
        <a href="#home" className="shrink-0 text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Sahil Sharma
        </a>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          <div className="flex min-w-0 items-center gap-2 overflow-x-auto whitespace-nowrap text-sm font-medium text-slate-600 md:gap-3 dark:text-slate-300">
            <a href="#home" className="rounded-md px-3 py-2 transition duration-100 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:hover:bg-indigo-500/15 dark:hover:text-indigo-100 dark:hover:shadow-[0_0_14px_rgba(99,102,241,0.32)] dark:focus-visible:ring-indigo-400">Home</a>
            <a href="#about" className="rounded-md px-3 py-2 transition duration-100 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:hover:bg-indigo-500/15 dark:hover:text-indigo-100 dark:hover:shadow-[0_0_14px_rgba(99,102,241,0.32)] dark:focus-visible:ring-indigo-400">About</a>
            <a href="#education" className="rounded-md px-3 py-2 transition duration-100 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:hover:bg-indigo-500/15 dark:hover:text-indigo-100 dark:hover:shadow-[0_0_14px_rgba(99,102,241,0.32)] dark:focus-visible:ring-indigo-400">Education</a>
            <a href="#projects" className="rounded-md px-3 py-2 transition duration-100 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:hover:bg-indigo-500/15 dark:hover:text-indigo-100 dark:hover:shadow-[0_0_14px_rgba(99,102,241,0.32)] dark:focus-visible:ring-indigo-400">Projects</a>
            <a href="#contact" className="rounded-md px-3 py-2 transition duration-100 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:hover:bg-indigo-500/15 dark:hover:text-indigo-100 dark:hover:shadow-[0_0_14px_rgba(99,102,241,0.32)] dark:focus-visible:ring-indigo-400">Contact</a>
          </div>
          <button
            type="button"
            onClick={onToggleTheme}
            className="group relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition duration-100 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-indigo-300/30 dark:bg-gradient-to-br dark:from-indigo-500 dark:to-violet-500 dark:text-white dark:shadow-[0_0_14px_rgba(99,102,241,0.4)] dark:hover:brightness-110 dark:focus-visible:ring-indigo-300"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="flex items-center justify-center">
              {theme === 'dark' ? <Sun size={14} strokeWidth={2.2} /> : <Moon size={14} strokeWidth={2.2} />}
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
