import { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail, ArrowDown, Sparkles } from 'lucide-react'
import { PERSONAL, TYPED_ROLES } from '../../constants/data'
import { useTypewriter } from '../../hooks/useTypewriter'
import ResumeButton from '../ui/ResumeButton'
import styles from './Hero.module.css'

/* ── Aurora canvas background ── */
function AuroraCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h, raf
    const blobs = [
      { x: 0.7, y: 0.25, r: 0.45, color: [99,102,241], speed: 0.0004 },
      { x: 0.15, y: 0.65, r: 0.35, color: [139,92,246], speed: 0.0006 },
      { x: 0.55, y: 0.75, r: 0.30, color: [34,211,238], speed: 0.0005 },
      { x: 0.85, y: 0.55, r: 0.28, color: [168,85,247], speed: 0.0007 },
    ]
    let t = 0

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      t += 1
      blobs.forEach((b, i) => {
        const ox = Math.sin(t * b.speed + i * 1.3) * 0.12
        const oy = Math.cos(t * b.speed * 0.7 + i * 2.1) * 0.10
        const gx = (b.x + ox) * w
        const gy = (b.y + oy) * h
        const gr = Math.max(w, h) * b.r
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr)
        g.addColorStop(0, `rgba(${b.color.join(',')},0.18)`)
        g.addColorStop(0.5, `rgba(${b.color.join(',')},0.06)`)
        g.addColorStop(1, `rgba(${b.color.join(',')},0)`)
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      })
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className={styles.aurora} aria-hidden="true" />
}

/* ── Mouse-following spotlight ── */
function Spotlight() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e) => {
      el.style.setProperty('--mx', e.clientX + 'px')
      el.style.setProperty('--my', e.clientY + 'px')
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return <div ref={ref} className={styles.spotlight} aria-hidden="true" />
}

/* ── Floating tech orbs ── */
const ORBS = ['React', 'Next.js', 'TS', 'Laravel', 'Node', 'Expo']
function TechOrbs() {
  return (
    <div className={styles.orbs} aria-hidden="true">
      {ORBS.map((name, i) => (
        <div
          key={name}
          className={styles.orb}
          style={{
            '--delay': `${i * 0.7}s`,
            '--dur':   `${4 + i * 0.5}s`,
            '--rx':    `${Math.cos((i / ORBS.length) * Math.PI * 2) * 160}px`,
            '--ry':    `${Math.sin((i / ORBS.length) * Math.PI * 2) * 70}px`,
          }}
        >
          {name}
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  const typedText = useTypewriter(TYPED_ROLES, { startDelay: 800 })
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t) }, [])

  const scroll = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero}>
      <AuroraCanvas />
      <Spotlight />

      {/* Grid overlay */}
      <div className={styles.grid} aria-hidden="true" />

      <div className={`${styles.content} container`}>
        <div className={styles.left}>
          {/* Badge */}
          <div className={`${styles.badge} ${loaded ? styles.in : ''}`}>
            <span className={styles.badgeDot} />
            <span>{PERSONAL.badge}</span>
            <span className={styles.badgeSep}>·</span>
            <span className={styles.badgeLoc}>{PERSONAL.location}</span>
          </div>

          {/* Name — large editorial */}
          <h1 className={`${styles.name} ${loaded ? styles.in : ''}`}>
            <span className={styles.nameFirst}>Muhammad</span>
            <span className={styles.nameLast}>Ardiansyah</span>
          </h1>

          {/* Typewriter role */}
          <div className={`${styles.roleWrap} ${loaded ? styles.in : ''}`} style={{ '--delay': '0.3s' }}>
            <span className={styles.rolePrefix}>{'~$'}&nbsp;</span>
            <span className={styles.roleText}>{typedText}</span>
            <span className={styles.cursor} />
          </div>

          {/* Tagline */}
          <p className={`${styles.tagline} ${loaded ? styles.in : ''}`} style={{ '--delay': '0.45s' }}>
            {PERSONAL.description}
          </p>

          {/* CTAs */}
          <div className={`${styles.actions} ${loaded ? styles.in : ''}`} style={{ '--delay': '0.6s' }}>
            <a href="#projects" className={styles.btnPrimary} onClick={e => scroll(e, 'projects')}>
              <Sparkles size={15} />
              See My Projects
            </a>
            <a href="#contact" className={styles.btnGhost} onClick={e => scroll(e, 'contact')}>
              <Mail size={15} />
              Offer Me a PKL Slot
            </a>
            <ResumeButton variant="hero" />
          </div>

          {/* Socials */}
          <div className={`${styles.socials} ${loaded ? styles.in : ''}`} style={{ '--delay': '0.75s' }}>
            <a href={PERSONAL.github}   target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="GitHub">
              <Github size={17} />
            </a>
            <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
            <a href={`mailto:${PERSONAL.email}`} className={styles.socialBtn} aria-label="Email">
              <Mail size={17} />
            </a>
            <div className={styles.socialDivider} />
            <span className={styles.openBadge}>
              <span className={styles.openDot} />
              Open to work
            </span>
          </div>
        </div>

        {/* Right — floating tech orbs around avatar */}
        <div className={`${styles.right} ${loaded ? styles.in : ''}`} style={{ '--delay': '0.5s' }}>
          <div className={styles.avatarScene}>
            <TechOrbs />
            <div className={styles.avatarRing1} aria-hidden="true" />
            <div className={styles.avatarRing2} aria-hidden="true" />
            <div className={styles.avatarCore}>
              <div className={styles.avatarGlow} aria-hidden="true" />
              <span className={styles.avatarInitials}>MA</span>
              <div className={styles.avatarShine} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#about" className={styles.scrollCue} onClick={e => scroll(e, 'about')} aria-label="Scroll down">
        <ArrowDown size={16} className={styles.scrollIcon} />
        <span>scroll</span>
      </a>
    </section>
  )
}
