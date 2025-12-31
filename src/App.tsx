import { useState } from 'react'
import { FORTUNE_TICKETS } from './types'
import { FortuneTicket } from './components/FortuneTicket'
import { Modal } from './components/Modal'
import { RemainingCount } from './components/RemainingCount'
import { RulesSection } from './components/RulesSection'
import { getOpenedTickets, markTicketAsOpened } from './utils/storage'
import './App.css'

function App() {
  const [openedTickets, setOpenedTickets] = useState<Set<number>>(() => getOpenedTickets())
  const [modalContent, setModalContent] = useState<string | null>(null)

  const handleTicketOpen = (id: number, content: string) => {
    const targetTime = new Date(FORTUNE_TICKETS[id - 1].time).getTime()
    const currentTime = new Date().getTime()

    if (currentTime >= targetTime && !openedTickets.has(id)) {
      markTicketAsOpened(id)
      setOpenedTickets(new Set([...openedTickets, id]))
    }

    setModalContent(content)
  }

  const closeModal = () => {
    setModalContent(null)
  }

  const availableTickets = FORTUNE_TICKETS.filter(ticket => {
    const targetTime = new Date(ticket.time).getTime()
    const currentTime = new Date().getTime()
    return currentTime >= targetTime && !openedTickets.has(ticket.id)
  }).length

  // 两行五列布局，统一倾斜度
  const ticketPositions = [
    // 第一行 - 从顶部开始
    { top: '-10%', left: '10%' },
    { top: '-10%', left: '26%' },
    { top: '-10%', left: '42%' },
    { top: '-10%', left: '58%' },
    { top: '-10%', left: '74%' },
    // 第二行
    { top: '55%', left: '10%' },
    { top: '55%', left: '26%' },
    { top: '55%', left: '42%' },
    { top: '55%', left: '58%' },
    { top: '55%', left: '74%' }
  ]

  // 统一倾斜度：所有票都旋转30度（顺时针）
  const rotations = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30]

  return (
    <div className="app">
      <RemainingCount remaining={availableTickets} total={FORTUNE_TICKETS.length} />
      <div className="tickets-container">
        {FORTUNE_TICKETS.map((ticket, index) => (
          <FortuneTicket
            key={ticket.id}
            id={ticket.id}
            content={ticket.content}
            time={ticket.time}
            isOpened={openedTickets.has(ticket.id)}
            onOpen={handleTicketOpen}
            rotation={rotations[index]}
            position={ticketPositions[index]}
            isReversed={index < 5}
          />
        ))}
      </div>
      <RulesSection />
      {modalContent && <Modal content={modalContent} onClose={closeModal} />}
    </div>
  )
}

export default App
