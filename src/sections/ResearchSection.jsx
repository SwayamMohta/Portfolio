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
    detail: 'Currently working on a faculty guided research project in the domain of material informatics.',
  },
]

function ResearchSection() {
  return (
    <div className="cmd-output">
      <p className="out-comment">// research_interests --verbose</p>
      <br />
      {interests.map((item, i) => (
        <div key={i} className="research-entry">
          <p className="research-area">
            <span className="out-muted">&gt; </span>
            <span className="out-bright">{item.area}</span>
          </p>
          <p className="research-detail out-muted">{item.detail}</p>
          <br />
        </div>
      ))}
    </div>
  )
}

export default ResearchSection
