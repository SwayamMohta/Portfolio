import { useState, useRef, useEffect, useMemo } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
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
const SECTION_KEYS = ['about', 'projects', 'skills', 'research', 'contact']
const THEME_KEYS = ['dark', 'light', 'ubuntu']
const COMMAND_ALIASES = {
  '/help': '/help',
  '/clear': '/clear',
  '/theme': '/theme',
  ...Object.fromEntries(SECTION_KEYS.map((key) => [key, `/${key}`])),
  ...Object.fromEntries(SECTION_KEYS.map((key) => [`/${key}`, `/${key}`])),
}
const PRIMARY_COMMANDS = [
  ...SECTION_KEYS.map((key) => `/${key}`),
  '/clear',
  '/help',
  '/theme',
  ...THEME_KEYS.map((key) => `/theme ${key}`),
]

function formatDisplayCommand(canonicalCommand) {
  return canonicalCommand
}
const STORAGE_KEYS = {
  inputHistory: 'portfolio.shell.inputHistory',
  outputPacing: 'portfolio.shell.outputPacing',
  scrollMemory: 'portfolio.shell.scrollMemory',
  theme: 'portfolio.shell.theme',
}

const THEME_LABELS = {
  dark: 'Dark',
  light: 'Light',
  ubuntu: 'Ubuntu',
}

