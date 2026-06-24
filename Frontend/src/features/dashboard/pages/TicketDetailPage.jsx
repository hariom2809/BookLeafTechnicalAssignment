import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Card from "../../../components/ui/Card"
import StatusBadge from "../components/StatusBadge"
import { getTicketDetail } from "../services/userApi"

const formatDate = (value) => {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

export default function TicketDetailPage() {
  const { ticketId } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    const loadTicket = async () => {
      setLoading(true)
      setError("")

      try {
        const data = await getTicketDetail(ticketId)
        if (isMounted) {
          setTicket(data)
        }
      } catch {
        if (isMounted) {
          setError("Failed to load ticket details. Please try again.")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadTicket()

    return () => {
      isMounted = false
    }
  }, [ticketId])

  const displayCategory = useMemo(() => {
    if (!ticket) return "Not Available"
    return ticket.category || ticket.ai_category || "Not Available"
  }, [ticket])

  const displayPriority = useMemo(() => {
    if (!ticket) return "Not Available"
    return ticket.priority || ticket.ai_priority || "Not Available"
  }, [ticket])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-60">
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

  if (!ticket) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            onClick={() => navigate("/dashboard/my-tickets")}
            className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
          >
            ← Back to tickets
          </button>
          <h1 className="text-2xl font-bold text-[#F9FAFB] mt-2">{ticket.subject}</h1>
          <p className="text-sm text-[#9CA3AF] mt-1">Ticket details and updates</p>
        </div>
        <StatusBadge status={ticket.status} type="ticket" />
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-[#374151]">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#6B7280]">Ticket ID</p>
                <p className="text-lg font-semibold text-[#F9FAFB]">#{ticket.id}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#6B7280]">Subject</p>
                  <p className="mt-1 text-sm text-[#F9FAFB]">{ticket.subject}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#6B7280]">Status</p>
                  <p className="mt-1 text-sm text-[#F9FAFB]">{ticket.status}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#6B7280]">Category</p>
                  <p className="mt-1 text-sm text-[#F9FAFB]">{displayCategory}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#6B7280]">Priority</p>
                  <p className="mt-1 text-sm text-[#F9FAFB]">{displayPriority}</p>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-[#6B7280]">Description</p>
                <p className="mt-1 text-sm leading-6 text-[#E5E7EB]">{ticket.description || "—"}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-[#6B7280]">Created At</p>
              <p className="mt-1 text-sm text-[#F9FAFB]">{formatDate(ticket.created_at)}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-[#6B7280]">Related Book</p>
              <p className="mt-1 text-sm text-[#F9FAFB]">{ticket.book ? `Book #${ticket.book}` : "General Query"}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-[#6B7280]">Assigned To</p>
              <p className="mt-1 text-sm text-[#F9FAFB]">{ticket.assigned_to ? `User #${ticket.assigned_to}` : "Not Assigned"}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
