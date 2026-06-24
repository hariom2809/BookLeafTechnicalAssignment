import { useNavigate } from "react-router-dom"
import Card from "../../../components/ui/Card"
import StatusBadge from "./StatusBadge"

export default function TicketCard({ ticket }) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(`/dashboard/my-tickets/${ticket.id}`)}
      className="hover:border-[#6B7280] transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <p className="text-[11px] font-mono text-[#6B7280] mb-1">
            #{ticket.id}
          </p>

          <h3 className="text-sm font-semibold text-[#F9FAFB] truncate">
            {ticket.subject}
          </h3>
        </div>

        <StatusBadge
          status={ticket.status}
          type="ticket"
        />
      </div>
    </Card>
  )
}