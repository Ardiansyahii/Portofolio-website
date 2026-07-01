import { useState, useRef, useEffect } from 'react'
import { FileText, ChevronDown, Check } from 'lucide-react'
import { openResume } from '../../utils/openResume'
import styles from './ResumeButton.module.css'

const LANGS = [
  { code: 'en', label: 'English',          flag: '🇬🇧' },
  { code: 'id', label: 'Bahasa Indonesia',  flag: '🇮🇩' },
]

/**
 * ResumeButton — dropdown button to download resume in EN or ID.
 * @param {'hero' | 'nav' | 'mobile' | 'card'} variant - visual style context
 */
export default function ResumeButton({ variant = 'hero' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const handleSelect = (langCode) => {
    openResume(langCode)
    setOpen(false)
  }

  return (
    <div ref={ref} className={`${styles.wrap} ${styles[variant]}`}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Download Resume"
      >
        <FileText size={variant === 'mobile' ? 14 : 15} />
        <span>Resume</span>
        <ChevronDown size={12} className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
      </button>

      {open && (
        <div className={styles.dropdown} role="listbox">
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              className={styles.option}
              onClick={() => handleSelect(lang.code)}
              role="option"
            >
              <span className={styles.flag}>{lang.flag}</span>
              <span className={styles.optLabel}>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
