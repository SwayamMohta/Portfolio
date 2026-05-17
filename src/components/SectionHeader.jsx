import { useEffect, useState } from 'react'

const TYPE_SPEED_MS = 24
const TYPE_START_DELAY_MS = 120

function TypewriterHeader({ text }) {
  const [visibleText, setVisibleText] = useState('')

  useEffect(() => {
    let index = 0
    let typingTimer = null

    const startTimer = setTimeout(() => {
      typingTimer = setInterval(() => {
        index += 1
        setVisibleText(text.slice(0, index))
        if (index >= text.length) {
          clearInterval(typingTimer)
        }
      }, TYPE_SPEED_MS)
    }, TYPE_START_DELAY_MS)

    return () => {
      clearTimeout(startTimer)
      if (typingTimer) clearInterval(typingTimer)
    }
  }, [text])

  return <p className="out-comment">{visibleText}</p>
}

function SectionHeader({ text, outputPacing = 'instant' }) {
  if (outputPacing !== 'typewriter') {
    return <p className="out-comment">{text}</p>
  }

  return <TypewriterHeader key={text} text={text} />
}

export default SectionHeader
