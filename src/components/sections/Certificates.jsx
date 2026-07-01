import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Award, ShieldCheck, Star } from 'lucide-react'
import { CERTIFICATES, CERT_CATEGORIES } from '../../constants/data'
import styles from './Certificates.module.css'

/* ── Category color map ── */
const CAT_COLOR = {
  featured:    { bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)',  text: '#fbbf24' },
  frontend:    { bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.3)',  text: '#818cf8' },
  backend:     { bg: 'rgba(34,211,238,0.1)',  border: 'rgba(34,211,238,0.3)',  text: '#22d3ee' },
  programming: { bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.3)',  text: '#34d399' },
  cloud:       { bg: 'rgba(251,146,60,0.1)',  border: 'rgba(251,146,60,0.3)',  text: '#fb923c' },
  ai:          { bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)', text: '#a78bfa' },
  other:       { bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.3)', text: '#94a3b8' },
}

function CertCard({ cert, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })
  const color = CAT_COLOR[cert.category] || CAT_COLOR.other

  return (
    <article
      ref={ref}
      className={`${styles.card} ${inView ? styles.cardIn : ''} ${cert.highlight ? styles.featured : ''}`}
      style={{ transitionDelay: `${(index % 6) * 0.07}s` }}
      aria-label={`Certificate: ${cert.name}`}
    >
      {/* Top accent line */}
      {cert.highlight && <div className={styles.featuredLine} aria-hidden="true" />}

      {/* Header */}
      <div className={styles.cardTop}>
        <div className={styles.iconWrap} style={{ background: color.bg, borderColor: color.border }}>
          {cert.highlight ? <Star size={16} style={{ color: color.text }} /> : <Award size={16} style={{ color: color.text }} />}
        </div>
        <div className={styles.meta}>
          <span className={styles.issuer}>{cert.issuerShort}</span>
          <span className={styles.year}>{cert.year}</span>
        </div>
      </div>

      {/* Name */}
      <h3 className={styles.name}>{cert.name}</h3>

      {/* Description (featured only) */}
      {cert.description && (
        <p className={styles.desc}>{cert.description}</p>
      )}

      {/* Credential ID */}
      <div className={styles.credRow}>
        <ShieldCheck size={11} className={styles.credIcon} aria-hidden="true" />
        <span className={styles.credId}>{cert.credentialId}</span>
      </div>

      {/* Footer */}
      <div className={styles.cardFooter}>
        <span className={styles.date}>{cert.date}</span>
        {cert.verifyUrl ? (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.verifyBtn}
            aria-label={`Verify certificate: ${cert.name}`}
          >
            Verify <ExternalLink size={11} />
          </a>
        ) : (
          <span className={styles.verifyNA}>No public link</span>
        )}
      </div>
    </article>
  )
}

export default function Certificates() {
  const [active, setActive] = useState('all')
  const { ref: hRef, inView: hView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const filtered = active === 'all'
    ? CERTIFICATES
    : CERTIFICATES.filter(c => c.category === active)

  const totalCount = CERTIFICATES.length

  return (
    <section id="certificates" className={styles.section}>
      <div className={styles.ambient} aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <div ref={hRef} className={`reveal ${hView ? 'in' : ''}`} style={{ marginBottom: '2.5rem' }}>
          <p className="section-eyebrow">Verified Credentials</p>
          <h2 className="section-title">
            Certificates &amp; <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-sub">
            {totalCount} verified certificates from Dicoding Indonesia, DBS Foundation, AWS, and Google Developers — each earned through exams and project submissions.
          </p>
        </div>

        {/* Filter */}
        <div
          className={`${styles.filter} reveal ${hView ? 'in' : ''}`}
          style={{ transitionDelay: '0.1s' }}
          role="group"
          aria-label="Filter by category"
        >
          {CERT_CATEGORIES.map(({ key, label }) => {
            const count = key === 'all'
              ? CERTIFICATES.length
              : CERTIFICATES.filter(c => c.category === key).length
            if (count === 0) return null
            return (
              <button
                key={key}
                className={`${styles.filterBtn} ${active === key ? styles.filterActive : ''}`}
                onClick={() => setActive(key)}
                aria-pressed={active === key}
              >
                {label}
                <span className={styles.count}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <div className={styles.grid} role="list">
          {filtered.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <div className={`${styles.footNote} reveal ${hView ? 'in' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <ShieldCheck size={14} />
          <span>All Dicoding certificates are publicly verifiable — click "Verify" on any card to confirm authenticity.</span>
        </div>
      </div>
    </section>
  )
}
