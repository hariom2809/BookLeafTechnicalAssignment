import { useEffect, useState } from "react"
import Button from "../../../components/ui/Button"
import StatusBadge from "../../dashboard/components/StatusBadge"
import {
  formatDate,
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
  TICKET_STATUSES,
} from "../constants/ticketOptions"
import {
  generateDraftResponse,
  getAdminTicketDetail,
  sendTicketResponse,
  updateAdminTicket,
} from "../services/adminApi"

const selectClassName =
  "w-full rounded-lg border border-[#374151] bg-[#111827] px-3 py-2 text-sm text-[#F9FAFB] focus:border-[#3B82F6] focus:outline-none"

const readOnlyClassName =
  "w-full rounded-lg border border-[#374151] bg-[#111827]/60 px-3 py-2 text-sm text-[#E5E7EB]"

export default function TicketDetailModal({
  ticketId,
  onClose,
  onUpdated,
  onNotify,
}) {
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [status, setStatus] = useState("")
  const [aiCategory, setAiCategory] = useState("")
  const [aiPriority, setAiPriority] = useState("")
  const [response, setResponse] = useState("")
  const [notes, setNotes] = useState("")

  const [saving, setSaving] = useState(false)
  const [generatingDraft, setGeneratingDraft] = useState(false)
  const [sendingResponse, setSendingResponse] = useState(false)

  const isBusy = saving || generatingDraft || sendingResponse

  useEffect(() => {
    let isMounted = true

    const loadTicket = async () => {
      setLoading(true)
      setError("")

      try {
        const data = await getAdminTicketDetail(ticketId)
        if (!isMounted) return

        setTicket(data)
        setStatus(data.status || "")
        setAiCategory(data.ai_category || "")
        setAiPriority(data.ai_priority || "")
        setResponse("")
        setNotes("")
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

  const handleSaveChanges = async () => {
    setSaving(true)

    try {
      const updated = await updateAdminTicket(ticketId, {
        status,
        ai_category: aiCategory || null,
        ai_priority: aiPriority || null,
      })
      setTicket((current) => ({ ...current, ...updated }))
      onUpdated?.()
      onNotify?.({ type: "success", message: "Ticket updated successfully." })
    } catch {
      onNotify?.({ type: "error", message: "Failed to save ticket changes." })
    } finally {
      setSaving(false)
    }
  }

  const handleGenerateDraft = async () => {
    setGeneratingDraft(true)

    try {
      const data = await generateDraftResponse(ticketId)
      setResponse(data.draft || "")
      onNotify?.({ type: "success", message: "AI draft generated." })
    } catch {
      onNotify?.({ type: "error", message: "Failed to generate AI draft." })
    } finally {
      setGeneratingDraft(false)
    }
  }

  const handleSendResponse = async () => {
    if (!response.trim()) {
      onNotify?.({ type: "error", message: "Response text is required." })
      return
    }

    setSendingResponse(true)

    try {
      await sendTicketResponse(ticketId, { response: response.trim(), notes })
      const refreshed = await getAdminTicketDetail(ticketId)
      setTicket(refreshed)
      setStatus(refreshed.status || "")
      setResponse("")
      setNotes("")
      onUpdated?.()
      onNotify?.({ type: "success", message: "Response sent successfully." })
    } catch {
      onNotify?.({ type: "error", message: "Failed to send response." })
    } finally {
      setSendingResponse(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={isBusy ? undefined : onClose}
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-[#374151] bg-[#1F2937] shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#374151] px-6 py-4">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-[#6B7280]">
              Ticket #{ticketId}
            </p>
            <h2 className="mt-1 truncate text-xl font-semibold text-[#F9FAFB]">
              {ticket?.subject || "Loading ticket..."}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isBusy}
            className="rounded-lg px-2 py-1 text-[#9CA3AF] transition-colors hover:bg-[#374151] hover:text-[#F9FAFB] disabled:opacity-50"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#3B82F6] border-t-transparent" />
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && ticket && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={ticket.status} type="ticket" />
                <span className="text-sm text-[#9CA3AF]">
                  Created {formatDate(ticket.created_at)}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-wide text-[#6B7280]">
                    Author
                  </label>
                  <p className="text-sm text-[#F9FAFB]">
                    {ticket.author_name || "—"}
                  </p>
                  <p className="text-sm text-[#9CA3AF]">
                    {ticket.author_email || "—"}
                  </p>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs uppercase tracking-wide text-[#6B7280]">
                  Subject
                </label>
                <div className={readOnlyClassName}>{ticket.subject}</div>
              </div>

              <div>
                <label className="mb-1 block text-xs uppercase tracking-wide text-[#6B7280]">
                  Description
                </label>
                <div className={`${readOnlyClassName} min-h-24 whitespace-pre-wrap`}>
                  {ticket.description || "—"}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-wide text-[#6B7280]">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    disabled={isBusy}
                    className={selectClassName}
                  >
                    {TICKET_STATUSES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs uppercase tracking-wide text-[#6B7280]">
                    AI Category
                  </label>
                  <select
                    value={aiCategory}
                    onChange={(event) => setAiCategory(event.target.value)}
                    disabled={isBusy}
                    className={selectClassName}
                  >
                    <option value="">Not set</option>
                    {TICKET_CATEGORIES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs uppercase tracking-wide text-[#6B7280]">
                    AI Priority
                  </label>
                  <select
                    value={aiPriority}
                    onChange={(event) => setAiPriority(event.target.value)}
                    disabled={isBusy}
                    className={selectClassName}
                  >
                    <option value="">Not set</option>
                    {TICKET_PRIORITIES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={isBusy}
                  className="!py-2 !px-4 !text-sm !bg-[#374151] hover:!bg-[#4B5563]"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>

              {ticket.responses?.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-[#F9FAFB]">
                    Previous Responses
                  </h3>
                  <div className="space-y-3">
                    {ticket.responses.map((entry) => (
                      <div
                        key={entry.id}
                        className="rounded-lg border border-[#374151] bg-[#111827] p-4"
                      >
                        <p className="text-xs text-[#6B7280]">
                          {formatDate(entry.created_at)}
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-sm text-[#E5E7EB]">
                          {entry.response}
                        </p>
                        {entry.notes && (
                          <p className="mt-2 text-xs text-[#9CA3AF]">
                            Notes: {entry.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs uppercase tracking-wide text-[#6B7280]">
                    Response
                  </label>
                  <Button
                    type="button"
                    onClick={handleGenerateDraft}
                    disabled={isBusy}
                    className="!py-2 !px-3 !text-sm !bg-[#374151] hover:!bg-[#4B5563]"
                  >
                    {generatingDraft ? "Generating..." : "Generate AI Draft"}
                  </Button>
                </div>
                <textarea
                  value={response}
                  onChange={(event) => setResponse(event.target.value)}
                  disabled={isBusy}
                  rows={6}
                  placeholder="Write your response to the author..."
                  className={`${selectClassName} resize-y min-h-32`}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs uppercase tracking-wide text-[#6B7280]">
                  Internal Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  disabled={isBusy}
                  rows={2}
                  placeholder="Optional notes stored with the response..."
                  className={`${selectClassName} resize-y`}
                />
              </div>
            </div>
          )}
        </div>

        {!loading && !error && ticket && (
          <div className="flex flex-wrap justify-end gap-3 border-t border-[#374151] px-6 py-4">
            <Button
              type="button"
              onClick={onClose}
              disabled={isBusy}
              className="!py-2 !px-4 !text-sm !bg-[#374151] hover:!bg-[#4B5563]"
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={handleSendResponse}
              disabled={isBusy || !response.trim()}
              className="!py-2 !px-4 !text-sm"
            >
              {sendingResponse ? "Sending..." : "Send Response"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
