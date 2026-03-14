import { useEffect, useState } from 'react'

function getPerformanceMode() {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      prefersReducedMotion: false,
      lowPerformanceMode: false,
    }
  }

  const isMobile = window.matchMedia('(max-width: 767px)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return {
    isMobile,
    prefersReducedMotion,
    lowPerformanceMode: isMobile || prefersReducedMotion,
  }
}

export default function usePerformanceMode() {
  const [performanceMode, setPerformanceMode] = useState(getPerformanceMode)

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updatePerformanceMode = () => {
      setPerformanceMode({
        isMobile: mobileQuery.matches,
        prefersReducedMotion: reducedMotionQuery.matches,
        lowPerformanceMode: mobileQuery.matches || reducedMotionQuery.matches,
      })
    }

    updatePerformanceMode()

    mobileQuery.addEventListener('change', updatePerformanceMode)
    reducedMotionQuery.addEventListener('change', updatePerformanceMode)

    return () => {
      mobileQuery.removeEventListener('change', updatePerformanceMode)
      reducedMotionQuery.removeEventListener('change', updatePerformanceMode)
    }
  }, [])

  return performanceMode
}