function safeLoadArray(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function safeLoadObject(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function commandContext(command) {
  if (!command || typeof command !== 'string') return 'shell'
  return command.replace(/^\//, '').split(' ')[0] || 'shell'
}

function getReplayableCommand(inputHistory) {
  for (let i = inputHistory.length - 1; i >= 0; i -= 1) {
    const candidate = normalizeToCanonicalCommand(inputHistory[i])
    if (candidate && CMD_LIST.includes(candidate)) {
      return candidate
    }
  }
  return null
}

function normalizeToCanonicalCommand(rawInput) {
  if (!rawInput || typeof rawInput !== 'string') return null
  const normalized = rawInput.trim().toLowerCase().replace(/\s+/g, ' ')
  return COMMAND_ALIASES[normalized] ?? null
}

function getAutocompleteMatch(inputValue) {
  const trimmed = inputValue.trim().toLowerCase()
  if (!trimmed || inputValue.endsWith(' ')) return null
  const match = PRIMARY_COMMANDS.find((cmd) => cmd.startsWith(trimmed))
  if (!match || match === trimmed) return null
  return match
}

function parseThemeCommand(input) {
  const normalized = input.trim().toLowerCase().replace(/\s+/g, ' ')
  if (!normalized.startsWith('/theme') && !normalized.startsWith('theme')) return null
  const parts = normalized.split(' ')
  const subcommand = parts[1] ?? ''
  return { normalized, subcommand }
}

function PromptLine({ cmd, context }) {
  return (
    <p className="prompt-line">
      <span className="ps-user">swayam</span>
      <span className="ps-at">@</span>
      <span className="ps-host">portfolio</span>
      <span className="ps-sep">:</span>
      <span className="ps-tilde">~</span>
      <span className="ps-dollar">$</span>
      <span className="ps-cmd"> {cmd}</span>
      <span className="prompt-context">main::{context}</span>
    </p>
  )
}

function SessionEntry({ entry, outputPacing }) {
  const { cmd, Component, context } = entry

  return (
    <div className="session-entry">
      <PromptLine cmd={cmd} context={context} />
      <Component outputPacing={outputPacing} />
    </div>
  )
}

function FeedbackEntry({ entry }) {
  return (
    <div className="session-entry session-entry--feedback">
      <PromptLine cmd={entry.cmd} context={entry.context ?? commandContext(entry.cmd)} />
      <p className={`terminal-feedback terminal-feedback--${entry.level}`}>
        {entry.message}
      </p>
    </div>
  )
}

function BootMessage() {
  const now = new Date()
  const ts = now.toLocaleString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <div className="boot-block">
      <p className="out-muted">Last login: {ts} on SM123</p>
      <p className="out-muted">
        Type <span className="out-bright">/help</span> to see available commands.
      </p>
    </div>
  )
}

export function Terminal() {
  const navigate = useNavigate()
  const location = useLocation()

  const termBodyRef = useRef(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const initialized = useRef(false)
  const autoScrollReady = useRef(false)
  const shouldSmoothScroll = useRef(false)
  const isPinnedToBottom = useRef(true)
  const pendingRestoreScroll = useRef(null)
  const scrollMemoryRef = useRef(safeLoadObject(STORAGE_KEYS.scrollMemory))

  const [history, setHistory] = useState([])
  const [isMaximized, setIsMaximized] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [inputHistory, setInputHistory] = useState(() => safeLoadArray(STORAGE_KEYS.inputHistory))
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.theme)
      return THEME_KEYS.includes(savedTheme) ? savedTheme : 'dark'
    } catch {
      return 'dark'
    }
  })
  const [outputPacing, setOutputPacing] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.outputPacing)
      return saved === 'typewriter' ? 'typewriter' : 'instant'
    } catch {
      return 'instant'
    }
  })
  const [input, setInput] = useState('')
  const [inputCursor, setInputCursor] = useState(-1)
  const [draftInput, setDraftInput] = useState('')

  const activeCommand = CMD_LIST.find((cmd) => COMMANDS[cmd].path === location.pathname) ?? null
  const currentContext = activeCommand ? commandContext(activeCommand) : 'shell'
  const inputPlaceholder = ''

  const autocompleteMatch = useMemo(() => getAutocompleteMatch(input), [input])
  const trimmedInput = input.trim().toLowerCase()
  const ghostSuffix = autocompleteMatch && input && trimmedInput
    ? autocompleteMatch.slice(trimmedInput.length)
    : ''

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.inputHistory, JSON.stringify(inputHistory))
    } catch {
      // ignore local storage errors
    }
  }, [inputHistory])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.outputPacing, outputPacing)
    } catch {
      // ignore local storage errors
    }
  }, [outputPacing])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme)
    } catch {
      // ignore local storage errors
    }
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    function persistScrollMemoryOnExit() {
      try {
        localStorage.setItem(STORAGE_KEYS.scrollMemory, JSON.stringify(scrollMemoryRef.current))
      } catch {
        // ignore local storage errors
      }
    }

    window.addEventListener('beforeunload', persistScrollMemoryOnExit)
    return () => {
      persistScrollMemoryOnExit()
      window.removeEventListener('beforeunload', persistScrollMemoryOnExit)
    }
  }, [])

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const isRoot = location.pathname === '/' || location.pathname === '/portfolio' || location.pathname === '/portfolio/'

    if (isRoot) {
      runCommand('/about', { smoothScroll: false })
      return
    }

    const matchedCmd = CMD_LIST.find((cmd) => COMMANDS[cmd].path === location.pathname)
    if (matchedCmd && history.length === 0) {
      runCommand(matchedCmd, { smoothScroll: false })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const body = termBodyRef.current
    if (!body) return

    if (pendingRestoreScroll.current !== null) {
      body.scrollTop = pendingRestoreScroll.current
      isPinnedToBottom.current = false
      pendingRestoreScroll.current = null
      return
    }

    const shouldSnap = !autoScrollReady.current
    const shouldScroll = isPinnedToBottom.current || shouldSmoothScroll.current || shouldSnap

    if (shouldScroll) {
      bottomRef.current?.scrollIntoView({
        behavior: shouldSnap ? 'auto' : shouldSmoothScroll.current ? 'smooth' : 'auto',
        block: 'end',
      })
    }

    autoScrollReady.current = true
    shouldSmoothScroll.current = false
  }, [history])

  useEffect(() => {
    function handleGlobalMouseUp(event) {
      if (event.target.closest('a, button, input')) return
      
      const selection = window.getSelection().toString()
      if (selection) return
      
      // Restrict auto-scroll & refocus strictly to empty structural/background spaces
      const el = event.target
      const className = typeof el.className === 'string' ? el.className : ''
      const isContainer = 
        el === document.body ||
        el.id === 'root' ||
        className.includes('term-body') ||
        className.includes('terminal-wrap') ||
        className.includes('term-chrome') ||
        className.includes('cmd-bar')
        
      if (!isContainer) return
      
      focusInput()
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)
    inputRef.current?.focus()

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [])

  function persistScrollMemory() {
    try {
      localStorage.setItem(STORAGE_KEYS.scrollMemory, JSON.stringify(scrollMemoryRef.current))
    } catch {
      // ignore local storage errors
    }
  }

  function rememberActiveScroll() {
    const body = termBodyRef.current
    if (!body || !activeCommand) return

    scrollMemoryRef.current[activeCommand] = body.scrollTop
    persistScrollMemory()
  }

  function runCommand(cmd, options = {}) {
    const { smoothScroll = true, displayCmd = cmd } = options
    shouldSmoothScroll.current = smoothScroll

    rememberActiveScroll()

    if (cmd === '/clear') {
      setHistory([])
      setInput('')
      setInputCursor(-1)
      setDraftInput('')
      navigate('/about')

      const body = termBodyRef.current
      if (body) {
        body.scrollTop = 0
      }

      return
    }

    const entry = COMMANDS[cmd]
    if (!entry || !entry.Component) return

    const rememberedScroll = scrollMemoryRef.current[cmd]
    pendingRestoreScroll.current = Number.isFinite(rememberedScroll) ? rememberedScroll : null

    navigate(entry.path)
    setHistory((prev) => [
      ...prev,
      {
        id: `${displayCmd}-${Date.now()}-${Math.random()}`,
        type: 'command',
        cmd: displayCmd,
        canonicalCmd: cmd,
        context: commandContext(cmd),
        Component: entry.Component,
      },
    ])
    setInput('')
  }

  function toggleMaximize() {
    setIsMaximized((prev) => !prev)
  }

  function closeTerminal() {
    navigate('/')
  }

  function runRawInput(rawInput) {
    const normalizedInput = rawInput.trim().toLowerCase().replace(/\s+/g, ' ')
    if (!normalizedInput) return

    setInputCursor(-1)
    setDraftInput('')

    if (normalizedInput === '!!') {
      const replayableCommand = getReplayableCommand(inputHistory)
      setInputHistory((prev) => [...prev, normalizedInput])

      if (!replayableCommand) {
        shouldSmoothScroll.current = true
        setHistory((prev) => [
          ...prev,
          {
            id: `feedback-${Date.now()}-${Math.random()}`,
            type: 'feedback',
            cmd: normalizedInput,
            context: currentContext,
            level: 'error',
            message: 'zsh: no commands in history to replay.',
          },
        ])
        setInput('')
        return
      }

      runCommand(replayableCommand, {
        smoothScroll: true,
        displayCmd: `!! (${formatDisplayCommand(replayableCommand)})`,
      })
      return
    }

    const themeCommand = parseThemeCommand(normalizedInput)
    if (themeCommand) {
      setInputHistory((prev) => [...prev, normalizedInput])
      const { subcommand } = themeCommand

      if (!subcommand || subcommand === 'list') {
        shouldSmoothScroll.current = true
        setHistory((prev) => [
          ...prev,
          {
            id: `theme-list-${Date.now()}-${Math.random()}`,
            type: 'feedback',
            cmd: normalizedInput,
            context: currentContext,
            level: 'info',
            message: `themes: ${THEME_KEYS.join(', ')} (current: ${theme}). usage: /theme <name>`,
          },
        ])
        setInput('')
        return
      }

      if (THEME_KEYS.includes(subcommand)) {
        setTheme(subcommand)
        shouldSmoothScroll.current = true
        setHistory((prev) => [
          ...prev,
          {
            id: `theme-set-${Date.now()}-${Math.random()}`,
            type: 'feedback',
            cmd: normalizedInput,
            context: currentContext,
            level: 'success',
            message: `theme switched to ${THEME_LABELS[subcommand]}.`,
          },
        ])
        setInput('')
        return
      }

      shouldSmoothScroll.current = true
      setHistory((prev) => [
        ...prev,
        {
          id: `theme-invalid-${Date.now()}-${Math.random()}`,
          type: 'feedback',
          cmd: normalizedInput,
          context: currentContext,
          level: 'error',
          message: `unknown theme: ${subcommand}. Try /theme list.`,
        },
      ])
      setInput('')
      return
    }

    setInputHistory((prev) => [...prev, normalizedInput])

    const canonicalCommand = normalizeToCanonicalCommand(normalizedInput)
    if (canonicalCommand && CMD_LIST.includes(canonicalCommand)) {
      runCommand(canonicalCommand, { smoothScroll: true, displayCmd: normalizedInput })
      return
    }

    shouldSmoothScroll.current = true
    setHistory((prev) => [
      ...prev,
      {
        id: `feedback-${Date.now()}-${Math.random()}`,
        type: 'feedback',
        cmd: normalizedInput,
        context: currentContext,
        level: 'error',
        message: `zsh: command not found: ${normalizedInput}. Try /help.`,
      },
    ])
    setInput('')
  }

  function handleBodyScroll() {
    const body = termBodyRef.current
    if (!body) return

    const distanceFromBottom = body.scrollHeight - body.scrollTop - body.clientHeight
    isPinnedToBottom.current = distanceFromBottom < 64

    if (activeCommand) {
      scrollMemoryRef.current[activeCommand] = body.scrollTop
    }
  }

  function focusInput() {
    inputRef.current?.focus()
    const body = termBodyRef.current
    if (body) {
      body.scrollTop = body.scrollHeight
    }
  }

  function handleSurfaceMouseDown(event) {
    if (event.target.closest('a, button, input')) return
    focusInput()
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      runRawInput(input)
      return
    }

    if (event.key === 'Tab' || (event.key === 'ArrowRight' && inputCursor === -1)) {
      if (ghostSuffix) {
        event.preventDefault()
        setInput(input + ghostSuffix)
        return
      }
    }

    if (event.key === 'ArrowUp') {
      if (inputHistory.length === 0) return

      event.preventDefault()
      if (inputCursor === -1) {
        setDraftInput(input)
      }

      const nextCursor = inputCursor === -1
        ? inputHistory.length - 1
        : Math.max(0, inputCursor - 1)

      setInputCursor(nextCursor)
      setInput(inputHistory[nextCursor])
      return
    }

    if (event.key === 'ArrowDown') {
      if (inputHistory.length === 0 || inputCursor === -1) return

      event.preventDefault()
      const nextCursor = inputCursor + 1
      if (nextCursor >= inputHistory.length) {
        setInputCursor(-1)
        setInput(draftInput)
        return
      }

      setInputCursor(nextCursor)
      setInput(inputHistory[nextCursor])
      return
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      const match = getAutocompleteMatch(input)
      if (match) {
        setInput(match)
      }
      return
    }

    if (event.key === 'Escape') {
      setInput('')
      setInputCursor(-1)
      setDraftInput('')
    }
  }

  function handleInputChange(event) {
    setInput(event.target.value)
  }

  function toggleOutputPacing() {
    setOutputPacing((prev) => (prev === 'instant' ? 'typewriter' : 'instant'))
  }


  return (
    <div
      className={`terminal-wrap ${isMaximized ? 'terminal-wrap--maximized' : ''}`}
      onMouseDown={handleSurfaceMouseDown}
    >
      <div className="term-chrome">
        <div className="chrome-dots">
          <button
            type="button"
            className="dot dot-red"
            onClick={closeTerminal}
            title="Close"
          />
          <button
            type="button"
            className="dot dot-amber"
            onClick={() => setIsMaximized(false)}
            title="Minimize"
          />
          <button
            type="button"
            className="dot dot-green"
            onClick={toggleMaximize}
            title={isMaximized ? 'Restore' : 'Maximize'}
          />
        </div>
        <span className="chrome-title">swayam@portfolio - zsh</span>
        <span className="chrome-spacer" />
      </div>

      <div
        ref={termBodyRef}
        className="term-body"
        onScroll={handleBodyScroll}
      >
        <BootMessage />
        {history.map((entry) => (
          entry.type === 'feedback'
            ? <FeedbackEntry key={entry.id} entry={entry} />
            : <SessionEntry key={entry.id} entry={entry} outputPacing={outputPacing} />
        ))}
        <div className="live-prompt">
          <span className="ps-user">swayam</span>
          <span className="ps-at">@</span>
          <span className="ps-host">portfolio</span>
          <span className="ps-sep">:</span>
          <span className="ps-tilde">~</span>
          <span className="ps-dollar">$</span>
          <div className="cmd-input-wrap">
            {ghostSuffix && (
              <span className="cmd-input-ghost-layer" aria-hidden="true">
                <span className="cmd-input-ghost-typed">{input}</span>
                <span className="cmd-input-ghost-suffix">{ghostSuffix}</span>
              </span>
            )}
            <input
              ref={inputRef}
              type="text"
              className="cmd-input"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={inputPlaceholder}
              autoFocus
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
          <span className="cursor-blink" aria-hidden="true" />
          <span className="prompt-context prompt-context--live">main::{currentContext}</span>
        </div>
        <div ref={bottomRef} />
      </div>

      <div className="cmd-bar">
        <span className="cmd-bar-label">run:</span>
        <button
          type="button"
          className={`cmd-btn cmd-btn--meta ${outputPacing === 'typewriter' ? 'cmd-btn--active' : ''}`}
          onClick={toggleOutputPacing}
        >
          pace:{outputPacing}
        </button>
        {CMD_LIST.map((cmd) => (
          <button
            key={cmd}
            type="button"
            className={`cmd-btn ${activeCommand === cmd ? 'cmd-btn--active' : ''}`}
            onClick={() => runCommand(cmd, { displayCmd: formatDisplayCommand(cmd) })}
          >
            {formatDisplayCommand(cmd)}
          </button>
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
