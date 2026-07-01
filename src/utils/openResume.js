/**
 * openResume — Smart resume opener with language selection
 *
 * Behavior (same as top dev portfolios worldwide):
 * 1. Open PDF in a new browser tab so recruiter can read it immediately
 * 2. Simultaneously trigger a download so they have the file saved
 *
 * @param {'en' | 'id'} lang - which language version to open
 */
export function openResume(lang = 'en') {
  const PATHS = {
    en: '/resume-en.pdf',
    id: '/resume-id.pdf',
  }
  const FILENAMES = {
    en: 'CV_Muhammad_Ardiansyah_EN.pdf',
    id: 'CV_Muhammad_Ardiansyah_ID.pdf',
  }

  const pdfPath  = PATHS[lang]  || PATHS.en
  const filename = FILENAMES[lang] || FILENAMES.en

  // 1. Open in new tab
  window.open(pdfPath, '_blank', 'noopener,noreferrer')

  // 2. Trigger download simultaneously
  const link = document.createElement('a')
  link.href = pdfPath
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
