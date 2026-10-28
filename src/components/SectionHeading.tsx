type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: string
  note?: string
}

export function SectionHeading({ id, eyebrow, title, note }: SectionHeadingProps) {
  return (
    <div className="section-heading" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <div className="section-heading-row">
        <h2 id={id}>{title}</h2>
        {note && <p className="section-note">{note}</p>}
      </div>
    </div>
  )
}
