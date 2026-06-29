import { useState, useEffect } from 'react'

export function useScrollspy(ids, offset = 120) {
  const [activeId, setActiveId] = useState(null)
  useEffect(() => {
    const handle = () => {
      const pos = window.scrollY + offset
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.offsetTop <= pos) { setActiveId(ids[i]); return }
      }
      setActiveId(null)
    }
    window.addEventListener('scroll', handle, { passive: true })
    handle()
    return () => window.removeEventListener('scroll', handle)
  }, [ids, offset])
  return activeId
}
