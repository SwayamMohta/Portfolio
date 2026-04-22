import profilePic from '../images/swayam.jpeg'

function AboutSection() {
  return (
    <div className="cmd-output about-layout">
      <div className="about-main">
        <div className="about-text-content">
          <p className="out-comment">// about.log - loaded</p>
          <br />
          <p className="out-line">
            <span className="out-key">name</span>
            <span className="out-sep">  =</span>
            <span className="out-val"> Swayam Mohta</span>
          </p>
          <p className="out-line">
            <span className="out-key">degree</span>
            <span className="out-sep"> =</span>
            <span className="out-val"> B.Tech — Artificial Intelligence</span>
          </p>
          <p className="out-line">
            <span className="out-key">uni</span>
            <span className="out-sep">    =</span>
            <span className="out-val"> Mahindra University, Hyderabad</span>
          </p>
          <p className="out-line">
            <span className="out-key">year</span>
            <span className="out-sep">   =</span>
            <span className="out-val"> 3rd year (2023–2027)</span>
          </p>
        </div>

        <div className="about-profile-frame">
          <img src={profilePic} alt="Swayam Mohta" className="profile-img" />
        </div>
      </div>

      <br />
      <div className="personal-details-block">
        <p className="out-comment">// personal_details.json</p>
        <p className="out-line">
          <span className="out-amber">phone</span><span className="out-sep">: </span>
          <span className="out-text">+91-93481-45200</span>
        </p>
        <p className="out-line">
          <span className="out-amber">email_p</span><span className="out-sep">: </span>
          <a href="mailto:mohtaswayam@gmail.com" className="out-link">mohtaswayam@gmail.com</a>
        </p>
        <p className="out-line">
          <span className="out-amber">email_c</span><span className="out-sep">: </span>
          <span className="out-text">se23uari123@mahindrauniversity.edu.in</span>
        </p>
        <br />
        <p className="out-line">
          <span className="out-amber">skills</span><span className="out-sep">: </span>
          <span className="out-text">Python, React, NLP, LLMs, FastAPI, JavaScript, SQL</span>
        </p>
        <p className="out-line">
          <span className="out-amber">featured_projects</span><span className="out-sep">: </span>
          <span className="out-text">[Presto AI, Anime Chatbot]</span>
        </p>
      </div>

      <br />
      <div className="about-text-content">
        <p className="out-para">
          I build things at the intersection of AI and software,NLP pipelines,
          LLM systems, full-stack web apps. I care about solving real problems,
          not just code that looks impressive.
        </p>
      </div>

      <br />
      <div className="research-block">
        <p className="out-comment">// research_interests.log</p>
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
