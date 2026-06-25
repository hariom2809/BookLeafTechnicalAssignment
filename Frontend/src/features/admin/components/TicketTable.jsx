import StatusBadge from "../../dashboard/components/StatusBadge"
import { formatDate, formatLabel, TICKET_CATEGORIES, TICKET_PRIORITIES } from "../constants/ticketOptions"

export default function TicketTable({ tickets, onSelectTicket }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#374151]">
      <table className="min-w-full divide-y divide-[#374151]">
        <thead className="bg-[#1F2937]">
          <tr>
            {[
              "Subject",
              "Author Email",
              "Status",
              "AI Category",
              "AI Priority",
              "Created Date",
            ].map((heading) => (
              <th
                key={heading}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#374151] bg-[#111827]">
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              onClick={() => onSelectTicket(ticket.id)}
              className="cursor-pointer transition-colors hover:bg-[#1F2937]/80"
            >
              <td className="px-4 py-3">
                <p className="text-sm font-medium text-[#F9FAFB] truncate max-w-xs">
                  {ticket.subject}
                </p>
                <p className="text-[11px] font-mono text-[#6B7280] mt-0.5">#{ticket.id}</p>
              </td>
              <td className="px-4 py-3 text-sm text-[#E5E7EB]">
                {ticket.author_email || ticket.author_name || "—"}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={ticket.status} type="ticket" />
              </td>
              <td className="px-4 py-3 text-sm text-[#E5E7EB]">
                {formatLabel(TICKET_CATEGORIES, ticket.category || ticket.ai_category)}
              </td>
              <td className="px-4 py-3 text-sm text-[#E5E7EB]">
                {formatLabel(TICKET_PRIORITIES, ticket.priority || ticket.ai_priority)}
              </td>
              <td className="px-4 py-3 text-sm text-[#9CA3AF] whitespace-nowrap">
                {formatDate(ticket.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
