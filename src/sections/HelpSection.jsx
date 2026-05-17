import SectionHeader from '../components/SectionHeader'

const commands = [
  { cmd: '/about', desc: 'who I am, current status' },
  { cmd: '/projects', desc: 'work I have shipped' },
  { cmd: '/skills', desc: 'technical stack' },
  { cmd: '/research', desc: 'areas I am exploring' },
  { cmd: '/contact', desc: 'how to reach me' },
  { cmd: '/theme list', desc: 'list available themes and how to set' },
  { cmd: '/clear', desc: 'clear terminal history' },
  { cmd: '/help', desc: 'show this message' },
]

function HelpSection({ outputPacing }) {
  return (
    <div className="cmd-output">
      <SectionHeader text="// swayam-portfolio v2.0 - command reference" outputPacing={outputPacing} />
      <p className="out-muted">available commands:</p>
      {commands.map((command) => (
        <p key={command.cmd} className="help-row">
          <span className="help-cmd">{command.cmd}</span>
          <span className="out-muted">  -  {command.desc}</span>
        </p>
      ))}
      <p className="out-muted">// shortcut aliases like about/projects still work</p>
    </div>
  )
}

export default HelpSection
