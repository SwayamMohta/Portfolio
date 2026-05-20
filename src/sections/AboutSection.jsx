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
            <span className="out-sep">= </span>
            <span className="out-val">Swayam Mohta</span>
          </p>
          <p className="out-line">
            <span className="out-key">degree</span>
            <span className="out-sep">= </span>
            <span className="out-val">B.Tech - Artificial Intelligence</span>
          </p>
          <p className="out-line">
            <span className="out-key">uni</span>
            <span className="out-sep">= </span>
            <span className="out-val">Mahindra University, Hyderabad</span>
          </p>
          <p className="out-line">
            <span className="out-key">year</span>
            <span className="out-sep">= </span>
            <span className="out-val">3rd year (2023-2027)</span>
          </p>
        </div>

        <div className="about-profile-frame">
          <img src={profilePic} alt="Swayam Mohta" className="profile-img" />
        </div>
      </div>

      <div className="about-text-content">
        <p className="out-para">
          Frontend-focused AI Engineering undergraduate with hands-on experience building React.js and TypeScript applications with REST API integration and responsive UI design. Skilled in developing reusable component architectures, managing application state, and optimizing UI performance for scalable web applications.
        </p>
      </div>

      <div className="experience-block" style={{ marginTop: '16px' }}>
        <SectionHeader text="// experience.log" outputPacing={outputPacing} />
        <div style={{ marginBottom: '14px' }}>
          <p className="out-line">
            <span className="out-key">role</span>
            <span className="out-sep">= </span>
            <span className="out-val">Web Development Member @ ENIGMA Tech Club</span>
          </p>
          <p className="out-line">
            <span className="out-key">dates</span>
            <span className="out-sep">= </span>
            <span className="out-val">Aug 2024 - Aug 2025</span>
          </p>
          <p className="out-para exp-desc">
            Developed frontend features including anonymous posting, upvoting, and category-based filtering for a campus forum. Collaborated with backend developers and designers to integrate features and improve UI consistency.
          </p>
        </div>
        <div>
          <p className="out-line">
            <span className="out-key">role</span>
            <span className="out-sep">= </span>
            <span className="out-val">Graphic Designer @ Outreach Club</span>
          </p>
          <p className="out-line">
            <span className="out-key">dates</span>
            <span className="out-sep">= </span>
            <span className="out-val">Aug 2024 - Jun 2025</span>
          </p>
          <p className="out-para exp-desc">
            Designed digital assets and promotional materials, improving visual layout understanding and UI awareness.
          </p>
        </div>
      </div>

      <div className="achievements-block" style={{ marginTop: '16px' }}>
        <SectionHeader text="// achievements.log" outputPacing={outputPacing} />
        <p className="out-para">
          <span className="out-muted">&gt; </span>
          <span className="out-bright">Tech-A-Thon BIT Mesra:</span> Secured 3rd place among 1,600+ teams.
          <br />
          <span className="out-muted">&gt; </span>
          <span className="out-bright">Hacktoberfest:</span> Ranked among top contributors through open-source pull requests.
        </p>
      </div>

      <div className="research-block" style={{ marginTop: '16px' }}>
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
