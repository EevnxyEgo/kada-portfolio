import { Github, Linkedin } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__sign">
          <p className="mono-label footer__entry">
            // end of log · day 14 · still building
          </p>
          <p className="footer__name">Arsen</p>
        </div>

        <nav className="footer__links" aria-label="Social and contact">
          <div className="footer__primary">
            <a
              href="https://github.com/EevnxyEgo"
              className="link-underline footer__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={14} aria-hidden="true" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/arsenius-audley"
              className="link-underline footer__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={14} aria-hidden="true" />
              LinkedIn
            </a>
          </div>

          <div className="footer__secondary">
            <a href="mailto:arseniuswahyu@gmail.com" className="footer__muted">
              arseniuswahyu@gmail.com
            </a>
            <a
              href="https://wa.me/628112951110"
              className="footer__muted"
              target="_blank"
              rel="noopener noreferrer"
            >
              whatsapp
            </a>
          </div>
        </nav>
      </div>

      <div className="container footer__base">
        <p className="footer__meta">© 2026 Arsen — built from scratch, no template.</p>
      </div>
    </footer>
  )
}
