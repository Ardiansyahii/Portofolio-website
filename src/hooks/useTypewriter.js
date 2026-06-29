import { useState, useEffect, useRef } from 'react'

export function useTypewriter(texts, { typeSpeed=70, deleteSpeed=38, pauseMs=1800, startDelay=800 } = {}) {
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const indexRef = useRef(0)
  const charRef  = useRef(0)
  const timer     = useRef(null)
  const started   = useRef(false)

  useEffect(() => {
    if (!texts?.length) return
    const tick = () => {
      const full = texts[indexRef.current]
      if (!isDeleting) {
        charRef.current++
        setDisplayed(full.slice(0, charRef.current))
        if (charRef.current === full.length) {
          setIsDeleting(true)
          timer.current = setTimeout(tick, pauseMs)
          return
        }
      } else {
        charRef.current--
        setDisplayed(full.slice(0, charRef.current))
        if (charRef.current === 0) {
          setIsDeleting(false)
          indexRef.current = (indexRef.current + 1) % texts.length
        }
      }
      timer.current = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed)
    }
    if (!started.current) { started.current = true; timer.current = setTimeout(tick, startDelay) }
    else timer.current = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed)
    return () => clearTimeout(timer.current)
  }, [isDeleting, texts, typeSpeed, deleteSpeed, pauseMs, startDelay])

  return displayed
}
