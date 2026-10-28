import { ArrowDown } from '../components/ArrowDown'
import { ArrowUpRight } from '../components/Icons'
import { HeroArt } from '../components/HeroArt'

export function HeroSection() {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-meta" data-hero-line>
        <span className="availability"><i /> MAKING COMPLEX FEEL SIMPLE</span>
        <span className="hero-location" aria-label="Software engineering, AI automation, digital transformation">
          <span data-hero-specialism>SOFTWARE ENGINEERING</span>
          <span data-hero-specialism>AI AUTOMATION</span>
          <span data-hero-specialism>DIGITAL TRANSFORMATION</span>
        </span>
      </div>
      <div className="hero-main">
        <div className="hero-copy">
          <p className="hero-intro" data-hero-line>Hi, I&apos;m Damilola —</p>
          <h1 id="hero-title" className="hero-title">
            <span data-hero-line>I turn complex</span>
            <span className="hero-line-two" data-hero-line>problems into</span>
            <span className="hero-line-three" data-hero-line>
              <em>elegant</em> software<span className="hero-period">.</span>
            </span>
          </h1>
          <p className="hero-subtitle" data-hero-line>
            And intelligent automation<span className="pink-dot">.</span>
          </p>
          <div className="hero-actions" data-hero-line>
            <a className="button button-dark" href="#work">Explore selected work <ArrowUpRight /></a>
            <a className="text-link" href="#contact">Get in touch <ArrowUpRight /></a>
          </div>
          <div className="hero-socials" data-hero-line aria-label="Profile links not yet supplied">
            <span>GITHUB <i>↗</i></span>
            <span>LINKEDIN <i>↗</i></span>
            <span>CV <i>↗</i></span>
            <small>links to add</small>
          </div>
        </div>
        <HeroArt />
      </div>
      <div className="hero-bottom" data-hero-line>
        <span>SCROLL A LITTLE <ArrowDown /></span>
        <span>BUILT FOR THE CURIOUS</span>
        <span className="hero-index">01 / 06</span>
      </div>
    </section>
  )
}
