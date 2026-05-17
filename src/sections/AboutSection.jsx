import profilePic from '../images/swayam.jpeg'
import SectionHeader from '../components/SectionHeader'

function AboutSection({ outputPacing }) {
  return (
    <div className="cmd-output about-layout">
      <div className="about-main">
        <div className="about-text-content">
          <SectionHeader text="// about.log - loaded" outputPacing={outputPacing} />
          <p className="out-line">
            <span className="out-key">name</span>
            <span className="out-sep">  =</span>
            <span className="out-val"> Swayam Mohta</span>
          </p>
          <p className="out-line">
            <span className="out-key">degree</span>
            <span className="out-sep"> =</span>
            <span className="out-val"> B.Tech - Artificial Intelligence</span>
          </p>
          <p className="out-line">
            <span className="out-key">uni</span>
            <span className="out-sep">    =</span>
            <span className="out-val"> Mahindra University, Hyderabad</span>
          </p>
          <p className="out-line">
            <span className="out-key">year</span>
            <span className="out-sep">   =</span>
            <span className="out-val"> 3rd year (2023-2027)</span>
          </p>
        </div>

        <div className="about-profile-frame">
          <img src={profilePic} alt="Swayam Mohta" className="profile-img" />
        </div>
      </div>

      <div className="about-text-content">
        <p className="out-para">
          I build things at the intersection of AI and software: NLP pipelines,
          LLM systems, and full-stack web apps. I care about solving real problems,
          not just code that looks impressive.
        </p>
      </div>

      <div className="research-block">
        <SectionHeader text="// research_interests.log" outputPacing={outputPacing} />
        <p className="out-para">
          <span className="out-muted">&gt; </span>
          <span className="out-bright">Electrode Materials:</span> Predictive modeling for flexible materials.
          <br />
          <span className="out-muted">&gt; </span>
          <span className="out-bright">Scientific Data:</span> Data-driven scientific research and informatics.
        </p>
      </div>
    </div>
  )
}

export default AboutSection
