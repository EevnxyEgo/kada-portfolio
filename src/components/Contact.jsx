import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react'
import './Contact.css'

export default function Contact() {
  return (
    <section
      id="contact"
      className="section section--raised"
      aria-labelledby="contact-title"
    >
      <div className="container contact__inner reveal">
        <header className="contact__head">
          <span className="mono-label section-head__eyebrow">// contact</span>
          <h2 id="contact-title" className="section-head__title">
            Open a thread
          </h2>
          <p className="contact__lede">
            Best by email or WhatsApp — I usually reply within a day.
          </p>
        </header>

        <dl className="contact__list">
          <div className="contact__row">
            <dt className="contact__key">
              <Mail size={14} aria-hidden="true" />
              email
            </dt>
            <dd className="contact__val">
              <a href="mailto:arseniuswahyu@gmail.com" className="link-underline">
                arseniuswahyu@gmail.com
              </a>
            </dd>
          </div>

          <div className="contact__row">
            <dt className="contact__key">
              <MessageCircle size={14} aria-hidden="true" />
              whatsapp
            </dt>
            <dd className="contact__val">
              <a
                href="https://wa.me/628112951110"
                className="link-underline contact__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                chat now
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
