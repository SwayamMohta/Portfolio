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
    items: ['Git', 'Github', 'Docker (basics)'],
  },
]

function SkillsSection() {
  return (
    <div className="cmd-output">
      <p className="out-comment">// skill_check --list</p>
      <br />
      {skillGroups.map((sg) => (
        <div key={sg.group} className="skill-group">
          <p className="skill-group-label">
            <span className="out-amber">{sg.group}</span>
            <span className="out-muted">:</span>
          </p>
          {sg.items.map((item) => (
            <p key={item} className="skill-item">
              <span className="out-muted">  ├─ </span>
              <span className="out-text">{item}</span>
            </p>
          ))}
          <br />
        </div>
      ))}
    </div>
  )
}

export default SkillsSection
