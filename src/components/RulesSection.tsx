import { useState, useEffect } from 'react'
import { formatDateTime } from '../utils/time'
import './RulesSection.css'

export const RulesSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="rules-section">
      <div className="rules-content">
        <h2 className="rules-title">跨年幸运墙</h2>
        <p className="rules-description">
          RULE - 快快点击幸运签吧，在不同时间可以解锁不同的专属内容哦~
        </p>
        <div className="rules-clock">{formatDateTime(currentTime)}</div>
      </div>
    </div>
  )
}
