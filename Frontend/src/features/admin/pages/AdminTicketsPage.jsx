import { useCallback, useEffect, useState } from "react"
import TicketDetailModal from "../components/TicketDetailModal"
import TicketTable from "../components/TicketTable"
import { TICKET_CATEGORIES, TICKET_PRIORITIES, TICKET_STATUSES } from "../constants/ticketOptions"
import { getAdminTickets } from "../services/adminApi"

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedTicketId, setSelectedTicketId] = useState(null)
  const [notification, setNotification] = useState(null)
  const [filters, setFilters] = useState({ status: "", category: "", priority: "", date: "" })
  const [appliedFilters, setAppliedFilters] = useState({ status: "", category: "", priority: "", date: "" })

  const loadTickets = useCallback(async (activeFilters = {}) => {
    setLoading(true)
    setError("")

    try {
      const data = await getAdminTickets(activeFilters)
      setTickets(data)
    } catch {
      setError("Failed to load tickets. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTickets(appliedFilters)
  }, [appliedFilters, loadTickets])

  useEffect(() => {
    if (!notification) return undefined

    const timer = setTimeout(() => setNotification(null), 4000)
    return () => clearTimeout(timer)
  }, [notification])

  const handleNotify = (payload) => {
    setNotification(payload)
  }

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleApplyFilters = (event) => {
    event.preventDefault()
    setAppliedFilters(filters)
  }

  const handleResetFilters = () => {
    const clearedFilters = { status: "", category: "", priority: "", date: "" }
    setFilters(clearedFilters)
    setAppliedFilters(clearedFilters)
  }

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#3B82F6] border-t-transparent" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
        {error}
      </div>
    )
  }

  return (
    <div>
      {notification && (
        <div
          className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
            notification.type === "success"
              ? "border-green-500/20 bg-green-500/10 text-green-400"
              : "border-red-500/20 bg-red-500/10 text-red-400"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#F9FAFB]">All Support Tickets</h2>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          {tickets.length} {tickets.length === 1 ? "ticket" : "tickets"} in queue
        </p>
      </div>

      <form
        onSubmit={handleApplyFilters}
        className="mb-6 rounded-lg border border-[#374151] bg-[#111827] p-4"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#E5E7EB]">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="rounded-lg border border-[#374151] bg-[#1F2937] px-3 py-2 text-sm text-[#F9FAFB]"
            >
              <option value="">All Statuses</option>
              {TICKET_STATUSES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#E5E7EB]">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="rounded-lg border border-[#374151] bg-[#1F2937] px-3 py-2 text-sm text-[#F9FAFB]"
            >
              <option value="">All Categories</option>
              {TICKET_CATEGORIES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#E5E7EB]">Priority</label>
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="rounded-lg border border-[#374151] bg-[#1F2937] px-3 py-2 text-sm text-[#F9FAFB]"
            >
              <option value="">All Priorities</option>
              {TICKET_PRIORITIES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#E5E7EB]">Date</label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="rounded-lg border border-[#374151] bg-[#1F2937] px-3 py-2 text-sm text-[#F9FAFB]"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2563EB]"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleResetFilters}
            className="rounded-lg border border-[#374151] px-4 py-2 text-sm text-[#9CA3AF] transition-colors hover:text-[#F9FAFB]"
          >
            Clear Filters
          </button>
        </div>
      </form>

      {tickets.length === 0 ? (
        <div className="rounded-lg border border-[#374151] bg-[#1F2937] px-6 py-12 text-center">
          <p className="text-sm text-[#9CA3AF]">No support tickets yet.</p>
          <p className="mt-1 text-xs text-[#6B7280]">
            New author queries will appear here when submitted.
          </p>
        </div>
      ) : (
        <TicketTable
          tickets={tickets}
          onSelectTicket={setSelectedTicketId}
        />
      )}

      {selectedTicketId && (
        <TicketDetailModal
          ticketId={selectedTicketId}
          onClose={() => setSelectedTicketId(null)}
          onUpdated={loadTickets}
          onNotify={handleNotify}
        />
      )}
    </div>
  )
}
