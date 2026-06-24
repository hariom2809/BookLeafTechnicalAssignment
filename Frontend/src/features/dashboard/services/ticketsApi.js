import api from "../../../app/api"

export const getMyTickets = async () => {
  const response = await api.get("/ticket/")
  return response.data.results
}

export const createTicket = async ({ subject, description, category, book }) => {
  const response = await api.post("/ticket/", { subject, description, category, book })
  return response.data
}