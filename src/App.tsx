import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { AboutSection } from './sections/AboutSection'
import { ContactSection } from './sections/ContactSection'
import { EngineeringSection } from './sections/EngineeringSection'
import { HeroSection } from './sections/HeroSection'
import { LabSection } from './sections/LabSection'
import { WorkSection } from './sections/WorkSection'
import { WritingSection } from './sections/WritingSection'
import { useRevealAnimations } from './hooks/useRevealAnimations'
import { ArrowUpRight, CloseIcon, MenuIcon } from './components/Icons'
import './App.css'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'About', href: '#about' },
  { label: 'Lab', href: '#lab' },
  { label: 'Writing', href: '#writing' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  useRevealAnimations()

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Damilola Olukoju, home">
          <span className="wordmark-mark">d.</span>
          <span className="wordmark-name">Damilola Olukoju</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          <a className="nav-contact" href="#contact">Let&apos;s talk <ArrowUpRight /></a>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
            >
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
              ))}
              <a href="#contact" onClick={closeMenu}>Let&apos;s talk <ArrowUpRight /></a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main">
        <HeroSection />
        <WorkSection />
        <EngineeringSection />
        <AboutSection />
        <LabSection />
        <WritingSection />
        <ContactSection />
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#top">
          <span className="wordmark-mark">d.</span>
          <span className="wordmark-name">Damilola Olukoju</span>
        </a>
        <span>Built with curiosity &amp; a little bit of motion.</span>
        <a href="#top" className="back-top">Back to top ↑</a>
      </footer>
    </>
  )
}

export default App
