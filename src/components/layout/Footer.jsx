import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { PERSONAL, NAV_LINKS } from '../../constants/data'
import styles from './Footer.module.css'

export default function Footer() {
  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <a href="#hero" className={styles.logo} onClick={e => go(e,'hero')}>
            {PERSONAL.shortName}<span className={styles.dot}>.</span>
          </a>
          <p className={styles.brandDesc}>
            SMK Software Engineering Student<br />Seeking PKL Placement · 2025
          </p>
          <div className={styles.socials}>
            <a href={PERSONAL.github}   target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="GitHub"><Github size={15} /></a>
            <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="LinkedIn"><Linkedin size={15} /></a>
            <a href={`mailto:${PERSONAL.email}`} className={styles.social} aria-label="Email"><Mail size={15} /></a>
          </div>
        </div>

        {/* Nav */}
        <nav className={styles.nav} aria-label="Footer navigation">
          <p className={styles.navTitle}>Navigation</p>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className={styles.navLink} onClick={e => go(e, href.replace('#',''))}>
              {label}
            </a>
          ))}
          <a href="#contact" className={styles.navLink} onClick={e => go(e,'contact')}>Contact</a>
        </nav>

        {/* Contact quick */}
        <div className={styles.contact}>
          <p className={styles.navTitle}>Get in Touch</p>
          <a href={`mailto:${PERSONAL.email}`} className={styles.contactLink}>{PERSONAL.email}</a>
          <p className={styles.contactSub}>{PERSONAL.location} · {PERSONAL.timezone}</p>
          <div className={styles.availBadge}>
            <span className={styles.availDot} />
            Actively seeking PKL placement
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bar}>
        <p className={styles.copy}>
          © {PERSONAL.year} <span>{PERSONAL.name}</span> · All rights reserved
        </p>
        <p className={styles.made}>
          Made with <Heart size={11} style={{ color: '#ec4899', display: 'inline', verticalAlign: 'middle' }} /> in Indonesia
        </p>
      </div>
    </footer>
  )
}
