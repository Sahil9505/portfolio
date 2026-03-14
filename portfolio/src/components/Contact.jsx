import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const contactDetails = [
    {
      label: 'Email',
      value: 'sahilsharma9505@gmail.com',
      href: 'mailto:sahilsharma9505@gmail.com',
      icon: Mail,
    },
    {
      label: 'GitHub',
      value: 'github.com/Sahil9505',
      href: 'https://github.com/Sahil9505',
      icon: Github,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/sahilsharma65',
      href: 'https://www.linkedin.com/in/sahilsharma65/',
      icon: Linkedin,
    },
    {
      label: 'Location',
      value: 'Rewari, Haryana, India',
      icon: MapPin,
    },
  ]

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS config missing', {
        hasServiceId: Boolean(serviceId),
        hasTemplateId: Boolean(templateId),
        hasPublicKey: Boolean(publicKey),
      })
      setStatus('error')
      setFeedback('Something went wrong. Please try again later.')
      return
    }

    setStatus('loading')
    setFeedback('')

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        {
          publicKey,
        }
      )

      setStatus('success')
      setFeedback('Message sent successfully! I will get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('EmailJS send failed', error)
      setStatus('error')
      setFeedback('Something went wrong. Please try again later.')
    }
  }

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="scroll-mt-24 mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16"
    >
      <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 md:text-4xl md:bg-gradient-to-r md:from-slate-900 md:to-indigo-800 md:bg-clip-text md:text-transparent dark:bg-gradient-to-r dark:from-cyan-200 dark:to-indigo-200 dark:bg-clip-text dark:text-transparent">
        Contact
      </h2>

      <div className="mt-7 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-2xl border border-white/45 bg-gradient-to-br from-white/65 via-white/45 to-indigo-100/35 p-5 shadow-[0_10px_26px_rgba(15,23,42,0.16)] backdrop-blur-xl ring-1 ring-inset ring-white/30 transition duration-300 hover:shadow-[0_14px_34px_rgba(15,23,42,0.2),0_0_16px_rgba(99,102,241,0.18)] dark:border-indigo-200/15 dark:bg-gradient-to-br dark:from-slate-900/55 dark:via-slate-900/38 dark:to-indigo-950/34 dark:shadow-[0_10px_30px_rgba(0,0,0,0.42)] dark:ring-indigo-100/10 dark:hover:shadow-[0_16px_34px_rgba(0,0,0,0.48),0_0_20px_rgba(99,102,241,0.22)] md:p-7">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Contact Information</p>
          <div className="mt-4 space-y-3">
            {contactDetails.map((item) => {
              const Icon = item.icon

              const detailContent = (
                <>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-200 bg-white text-indigo-700 shadow-sm dark:border-indigo-300/35 dark:bg-slate-900/45 dark:text-indigo-100">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{item.label}</span>
                    <span className="block text-sm font-medium text-slate-800 dark:text-slate-200">{item.value}</span>
                  </span>
                </>
              )

              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'Email' ? undefined : '_blank'}
                    rel={item.label === 'Email' ? undefined : 'noreferrer'}
                    className="flex items-center gap-3 rounded-xl border border-transparent px-2 py-2 transition duration-200 hover:border-indigo-200 hover:bg-indigo-50/60 dark:hover:border-indigo-300/30 dark:hover:bg-indigo-500/10"
                  >
                    {detailContent}
                  </a>
                )
              }

              return (
                <div key={item.label} className="flex items-center gap-3 rounded-xl px-2 py-2">
                  {detailContent}
                </div>
              )
            })}
          </div>
        </article>

        <article className="rounded-2xl border border-white/45 bg-gradient-to-br from-white/65 via-white/45 to-indigo-100/35 p-5 shadow-[0_10px_26px_rgba(15,23,42,0.16)] backdrop-blur-xl ring-1 ring-inset ring-white/30 transition duration-300 hover:shadow-[0_14px_34px_rgba(15,23,42,0.2),0_0_16px_rgba(99,102,241,0.18)] dark:border-indigo-200/15 dark:bg-gradient-to-br dark:from-slate-900/55 dark:via-slate-900/38 dark:to-indigo-950/34 dark:shadow-[0_10px_30px_rgba(0,0,0,0.42)] dark:ring-indigo-100/10 dark:hover:shadow-[0_16px_34px_rgba(0,0,0,0.48),0_0_20px_rgba(99,102,241,0.22)] md:p-7">
          <p className="text-slate-700 dark:text-slate-300">If you have an opportunity or project in mind, feel free to reach out.</p>

          <form onSubmit={handleSubmit} className="mt-5 w-full space-y-4 md:space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 outline-none ring-0 transition duration-200 focus:border-slate-500 focus-visible:ring-2 focus-visible:ring-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus-visible:ring-slate-600"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 outline-none ring-0 transition duration-200 focus:border-slate-500 focus-visible:ring-2 focus-visible:ring-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus-visible:ring-slate-600"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="min-h-32 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 outline-none ring-0 transition duration-200 focus:border-slate-500 focus-visible:ring-2 focus-visible:ring-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-400 dark:focus-visible:ring-slate-600"
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:from-indigo-500 hover:to-violet-500 hover:shadow-md hover:shadow-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 disabled:cursor-not-allowed disabled:from-slate-500 disabled:to-slate-500 dark:from-indigo-500 dark:to-violet-500 dark:text-white dark:shadow-sm dark:hover:from-indigo-400 dark:hover:to-violet-400 dark:hover:shadow-[0_0_14px_rgba(99,102,241,0.24)] dark:focus-visible:ring-indigo-300 dark:disabled:from-slate-500 dark:disabled:to-slate-500 dark:disabled:text-slate-100"
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
          </form>

          {status === 'success' && <p className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">{feedback}</p>}
          {status === 'error' && <p className="mt-4 text-sm font-medium text-rose-600 dark:text-rose-400">{feedback}</p>}
        </article>
      </div>
    </motion.section>
  )
}
