import './Modal.css'

interface ModalProps {
  content: string
  onClose: () => void
}

export const Modal = ({ content, onClose }: ModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-text">{content}</div>
      </div>
    </div>
  )
}

