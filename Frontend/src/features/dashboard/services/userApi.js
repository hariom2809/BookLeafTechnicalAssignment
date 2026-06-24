import api from "../../../app/api"

// Books
export const getMyBooks = async () => {
  const response = await api.get("/book/")
  return response.data.results
}

export const getBook = async (bookId) => {
  const response = await api.get(`/book/${bookId}/`)
  return response.data
}

// Tickets
export const getMyTickets = async () => {
  const response = await api.get("/ticket/")
  return response.data.results
}

export const createTicket = async ({ subject, description, category, book }) => {
  const response = await api.post("/ticket/", { subject, description, category, book })
  return response.data
}