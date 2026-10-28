import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useRevealAnimations() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('#root')
    if (!root) return

    const motionQuery = gsap.matchMedia()
    motionQuery.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.from('[data-hero-line]', {
          y: 28,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.12,
        })
        gsap.from('[data-hero-art]', {
          scale: 0.94,
          opacity: 0,
          duration: 1.15,
          ease: 'power3.out',
          delay: 0.3,
        })
        gsap.from('[data-hero-specialism]', {
          y: 8,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.55,
        })
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.from(element, {
            y: 24,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true,
            },
          })
        })
      }, root)

      return () => context.revert()
    })

    return () => motionQuery.revert()
  }, [])
}
