import { useState, useRef, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, NavLink } from 'react-router-dom'
import AboutSection from './sections/AboutSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'
import ResearchSection from './sections/ResearchSection'
import ContactSection from './sections/ContactSection'
import HelpSection from './sections/HelpSection'
import './App.css'

const COMMANDS = {
  '/about': { path: '/about', Component: AboutSection },
  '/projects': { path: '/projects', Component: ProjectsSection },
  '/skills': { path: '/skills', Component: SkillsSection },
  '/research': { path: '/research', Component: ResearchSection },
  '/contact': { path: '/contact', Component: ContactSection },
  '/clear': { path: null, Component: null },
  '/help': { path: '/help', Component: HelpSection },
}

const CMD_LIST = Object.keys(COMMANDS)

function SessionEntry({ entry }) {
  const { cmd, Component } = entry
  return (
    <div className="session-entry">
      <div className="session-prompt-line">
        <span className="ps-user">swayam</span>
        <span className="ps-at">@</span>
        <span className="ps-host">portfolio</span>
        <span className="ps-sep">:</span>
        <span className="ps-tilde">~</span>
        <span className="ps-dollar">$</span>
        <span className="ps-cmd"> {cmd}</span>
      </div>
      <Component />
    </div>
  )
}

function BootMessage() {
  const now = new Date()
  const ts = now.toLocaleString('en-IN', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false,
  })
  return (
    <div className="boot-block">
      <p className="out-muted">Last login: {ts} on MuSM123</p>
      <br />
      <p className="out-text">
        <span className="out-green">swayam portfolio</span>
        <span className="out-muted">developer environment</span>
      </p>
      <p className="out-muted">
        Type <span className="out-bright">/help</span> to see available commands.
      </p>
      <br />
    </div>
  )
}

function Terminal() {
  const navigate = useNavigate()
  const location = useLocation()
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const [history, setHistory] = useState([])
  const [active, setActive] = useState(null)
  const [input, setInput] = useState('')

  const initialized = useRef(false)
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const isRoot = location.pathname === '/' || location.pathname === '/portfolio' || location.pathname === '/portfolio/'
    if (isRoot) {
      runCommand('/about')
    } else {
      const matchedCmd = CMD_LIST.find(
        (c) => COMMANDS[c].path === location.pathname
      )
      if (matchedCmd && history.length === 0) {
        runCommand(matchedCmd)
      }
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function runCommand(cmd) {
    if (cmd === '/clear') {
      setHistory([])
      setInput('')
      setActive(null)
      return
    }

    const entry = COMMANDS[cmd]
    if (!entry || !entry.Component) return
    setActive(cmd)
    navigate(entry.path)
    setHistory((prev) => [
      ...prev,
      { id: `${cmd}-${Date.now()}-${Math.random()}`, cmd, Component: entry.Component },
    ])
    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const cmd = input.trim()
      if (CMD_LIST.includes(cmd)) {
        runCommand(cmd)
      }
    }
  }

  function handleInputChange(e) {
    setInput(e.target.value)
  }

  return (
    <div className="terminal-wrap">
      <div className="term-chrome">
        <div className="chrome-dots">
          <span className="dot dot-red" />
          <span className="dot dot-amber" />
          <span className="dot dot-green" />
        </div>
        <span className="chrome-title">swayam@portfolio — zsh</span>
        <span className="chrome-spacer" />
      </div>

      <div className="term-body">
        <BootMessage />
        {history.map((entry) => (
          <SessionEntry key={entry.id} entry={entry} />
        ))}
        <div className="live-prompt">
          <span className="ps-user">swayam</span>
          <span className="ps-at">@</span>
          <span className="ps-host">portfolio</span>
          <span className="ps-sep">:</span>
          <span className="ps-tilde">~</span>
          <span className="ps-dollar">$</span>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder=" "
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>

      <div className="cmd-bar">
        <span className="cmd-bar-label">run:</span>
        {CMD_LIST.map((cmd) => (
          <NavLink
            key={cmd}
            to={COMMANDS[cmd].path || '#'}
            className={({ isActive }) =>
              `cmd-btn ${isActive || active === cmd ? 'cmd-btn--active' : ''}`
            }
            onClick={(e) => {
              if (cmd === '/clear') {
                e.preventDefault()
                runCommand(cmd)
              } else {
                runCommand(cmd)
              }
            }}
          >
            {cmd}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Terminal />} />
    </Routes>
  )
}

export default App
