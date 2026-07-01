import { useInView } from 'react-intersection-observer'
import { MapPin, Clock, GraduationCap, Zap } from 'lucide-react'
import { PERSONAL, STATS } from '../../constants/data'
import { openEmail } from '../../utils/openEmail'
import styles from './About.module.css'

const FACTS = [
  { icon: GraduationCap, label: 'School',   value: PERSONAL.school },
  { icon: MapPin,        label: 'Location', value: PERSONAL.location },
  { icon: Clock,         label: 'Timezone', value: PERSONAL.timezone },
  { icon: Zap,           label: 'Status',   value: PERSONAL.status },
]

export default function About() {
  const { ref: r1, inView: v1 } = useInView({ triggerOnce: true, threshold: 0.15 })
  const { ref: r2, inView: v2 } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className={styles.about}>
      {/* Noise texture layer */}
      <div className={styles.noiseBg} aria-hidden="true" />

      <div className="container">
        <div className={styles.layout}>

          {/* LEFT — identity card */}
          <div ref={r1} className={`${styles.card} reveal ${v1 ? 'in' : ''}`}>
            <div className={styles.cardGlow} aria-hidden="true" />
            <div className={styles.cardInner}>

              {/* Avatar */}
              <div className={styles.avatar}>
                <div className={styles.avatarBg} aria-hidden="true" />
                <span className={styles.initials}>MA</span>
                <div className={styles.avatarBadge}>
                  <span className={styles.dot} />
                  Available for PKL
                </div>
              </div>

              {/* Identity */}
              <h3 className={styles.cardName}>{PERSONAL.name}</h3>
              <p className={styles.cardRole}>{PERSONAL.role}</p>

              {/* Fact list */}
              <div className={styles.facts}>
                {FACTS.map(({ icon: Icon, label, value }) => (
                  <div key={label} className={styles.fact}>
                    <div className={styles.factIcon}><Icon size={13} /></div>
                    <span className={styles.factLabel}>{label}</span>
                    <span className={styles.factValue}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className={styles.statsRow}>
                {STATS.map((s, i) => (
                  <div key={i} className={styles.stat}>
                    <span className={styles.statNum}>{s.number}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — story */}
          <div ref={r2} className={`${styles.story} ${v2 ? styles.storyIn : ''}`}>
            <p className="section-eyebrow">Who I Am</p>
            <h2 className="section-title">
              An SMK student building<br />
              <span className="gradient-text">production-style software</span>
            </h2>

            <div className={styles.paragraphs}>
              <p>
                I'm a Vocational High School (SMK) student majoring in Software
                Engineering, with a deep interest in how real software is built —
                not just what's taught in class. I don't just complete school
                assignments; I architect solutions that are fast, maintainable,
                and genuinely solve problems.
              </p>
              <p>
                Outside the classroom, I've independently built two full
                production-style systems covering REST APIs, authentication,
                and cross-platform mobile apps. I care deeply about code
                quality, performance, and learning real-world engineering
                practices.
              </p>
              <p>
                I'm currently looking for a PKL (industrial internship)
                placement where I can work alongside experienced engineers,
                contribute to a real product, and bring genuine value to the
                team from day one.
              </p>
            </div>

            {/* What I value chips */}
            <div className={styles.values}>
              {['Clean Code', 'Performance First', 'User-Centered', 'Continuous Learning', 'Team Player', 'Ship Fast'].map(v => (
                <span key={v} className={styles.chip}>{v}</span>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#"
              className={styles.cta}
              onClick={(e) => {
                e.preventDefault()
                openEmail(
                  PERSONAL.email,
                  'PKL Opportunity — Portfolio Contact',
                  'Hi Ardiansyah,\n\nSaya melihat portfolio kamu dan tertarik untuk menawarkan posisi PKL di perusahaan kami.\n\n'
                )
              }}
            >
              <span className={styles.ctaGlow} aria-hidden="true" />
              Offer me a PKL slot →
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
