import { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { SKILLS, SKILL_CATEGORIES } from "../../constants/data";
import styles from "./Skills.module.css";

/* Marquee row of skill pills — infinite scroll */
function MarqueeRow({ items, reverse = false, speed = 35 }) {
  return (
    <div
      className={`${styles.marqueeTrack} ${reverse ? styles.reverse : ""}`}
      aria-hidden="true"
    >
      <div className={styles.marqueeInner} style={{ "--speed": `${speed}s` }}>
        {[...items, ...items].map((skill, i) => (
          <span key={i} className={styles.marqueePill}>
            <span
              className={styles.marqueeDot}
              style={{ background: skill.color }}
            />
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Glowing skill card */
function SkillCard({ skill, index }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardRef = useRef(null);

  const handleMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    cardRef.current.style.setProperty("--mx", `${x}%`);
    cardRef.current.style.setProperty("--my", `${y}%`);
  };

  return (
    <div
      ref={(el) => {
        ref(el);
        cardRef.current = el;
      }}
      className={`${styles.skillCard} ${inView ? styles.skillIn : ""}`}
      style={{ transitionDelay: `${(index % 8) * 0.04}s` }}
      onMouseMove={handleMove}
      role="listitem"
    >
      {/* Spotlight effect */}
      <div className={styles.cardSpot} aria-hidden="true" />

      <div className={styles.cardTop}>
        <span className={styles.skillDot} style={{ background: skill.color }} />
        <span className={styles.skillName}>{skill.name}</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState("all");

  const { ref: hRef, inView: hView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Split skills into 3 rows for marquee
  const third = Math.ceil(SKILLS.length / 3);

  const row1 = SKILLS.slice(0, third);
  const row2 = SKILLS.slice(third, third * 2);
  const row3 = SKILLS.slice(third * 2);

  const filtered =
    active === "all" ? SKILLS : SKILLS.filter((s) => s.cats.includes(active));

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.gradientTop} aria-hidden="true" />

      {/* Marquee */}
      <div className={styles.marqueeSection} aria-hidden="true">
        <MarqueeRow items={row1} speed={40} />
        <MarqueeRow items={row2} reverse speed={35} />
        <MarqueeRow items={row3} speed={45} />
      </div>

      <div className="container" style={{ marginTop: "4rem" }}>
        {/* Header */}
        <div
          ref={hRef}
          className={`reveal ${hView ? "in" : ""}`}
          style={{ marginBottom: "2.5rem" }}
        >
          <p className="section-eyebrow">Tech Stack</p>

          <h2 className="section-title">Skills & Technologies</h2>

          <p className="section-sub">
            A multi-layered toolkit — from pixels to APIs, mobile to deployment.
          </p>
        </div>

        {/* Filter */}
        <div
          className={`${styles.filter} reveal ${hView ? "in" : ""}`}
          style={{ transitionDelay: "0.1s" }}
          role="group"
          aria-label="Filter by category"
        >
          {SKILL_CATEGORIES.map(({ key, label }) => (
            <button
              key={key}
              className={`${styles.filterBtn} ${
                active === key ? styles.filterActive : ""
              }`}
              onClick={() => setActive(key)}
              aria-pressed={active === key}
            >
              {label}

              <span className={styles.filterCount}>
                {key === "all"
                  ? SKILLS.length
                  : SKILLS.filter((s) => s.cats.includes(key)).length}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className={styles.grid} role="list" aria-label="Skills">
          {filtered.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
