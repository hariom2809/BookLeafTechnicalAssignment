import api from "../../../app/api"

export const getMyBooks = async () => {
  const response = await api.get("/book/")
  return response.data.results
}

export const getBook = async (bookId) => {
  const response = await api.get(`/book/${bookId}/`)
  return response.data
}