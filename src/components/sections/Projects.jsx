import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, ChevronRight, ArrowUpRight, Terminal } from 'lucide-react'
import { PROJECTS } from '../../constants/data'
import styles from './Projects.module.css'

/* 3D tilt card effect */
function TiltCard({ children, className }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateZ(4px)`
    el.style.setProperty('--gx', (x + 0.5) * 100 + '%')
    el.style.setProperty('--gy', (y + 0.5) * 100 + '%')
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 })

  return (
    <div
      ref={ref}
      className={`${styles.cardOuter} ${inView ? styles.cardIn : ''}`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <TiltCard className={styles.card}>
        {/* Gloss effect */}
        <div className={styles.gloss} aria-hidden="true" />
        {/* Spotlight on tilt */}
        <div className={styles.tiltSpot} aria-hidden="true" />

        {/* Top accent bar with project color */}
        <div className={styles.accentBar} style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }} aria-hidden="true" />

        {/* Header row */}
        <div className={styles.header}>
          <div className={styles.numBadge} style={{ color: project.accentColor, borderColor: `${project.accentColor}30` }}>
            {project.number}
          </div>
          <div className={styles.links}>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label="View on GitHub">
              <Github size={14} />
            </a>
            {project.live
              ? <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label="Live demo"><ExternalLink size={14} /></a>
              : <span className={`${styles.link} ${styles.linkOff}`} aria-label="No live demo"><ExternalLink size={14} /></span>
            }
          </div>
        </div>

        {/* Project info */}
        <div className={styles.catRow}>
          <span className={styles.cat}>{project.category}</span>
          <span className={styles.year}>{project.year}</span>
        </div>
        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.subtitle}>{project.subtitle}</p>
        <p className={styles.desc}>{project.description}</p>

        {/* Impact callout */}
        <div className={styles.impact}>
          <Terminal size={12} />
          <span>{project.impact}</span>
        </div>

        {/* Features */}
        <ul className={styles.features} aria-label="Key features">
          {project.features.map((f, i) => (
            <li key={i} className={styles.feature}>
              <ChevronRight size={11} style={{ color: project.accentColor, flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className={styles.tags} role="list">
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag} role="listitem"
              style={{ borderColor: `${project.accentColor}25`, color: `${project.accentColor}cc` }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Footer CTA */}
        <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.viewBtn}
          style={{ '--color': project.accentColor }}>
          <span>View Source</span>
          <ArrowUpRight size={14} />
        </a>
      </TiltCard>
    </div>
  )
}

export default function Projects() {
  const { ref: hRef, inView: hView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="projects" className={styles.projects}>
      {/* Ambient gradient */}
      <div className={styles.ambient} aria-hidden="true" />

      <div className="container">
        <div ref={hRef} className={`reveal ${hView ? 'in' : ''}`} style={{ marginBottom: '4rem' }}>
          <p className="section-eyebrow">Portfolio</p>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-sub">
            Real-world systems built with production-grade stacks — spanning
            web, mobile, and API layers.
          </p>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>

        {/* More on GitHub CTA */}
        <div className={`${styles.moreCta} reveal ${hView ? 'in' : ''}`} style={{ transitionDelay: '0.4s' }}>
          <a href="https://github.com/Ardiansyahii" target="_blank" rel="noopener noreferrer" className={styles.moreBtn}>
            <Github size={16} />
            See more on GitHub
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
