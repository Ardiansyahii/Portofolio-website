import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, PERSONAL } from '../../constants/data'
import { useScrollspy } from '../../hooks/useScrollspy'
import styles from './Navbar.module.css'

const SECTION_IDS = ['about', 'skills', 'projects', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollspy(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const go = (e, href) => {
    e.preventDefault()
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <a href="#hero" className={styles.logo} onClick={e => go(e, '#hero')}>
            {PERSONAL.shortName}<span className={styles.dot}>.</span>
          </a>

          <nav className={styles.links} aria-label="Main">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className={`${styles.link} ${activeId === href.replace('#','') ? styles.active : ''}`}
                onClick={e => go(e, href)}
              >
                {label}
                <span className={styles.linkLine} />
              </a>
            ))}
          </nav>

          <a href="#contact" className={styles.cta} onClick={e => go(e, '#contact')}>
            <span className={styles.ctaPulse} aria-hidden="true" />
            Hire Me
          </a>

          <button
            className={styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close' : 'Menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile */}
      <div className={`${styles.mobile} ${menuOpen ? styles.mobileOpen : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <a key={href} href={href} className={styles.mobileLink} onClick={e => go(e, href)} tabIndex={menuOpen ? 0 : -1}>
            {label}
          </a>
        ))}
        <a href="#contact" className={styles.mobileCta} onClick={e => go(e, '#contact')} tabIndex={menuOpen ? 0 : -1}>
          Hire Me →
        </a>
      </div>
      {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} aria-hidden="true" />}
    </>
  )
}
