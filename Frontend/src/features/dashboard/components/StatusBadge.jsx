export default function StatusBadge({ status, type = "ticket" }) {
  const ticketStatuses = {
    open: {
      label: "Open",
      cls: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
    in_progress: {
      label: "In Progress",
      cls: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    },
    resolved: {
      label: "Resolved",
      cls: "bg-green-500/15 text-green-400 border-green-500/20",
    },
    closed: {
      label: "Closed",
      cls: "bg-[#374151] text-[#9CA3AF] border-[#4B5563]",
    },
  }

  const bookStatuses = {
    published: {
      label: "Published",
      cls: "bg-green-500/15 text-green-400 border-green-500/20",
    },
    cover_design: {
      label: "Cover Design",
      cls: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    },
    typesetting: {
      label: "Typesetting",
      cls: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
  }

  const statusMap =
    type === "book"
      ? bookStatuses
      : ticketStatuses

  const { label, cls } =
    statusMap[status] ?? {
      label: status,
      cls: "bg-[#374151] text-[#9CA3AF] border-[#4B5563]",
    }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}
    >
      {label}
    </span>
  )
}