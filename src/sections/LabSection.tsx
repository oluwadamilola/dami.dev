import { SectionHeading } from '../components/SectionHeading'
import { Sparkle } from '../components/Icons'

const explorations = [
  { index: 'A', title: 'Human-first AI workflows', status: 'Future exploration', text: 'Designing automation that keeps people in the loop.' },
  { index: 'B', title: 'Useful copilots', status: 'Future exploration', text: 'Exploring where AI assistance can make everyday work clearer.' },
  { index: 'C', title: 'Connected systems', status: 'Future exploration', text: 'Looking for thoughtful ways to connect tools, teams and information.' },
]

export function LabSection() {
  return (
    <section className="section lab-section" id="lab" aria-labelledby="lab-heading">
      <SectionHeading id="lab-heading" eyebrow="04 — THE AUTOMATION LAB" title="Curiosity, with a workbench." note="A space for what I’m exploring next." />
      <div className="lab-intro" data-reveal>
        <div className="lab-stamp"><Sparkle /><span>IDEAS<br />IN MOTION</span></div>
        <p>Early ideas are still early ideas. These are future explorations — not completed projects or claimed outcomes.</p>
      </div>
      <div className="lab-list">
        {explorations.map((item) => (
          <article className="lab-row" key={item.index} data-reveal>
            <span className="lab-index">{item.index}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <span className="lab-status"><i />{item.status}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
