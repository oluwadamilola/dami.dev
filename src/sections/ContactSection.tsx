import { ArrowUpRight } from '../components/Icons'

export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="contact-kicker" data-reveal><span />THE NEXT GOOD THING STARTS WITH A CONVERSATION</div>
      <h2 id="contact-heading" data-reveal>Have a complex<br />problem<span>?</span></h2>
      <div className="contact-bottom" data-reveal>
        <p>I&apos;d love to hear what you&apos;re working on.<br />Email address and profile links to add.</p>
        <span className="button button-light contact-placeholder">EMAIL LINK TO ADD <ArrowUpRight /></span>
      </div>
      <span className="contact-decoration" aria-hidden="true">LET&apos;S MAKE IT MAKE SENSE ↗</span>
    </section>
  )
}
