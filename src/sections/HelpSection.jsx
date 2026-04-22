const commands = [
  { cmd: '/about',    desc: 'who I am, current status' },
  { cmd: '/projects', desc: 'work I have shipped' },
  { cmd: '/skills',   desc: 'technical stack' },
  { cmd: '/research', desc: 'areas I am exploring' },
  { cmd: '/contact',  desc: 'how to reach me' },
  { cmd: '/clear',    desc: 'clear terminal history' },
  { cmd: '/help',     desc: 'show this message' },
]

function HelpSection() {
  return (
    <div className="cmd-output">
      <p className="out-comment">// swayam-portfolio v2.0 — command reference</p>
      <br />
      <p className="out-muted">available commands:</p>
      <br />
      {commands.map((c) => (
        <p key={c.cmd} className="help-row">
          <span className="help-cmd">{c.cmd}</span>
          <span className="out-muted">  —  {c.desc}</span>
        </p>
      ))}
      <br />
      <p className="out-muted">// click any command above to run it</p>
    </div>
  )
}

export default HelpSection
