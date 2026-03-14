import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Contact from './components/Contact'
import Projects from './components/Projects'
import SkyBackground from './components/SkyBackground'
import Admin from './pages/Admin'
import Home from './pages/Home'

function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme')

    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [adminProjects, setAdminProjects] = useState([])

  function addProject(project) {
    setAdminProjects((prev) => [project, ...prev])
  }

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <BrowserRouter>
      <div className="relative isolate min-h-screen overflow-x-hidden">
        <SkyBackground theme={theme} />

        <div className="relative z-10">
          <Routes>
            <Route
              path="/"
              element={<Home adminProjects={adminProjects} theme={theme} onToggleTheme={toggleTheme} />}
            />
            <Route path="/projects" element={<Projects adminProjects={adminProjects} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin onAddProject={addProject} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
