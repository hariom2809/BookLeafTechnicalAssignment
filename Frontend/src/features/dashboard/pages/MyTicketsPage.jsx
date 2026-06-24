import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMyTickets } from "../services/ticketsApi"
import TicketCard from "../components/TicketCard"

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
          <TicketCard
            key={ticket.id}
            ticket={ticket}
          />
        ))}
      </div>
    </div>
  )
}