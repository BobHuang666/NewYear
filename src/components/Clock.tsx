import { useState, useEffect } from 'react'
import { formatDateTime } from '../utils/time'
import './Clock.css'

export const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="clock">
      <div className="clock-label">当前时间</div>
      <div className="clock-time">{formatDateTime(currentTime)}</div>
    </div>
  )
}
