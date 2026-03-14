import { useEffect, useMemo, useState } from 'react'

function seededRandom(seed) {
  let state = seed

  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

function createSkyData(count = 110, lineLimit = 18) {
  const rand = seededRandom(1337)
  const stars = Array.from({ length: count }, (_, index) => {
    const tierRoll = rand()
    const size =
      tierRoll < 0.68
        ? 1.1 + rand() * 1.25
        : tierRoll < 0.93
          ? 2.05 + rand() * 1.05
          : 3.25 + rand() * 1.35
    const left = rand() * 100
    const top = rand() * 100
    const brightness = 0.46 + rand() * 0.5
    const depth = size > 3 ? 'near' : size > 2 ? 'mid' : 'far'
    const driftFactor = depth === 'near' ? 1.2 : depth === 'mid' ? 0.85 : 0.55

    return {
      id: index,
      size,
      left,
      top,
      delay: `${(rand() * 6).toFixed(2)}s`,
      duration: `${(20 + rand() * 24).toFixed(2)}s`,
      peak: 0.46 + rand() * 0.38,
      twinkleScale: 1.03 + rand() * 0.14,
      isLarge: size > 2.35,
      depth,
      brightness,
      baseOpacity: 0.12 + brightness * 0.22,
      glowOpacity: 0.1 + brightness * 0.26,
      dx1: `${((-4 + rand() * 8) * driftFactor).toFixed(2)}px`,
      dy1: `${((-9 + rand() * 5) * driftFactor).toFixed(2)}px`,
      dx2: `${((-5 + rand() * 10) * driftFactor).toFixed(2)}px`,
      dy2: `${((1 + rand() * 4) * driftFactor).toFixed(2)}px`,
    }
  })

  if (lineLimit === 0) {
    return { stars, lines: [] }
  }

  const focusStars = stars.filter((star) => star.isLarge).slice(0, Math.max(lineLimit * 2, 12))
  const used = new Set()
  const lines = []

  for (let i = 0; i < focusStars.length; i += 1) {
    const a = focusStars[i]
    let nearest = null
    let nearestDist = Infinity

    for (let j = 0; j < focusStars.length; j += 1) {
      if (i === j) continue
      const b = focusStars[j]
      const dx = a.left - b.left
      const dy = a.top - b.top
      const dist = Math.hypot(dx, dy)

      if (dist < nearestDist && dist > 7 && dist < 18) {
        nearest = b
        nearestDist = dist
      }
    }

    if (nearest) {
      const key = [a.id, nearest.id].sort((x, y) => x - y).join('-')

      if (!used.has(key) && lines.length < lineLimit) {
        used.add(key)
        lines.push({
          id: key,
          x1: `${a.left}%`,
          y1: `${a.top}%`,
          x2: `${nearest.left}%`,
          y2: `${nearest.top}%`,
          opacity: 0.08 + (1 - nearestDist / 18) * 0.12,
        })
      }
    }
  }

  return { stars, lines }
}

function createCloudData(count = 11) {
  const rand = seededRandom(2026)

  return Array.from({ length: count }, (_, index) => ({
    id: index,
    top: 4 + rand() * 30,
    left: -18 + rand() * 136,
    width: 140 + rand() * 220,
    opacity: 0.22 + rand() * 0.22,
    delay: `${(rand() * 5).toFixed(2)}s`,
    duration: `${(44 + rand() * 30).toFixed(2)}s`,
    drift: `${8 + rand() * 14}vw`,
  }))
}

function createShootingStar(id) {
  const fromTop = Math.random() < 0.58
  const fromLeft = Math.random() < 0.5

  let start
  let end

  if (fromTop) {
    start = {
      x: fromLeft ? -8 + Math.random() * 30 : 78 + Math.random() * 30,
      y: -10 + Math.random() * 14,
    }
    end = {
      x: fromLeft ? 82 + Math.random() * 24 : -18 - Math.random() * 24,
      y: 58 + Math.random() * 36,
    }
  } else {
    start = {
      x: fromLeft ? -14 - Math.random() * 8 : 102 + Math.random() * 8,
      y: 8 + Math.random() * 34,
    }
    end = {
      x: fromLeft ? 74 + Math.random() * 34 : -20 - Math.random() * 30,
      y: 46 + Math.random() * 42,
    }
  }

  const dx = end.x - start.x
  const dy = end.y - start.y
  const angle = Math.atan2(dy, dx) * (180 / Math.PI)

  return {
    id,
    top: start.y,
    left: start.x,
    driftX: `${dx.toFixed(2)}vw`,
    driftY: `${dy.toFixed(2)}vh`,
    angle: `${angle.toFixed(2)}deg`,
    duration: `${(1.25 + Math.random() * 0.9).toFixed(2)}s`,
    trail: `${(52 + Math.random() * 34).toFixed(2)}px`,
    head: `${(2.1 + Math.random() * 0.5).toFixed(2)}px`,
  }
}

export default function SkyBackground({ theme, performanceMode }) {
  const { isMobile = false, lowPerformanceMode = false } = performanceMode ?? {}
  const skyData = useMemo(() => {
    if (isMobile) return createSkyData(18, 0)
    if (lowPerformanceMode) return createSkyData(42, 6)
    return createSkyData(110, 18)
  }, [isMobile, lowPerformanceMode])
  const cloudData = useMemo(() => {
    if (isMobile) return []
    if (lowPerformanceMode) return createCloudData(4)
    return createCloudData(11)
  }, [isMobile, lowPerformanceMode])
  const [shootingStars, setShootingStars] = useState([])
  const isDark = theme === 'dark'
  const showBlurEffects = !isMobile
  const showAnimatedSky = !lowPerformanceMode

  useEffect(() => {
    if (!showAnimatedSky) {
      setShootingStars([])
      return undefined
    }

    let isDisposed = false
    let nextBurstTimer = null
    const removalTimers = []

    const scheduleBurst = () => {
      const waitMs = 8000 + Math.random() * 12000

      nextBurstTimer = window.setTimeout(() => {
        if (isDisposed) return

        const burstCount = 1 + Math.floor(Math.random() * 3)
        const burstBaseId = Date.now() + Math.floor(Math.random() * 1000)
        const burstStars = Array.from({ length: burstCount }, (_, index) =>
          createShootingStar(burstBaseId + index)
        )

        setShootingStars((current) => [...current, ...burstStars])

        burstStars.forEach((star, index) => {
          const starDurationMs = Number.parseFloat(star.duration) * 1000
          const removalTimer = window.setTimeout(
            () => {
              if (isDisposed) return
              setShootingStars((current) => current.filter((item) => item.id !== star.id))
            },
            starDurationMs + index * 140 + 90
          )

          removalTimers.push(removalTimer)
        })

        scheduleBurst()
      }, waitMs)
    }

    scheduleBurst()

    return () => {
      isDisposed = true
      if (nextBurstTimer) window.clearTimeout(nextBurstTimer)
      removalTimers.forEach((timerId) => window.clearTimeout(timerId))
    }
  }, [showAnimatedSky])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,_#f0f9ff_0%,_#dbeafe_32%,_#bfdbfe_58%,_#c7d2fe_100%)] transition-opacity duration-[1200ms] ease-in-out ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div
        className={`absolute inset-0 bg-[linear-gradient(135deg,_#0b0f2a_0%,_#12183a_44%,_#1a2148_100%)] transition-opacity duration-[1200ms] ease-in-out ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`${showAnimatedSky ? 'portfolio-dark-gradient-layer' : 'portfolio-dark-gradient-layer--static'} absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,120,255,0.15)_0%,transparent_45%),radial-gradient(circle_at_82%_18%,rgba(147,197,253,0.12)_0%,transparent_42%),radial-gradient(circle_at_64%_76%,rgba(139,92,246,0.14)_0%,transparent_52%)] transition-opacity duration-[1200ms] ease-in-out ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute inset-0 bg-[linear-gradient(160deg,rgba(12,17,44,0.28)_0%,rgba(26,33,72,0.12)_55%,rgba(46,16,101,0.14)_100%)] transition-opacity duration-[1200ms] ease-in-out ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {showBlurEffects ? (
        <div className={`absolute inset-0 overflow-hidden transition-opacity duration-[1100ms] ease-in-out ${isDark ? 'opacity-100' : 'opacity-0'}`}>
          <span className={`${showAnimatedSky ? 'portfolio-dark-glow-layer' : 'portfolio-dark-glow-layer--static'} absolute -left-[10%] top-[14%] h-[28rem] w-[28rem] rounded-full bg-indigo-500/16 blur-3xl`} />
          <span className={`${showAnimatedSky ? 'portfolio-dark-glow-layer' : 'portfolio-dark-glow-layer--static'} absolute right-[-8%] top-[38%] h-[24rem] w-[24rem] rounded-full bg-violet-500/14 blur-3xl`} style={{ animationDelay: '1.7s' }} />
          <span className={`${showAnimatedSky ? 'portfolio-dark-glow-layer' : 'portfolio-dark-glow-layer--static'} absolute left-[34%] bottom-[-10%] h-[22rem] w-[22rem] rounded-full bg-blue-400/12 blur-3xl`} style={{ animationDelay: '0.9s', animationDuration: '20s' }} />
        </div>
      ) : null}

      <div className={`absolute inset-0 transition-opacity duration-[1100ms] ease-in-out ${isDark ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.26)_28%,transparent_62%)]" />
        <div className={showAnimatedSky ? 'portfolio-day-sun' : 'portfolio-day-sun portfolio-day-sun--static'} />

        {cloudData.map((cloud) => (
          <div
            key={`day-cloud-${cloud.id}`}
            className={showAnimatedSky ? 'portfolio-day-cloud' : 'portfolio-day-cloud portfolio-day-cloud--static'}
            style={{
              top: `${cloud.top}%`,
              left: `${cloud.left}%`,
              '--cloudWidth': `${cloud.width}px`,
              '--cloudOpacity': cloud.opacity,
              '--cloudDelay': cloud.delay,
              '--cloudDuration': cloud.duration,
              '--cloudDrift': cloud.drift,
            }}
          />
        ))}
      </div>

      <div className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out ${isDark ? 'opacity-100' : 'opacity-0'}`}>
        {skyData.lines.length > 0 ? (
          <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            {skyData.lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                className={showAnimatedSky ? 'portfolio-constellation-line' : 'portfolio-constellation-line portfolio-constellation-line--static'}
                style={{ '--lineOpacity': line.opacity }}
              />
            ))}
          </svg>
        ) : null}

        {showAnimatedSky
          ? shootingStars.map((star) => (
              <span
                key={`shooting-star-${star.id}`}
                className="portfolio-shooting-star"
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  '--shootDuration': star.duration,
                  '--shootX': star.driftX,
                  '--shootY': star.driftY,
                  '--shootAngle': star.angle,
                  '--trailLength': star.trail,
                  '--headSize': star.head,
                }}
              />
            ))
          : null}
      </div>

      <div className={`absolute inset-0 transition-opacity duration-[900ms] ease-in-out ${isDark ? 'opacity-100' : 'opacity-0'}`}>
        {skyData.stars.map((star) => (
          <span
            key={`global-particle-${star.id}`}
            className={`portfolio-particle ${showAnimatedSky ? '' : 'portfolio-particle--static'} ${star.isLarge ? 'portfolio-particle--large' : ''} portfolio-particle--${star.depth}`}
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: showAnimatedSky ? star.delay : undefined,
              animationDuration: showAnimatedSky ? star.duration : undefined,
              '--baseOpacity': star.baseOpacity,
              '--starBrightness': star.brightness,
              '--starGlowOpacity': star.glowOpacity,
              '--dx1': star.dx1,
              '--dy1': star.dy1,
              '--dx2': star.dx2,
              '--dy2': star.dy2,
              '--twinklePeak': star.peak,
              '--twinkleScale': star.twinkleScale,
            }}
          />
        ))}
      </div>

      <div
        className={`absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.28),rgba(15,23,42,0.08),rgba(255,255,255,0.22))] transition-opacity duration-[1100ms] ease-in-out ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div
        className={`absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(148,163,184,0.06),transparent)] transition-opacity duration-[1100ms] ease-in-out ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
