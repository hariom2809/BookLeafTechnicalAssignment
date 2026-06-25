export const TICKET_STATUSES = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
]

export const TICKET_CATEGORIES = [
  { value: "royalty_and_payment", label: "Royalty & Payments" },
  { value: "isbn_and_metadata_issues", label: "ISBN & Metadata Issues" },
  { value: "printing_and_quality", label: "Printing & Quality" },
  { value: "distribution_and_availability", label: "Distribution & Availability" },
  { value: "book_status_and_production_updates", label: "Book Status & Production Updates" },
  { value: "general_inquery", label: "General Inquiry" },
]

export const TICKET_PRIORITIES = [
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
]

export const formatLabel = (options, value) => {
  if (!value) return "—"
  return options.find((option) => option.value === value)?.label ?? value
}

export const formatDate = (value) => {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  })
}
