import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { Mail, Linkedin, Github, ArrowUpRight, MapPin, Clock, Sparkles } from 'lucide-react'
import { PERSONAL } from '../../constants/data'
import { openEmail } from '../../utils/openEmail'
import ResumeButton from '../ui/ResumeButton'
import styles from './Contact.module.css'

const ITEMS = [
  {
    icon: Mail,
    label: 'Email — Preferred',
    value: PERSONAL.email,
    href: '#',
    hint: 'Reach out about PKL — reply within 24h',
    accent: '#6366f1',
    isEmail: true,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: `/${PERSONAL.linkedinHandle}`,
    href: PERSONAL.linkedin,
    hint: "Let's connect professionally",
    accent: '#0ea5e9',
    external: true,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: `@${PERSONAL.githubHandle}`,
    href: PERSONAL.github,
    hint: 'Check out my open source work',
    accent: '#8b5cf6',
    external: true,
  },
]

function MagneticItem({ item, index }) {
  const { ref: vRef, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.04}px, ${y * 0.06}px)`
  }
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  const handleClick = (e) => {
    if (item.isEmail) {
      e.preventDefault()
      openEmail(PERSONAL.email, 'PKL Opportunity — Portfolio Contact')
    }
  }

  return (
    <a
      ref={(el) => { vRef(el); ref.current = el }}
      href={item.href}
      className={`${styles.item} ${inView ? styles.itemIn : ''}`}
      style={{ transitionDelay: `${0.15 + index * 0.08}s`, '--accent': item.accent }}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label={`${item.label}: ${item.value}`}
    >
      <div className={styles.itemGlow} aria-hidden="true" />
      <div className={styles.itemIcon} style={{ background: `${item.accent}15`, borderColor: `${item.accent}30` }}>
        <item.icon size={20} style={{ color: item.accent }} />
      </div>
      <div className={styles.itemInfo}>
        <span className={styles.itemLabel}>{item.label}</span>
        <span className={styles.itemValue}>{item.value}</span>
        <span className={styles.itemHint}>{item.hint}</span>
      </div>
      <ArrowUpRight size={15} className={styles.arrow} />
    </a>
  )
}

export default function Contact() {
  const { ref: hRef, inView: hView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: cRef, inView: cView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className="container">
        {/* Headline */}
        <div ref={hRef} className={`${styles.headline} reveal ${hView ? 'in' : ''}`}>
          <p className="section-eyebrow" style={{ justifyContent: 'center' }}>Let's Connect</p>
          <h2 className={styles.bigTitle}>
            Have a PKL slot?<br />
            <span className="gradient-text">Let's talk — I'm ready.</span>
          </h2>
          <p className={styles.sub}>
            I'm an SMK student actively looking for a PKL placement in
            Full-Stack Web or Mobile Development. I'm ready to contribute
            from day one — feel free to reach out anytime.
          </p>
        </div>

        {/* Main card */}
        <div ref={cRef} className={`${styles.card} ${cView ? styles.cardIn : ''}`}>
          <div className={styles.cardBg} aria-hidden="true" />

          {/* Status bar */}
          <div className={styles.statusBar}>
            <div className={styles.statusLeft}>
              <span className={styles.greenDot} />
              <span>Actively seeking PKL placement · Response &lt; 24h</span>
            </div>
            <div className={styles.statusRight}>
              <MapPin size={12} />
              <span>{PERSONAL.location}</span>
              <span className={styles.sep}>·</span>
              <Clock size={12} />
              <span>{PERSONAL.timezone}</span>
            </div>
          </div>

          {/* Contact items */}
          <div className={styles.items}>
            {ITEMS.map((item, i) => (
              <MagneticItem key={item.label} item={item} index={i} />
            ))}
          </div>

          {/* Resume download */}
          <ResumeButton variant="card" />

          {/* Footer */}
          <div className={styles.cardFooter}>
            <Sparkles size={14} style={{ color: 'var(--cyan)' }} />
            <span>Let's build real things together during my PKL. I won't disappoint.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
