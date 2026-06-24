import api from "../../../app/api"

export const getBookDetail = async (bookId) => {
  const response = await api.get(`/book/${bookId}/`)
  return response.data
}

export const getTicketDetail = async (ticketId) => {
  const response = await api.get(`/ticket/${ticketId}/`)
  return response.data
}
