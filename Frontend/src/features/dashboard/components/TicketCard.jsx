import { useNavigate } from "react-router-dom"
import Card from "../../../components/ui/Card"
import StatusBadge from "./StatusBadge"

export default function TicketCard({ ticket }) {
  const navigate = useNavigate()

  return (
    <Card className="hover:border-[#6B7280] transition-colors">
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

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-[#9CA3AF]">
          {ticket.has_response ? "Admin response available" : "Waiting for admin response"}
        </p>
        <button
          type="button"
          onClick={() => navigate(`/dashboard/my-tickets/${ticket.id}`)}
          className="rounded-lg border border-[#374151] px-3 py-1.5 text-sm text-[#F9FAFB] transition-colors hover:border-[#6B7280] hover:bg-[#374151]"
        >
          {ticket.has_response ? "See Response" : "View Ticket"}
        </button>
      </div>
    </Card>
  )
}