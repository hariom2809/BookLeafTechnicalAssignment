import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMyTickets } from "../services/userApi"

const StatusBadge = ({ status }) => {
  const map = {
    open:        { label: "Open",        cls: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
    in_progress: { label: "In Progress", cls: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20" },
    resolved:    { label: "Resolved",    cls: "bg-green-500/15 text-green-400 border-green-500/20" },
    closed:      { label: "Closed",      cls: "bg-[#374151] text-[#9CA3AF] border-[#4B5563]" },
  }
  const { label, cls } = map[status] ?? { label: status, cls: "bg-[#374151] text-[#9CA3AF] border-[#4B5563]" }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {label}
    </span>
  )
}

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    getMyTickets()
      .then(setTickets)
      .catch(() => setError("Failed to load your tickets. Please try again."))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-7 h-7 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-5 py-4 text-red-400 text-sm">
        {error}
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#F9FAFB]">My Tickets</h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            {tickets.length} {tickets.length === 1 ? "ticket" : "tickets"} submitted
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/submit-query")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors"
        >
          + New Ticket
        </button>
      </div>

      {/* Empty state */}
      {tickets.length === 0 && (
        <div className="rounded-lg border border-[#374151] bg-[#1F2937] px-6 py-12 text-center">
          <p className="text-[#9CA3AF] text-sm">You haven't raised any support tickets yet.</p>
          <button
            onClick={() => navigate("/dashboard/submit-query")}
            className="mt-4 px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors"
          >
            Submit your first query
          </button>
        </div>
      )}

      {/* Ticket list */}
      <div className="grid gap-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="rounded-lg border border-[#374151] bg-[#1F2937] px-5 py-4 hover:border-[#4B5563] transition-colors"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <p className="text-[11px] font-mono text-[#6B7280] mb-1">#{ticket.id}</p>
                <h3 className="text-sm font-semibold text-[#F9FAFB] truncate">{ticket.subject}</h3>
              </div>
              <StatusBadge status={ticket.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}