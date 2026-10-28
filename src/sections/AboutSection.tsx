import { SectionHeading } from '../components/SectionHeading'

const journey = [
  { number: '01', title: 'Software engineering', note: 'Building a foundation in software engineering and the craft of turning ideas into working software.' },
  { number: '02', title: 'IT support', note: 'Working closer to the people and systems behind everyday technology problems.' },
  { number: '03', title: 'AI & automation', note: 'Exploring how intelligent automation can make complex work simpler and more human.' },
]

export function AboutSection() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <SectionHeading id="about-heading" eyebrow="03 — THE THROUGH-LINE" title="Different chapters. One curiosity." />
      <div className="about-layout">
        <div className="about-statement" data-reveal>
          <p className="about-big">I like making <span>technology</span> feel a little more human.</p>
          <p className="about-body">My path has moved through software engineering and IT support, and now towards AI automation and digital transformation. The common thread: understand the real problem, then find a thoughtful way to solve it.</p>
          <span className="about-aside">NO SHORTCUTS. JUST GOOD QUESTIONS.</span>
        </div>
        <ol className="journey-list">
          {journey.map((step) => (
            <li className="journey-item" key={step.number} data-reveal>
              <span className="journey-number">{step.number}</span>
              <div><h3>{step.title}</h3><p>{step.note}</p></div>
              <span className="journey-mark">↗</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
