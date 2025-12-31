import './RemainingCount.css'

interface RemainingCountProps {
  remaining: number
  total: number
}

export const RemainingCount = ({ remaining, total }: RemainingCountProps) => {
  return (
    <div className="remaining-count">
      <div className="remaining-label">REMAINING</div>
      <div className="remaining-label-cn">当前剩余签数</div>
      <div className="remaining-number">
        {remaining}/{total}
      </div>
    </div>
  )
}
