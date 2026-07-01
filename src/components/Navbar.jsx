import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import './Navbar.css'

export default function Navbar({ navLinks, activeSection }) {
  const [isOpen, setIsOpen] = useState(false)

  const solid = activeSection !== 'hero'

  const closeMenu = () => setIsOpen(false)

  return (
    <header className={`navbar ${solid ? 'is-solid' : ''}`}>
      <div className="container navbar__inner">
        <a className="navbar__brand" href="#hero" onClick={closeMenu}>
          ~/arsen
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>

        <nav
          id="primary-nav"
          aria-label="Primary"
          className={`navbar__nav ${isOpen ? 'is-open' : ''}`}
        >
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`navbar__link ${
                    activeSection === link.id ? 'is-active' : ''
                  }`}
                  aria-current={activeSection === link.id ? 'true' : undefined}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#resume" className="navbar__cta" onClick={closeMenu}>
                résumé
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
