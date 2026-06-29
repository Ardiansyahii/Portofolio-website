/**
 * openEmail — Smart email opener
 * 1. Coba buka mailto (native app email)
 * 2. Kalau tidak ada app email dalam 1.5 detik → fallback ke Gmail di tab baru
 */
export function openEmail(email, subject = '', body = '') {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body)    params.set('body', body)

  const query     = params.toString() ? '?' + params.toString() : ''
  const mailtoUrl = `mailto:${email}${query}`

  const start = Date.now()
  window.location.href = mailtoUrl

  setTimeout(() => {
    const elapsed = Date.now() - start
    if (elapsed < 2000) {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    }
  }, 1500)
}
