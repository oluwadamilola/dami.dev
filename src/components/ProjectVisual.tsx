import type { Project } from '../data/projects'

type ProjectVisualProps = {
  type: Project['visual']
}

function HubVisual() {
  return (
    <div className="product-preview hub-preview" aria-hidden="true">
      <div className="preview-topbar"><i /><i /><i /><span>lc / project hub</span></div>
      <div className="preview-workspace">
        <div className="preview-sidebar"><b>LC</b><i /><i /><i /><i /></div>
        <div className="preview-content">
          <div className="preview-greeting"><span>PROJECT SPACE</span><b>Ideas into action.</b></div>
          <div className="preview-cards">
            <div className="preview-mini-card"><i /><b /><span /></div>
            <div className="preview-mini-card"><i /><b /><span /></div>
            <div className="preview-mini-card"><i /><b /><span /></div>
          </div>
          <div className="preview-list"><i /><span /><b /><span /><i /><span /></div>
        </div>
      </div>
      <span className="preview-stamp">VISUAL<br />PREVIEW</span>
    </div>
  )
}

function DeskVisual() {
  return (
    <div className="product-preview desk-preview" aria-hidden="true">
      <div className="desk-sidebar"><b>SD.</b><span>Overview</span><span>Requests</span><span>Knowledge</span></div>
      <div className="desk-content">
        <div className="desk-heading"><i /><span /><b /></div>
        <div className="desk-ticket"><i>01</i><span /><b>OPEN</b></div>
        <div className="desk-ticket"><i>02</i><span /><b>IN REVIEW</b></div>
        <div className="desk-ticket"><i>03</i><span /><b>RESOLVED</b></div>
        <div className="desk-chart"><i /><i /><i /><i /><i /><i /><i /></div>
      </div>
      <span className="desk-orbit orbit-one" />
      <span className="desk-orbit orbit-two" />
    </div>
  )
}

function FutureVisual() {
  return (
    <div className="product-preview future-preview" aria-hidden="true">
      <div className="future-grid" />
      <div className="future-orb"><span>AI</span></div>
      <span className="future-label label-one">human in the loop</span>
      <span className="future-label label-two">curiosity → prototype</span>
      <span className="future-cross">✳</span>
    </div>
  )
}

export function ProjectVisual({ type }: ProjectVisualProps) {
  if (type === 'hub') return <HubVisual />
  if (type === 'desk') return <DeskVisual />
  return <FutureVisual />
}
