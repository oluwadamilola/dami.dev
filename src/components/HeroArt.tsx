import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react'
import { Sparkle } from './Icons'

// Asymmetric arch in a 400x520 box (the frame box keeps this aspect ratio, so the shape never distorts).
const FRAME_PATH = 'M0 190A190 190 0 0 1 190 0A210 210 0 0 1 400 210V500Q400 520 380 520H20Q0 520 0 500Z'

type LayerProps = {
  depth: number
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  className: string
  children: ReactNode
  style?: CSSProperties
}

// Wrapper layer: Motion owns its transform (pointer parallax); GSAP only animates the children.
function Layer({ depth, pointerX, pointerY, className, children, style }: LayerProps) {
  const x = useTransform(pointerX, [-0.5, 0.5], [-depth, depth])
  const y = useTransform(pointerY, [-0.5, 0.5], [-depth * 0.8, depth * 0.8])
  return (
    <motion.div className={`art-layer ${className}`} style={{ ...style, x, y }}>
      {children}
    </motion.div>
  )
}

export function HeroArt() {
  const rootRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const pointerX = useSpring(rawX, { stiffness: 90, damping: 18, mass: 0.6 })
  const pointerY = useSpring(rawY, { stiffness: 90, damping: 18, mass: 0.6 })

  useEffect(() => {
    const root = rootRef.current
    if (!root || reducedMotion) return
    const coarse = window.matchMedia('(pointer: coarse)')
    if (coarse.matches) return

    const onMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect()
      rawX.set((event.clientX - bounds.left) / bounds.width - 0.5)
      rawY.set((event.clientY - bounds.top) / bounds.height - 0.5)
    }
    const reset = () => {
      rawX.set(0)
      rawY.set(0)
    }
    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerleave', reset)
    return () => {
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', reset)
    }
  }, [rawX, rawY, reducedMotion])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const q = gsap.utils.selector(root)

        const intro = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.35 })
        intro
          .from(q('.art-sun-shape'), { scale: 0, duration: 1, ease: 'back.out(1.4)' })
          .from(q('.frame-fill'), { y: 36, opacity: 0, duration: 0.9 }, '-=0.7')
          .from(q('.frame-outline'), { strokeDashoffset: 1, duration: 1.5, ease: 'power2.inOut' }, '-=0.6')
          .from(q('.frame-echo'), { opacity: 0, scale: 0.96, duration: 0.9 }, '-=1')
          .from(q('.portrait-img'), { y: 44, opacity: 0, duration: 1.1 }, '-=1.1')
          .from(q('.art-ring'), { scale: 0.6, opacity: 0, rotate: -90, duration: 1.1, stagger: 0.1 }, '-=1')
          .from(q('.art-shape'), { scale: 0, rotate: -120, duration: 0.7, stagger: 0.08, ease: 'back.out(2)' }, '-=0.8')
          .from(q('.art-chip'), { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.5')
          .from(q('.art-sparkle'), { scale: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(3)' }, '-=0.5')

        // Ambient loops start once the entrance has landed.
        gsap.to(q('.ring-dashed'), { rotate: 360, duration: 48, ease: 'none', repeat: -1, delay: 1.6 })
        gsap.to(q('.ring-solid'), { rotate: -360, duration: 70, ease: 'none', repeat: -1, delay: 1.6 })
        gsap.to(q('.shape-tri'), { rotate: 360, duration: 24, ease: 'none', repeat: -1, delay: 1.6 })
        gsap.to(q('.shape-square'), { rotate: '+=90', duration: 3.2, ease: 'power2.inOut', repeat: -1, repeatDelay: 1.4, delay: 2 })
        gsap.to(q('.art-sparkle'), { scale: 1.35, rotate: 45, duration: 1.6, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 0.4, delay: 1.8 })

        gsap.utils.toArray<HTMLElement>(q('.art-chip')).forEach((chip, index) => {
          gsap.to(chip, {
            y: index % 2 ? 9 : -9,
            x: index % 2 ? -4 : 4,
            duration: 2.6 + index * 0.45,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 1.5 + index * 0.2,
          })
        })
        gsap.to(q('.shape-ball'), { y: -16, duration: 1.7, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.6 })
        gsap.to(q('.frame-echo'), { x: 7, y: -8, rotate: 1.2, duration: 4.2, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.8 })
        gsap.to(q('.art-sun-shape'), { scale: 1.04, duration: 3.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.6 })
      }, root)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  const layer = { pointerX, pointerY }

  return (
    <div
      className="hero-art"
      data-hero-art
      ref={rootRef}
      role="img"
      aria-label="Portrait of Damilola surrounded by animated pink geometric shapes and floating code snippets"
    >
      <Layer {...layer} depth={-14} className="layer-sun">
        <div className="art-sun-shape" />
      </Layer>

      <Layer {...layer} depth={-22} className="layer-rings">
        <svg className="art-ring ring-dashed" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 7" strokeLinecap="round" />
        </svg>
        <svg className="art-ring ring-solid" viewBox="0 0 200 200" aria-hidden="true">
          <ellipse cx="100" cy="100" rx="98" ry="38" fill="none" stroke="currentColor" strokeWidth="0.7" transform="rotate(-24 100 100)" />
        </svg>
      </Layer>

      <Layer {...layer} depth={14} className="layer-echo">
        <svg className="frame-box frame-echo" viewBox="0 0 400 520" aria-hidden="true">
          <path d={FRAME_PATH} fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
        </svg>
      </Layer>

      <Layer {...layer} depth={0} className="layer-frame">
        <svg className="frame-box" viewBox="0 0 400 520" aria-hidden="true">
          <path className="frame-fill" d={FRAME_PATH} />
          <path className="frame-outline" d={FRAME_PATH} pathLength={1} />
        </svg>
      </Layer>

      <Layer {...layer} depth={0} className="layer-portrait">
        <div className="frame-box portrait-clip">
          <img
            className="portrait-img"
            src="/img1.png"
            alt="Portrait of Damilola with long, dark wavy hair"
            width={941}
            height={1672}
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </Layer>

      <Layer {...layer} depth={0} className="layer-frame-front">
        <svg className="frame-box frame-front" viewBox="0 0 400 520" aria-hidden="true">
          <path className="frame-outline" d={FRAME_PATH} pathLength={1} />
        </svg>
      </Layer>

      <svg className="portrait-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          {/* Frame width, open at the top so the head and hair can rise above the arch; rounded bottom corners. */}
          <clipPath id="hero-portrait-clip" clipPathUnits="objectBoundingBox">
            <path d="M0 -0.7H1V0.9615Q1 1 0.95 1H0.05Q0 1 0 0.9615Z" />
          </clipPath>
        </defs>
      </svg>

      <Layer {...layer} depth={22} className="layer-shapes">
        <svg className="art-shape shape-tri" viewBox="0 0 40 40" aria-hidden="true">
          <path d="M20 4 37 34H3Z" fill="var(--color-pink)" />
        </svg>
        <span className="art-shape shape-square" />
        <span className="art-shape shape-ball" />
        <svg className="art-shape shape-plus" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="art-shape shape-dots" aria-hidden="true" />
      </Layer>

      <Layer {...layer} depth={32} className="layer-chips">
        <span className="art-chip chip-a">&lt;curiosity /&gt;</span>
        <span className="art-chip chip-b">const ship = () =&gt; ✓</span>
        <span className="art-chip chip-c">npm run dev</span>
        <span className="art-chip chip-d">{'{ ai: true }'}</span>
        <Sparkle className="art-sparkle sparkle-a" />
        <Sparkle className="art-sparkle sparkle-b" />
      </Layer>

      <span className="art-side-note">A LITTLE CODE. A LOT OF CURIOSITY.</span>
    </div>
  )
}
