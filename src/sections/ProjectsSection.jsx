const projects = [
  {
    id: 'presto-ai',
    name: 'Presto AI',
    tag: 'NLP / Threat Detection',
    status: 'completed',
    desc: 'NLP-based hostile intent classifier. Placed 3rd out of 1600+ teams at Tech-A-Thon, BIT Mesra. Built transformer-based pipeline with custom preprocessing.',
    stack: ['Python', 'NLP', 'Transformers', 'FastAPI'],
    repo: 'https://github.com/SwayamMohta/tech-a-thon',
  },
  {
    id: 'docbuilder',
    name: 'DocBuilder',
    tag: 'Automation / Google Workspace',
    status: 'completed',
    desc: 'Programmatic document generation using Google Workspace API. Takes structured input and outputs formatted Docs and Sheets — built for report automation.',
    stack: ['Python', 'Google APIs', 'OAuth2'],
    repo: 'https://github.com/SwayamMohta/cursor-for-forms-f1',
  },
  {
    id: 'anime-chatbot',
    name: 'Anime Recommendation Chatbot',
    tag: 'Full Stack / ML',
    status: 'completed',
    desc: 'React + FastAPI chatbot with content-based recommendation engine using embeddings and filtering. Full-stack end-to-end.',
    stack: ['React', 'FastAPI', 'Python', 'NLP'],
    repo: 'https://github.com/SwayamMohta/Anime_chatbot',
  },
  {
    id: 'nlp-foundations',
    name: 'NLP Foundations',
    tag: 'Research / From Scratch',
    status: 'ongoing',
    desc: 'From-scratch implementations of TF-IDF, Word2Vec (Skip-gram + CBOW), and BPE tokenization — no high-level ML libraries. Pure math and NumPy.',
    stack: ['Python', 'NumPy', 'Matplotlib'],
    repo: 'https://github.com/SwayamMohta/NLP-FALL-2025',
  },
]

function ProjectsSection() {
  return (
    <div className="cmd-output">
      <p className="out-comment">// project_log --all</p>
      <br />
      {projects.map((p, i) => (
        <div key={p.id} className="proj-entry">
          <div className="proj-header">
            <span className="out-bright">[{String(i + 1).padStart(2, '0')}]</span>
            <span className="proj-name"> {p.name}</span>
            <span className="out-muted"> — {p.tag}</span>
            <span className={`proj-status ${p.status}`}>
              {' '}{p.status === 'completed' ? '✓' : '~'} {p.status}
            </span>
          </div>
          <p className="proj-desc">{p.desc}</p>
          <div className="proj-meta">
            <span className="out-muted">stack: </span>
            <span className="proj-stack">{p.stack.join(', ')}</span>
            <span className="proj-repo-sep"> | </span>
            <a href={p.repo} target="_blank" rel="noreferrer" className="proj-repo">
              repo →
            </a>
          </div>
          {i < projects.length - 1 && <div className="proj-divider" />}
        </div>
      ))}
    </div>
  )
}

export default ProjectsSection
