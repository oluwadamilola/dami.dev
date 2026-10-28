import { SectionHeading } from '../components/SectionHeading'
import { ArrowUpRight } from '../components/Icons'

const topics = ['Software engineering', 'Claude Code', 'AI automation', 'Digital transformation']

export function WritingSection() {
  return (
    <section className="section writing-section" id="writing" aria-labelledby="writing-heading">
      <SectionHeading id="writing-heading" eyebrow="05 — NOTES & IDEAS" title="Thinking out loud." note="Writing and perspectives." />
      <div className="writing-card" data-reveal>
        <div className="writing-copy">
          <p className="eyebrow">THE NOTEBOOK</p>
          <h3>Good technology starts with better questions.</h3>
          <p>I write about the ideas, tools and decisions behind software engineering, Claude Code, AI automation and digital transformation.</p>
        </div>
        <div className="writing-topics">
          {topics.map((topic, index) => (
            <span className="writing-topic" key={topic}><i>0{index + 1}</i>{topic}<ArrowUpRight /></span>
          ))}
        </div>
        <span className="writing-placeholder">ARTICLES &amp; LINKS TO ADD</span>
      </div>
    </section>
  )
}
