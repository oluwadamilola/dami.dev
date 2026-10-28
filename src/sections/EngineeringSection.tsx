import { useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { ArrowRight } from '../components/Icons'

const diagrams = [
  { id: 'hub', name: 'LC Project Hub', code: '01' },
  { id: 'desk', name: 'IT Service Desk', code: '02' },
] as const

type DiagramId = typeof diagrams[number]['id']

function ArchitectureMap({ active }: { active: DiagramId }) {
  return (
    <div className={`architecture-map architecture-${active}`} aria-label={`${active === 'hub' ? 'LC Project Hub' : 'IT Service Desk'} architecture format preview`}>
      <svg className="architecture-lines" viewBox="0 0 780 278" preserveAspectRatio="none" aria-hidden="true">
        <path d="M174 139H257M390 139H473M606 139H666" />
        <path d="M390 139V66H473M390 139V212H473" />
        <circle cx="215" cy="139" r="3" /><circle cx="432" cy="139" r="3" />
      </svg>
      <div className="arch-node arch-client">
        <span className="arch-node-icon">UI</span><b>Interface</b><small>USER EXPERIENCE</small>
      </div>
      <div className="arch-node arch-service">
        <span className="arch-node-icon">↔</span><b>Service layer</b><small>{active === 'hub' ? 'API / LOGIC' : 'REQUEST FLOW'}</small>
      </div>
      <div className="arch-node arch-data">
        <span className="arch-node-icon">▤</span><b>Data store</b><small>PERSISTENCE</small>
      </div>
      <div className="arch-node arch-quality">
        <span className="arch-node-icon">✓</span><b>Quality</b><small>{active === 'hub' ? 'TESTS' : 'VALIDATION'}</small>
      </div>
      <div className="arch-node arch-delivery">
        <span className="arch-node-icon">↑</span><b>Delivery</b><small>DEPLOYMENT</small>
      </div>
    </div>
  )
}

export function EngineeringSection() {
  const [active, setActive] = useState<DiagramId>('hub')

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % diagrams.length
    if (event.key === 'ArrowLeft') nextIndex = (index + diagrams.length - 1) % diagrams.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = diagrams.length - 1
    if (nextIndex === undefined) return

    event.preventDefault()
    const nextDiagram = diagrams[nextIndex]
    setActive(nextDiagram.id)
    document.getElementById(`tab-${nextDiagram.id}`)?.focus()
  }

  return (
    <section className="section engineering-section" id="engineering" aria-labelledby="engineering-heading">
      <SectionHeading
        id="engineering-heading"
        eyebrow="02 — UNDER THE HOOD"
        title="Good ideas need good foundations."
        note="Systems thinking, made visible."
      />
      <div className="architecture-card" data-reveal>
        <div className="architecture-toolbar">
          <div>
            <p className="eyebrow">ARCHITECTURE FORMAT PREVIEW</p>
            <p className="architecture-disclaimer">Illustrative only — project components and technologies need verification.</p>
          </div>
          <div className="diagram-tabs" role="tablist" aria-label="Choose an architecture preview">
            {diagrams.map((diagram, index) => (
              <button
                key={diagram.id}
                className={active === diagram.id ? 'diagram-tab is-active' : 'diagram-tab'}
                id={`tab-${diagram.id}`}
                type="button"
                role="tab"
                aria-selected={active === diagram.id}
                aria-controls="architecture-panel"
                onClick={() => setActive(diagram.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <span>{diagram.code}</span>{diagram.name}
              </button>
            ))}
          </div>
        </div>
        <div id="architecture-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
          <ArchitectureMap active={active} />
        </div>
        <div className="architecture-legend">
          <span><i className="legend-dot legend-pink" />Application flow</span>
          <span><i className="legend-dot legend-charcoal" />Quality &amp; release</span>
          <span className="architecture-bottom-note">Components are placeholders, not a confirmed stack.</span>
        </div>
      </div>
      <div className="engineering-caption" data-reveal>
        <span>MAKE IT CLEAR</span><ArrowRight /><span>MAKE IT USEFUL</span><ArrowRight /><span>MAKE IT LAST</span>
      </div>
    </section>
  )
}
