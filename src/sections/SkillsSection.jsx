import SectionHeader from '../components/SectionHeader'

const skillGroups = [
  {
    group: 'languages',
    items: ['Python', 'JavaScript', 'C', 'Java', 'SQL', 'C++'],
  },
  {
    group: 'frontend',
    items: ['React', 'HTML/CSS', 'Next JS'],
  },
  {
    group: 'backend',
    items: ['Node.js', 'FastAPI', 'Express', 'PostgreSQL'],
  },
  {
    group: 'ai_ml',
    items: ['NLP', 'Machine Learning', 'LLMs', 'RAG Pipelines'],
  },
  {
    group: 'tools',
    items: ['Git', 'GitHub', 'Docker (basics)'],
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
