import SectionHeader from '../components/SectionHeader'

const projects = [
  {
    id: 'presto-ai',
    name: 'Presto AI',
    tag: 'React / Python / NLP / PostgreSQL',
    status: 'completed',
    desc: 'Developed a real-time React dashboard to visualize NLP-based threat detection outputs with structured and responsive UI components. Integrated backend NLP pipelines with frontend interfaces to enable seamless data rendering and live updates. Designed modular and reusable UI components to display classified messages, extracted entities, and analytics.',
    stack: ['React', 'Python', 'NLP', 'PostgreSQL'],
    repo: 'https://github.com/SwayamMohta/tech-a-thon',
  },
  {
    id: 'anime-chatbot',
    name: 'Anime Recommendation Chatbot',
    tag: 'React / FastAPI / REST APIs',
    status: 'completed',
    desc: 'Built a full-stack web application with a React frontend and FastAPI backend for dynamic anime recommendations. Developed reusable React components with efficient state-driven rendering for search and recommendation workflows. Integrated REST APIs, loading states, conditional rendering, and error handling for responsive UI updates and a smooth user experience.',
    stack: ['React', 'FastAPI', 'REST APIs', 'Python'],
    repo: 'https://github.com/SwayamMohta/Anime_chatbot',
  },
  {
    id: 'docbuilder',
    name: 'DocBuilder',
    tag: 'JavaScript / REST APIs / Google Workspace APIs',
    status: 'completed',
    desc: 'Developed an automated document generation tool to create Google Docs and Slides from structured user input. Handled asynchronous API interactions, processed data-driven workflows, and structured the JavaScript codebase to ensure reliability, maintainability, and scalability.',
    stack: ['JavaScript', 'REST APIs', 'Google Workspace APIs'],
    repo: 'https://github.com/SwayamMohta/cursor-for-forms-f1',
  },
  {
    id: 'nlp-foundations',
    name: 'NLP Foundations',
    tag: 'Research / From Scratch',
    status: 'ongoing',
    desc: 'From-scratch implementations of TF-IDF, Word2Vec (Skip-gram + CBOW), and BPE tokenization with no high-level ML libraries. Pure math and NumPy.',
    stack: ['Python', 'NumPy', 'Matplotlib'],
    repo: 'https://github.com/SwayamMohta/NLP-FALL-2025',
  },
]

function ProjectsSection({ outputPacing }) {
  return (
    <div className="cmd-output">
      <SectionHeader text="// project_log --all" outputPacing={outputPacing} />
      {projects.map((project, index) => (
        <div key={project.id} className="proj-entry">
          <div className="proj-header">
            <span className="out-bright">[{String(index + 1).padStart(2, '0')}]</span>
            <span className="proj-name"> {project.name}</span>
            <span className="out-muted"> - {project.tag}</span>
            <span className={`proj-status ${project.status}`}>
              {' '}{project.status === 'completed' ? '[ok]' : '[~]'} {project.status}
            </span>
          </div>
          <p className="proj-desc">{project.desc}</p>
          <div className="proj-meta">
            <span className="out-muted">stack: </span>
            <span className="proj-stack">{project.stack.join(', ')}</span>
            <span className="proj-repo-sep"> | </span>
            <a href={project.repo} target="_blank" rel="noreferrer" className="proj-repo">
              repo -&gt;
            </a>
          </div>
          {index < projects.length - 1 && <div className="proj-divider" />}
        </div>
      ))}
    </div>
  )
}

export default ProjectsSection
