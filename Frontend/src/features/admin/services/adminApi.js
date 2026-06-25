import api from "../../../app/api"

export const getAdminTickets = async (filters = {}) => {
  const params = {}

  if (filters.status) params.status = filters.status
  if (filters.category) params.category = filters.category
  if (filters.priority) params.priority = filters.priority
  if (filters.date) {
    params.created_after = filters.date
    params.created_before = filters.date
  }

  const response = await api.get("/admin/tickets/", { params })
  return response.data.results ?? response.data
}

export const getAdminTicketDetail = async (ticketId) => {
  const response = await api.get(`/admin/tickets/${ticketId}/`)
  return response.data
}

export const updateAdminTicket = async (ticketId, payload) => {
  const response = await api.patch(`/admin/tickets/${ticketId}/`, payload)
  return response.data
}

export const generateDraftResponse = async (ticketId) => {
  const response = await api.post(`/admin/tickets/${ticketId}/draft/`)
  return response.data
}

export const sendTicketResponse = async (ticketId, { response, notes = "" }) => {
  const result = await api.post(`/admin/tickets/${ticketId}/respond/`, {
    response,
    notes,
  })
  return result.data
}
