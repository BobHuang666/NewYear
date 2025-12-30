import { useState } from 'react'
import './FortuneTicket.css'

interface FortuneTicketProps {
  id: number
  content: string
  time: string
  isOpened: boolean
  onOpen: (id: number, content: string) => void
  rotation: number
  position: { top: string; left: string }
  isReversed?: boolean
}

export const FortuneTicket = ({
  id,
  content,
  time,
  isOpened,
  onOpen,
  rotation,
  position,
  isReversed = false
}: FortuneTicketProps) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    if (isOpened) {
      onOpen(id, content)
      return
    }

    const targetTime = new Date(time).getTime()
    const currentTime = new Date().getTime()

    if (currentTime < targetTime) {
      onOpen(id, '不是这个哦~还没到时间呢，看看其他的吧！')
      return
    }

    setIsAnimating(true)
    setTimeout(() => {
      onOpen(id, content)
      setIsAnimating(false)
    }, 600)
  }

  const showArrows = id % 3 === 0

  return (
    <div
      className={`fortune-ticket ${isOpened ? 'opened' : ''} ${isAnimating ? 'animating' : ''} ${isReversed ? 'reversed' : ''}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        top: position.top,
        left: position.left
      }}
      onClick={handleClick}
    >
      <div className="ticket-red">
        <div className="ticket-red-content">
          <div className="ticket-pattern ticket-pattern-snowflake"></div>
          <div className="ticket-text-vertical">FORTUNE</div>
          {showArrows && <div className="ticket-arrows">{'>>'}</div>}
        </div>
      </div>
      <div className="ticket-white">
        <div className="ticket-white-content">
          <div className="ticket-pattern ticket-pattern-lines"></div>
          <div className="ticket-text-horizontal">LOTTERY</div>
        </div>
      </div>
      <div className="ticket-tear-line"></div>
    </div>
  )
}

