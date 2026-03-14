import { useState } from 'react'

export default function Admin({ onAddProject }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    liveLink: '',
  })
  const [feedback, setFeedback] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newProject = {
      title: formData.title,
      description: formData.description,
      technologies: formData.technologies
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      githubLink: formData.githubLink,
      liveLink: formData.liveLink,
    }

    onAddProject(newProject)
    setFeedback('Project added successfully.')
    setFormData({
      title: '',
      description: '',
      technologies: '',
      githubLink: '',
      liveLink: '',
    })
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Admin Dashboard</h1>
      <h2 className="mt-2 text-slate-600 dark:text-slate-400">Add New Project</h2>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/70"
      >
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Project Title
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 outline-none transition focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="min-h-28 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 outline-none transition focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="technologies" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Technologies
          </label>
          <input
            id="technologies"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 outline-none transition focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="githubLink" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            GitHub Link
          </label>
          <input
            id="githubLink"
            name="githubLink"
            type="url"
            value={formData.githubLink}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 outline-none transition focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="liveLink" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Live Demo Link
          </label>
          <input
            id="liveLink"
            name="liveLink"
            type="url"
            value={formData.liveLink}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 outline-none transition focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400"
            required
          />
        </div>

        <button
          type="submit"
          className="inline-flex rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
        >
          Add Project
        </button>
      </form>

      {feedback && <p className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">{feedback}</p>}
    </section>
  )
}
