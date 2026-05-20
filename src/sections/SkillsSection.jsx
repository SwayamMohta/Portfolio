import SectionHeader from '../components/SectionHeader'

const skillGroups = [
  {
    group: 'languages',
    items: ['Python', 'JavaScript', 'Java'],
  },
  {
    group: 'frontend',
    items: ['React.js', 'Next.js', 'HTML', 'CSS', 'TypeScript'],
  },
  {
    group: 'backend_apis',
    items: ['FastAPI', 'REST APIs', 'API Integration'],
  },
  {
    group: 'state_management',
    items: ['Context API'],
  },
  {
    group: 'database',
    items: ['PostgreSQL'],
  },
  {
    group: 'tools',
    items: ['Git', 'GitHub'],
  },
]

function SkillsSection({ outputPacing }) {
  return (
    <div className="cmd-output">
      <SectionHeader text="// skill_check --list" outputPacing={outputPacing} />
      {skillGroups.map((skillGroup) => (
        <div key={skillGroup.group} className="skill-group">
          <p className="skill-group-label">
            <span className="out-amber">{skillGroup.group}</span>
            <span className="out-muted">:</span>
          </p>
          {skillGroup.items.map((item) => (
            <p key={item} className="skill-item">
              <span className="out-muted">  |- </span>
              <span className="out-text">{item}</span>
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}

export default SkillsSection
