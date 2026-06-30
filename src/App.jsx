import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Nav links shown in the navbar. Each id matches a <section id> below, so the
// scroll-spy can light up the right one.
const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function App() {
  // The one piece of app-wide state: which section is currently in view.
  // Lives here (the "brain") and flows down to <Navbar /> as a prop.
  const [activeSection, setActiveSection] = useState('hero')

  // Scroll-spy. The rootMargin squeezes the observer down to a thin band across
  // the middle of the screen, so a section becomes "active" right as it crosses
  // the centre line — no scroll-position maths needed.
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

  // Scroll-reveal. Each element tagged .reveal fades + lifts into place once it
  // enters the viewport, then we stop watching it so it stays put.
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
