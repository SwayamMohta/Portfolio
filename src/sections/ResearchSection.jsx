import SectionHeader from '../components/SectionHeader'

const interests = [
  {
    area: 'Predictive Modeling for Flexible Electrode Materials',
    detail: 'Researching material properties and performance using predictive algorithms.',
  },
  {
    area: 'Data-Driven Scientific Research',
    detail: 'Leveraging data analytics to accelerate scientific discovery and material science.',
  },
  {
    area: 'Active Project',
    detail: 'Currently working on a faculty-guided research project in material informatics.',
  },
]

function ResearchSection({ outputPacing }) {
  return (
    <div className="cmd-output">
      <SectionHeader text="// research_interests --verbose" outputPacing={outputPacing} />
      {interests.map((item) => (
        <div key={item.area} className="research-entry">
          <p className="research-area">
            <span className="out-muted">&gt; </span>
            <span className="out-bright">{item.area}</span>
          </p>
          <p className="research-detail out-muted">{item.detail}</p>
        </div>
      ))}
    </div>
  )
}

export default ResearchSection
