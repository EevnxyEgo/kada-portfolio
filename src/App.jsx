import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]')

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => spy.observe(section))
    return () => spy.disconnect()
  }, [])

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal')

    const revealer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    revealEls.forEach((el) => revealer.observe(el))
    return () => revealer.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar navLinks={navLinks} activeSection={activeSection} />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
