type SectionHeaderProps = {
  eyebrow: string
  title: string
  children: string
}

export default function SectionHeader({ eyebrow, title, children }: SectionHeaderProps) {
  return (
    <div>
      <p className="section-label">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-copy">{children}</p>
    </div>
  )
}
