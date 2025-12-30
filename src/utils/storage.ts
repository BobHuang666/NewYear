const STORAGE_KEY = 'fortune_tickets_opened'

export const getOpenedTickets = (): Set<number> => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return new Set()
  try {
    const ids = JSON.parse(stored) as number[]
    return new Set(ids)
  } catch {
    return new Set()
  }
}

export const markTicketAsOpened = (id: number): void => {
  const opened = getOpenedTickets()
  opened.add(id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(opened)))
}

export const isTicketOpened = (id: number): boolean => {
  return getOpenedTickets().has(id)
}

