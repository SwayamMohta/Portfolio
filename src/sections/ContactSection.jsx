function ContactSection() {
  return (
    <div className="cmd-output">
      <p className="out-comment">// contact.env — read-only</p>
      <br />
      <p className="out-line">
        <span className="out-amber">PERSONAL_EMAIL</span>
        <span className="out-sep"> = </span>
        <a href="mailto:mohtaswayam@gmail.com" className="out-link">
          mohtaswayam@gmail.com
        </a>
      </p>
      <p className="out-line">
        <span className="out-amber">COLLEGE_EMAIL</span>
        <span className="out-sep">  = </span>
        <span className="out-text">se23uari123@mahindrauniversity.edu.in</span>
      </p>
      <p className="out-line">
        <span className="out-amber">PHONE</span>
        <span className="out-sep">          = </span>
        <span className="out-text">+91-93481-45200</span>
      </p>
      <p className="out-line">
        <span className="out-amber">LINKEDIN</span>
        <span className="out-sep">       = </span>
        <a
          href="https://linkedin.com/in/swayam-mohta"
          target="_blank"
          rel="noreferrer"
          className="out-link"
        >
          linkedin.com/in/swayam-mohta
        </a>
      </p>
      <p className="out-line">
        <span className="out-amber">GITHUB</span>
        <span className="out-sep">         = </span>
        <a
          href="https://github.com/swayammohta"
          target="_blank"
          rel="noreferrer"
          className="out-link"
        >
          github.com/swayammohta
        </a>
      </p>
      <br />
      <p className="out-muted">// open to full-stack, frontend, and AI/ML internship roles</p>
    </div>
  )
}

export default ContactSection
